import {
  PERENUAL_API_KEY,
  PLANT_DETAILS_KEY,
  PLANT_LIST_KEY,
} from "@/constants";
import { storage } from "@/utils/storage";

export const getPlants = async (search: string = "", page: number = 1) => {
  try {
    const url = `https://perenual.com/api/v2/species-list?key=${PERENUAL_API_KEY}&q=${search}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    await storage.setItem(PLANT_LIST_KEY, data.data);

    return data.data;
  } catch (error) {
    const cached = await storage.getItem<any[]>(PLANT_LIST_KEY);

    if (cached) {
      console.log("Loaded plants from cache ✅");
      return cached;
    }

    throw error;
  }
};

export const getPlantDetails = async (id: number | string) => {
  try {
    // 1️⃣ Fetch plant details
    const detailRes = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=${PERENUAL_API_KEY}`
    );
    if (!detailRes.ok)
      throw new Error(`HTTP error! status: ${detailRes.status}`);
    const plantData = await detailRes.json();

    // 2️⃣ Fetch care guide sections
    const guideRes = await fetch(
      `https://perenual.com/api/species-care-guide-list?key=${PERENUAL_API_KEY}&species_id=${id}`
    );
    const guideData = guideRes.ok ? await guideRes.json() : null;

    // Add care guide section to plant data
    plantData.care_guide = guideData?.data?.[0]?.section || [];

    // 3️⃣ Merge with cached data
    const cached = (await storage.getItem<any[]>(PLANT_DETAILS_KEY)) || [];
    const exists = cached.find((p) => p.id === id);

    const updated = exists
      ? cached.map((p) => (p.id === id ? plantData : p))
      : [...cached, plantData];

    // 4️⃣ Save to AsyncStorage
    await storage.setItem(PLANT_DETAILS_KEY, updated);

    return plantData;
  } catch (error) {
    // Fallback to cache if API fails
    const cached = await storage.getItem<any[]>(PLANT_DETAILS_KEY);
    const plant = cached?.find((p) => p.id === id);

    if (plant) {
      console.log(`Loaded plant ${id} details from cache ✅`);
      return plant;
    }

    throw error;
  }
};
