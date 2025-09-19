import clsx from "clsx";
import { icons } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "./icon";

export function HeaderIcon({
  icon,
  styles,
  onPress,
}: {
  icon: keyof typeof icons;
  styles?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "p-2 h-10 w-10 items-center justify-center rounded-full bg-primary",
        styles
      )}
    >
      <Icon name={icon} size={18} color="white" />
    </TouchableOpacity>
  );
}
