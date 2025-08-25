import { Text, View } from "react-native";

export const Error = ({ message }: { message: string }) => {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-gray text-center">{message}</Text>
    </View>
  );
};
