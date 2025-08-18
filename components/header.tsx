import { router } from "expo-router";
import { Text, View } from "react-native";
import { HeaderIcon } from "./header-icon";

export function Header({
  title,
  description,
  children,
  isHasBack,
}: {
  title: string;
  description: string;
  isHasBack?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <View className="bg-primary px-6 py-8 rounded-b-3xl">
      <View className="mb-2 gap-4 items-center flex-row">
        {isHasBack && (
          <HeaderIcon icon="ArrowLeft" onPress={() => router.back()} />
        )}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-white">{title}</Text>
          <Text className="text-white">{description}</Text>
        </View>
      </View>
      {children && <View className="mt-4">{children}</View>}
    </View>
  );
}
