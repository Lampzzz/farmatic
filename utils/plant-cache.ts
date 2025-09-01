import { getItem, setItem } from "./storage";

const PLANT_LIST_KEY = "plant_list";
const PLANT_DETAILS_KEY = "plant_details";

export const savePlantList = (plants: any[]) => {
  setItem(PLANT_LIST_KEY, plants);
};

export const getPlantList = (): any[] => {
  return getItem<any[]>(PLANT_LIST_KEY) || [];
};

export const savePlantDetail = (plant: any) => {
  const existing = getItem<any[]>(PLANT_DETAILS_KEY) || [];
  const exists = existing.find((p) => p.id === plant.id);

  let updated;

  if (exists) {
    updated = existing.map((p) => (p.id === plant.id ? plant : p));
  } else {
    updated = [...existing, plant];
  }

  setItem(PLANT_DETAILS_KEY, updated);
};

export const getPlantDetails = (id: number) => {
  const details = getItem<any[]>(PLANT_DETAILS_KEY) || [];
  return details.find((p) => p.id === id) || null;
};

export const getAllPlantDetails = () => {
  return getItem<any[]>(PLANT_DETAILS_KEY) || [];
};
