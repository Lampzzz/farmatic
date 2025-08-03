import clsx from "clsx";
import { Text, View } from "react-native";
import { Divider } from "./divider";

export function ProfileCard({
  title,
  styles,
  children,
}: {
  title?: string;
  styles?: string;
  children: React.ReactNode;
}) {
  return (
    <View className={clsx("bg-white shadow-md rounded-xl p-6", styles)}>
      {title && (
        <>
          <Text className="text-xl font-bold">{title}</Text>
          <Divider />
        </>
      )}
      {children}
    </View>
  );
}
