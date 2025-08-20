import axios from "axios";

export const getPlants = async (): Promise<PlantLibrary[]> => {
  try {
    const response = await axios.get(
      `https://perenual.com/api/v2/species-list?key=${process.env.EXPO_PUBLIC_PLANT_API_KEY!}`
    );

    return response.data.data as PlantLibrary[];
  } catch (error) {
    console.error("Plant API Error", error);
    throw error;
  }
};
