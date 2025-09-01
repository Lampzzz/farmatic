import AsyncStorage from "@react-native-async-storage/async-storage";

const PLANT_LIST_KEY = "plant_list";
const PLANT_DETAILS_KEY = "plant_details";

export const getPlants = async (search: string = "", page: number = 1) => {
  try {
    const url = `https://perenual.com/api/v2/species-list?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}&q=${search}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const cached = await AsyncStorage.getItem(PLANT_LIST_KEY);
    let cachedPlants: any[] = cached ? JSON.parse(cached) : [];

    const merged = [
      ...cachedPlants.filter(
        (cachedPlant) =>
          !data.data.some((plant: any) => plant.id === cachedPlant.id)
      ),
      ...data.data,
    ];

    await AsyncStorage.setItem(PLANT_LIST_KEY, JSON.stringify(merged));

    return data.data;
  } catch (error) {
    console.error("Plant API Error", error);

    const cached = await AsyncStorage.getItem(PLANT_LIST_KEY);

    if (cached) {
      console.log("Loaded plants from cache");
      return JSON.parse(cached);
    }

    return [];
  }
};

export async function getPlantDetails(id: string | number): Promise<any> {
  try {
    const response = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching plant details:", error);
    throw error;
  }
}

export async function getPlantGuideDetails(id: string | number): Promise<any> {
  try {
    const response = await fetch(
      `https://perenual.com/api/species-care-guide-list?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}&species_id=${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Error fetching plant details:", error);
  }
}

export async function getFullPlantDetails(id: string | number): Promise<any> {
  try {
    const [detailsResponse, guideResponse] = await Promise.all([
      fetch(
        `https://perenual.com/api/v2/species/details/${id}?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}`
      ),
      fetch(
        `https://perenual.com/api/species-care-guide-list?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}&species_id=${id}`
      ),
    ]);

    if (!detailsResponse.ok) {
      throw new Error(`Plant details error! status: ${detailsResponse.status}`);
    }
    if (!guideResponse.ok) {
      throw new Error(`Plant guide error! status: ${guideResponse.status}`);
    }

    const detailsData = await detailsResponse.json();
    const guideData = await guideResponse.json();

    const mergedData = {
      ...detailsData,
      care_guide: guideData.data?.[0]?.section || [],
    };

    const cached = await AsyncStorage.getItem(PLANT_DETAILS_KEY);
    let plantCache: any[] = cached ? JSON.parse(cached) : [];

    const existingIndex = plantCache.findIndex((p) => p.id === mergedData.id);

    if (existingIndex !== -1) {
      const oldData = plantCache[existingIndex];
      if (JSON.stringify(oldData) !== JSON.stringify(mergedData)) {
        plantCache[existingIndex] = mergedData;
        await AsyncStorage.setItem(
          PLANT_DETAILS_KEY,
          JSON.stringify(plantCache)
        );
      } else {
        console.log(`No changes for plant ${id}, keeping cache`);
      }
    } else {
      console.log(`Adding new plant ${id} to cache`);
      plantCache.push(mergedData);
      await AsyncStorage.setItem(PLANT_DETAILS_KEY, JSON.stringify(plantCache));
    }

    return mergedData;
  } catch (error) {
    console.error("Error fetching full plant details:", error);

    const cached = await AsyncStorage.getItem(PLANT_DETAILS_KEY);
    if (cached) {
      const plantCache: any[] = JSON.parse(cached);
      const found = plantCache.find((p) => p.id === id);
      if (found) {
        console.log(`Loaded plant ${id} from cache`);
        return found;
      }
    }

    throw error;
  }
}
