import { Divider } from "@/components/divider";
import { formatFirestoreDate } from "@/utils/date";
import clsx from "clsx";
import { Text, View } from "react-native";
import { PlantInfoRow } from "../components/plant-info-row";

interface Props {
  plant: any;
  styles?: string;
}

export const PlantInfoSection = ({ plant, styles }: Props) => {
  console.log(JSON.stringify(plant, null, 2));

  return (
    <View className={clsx(styles)}>
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Plant Information
      </Text>
      <View className="bg-white rounded-xl p-4 shadow-md">
        <PlantInfoRow label="Plant name" value={plant.name} />
        <View className="py-3">
          <Divider />
        </View>
        <PlantInfoRow
          label="Date Planted"
          value={formatFirestoreDate(plant.datePlanted)}
        />
        <View className="py-3">
          <Divider />
        </View>
        <PlantInfoRow label="Status" value={plant.analysis?.healthStatus} />
      </View>
    </View>
  );
};
