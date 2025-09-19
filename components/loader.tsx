import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, View } from "react-native";

export const Loader = ({ message }: { message?: string }) => {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#5B8908" />
        {message && (
          <Text className="mt-4 text-lg text-primary">{message}</Text>
        )}
      </View>
      <StatusBar style="dark" />
    </>
  );
};
