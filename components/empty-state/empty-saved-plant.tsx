import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";

export default function EmptyGreenhousePlant() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Icon name="Sprout" size={64} color="#5B8908" />
      <Text className="text-xl font-semibold text-primary  mt-4 text-center">
        No Saved Plants Yet
      </Text>
      <Text className="text-gray text-center mt-2 leading-5">
        Your saved plants will appear here. Start by saving your first plant.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/library")}
        className="mt-4 bg-primary rounded-full py-4 px-6"
      >
        <Text className="text-white font-bold">Browse Plants</Text>
      </TouchableOpacity>
    </View>
  );
}
