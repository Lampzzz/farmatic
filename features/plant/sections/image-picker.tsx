import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleImagePicker: () => void;
  handleTakePhoto: () => void;
  errors: any;
}

export const ImagePicker = ({
  value,
  onChange,
  handleImagePicker,
  handleTakePhoto,
  errors,
}: Props) => {
  return (
    <View className="mb-6">
      <Text className="font-medium mb-2">Plant Image</Text>
      <View
        className="border border-gray/20 rounded-xl items-center justify-center relative bg-white"
        style={{ width: "100%", height: 192 }}
      >
        {value ? (
          <>
            <Image uri={value} styles="w-full h-full rounded-xl" />

            <TouchableOpacity
              onPress={() => onChange("")}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-2"
            >
              <Icon name="X" size={20} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <View className="flex-1 items-center justify-center gap-4">
            <Text className="text-gray text-center mb-2">
              Choose how to add your plant image
            </Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={handleImagePicker}
                className="items-center gap-2"
              >
                <View className="bg-primary/10 items-center justify-center rounded-full">
                  <Icon name="Image" size={24} color="#16A34A" />
                </View>

                <Text className="text-primary text-sm">Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleTakePhoto}
                className="items-center gap-2"
              >
                <View className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Camera" size={24} color="#16A34A" />
                </View>
                <Text className="text-primary text-sm">Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {errors.imageUrl && (
        <Text className="text-red-500 text-sm mt-1">
          {errors.imageUrl.message as string}
        </Text>
      )}
    </View>
  );
};
