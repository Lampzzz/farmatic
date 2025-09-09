import { Icon } from "@/components/icon";
import clsx from "clsx";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

export const EnvironmentalStatusCard = ({
  title,
  value,
  icon,
  iconColor,
  bgColor = "bg-white",
}: {
  title: string;
  value: string | number;
  icon: keyof typeof icons;
  iconColor?: string;
  bgColor?: string;
}) => {
  return (
    <View className={clsx("flex-1  rounded-xl px-2 py-4 shadow-md", bgColor)}>
      <View className="flex-col items-center gap-2">
        <Icon name={icon} size={24} color={iconColor || "black"} />
        <Text className="font-medium text-sm text-gray-500 text-center">
          {title}
        </Text>
        <Text className="font-bold text-xl">{value || "N/A"}</Text>
      </View>
    </View>
  );
};
