import React from "react";
import { View } from "react-native";
import { Icon } from "../icon";

const PlantImagePlaceholder = () => {
  return (
    <View className="w-full h-80 rounded-xl overflow-hidden mb-6 bg-green-100 items-center justify-center">
      <Icon name="Sprout" size={80} color="#16A34A" />
    </View>
  );
};

export default PlantImagePlaceholder;
