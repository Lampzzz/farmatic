import React from "react";
import { Text, View } from "react-native";
import { Icon } from "../icon";

export default function EmptyGreenhousePlant() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Icon name="Sprout" size={64} color="#5B8908" />
      <Text className="text-xl font-semibold text-primary  mt-4 text-center">
        No Plants Yet
      </Text>
      <Text className="text-gray text-center mt-2 leading-5">
        Your greenhouse is empty. Start by adding your first plant to begin
        monitoring and growing.
      </Text>
    </View>
  );
}
