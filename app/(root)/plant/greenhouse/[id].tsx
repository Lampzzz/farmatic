import { Button } from "@/components/form/button";
import { ControllerCard } from "@/components/greenhouse/controller-card";
import { StatusCard } from "@/components/greenhouse/status-card";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { usePlantById } from "@/hooks/use-plants";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { toggleController } from "@/services/firebase/controller";
import { analyzePlantHealth, deletePlant } from "@/services/firebase/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { limit, where } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { plant, loading, error } = usePlantById(id as string);
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInfo, setAiInfo] = useState<any>(null);

  const userId = user?.isAdmin ? user.id : user?.adminId;

  const { data: controller } = useRealTimeFetch("controllers", [
    where("userId", "==", userId || ""),
    where("zoneNumber", "==", plant?.zoneNumber || ""),
    limit(1),
  ]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="mt-4 text-gray-600">Loading plant details...</Text>
      </View>
    );
  }

  if (error || !plant) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-6">
        <Icon name="House" size={64} color="#ef4444" />
        <Text className="mt-4 text-xl font-semibold text-gray-800 text-center">
          Plant Not Found
        </Text>
        <Text className="mt-2 text-gray-600 text-center">
          {error
            ? "Something went wrong loading the plant."
            : "The plant you're looking for doesn't exist."}
        </Text>
        <View className="mt-6">
          <Text
            className="text-emerald-600 font-medium text-center"
            onPress={() => router.back()}
          >
            Go Back
          </Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "growing":
        return "bg-blue-100 text-blue-800";
      case "needs attention":
        return "bg-yellow-100 text-yellow-800";
      case "sick":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              setIsDeleting(true);
              const result = await deletePlant(plant.id as string);
              setIsDeleting(false);
              if (result.isSuccess) {
                router.back();
              } else {
                Alert.alert("Error", result.message);
              }
            } catch (e: any) {
              setIsDeleting(false);
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

      if (result) {
        setAiInfo(result);
      }
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

  return (
    <MainLayout>
      <Header
        title="Plant Details"
        description="View your plant information"
        showBackButton
        rightIcon="Trash"
        onRightIconPress={confirmDelete}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View className="relative h-80 rounded-xl overflow-hidden mb-6 shadow-md">
          <Image
            source={{ uri: plant.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Plant Info
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-md">
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Plant name</Text>
              <Text className="text-gray-800 font-medium">{plant.name}</Text>
            </View>
            <View className="h-px bg-gray-100 mb-3" />
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Date Planted</Text>
              <Text className="text-gray-800 font-medium">
                {formatDate(plant.datePlanted) || "Not specified"}
              </Text>
            </View>
            <View className="h-px bg-gray-100 mb-3" />
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Status</Text>
              <Text className="text-gray-800 font-medium capitalize">
                {plant.status || "Not specified"}
              </Text>
            </View>
          </View>
        </View>
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Environmental Status
          </Text>
          <View className="flex-row gap-2">
            <StatusCard
              title="Temp."
              value="37°C"
              icon="Thermometer"
              iconColor="green"
            />
            <StatusCard
              title="Humidity"
              value="21%"
              icon="Droplet"
              iconColor="blue"
            />
            <StatusCard
              title="Soil Moisture"
              value="48%"
              icon="Sun"
              iconColor="orange"
            />
          </View>
        </View>
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Controller
          </Text>
          <View>
            <ControllerCard
              title="Ventilation Fan"
              icon="Fan"
              value={controller?.[0]?.fan}
              onToggle={() =>
                handleToggleController(controller?.[0]?.fan, "fan")
              }
              colorScheme={{
                iconBgClass: "bg-green-100",
                iconColor: "#059669",
                switchOnColor: "#10b981",
                statusBgClass: "bg-green-50",
                statusTextClass: "text-green-700",
              }}
            />
            <ControllerCard
              title="Light"
              icon="Lightbulb"
              value={controller?.[0]?.light}
              onToggle={() =>
                handleToggleController(controller?.[0]?.light, "light")
              }
              colorScheme={{
                iconBgClass: "bg-yellow-100",
                iconColor: "#f59e0b",
                switchOnColor: "#f59e0b",
                statusBgClass: "bg-yellow-50",
                statusTextClass: "text-yellow-700",
              }}
            />
            <ControllerCard
              title="Sprinkler"
              icon="Droplet"
              value={controller?.[0]?.sprinkler}
              onToggle={() =>
                handleToggleController(controller?.[0]?.sprinkler, "sprinkler")
              }
              colorScheme={{
                iconBgClass: "bg-blue-100",
                iconColor: "#60a5fa",
                switchOnColor: "#60a5fa",
                statusBgClass: "bg-blue-50",
                statusTextClass: "text-blue-700",
              }}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            AI Insights
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-md">
            {aiLoading ? (
              <Text className="text-gray-500">Fetching AI info...</Text>
            ) : aiInfo ? (
              <Text className="mt-2 text-gray-700 leading-relaxed">
                {aiInfo}
              </Text>
            ) : (
              <Text className="text-gray-500">No AI info available.</Text>
            )}
          </View>
        </View>
        <Button label="Analyze Plant" onPress={analyzePlant} />
      </ScrollView>
    </MainLayout>
  );
}
