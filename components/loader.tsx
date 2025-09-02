import { ActivityIndicator, Text, View } from "react-native";

export const Loader = ({ message }: { message?: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#16A34A" />
      {message && <Text className="mt-4 text-lg text-primary">{message}</Text>}
    </View>
  );
};
