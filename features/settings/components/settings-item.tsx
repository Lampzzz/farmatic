import { Icon } from "@/components/icon";
import { icons } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingsItemProps {
  icon: keyof typeof icons;
  iconColor?: string;
  title: string;
  titleColor?: string;
  onPress?: () => void;
  showBorder?: boolean;
}

export const SettingsItem = ({
  icon,
  iconColor = "#16A34A",
  title,
  titleColor,
  onPress,
  showBorder = true,
}: SettingsItemProps) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row items-center justify-start gap-4">
          <Icon name={icon} size={24} color={iconColor} />
          <Text className={titleColor}>{title}</Text>
        </View>
      </TouchableOpacity>
      {showBorder && <View className="border-b border-gray/10 my-4" />}
    </>
  );
};
