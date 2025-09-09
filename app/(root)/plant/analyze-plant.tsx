import { PlantAnalysisScreen } from "@/features/plant";
import { useLocalSearchParams } from "expo-router";

const AnalyzePlant = () => {
  const { imageUri, type } = useLocalSearchParams();

  return (
    <PlantAnalysisScreen imageUri={imageUri as string} type={type as string} />
  );
};

export default AnalyzePlant;
