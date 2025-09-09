import { BaseCard } from "@/components/base-card";
import { Icon } from "@/components/icon";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onTakePicture: () => void;
  onUploadImage: () => void;
}

export const IdentifyMethod = ({ onTakePicture, onUploadImage }: Props) => {
  return (
    <BaseCard styles="mb-6">
      <Text className="text-center text-primary text-xl font-bold mb-6">
        How would you like to identify your plant?
      </Text>

      <View className="flex-row items-center justify-center gap-4 mb-4">
        <TouchableOpacity
          className="flex-1 bg-green-50 p-4 rounded-lg items-center"
          onPress={onTakePicture}
        >
          <Icon name="Camera" size={32} color="#16A34A" />
          <Text className="text-primary font-semibold mt-2">Take Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-green-50 p-4 rounded-lg items-center"
          onPress={onUploadImage}
        >
          <Icon name="Image" size={32} color="#16A34A" />
          <Text className="text-primary font-semibold mt-2">Upload Image</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray text-sm">
        Snap a photo of your plant or upload an existing image for instant
        identification
      </Text>
    </BaseCard>
  );
};
