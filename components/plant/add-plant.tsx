import { Text, View } from "react-native";
import { Icon } from "../icon";

export function AddPlant() {
  return (
    <View className="flex-1 min-w-[45%] bg-white p-4 rounded-lg shadow-lg flex-row items-center justify-center gap-2">
      <View className="flex-col items-center gap-2">
        <View className="bg-primary p-4 rounded-full shadow-xl">
          <Icon name="Plus" size={24} color="white" />
        </View>
        <Text className="text-gray text-sm">Add Plant</Text>
      </View>
    </View>
  );
}
