import { Divider } from "@/components/divider";
import { Text, View } from "react-native";
import { PlantInfoRow } from "../components/plant-info-row";

interface Props {
  plant: any;
}

export const PlantInfoSection = ({ plant }: Props) => (
  <View className="mb-6">
    <Text className="text-xl font-bold text-gray-800 mb-4">Plant Info</Text>
    <View className="bg-white rounded-xl p-4 shadow-md">
      <PlantInfoRow label="Plant name" value={plant.name} />
      <Divider />
      <PlantInfoRow label="Date Planted" value={plant.datePlanted} />
      <Divider />
      <PlantInfoRow label="Status" value={plant.analysis?.healthStatus} />
    </View>
  </View>
);
