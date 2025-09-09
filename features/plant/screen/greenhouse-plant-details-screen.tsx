import { Button } from "@/components/form/button";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { toggleController } from "@/services/firebase/controller";
import {
  analyzePlantHealth,
  deletePlant,
  getPlantById,
} from "@/services/firebase/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useRouter } from "expo-router";
import { limit, where } from "firebase/firestore";
import { useState } from "react";
import { Alert, Image, View } from "react-native";
import { Controller, ControllerModal } from "../sections/controller";
import { EnvironmentalStatus } from "../sections/environmental-status";
import { PlantInfoSection } from "../sections/plant-info";

export const GreenhousePlantDetailsScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: plant } = useFetch(() => getPlantById(id as string), []);

  const [selectedController, setSelectedController] = useState<
    "fan" | "light" | "sprinkler" | null
  >(null);

  const openModal = (name: "fan" | "light" | "sprinkler" | null) => {
    setSelectedController(name);
    setIsModalVisible(true);
  };

  const { data: controller } = useRealTimeFetch("controllers", [
    where("userId", "==", userId || ""),
    where("zoneNumber", "==", plant?.zoneNumber || ""),
    limit(1),
  ]);

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
      const result = await analyzePlantHealth(plant.name, image.uri, type);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    }
  };

  const analyzePlant = async () => {
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

  if (!plant) return null;

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
          <View className="relative h-80 rounded-xl overflow-hidden mb-6 shadow-md">
            <Image
              source={{ uri: plant.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <PlantInfoSection plant={plant} />
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
          <Button label="Analyze Plant" onPress={analyzePlant} />
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
