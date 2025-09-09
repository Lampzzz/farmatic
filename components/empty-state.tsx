import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./icon";

export const EmptyState = ({
  title,
  description,
  buttonText,
  onPress,
}: {
  title: string;
  description: string;
  buttonText?: string;
  onPress?: () => void;
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Icon name="Sprout" size={64} color="#16A34A" />
      <Text className="text-xl font-semibold text-primary  mt-4 text-center">
        {title}
      </Text>
      <Text className="text-gray text-center mt-2 leading-5">
        {description}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="mt-4 bg-primary rounded-full py-4 px-6"
      >
        <Text className="text-white font-bold">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
