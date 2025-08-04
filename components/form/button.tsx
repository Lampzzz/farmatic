import { Pressable, Text } from "react-native";

export default function Button({
  onPress,
  label,
}: {
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-primary rounded-lg py-4 items-center justify-center"
    >
      <Text className="text-white text-lg font-bold">{label}</Text>
    </Pressable>
  );
}
