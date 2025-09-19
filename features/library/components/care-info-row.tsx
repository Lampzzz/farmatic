import { Icon } from "@/components/icon";
import clsx from "clsx";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

interface Props {
  icon: keyof typeof icons;
  title: string;
  description: string;
  styles?: string;
}

export const CareInfoRow = ({ icon, title, description, styles }: Props) => {
  return (
    <View className={clsx("flex-row gap-3", styles)}>
      <View
        className="rounded-lg bg-green-50 items-center justify-center"
        style={{ width: 50, height: 50 }}
      >
        <Icon name={icon} size={28} color="#5B8908" />
      </View>

      <View className="flex-1">
        <Text className="text-green-500 font-semibold mb-1 capitalize text-xl">
          {title}
        </Text>
        <Text className="text-gray leading-5">{description}</Text>
      </View>
    </View>
  );
};
