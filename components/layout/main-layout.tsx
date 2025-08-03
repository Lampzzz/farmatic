import clsx from "clsx";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function MainLayout({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return (
    <SafeAreaView className="flex-1 bg-primary relative" edges={["top"]}>
      <ScrollView
        className={clsx("bg-background", styles)}
        contentContainerStyle={{ flexGrow: 1 }}
        overScrollMode="never"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
