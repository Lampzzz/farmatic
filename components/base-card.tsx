import clsx from "clsx";
import { View } from "react-native";

export function BaseCard({
  children,
  styles,
  padding = "p-6",
}: {
  children: React.ReactNode;
  styles?: string;
  padding?: string;
}) {
  return (
    <View className={clsx("bg-white rounded-lg shadow-md", styles, padding)}>
      {children}
    </View>
  );
}
