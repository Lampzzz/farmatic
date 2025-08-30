import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { Alert, View } from "react-native";
import { IdentifyMethod } from "./components/identify-method";
import { HowItWorks } from "./sections/how-it-works";

import { analyzePlantImage } from "@/services/firebase/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";

export default function IdentifierScreen() {
  const handleUploadImage = async () => {
    try {
      const image = await pickImage();
      if (!image) return;

      const type = getImageType(image.uri);
      const result = await analyzePlantImage(image.uri, type);

      Alert.alert("Plant Analysis", JSON.stringify(result, null, 2));
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
      const result = await analyzePlantImage(image.uri, type);

      Alert.alert("Plant Analysis", JSON.stringify(result, null, 2));
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
