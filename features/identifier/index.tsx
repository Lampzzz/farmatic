import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { router } from "expo-router";
import { Alert, View } from "react-native";
import { HowItWorks } from "./sections/how-it-works";
import { IdentifyMethod } from "./sections/identify-method";

export default function IdentifierScreen() {
  const handleSelectImage = async (mode: "camera" | "gallery") => {
    try {
      const image = mode === "camera" ? await takePhoto() : await pickImage();

      if (!image) return;

      const type = getImageType(image.uri);

      router.push({
        pathname: "/plant/analyze-plant",
        params: {
          imageUri: image.uri,
          type,
        },
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    }
  };

  return (
    <MainLayout>
      <Header
        title="Plant Identifier"
        description="Identify plants by taking a photo or uploading an image"
      />
      <View className="p-6">
        <IdentifyMethod
          onTakePicture={() => handleSelectImage("camera")}
          onUploadImage={() => handleSelectImage("gallery")}
        />
        <HowItWorks />
      </View>
    </MainLayout>
  );
}
