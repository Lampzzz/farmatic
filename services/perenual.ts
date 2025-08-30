import AsyncStorage from "@react-native-async-storage/async-storage";

const PLANT_CACHE_KEY = "plant_cache";

export const getPlants = async (search: string = "") => {
  try {
    const url = `https://perenual.com/api/v2/species-list?key=${process.env.EXPO_PUBLIC_PERENUAL_API_KEY}&q=${search}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    await AsyncStorage.setItem(PLANT_CACHE_KEY, JSON.stringify(data.data));

    return data.data;
  } catch (error) {
    console.error("Plant API Error", error);

    const cached = await AsyncStorage.getItem(PLANT_CACHE_KEY);

    if (cached) {
      console.log("Loaded plants from cache");
      return JSON.parse(cached);
    }

    throw error;
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
    // throw error;
  }
}
