import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { analyzePlantImage } from "@/services/firebase/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { Alert, View } from "react-native";
import { HowItWorks } from "./sections/how-it-works";
import { IdentifyMethod } from "./sections/identify-method";

export default function IdentifierScreen() {
  const handleUploadImage = async () => {
    try {
      const image = await pickImage();
      if (!image) return;

      const type = getImageType(image.uri);
      await analyzePlantImage(image.uri, type);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    }
  };

  const handleTakePicture = async () => {
    try {
      const image = await takePhoto();
      if (!image) return;

      const type = getImageType(image.uri);
      await analyzePlantImage(image.uri, type);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the photo.");
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
          onTakePicture={handleTakePicture}
          onUploadImage={handleUploadImage}
        />
        <HowItWorks />
      </View>
    </MainLayout>
  );
}
