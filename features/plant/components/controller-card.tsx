import clsx from "clsx";
import { icons } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../../../components/icon";

type ColorScheme = {
  iconBgClass: string;
  iconColor: string;
  switchOnColor: string;
  statusBgClass: string;
  statusTextClass: string;
};

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ControllerCard({
  title,
  icon,
  value = false,
  colorScheme,
  onToggle,
  onSettings,
}: {
  title: string;
  icon: keyof typeof icons;
  value?: boolean;
  colorScheme: ColorScheme;
  onToggle?: () => void;
  onSettings?: () => void;
}) {
  const onTrackColor = hexToRgba(colorScheme.switchOnColor, 0.25);

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className={clsx(
              colorScheme.iconBgClass,
              "w-10 h-10 rounded-full  items-center justify-center"
            )}
          >
            <Icon name={icon} size={20} color={colorScheme.iconColor} />
          </View>
          <Text className="ml-3 font-semibold text-gray-800">{title}</Text>
        </View>

        <View className="flex-row items-center">
          {/* <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: "#e5e7eb", true: onTrackColor }}
            thumbColor={value ? colorScheme.switchOnColor : "#d1d5db"}
          /> */}
          <TouchableOpacity onPress={onSettings}>
            <Icon name="Settings" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        className={clsx(colorScheme.statusBgClass, "mt-4 rounded-xl px-4 py-3")}
      >
        <Text
          className={clsx(colorScheme.statusTextClass, "font-medium")}
        >{`Status: ${value ? "Running" : "Off"}`}</Text>
      </View>
    </View>
  );
}
