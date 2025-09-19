import clsx from "clsx";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MainLayout({
  children,
  styles,
  backgroundColor = "bg-primary",
}: {
  children: React.ReactNode;
  styles?: string;
  backgroundColor?: string;
}) {
  return (
    <SafeAreaView className={clsx("flex-1", backgroundColor)} edges={["top"]}>
      <View className={clsx("flex-1 bg-white", styles)}>{children}</View>
    </SafeAreaView>
  );
}
