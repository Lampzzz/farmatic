import { AlertCircle } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export function Error({
  message = "Something went wrong",
  onRetry,
}: ErrorMessageProps) {
  return (
    <View className="p-6 items-center justify-center flex-1">
      <AlertCircle size={48} color="red" strokeWidth={2.5} className="mb-4" />
      <Text className="text-lg font-bold text-red-600 mb-2">{message}</Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-red-500 px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
