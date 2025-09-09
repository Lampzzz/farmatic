import { PlantLibraryDetailsScreen } from "@/features/library";
import { useLocalSearchParams } from "expo-router";

const PlantLibraryDetails = () => {
  const { id } = useLocalSearchParams();
  return <PlantLibraryDetailsScreen id={id as string} />;
};

export default PlantLibraryDetails;
