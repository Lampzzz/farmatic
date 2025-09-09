import {
  PERENUAL_API_KEY,
  PERENUAL_BASE_URL,
  PLANT_DETAILS_KEY,
} from "@/constants";
import { storage } from "@/utils/storage";

export const getPlantDetails = async (id: number | string) => {
  try {
    const detailRes = await fetch(
      `${PERENUAL_BASE_URL}/v2/species/details/${id}?key=${PERENUAL_API_KEY}`
    );

    if (!detailRes.ok)
      throw new Error(`HTTP error! status: ${detailRes.status}`);

    const plantData = await detailRes.json();

    const guideRes = await fetch(
      `${PERENUAL_BASE_URL}/species-care-guide-list?key=${PERENUAL_API_KEY}&species_id=${id}`
    );

    const guideData = guideRes.ok ? await guideRes.json() : null;

    plantData.care_guide = guideData?.data?.[0]?.section || [];

    const cached = (await storage.getItem<any[]>(PLANT_DETAILS_KEY)) || [];
    const exists = cached.find((p) => p.id === id);

    const updated = exists
      ? cached.map((p) => (p.id === id ? plantData : p))
      : [...cached, plantData];

    await storage.setItem(PLANT_DETAILS_KEY, updated);

    return plantData;
  } catch (error) {
    const cached = await storage.getItem<any[]>(PLANT_DETAILS_KEY);
    const plant = cached?.find((p) => p.id === id);

    if (plant) {
      console.log(`Loaded plant ${id} details from cache`);
      return plant;
    }

    console.error("Error getting plant details", error);

    return null;
  }
};
