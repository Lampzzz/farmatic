import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
}

export const PlantInfoRow = ({ label, value }: Props) => {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-500">{label}</Text>
      <Text className="text-gray-800 font-medium capitalize">
        {value || "Not specified"}
      </Text>
    </View>
  );
};
