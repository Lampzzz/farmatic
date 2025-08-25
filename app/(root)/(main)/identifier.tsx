import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { Text, TouchableOpacity, View } from "react-native";

export default function IdentifierScreen() {
  return (
    <MainLayout>
      <Header
        title="Plant Identifier"
        description="Identify plants by taking a photo or uploading an image"
      />
      <View className="p-6">
        <View className="bg-white p-6 rounded-lg mb-6">
          <Text className="text-center text-primary text-xl font-bold mb-6">
            How would you like to identify your plant?
          </Text>

          <View className="flex-row items-center justify-center gap-4 mb-4">
            <TouchableOpacity className="flex-1 bg-green-50 p-4 rounded-lg items-center">
              <Icon name="Camera" size={32} color="#16A34A" />
              <Text className="text-primary font-semibold mt-2">
                Take Picture
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-green-50 p-4 rounded-lg items-center">
              <Icon name="Image" size={32} color="#16A34A" />
              <Text className="text-primary font-semibold mt-2">
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-gray text-sm">
            Snap a photo of your plant or upload an existing image for instant
            identification
          </Text>
        </View>

        <View className="bg-white p-6 rounded-lg">
          <Text className="text-primary text-xl font-bold mb-4">
            How It Works
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">1</Text>
              </View>
              <Text className="text-gray flex-1">
                Take a clear photo of your plant or upload an existing image
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">2</Text>
              </View>
              <Text className="text-gray flex-1">
                Our AI will analyze the image and identify the plant species
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">3</Text>
              </View>
              <Text className="text-gray flex-1">
                Get detailed care information and tips for your plant
              </Text>
            </View>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
