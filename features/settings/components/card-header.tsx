import { Divider } from "@/components/divider";
import { Text, View } from "react-native";

export default function CardHeader({ title }: { title: string }) {
  return (
    <View>
      <Text className="text-xl font-bold">{title}</Text>
      <Divider />
    </View>
  );
}
