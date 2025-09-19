import { Icon } from "@/components/icon";
import { View } from "react-native";

export const PlantImagePlaceholder = () => {
  return (
    <View className="w-full h-80 rounded-xl overflow-hidden mb-6 bg-green-100 items-center justify-center">
      <Icon name="Sprout" size={80} color="#5B8908" />
    </View>
  );
};
