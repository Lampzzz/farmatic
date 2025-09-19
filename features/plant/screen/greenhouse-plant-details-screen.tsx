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
import { deletePlant, getPlant } from "@/services/firebase/firestore/plants";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import { useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { Controller } from "../sections/controller";
import { EnvironmentalStatus } from "../sections/environmental-status";
import { PlantInfoSection } from "../sections/plant-info";

export const GreenhousePlantDetailsScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const { adminId, user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { data: plant, loading } = useFetch(() => getPlant(id as string), []);
  const { data: analysisData } = useRealTimeFetch("analyses", [
    where("adminId", "==", adminId || ""),
    where("plantId", "==", id || ""),
    orderBy("createdAt", "desc"),
    limit(1),
  ]);

  if (loading) return <Loader />;
  if (!plant) return null;

  const confirmDelete = () => {
    if (isAnalyzing) return;
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
              router.back();
              const result = await deletePlant(plant.id as string);

              if (!result.isSuccess)
                return Alert.alert("Error", result.message);
            } catch (e: any) {
              Alert.alert("Error", e?.message || "Failed to delete plant");
            }
          },
        },
      ]
    );
  };

  const handleSelectImage = async (mode: "camera" | "gallery") => {
    try {
      setIsAnalyzing(true);
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
        zoneNumber: plant?.zoneNumber,
        plantSpot: plant?.plantSpot,
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not analyze the image.");
    } finally {
      setIsAnalyzing(false);
      router.push({
        pathname: "/plant/analyze-plant-history",
        params: {
          plantId: plant.id,
          adminId,
        },
      });
      ToastAndroid.show("Plant analyzed successfully", ToastAndroid.SHORT);
    }
  };

  const handlePress = async () => {
    if (isAnalyzing) return;
    return Alert.alert(
      "Upload Plant Photo",
      "Select a source to analyze your plant",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Gallery",
          style: "default",
          onPress: async () => await handleSelectImage("gallery"),
        },
        {
          text: "Camera",
          style: "default",
          onPress: async () => await handleSelectImage("camera"),
        },
      ]
    );
  };

  return (
    <MainLayout>
      <Header
        title="Plant Details"
        description="View your plant information"
        showBackButton
        rightIcon="Trash"
        onRightIconPress={confirmDelete}
      />

      <ScreenContainer scrollable>
        <Image
          uri={analysisData?.[0]?.analysis?.imageUrl || plant?.imageUrl}
          styles="mb-6 rounded-xl"
          height={250}
        />
        <PlantInfoSection
          styles="mb-6"
          plant={{
            ...plant,
            healthStatus: analysisData?.[0]?.analysis?.healthStatus,
            description: analysisData?.[0]?.analysis?.description,
          }}
        />
        <EnvironmentalStatus
          zoneNumber={plant?.zoneNumber}
          plantSpot={plant?.plantSpot}
        />
        <Controller
          zoneNumber={plant?.zoneNumber}
          plantSpot={plant?.plantSpot}
        />
        <Button
          label="Analyze Plant"
          onPress={handlePress}
          styles="mb-2"
          isLoading={isAnalyzing}
        />
        <Button
          label="Analyze History"
          variant="outline"
          onPress={() =>
            router.push({
              pathname: "/plant/analyze-plant-history",
              params: {
                plantId: plant.id,
                adminId,
              },
            })
          }
          isLoading={isAnalyzing}
        />
      </ScreenContainer>
    </MainLayout>
  );
};
