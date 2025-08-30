import clsx from "clsx";
import { View } from "react-native";

export function Divider({ styles }: { styles?: string }) {
  return <View className={clsx("h-[1px] bg-gray/10", styles)} />;
}
