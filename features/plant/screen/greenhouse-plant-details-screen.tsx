import { Button } from "@/components/form/button";
import { Header } from "@/components/header";
import { Image } from "@/components/image";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { analyzePlant } from "@/services/firebase/ai";
import { toggleController } from "@/services/firebase/controller";
import { deletePlant, getPlant } from "@/services/firebase/firestore/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useRouter } from "expo-router";
import { limit, where } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { Controller, ControllerModal } from "../sections/controller";
import { EnvironmentalStatus } from "../sections/environmental-status";
import { PlantInfoSection } from "../sections/plant-info";

export const GreenhousePlantDetailsScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const { adminId, user } = useAuth();
  const { data: plant, loading } = useFetch(() => getPlant(id as string), []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: controller } = useRealTimeFetch("controllers", [
    where("userId", "==", adminId || ""),
    where("zoneNumber", "==", plant?.zoneNumber || ""),
    limit(1),
  ]);

  if (loading) return <Loader />;
  if (!plant) return null;

  const confirmDelete = () => {
    if (!plant?.id) return;
    Alert.alert(
      "Delete Plant",
      `Are you sure you want to delete "${plant.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deletePlant(plant.id as string);
              if (result.isSuccess) {
                router.back();
              } else {
                Alert.alert("Error", result.message);
              }
            } catch (e: any) {
              Alert.alert("Error", e?.message || "Failed to delete plant");
            }
          },
        },
      ]
    );
  };

  const handleToggleController = (value: boolean, name: string) => {
    toggleController(controller?.[0]?.id, value ? false : true, name);
  };

  const handleSelectImage = async (mode: "camera" | "gallery") => {
    try {
      const image = mode === "camera" ? await takePhoto() : await pickImage();
      if (!image) return;

      const type = getImageType(image.uri);

      await analyzePlant({
        plantId: plant.id as string,
        analyzerId: user?.id as string,
        adminId: adminId as string,
        plantName: plant.name,
        imageUri: image.uri,
        imageType: type,
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    }
  };

  const handlePress = async () => {
    return Alert.alert(
      "Upload Plant Photo",
      "Select a source to analyze your plant",
      [
        {
          text: "Gallery",
          style: "cancel",
          onPress: async () => await handleSelectImage("gallery"),
        },
        {
          text: "Camera",
          style: "cancel",
          onPress: async () => await handleSelectImage("camera"),
        },
      ]
    );
  };

  return (
    <>
      <MainLayout>
        <Header
          title="Plant Details"
          description="View your plant information"
          showBackButton
          rightIcon="Trash"
          onRightIconPress={confirmDelete}
        />

        <ScreenContainer scrollable>
          <Image uri={plant?.imageUrl} contentFit="cover" styles="h-80 mb-6" />
          <PlantInfoSection styles="mb-6" plant={plant} />
          <EnvironmentalStatus
            temp={plant.analysis?.temperature}
            humidity={plant.analysis?.humidity}
            soilMoisture={plant.analysis?.soilMoisture}
          />
          <Controller
            controller={controller}
            handleToggleController={handleToggleController}
            openModal={() => {}}
          />
          <Button label="Analyze Plant" onPress={handlePress} />
        </ScreenContainer>
      </MainLayout>

      <ControllerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedController={""}
        plant={plant}
      />
    </>
  );
};
