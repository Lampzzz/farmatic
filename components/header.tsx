import { Text, View } from "react-native";

export function Header({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <View className="bg-primary px-6 py-8 rounded-b-3xl">
      <View className="mb-2">
        <Text className="text-2xl font-bold text-white">{title}</Text>
        <Text className="text-white">{description}</Text>
      </View>
      {children && <View className="mt-4">{children}</View>}
    </View>
  );
}
