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
