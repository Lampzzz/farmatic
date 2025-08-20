import { icons } from "lucide-react-native";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import { Icon } from "../icon";

type ColorScheme = {
  iconBgClass: string;
  iconColor: string;
  switchOnColor: string; // hex
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
  initiallyOn = false,
  statusOnText = "On",
  colorScheme,
  onToggle,
}: {
  title: string;
  icon: keyof typeof icons;
  initiallyOn?: boolean;
  statusOnText?: string;
  colorScheme: ColorScheme;
  onToggle?: (value: boolean) => void;
}) {
  const [isOn, setIsOn] = useState<boolean>(initiallyOn);

  const handleToggle = (value: boolean) => {
    setIsOn(value);
    onToggle?.(value);
  };

  const onTrackColor = hexToRgba(colorScheme.switchOnColor, 0.25);

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${colorScheme.iconBgClass}`}
          >
            <Icon name={icon} size={20} color={colorScheme.iconColor} />
          </View>
          <Text className="ml-3 font-semibold text-gray-800">{title}</Text>
        </View>

        <Switch
          value={isOn}
          onValueChange={handleToggle}
          trackColor={{ false: "#e5e7eb", true: onTrackColor }}
          thumbColor={isOn ? colorScheme.switchOnColor : "#d1d5db"}
        />
      </View>

      {isOn && (
        <View
          className={`mt-4 rounded-xl px-4 py-3 ${colorScheme.statusBgClass}`}
        >
          <Text
            className={`font-medium ${colorScheme.statusTextClass}`}
          >{`Status: ${statusOnText}`}</Text>
        </View>
      )}
    </View>
  );
}
