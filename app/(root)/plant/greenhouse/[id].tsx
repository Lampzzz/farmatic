import { GreenhousePlantDetailsScreen } from "@/features/plant";
import { useLocalSearchParams } from "expo-router";

const GreenhousePlantDetails = () => {
  const { id } = useLocalSearchParams();
  return <GreenhousePlantDetailsScreen id={id as string} />;
};

export default GreenhousePlantDetails;
