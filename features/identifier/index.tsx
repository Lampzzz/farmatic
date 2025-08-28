import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { View } from "react-native";
import { IdentifyMethod } from "./components/identify-method";
import { HowItWorks } from "./sections/how-it-works";

export default function IdentifierScreen() {
  return (
    <MainLayout>
      <Header
        title="Plant Identifier"
        description="Identify plants by taking a photo or uploading an image"
      />
      <View className="p-6">
        <IdentifyMethod onTakePicture={() => {}} onUploadImage={() => {}} />
        <HowItWorks />
      </View>
    </MainLayout>
  );
}
