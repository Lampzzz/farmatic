import {
  PERENUAL_API_KEY,
  PERENUAL_BASE_URL,
  PLANT_LIST_KEY,
} from "@/constants";
import { storage } from "@/utils/storage";

export const getPlants = async (search: string = "", page: number = 1) => {
  try {
    const url = `${PERENUAL_BASE_URL}/v2/species-list?key=${PERENUAL_API_KEY}&q=${search}&page=${page}`;
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

    console.error("Error getting plants", error);

    return [];
  }
};
