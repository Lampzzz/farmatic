import { icons } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Icon } from "../icon";

export function StatusCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: keyof typeof icons;
}) {
  return (
    <View className="flex-1">
      <View className="flex-col items-center gap-2 bg-secondary p-4 rounded-xl">
        <Icon name={icon} size={20} color="white" />
        <Text className="text-white font-medium text-sm">{title}</Text>
        <Text className="text-white font-bold text-xl">{value}</Text>
      </View>
    </View>
  );
}
