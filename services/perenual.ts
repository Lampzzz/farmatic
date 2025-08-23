import axios from "axios";

export const getPlants = async (
  page: number = 1,
  limit: number = 10
): Promise<PerenualResponse> => {
  try {
    const response = await axios.get(
      `https://perenual.com/api/v2/species-list?key=sk-xqpS68a28379effca11887&page=${page}&limit=${limit}`
    );

    // Debug: Log the raw response
    // console.log("Raw API Response:", JSON.stringify(response.data, null, 2));

    return response.data as PerenualResponse;
  } catch (error) {
    console.error("Plant API Error", error);
    throw error;
  }
};

export async function getPlantDetails(id: string | number): Promise<any> {
  try {
    // Replace YOUR_API_KEY with your actual Perenual API key
    const response = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=YOUR_API_KEY`
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
