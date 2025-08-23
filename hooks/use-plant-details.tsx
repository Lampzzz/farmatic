import { useEffect, useState } from "react";
import { getPlantDetails } from "../services/perenual";

interface PlantDetails {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string;
  origin: string | null;
  type: string;
  dimensions: {
    type: string | null;
    min_value: number;
    max_value: number;
    unit: string;
  };
  cycle: string;
  watering: string;
  watering_general_benchmark: {
    value: string;
    unit: string;
  };
  plant_anatomy: Array<{
    part: string;
    color: string[];
  }>;
  sunlight: string[];
  pruning_month: string[];
  pruning_count: {
    amount: number;
    interval: string;
  };
  seeds: number;
  attracts: string[];
  propagation: string[];
  hardiness: {
    min: string;
    max: string;
  };
  flowers: boolean;
  flowering_season: string;
  soil: string[];
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  fruiting_season: string | null;
  harvest_season: string | null;
  harvest_method: string;
  leaf: boolean;
  edible_leaf: boolean;
  growth_rate: string;
  maintenance: string;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  rare: boolean;
  tropical: boolean;
  cuisine: boolean;
  indoor: boolean;
  care_level: string;
  description: string;
  default_image: {
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
  other_images: Array<{
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  }>;
  xWateringQuality: string[];
  xWateringPeriod: string[];
  xWateringBasedTemperature: {
    unit: string;
    min: number;
    max: number;
  };
  xWateringPhLevel: {
    min: number;
    max: number;
  };
  xSunlightDuration: {
    min: string;
    max: string;
    unit: string;
  };
}

export function usePlantDetails(plantId: string | string[] | undefined) {
  const [plant, setPlant] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plantId) return;

    const fetchPlant = async () => {
      try {
        setLoading(true);
        setError(null);
        const id = Array.isArray(plantId) ? plantId[0] : plantId;
        if (!id) {
          throw new Error("Plant ID is required");
        }
        const data = await getPlantDetails(id);
        setPlant(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load plant details";
        setError(errorMessage);
        console.error("Error fetching plant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  return { plant, loading, error };
}
