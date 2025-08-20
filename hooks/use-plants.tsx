import { useEffect, useState } from "react";
import {
  getAllPlantsRealtime,
  getPlantById,
  getPlantsRealtime,
} from "../services/firebase/plant";

export const usePlantsRealtime = (userId?: string) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Set up real-time listener
    const unsubscribe = getPlantsRealtime(
      userId,
      (plantsData) => {
        setPlants(plantsData);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { plants, loading, error };
};

export const useAllPlantsRealtime = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Set up real-time listener for all plants
    const unsubscribe = getAllPlantsRealtime(
      (plantsData) => {
        setPlants(plantsData);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return { plants, loading, error };
};

export const usePlantById = (plantId: string | undefined) => {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!plantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchPlant = async () => {
      try {
        const plantData = await getPlantById(plantId);
        setPlant(plantData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  return { plant, loading, error };
};
