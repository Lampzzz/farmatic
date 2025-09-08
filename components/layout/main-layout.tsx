import clsx from "clsx";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <SafeAreaView className={clsx("flex-1", backgroundColor)} edges={["top"]}>
        <View className={clsx("bg-background flex-1", styles)}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
