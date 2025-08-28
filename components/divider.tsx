import clsx from "clsx";
import { View } from "react-native";

export function Divider({ styles }: { styles?: string }) {
  return <View className={clsx("border-b border-gray/20", styles)} />;
}
