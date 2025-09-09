import { AddPlantScreen } from "@/features/plant";
import { useLocalSearchParams } from "expo-router";

const AddPlant = () => {
  const params = useLocalSearchParams();
  return <AddPlantScreen selectedPlantId={params as any} />;
};

export default AddPlant;
