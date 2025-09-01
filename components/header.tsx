import { router } from "expo-router";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";
import { HeaderIcon } from "./header-icon";

export function Header({
  title,
  description,
  children,
  showBackButton,
  rightIcon,
  onRightIconPress,
}: {
  title: string;
  description: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
  rightIcon?: keyof typeof icons;
  onRightIconPress?: () => void;
}) {
  return (
    <View className="bg-primary px-6 py-8 rounded-b-3xl">
      <View className="mb-2 gap-4 items-center flex-row">
        {showBackButton && (
          <HeaderIcon icon="ArrowLeft" onPress={() => router.back()} />
        )}
        <View className="flex-1 items-center justify-between flex-row">
          <View>
            <Text className="text-2xl font-bold text-white">{title}</Text>
            <Text className="text-white">{description}</Text>
          </View>
          {rightIcon && (
            <HeaderIcon
              icon={rightIcon as keyof typeof icons}
              onPress={onRightIconPress}
            />
          )}
        </View>
      </View>
      {children && <View className="mt-4">{children}</View>}
    </View>
  );
}
