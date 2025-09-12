import { AddPlantScreen } from "@/features/plant";
import { useLocalSearchParams } from "expo-router";

const AddPlant = () => {
  const { selectedPlantId, selectedPlantName, selectedPlantImage } =
    useLocalSearchParams();
  return (
    <AddPlantScreen
      selectedPlantId={selectedPlantId as string}
      selectedPlantName={selectedPlantName as string}
      selectedPlantImage={selectedPlantImage as string}
    />
  );
};

export default AddPlant;
