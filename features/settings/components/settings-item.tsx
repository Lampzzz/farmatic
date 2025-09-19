import { Divider } from "@/components/divider";
import { Icon } from "@/components/icon";
import { icons } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: keyof typeof icons;
  iconColor?: string;
  title: string;
  titleColor?: string;
  onPress?: () => void;
  showBorder?: boolean;
}

export const SettingsItem = ({
  icon,
  iconColor = "#5B8908",
  title,
  titleColor,
  onPress,
  showBorder = true,
}: Props) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row items-center justify-start gap-4">
          <Icon name={icon} size={24} color={iconColor} />
          <Text className={titleColor}>{title}</Text>
        </View>
      </TouchableOpacity>
      {showBorder && (
        <View className="py-4">
          <Divider />
        </View>
      )}
    </>
  );
};
