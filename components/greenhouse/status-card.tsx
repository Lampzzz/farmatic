import clsx from "clsx";
import { icons } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Icon } from "../icon";

export function StatusCard({
  title,
  value,
  icon,
  iconColor,
  bgColor = "bg-white",
}: {
  title: string;
  value: string;
  icon: keyof typeof icons;
  iconColor?: string;
  bgColor?: string;
}) {
  return (
    <View className={clsx("flex-1  rounded-xl px-2 py-4 shadow-md", bgColor)}>
      <View className="flex-col items-center gap-2">
        <Icon name={icon} size={24} color={iconColor || "black"} />
        <Text className="font-medium text-sm text-gray-500 text-center">
          {title}
        </Text>
        <Text className="font-bold text-xl">{value}</Text>
      </View>
    </View>
  );
}
