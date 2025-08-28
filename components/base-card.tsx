import clsx from "clsx";
import { View } from "react-native";

export function BaseCard({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return (
    <View className={clsx("bg-white rounded-lg shadow-md p-6", styles)}>
      {children}
    </View>
  );
}
