import { Divider } from "@/components/divider";
import { Text, View } from "react-native";

interface Props {
  title: string;
}

export const CardHeader = ({ title }: Props) => {
  return (
    <View>
      <Text className="text-xl font-bold">{title}</Text>
      <Divider />
    </View>
  );
};
