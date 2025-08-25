import axios from "axios";

export const getPlants = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<PerenualResponse> => {
  try {
    const response = await axios.get(
      `https://perenual.com/api/v2/species-list`,
      {
        params: {
          key: "sk-xqpS68a28379effca11887",
          page,
          per_page: limit,
          order: "asc",
          q: search || undefined,
        },
      }
    );

    return response.data as PerenualResponse;
  } catch (error) {
    console.error("Plant API Error", error);
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
    return data;
  } catch (error) {
    console.error("Error fetching plant details:", error);
    throw error;
  }
}
