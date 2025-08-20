import { ActivityIndicator, Pressable, Text } from "react-native";

export function Button({
  onPress,
  label,
  isLoading,
}: {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={{ height: 52 }}
      className="bg-primary rounded-lg items-center justify-center disabled:opacity-50"
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="text-white text-lg font-bold">{label}</Text>
      )}
    </Pressable>
  );
}
