import { Divider } from "@/components/divider";
import { Icon } from "@/components/icon";
import clsx from "clsx";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

interface Props {
  icon: keyof typeof icons;
  iconColor?: string;
  label: string;
  value: string;
  styles?: string;
  showDivider?: boolean;
}

export const PlantProfileRow = ({
  icon,
  iconColor = "#16A34A",
  label,
  value,
  styles = "",
  showDivider = true,
}: Props) => {
  return (
    <>
      <View className={clsx("flex-row items-center justify-between", styles)}>
        <View className="flex-row items-center gap-2">
          <Icon name={icon} size={20} color={iconColor} />
          <Text className="font-semibold text-lg text-primary">{label}</Text>
        </View>
        <Text className="text-gray" numberOfLines={1} ellipsizeMode="tail">
          {value || "N/A"}
        </Text>
      </View>

      {showDivider && (
        <View className="py-3">
          <Divider />
        </View>
      )}
    </>
  );
};
