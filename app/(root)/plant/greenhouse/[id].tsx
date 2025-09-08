import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { ControllerCard } from "@/components/greenhouse/controller-card";
import { StatusCard } from "@/components/greenhouse/status-card";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { Modal } from "@/components/modal";
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
  const { userId } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedController, setSelectedController] = useState<
    "fan" | "light" | "sprinkler" | null
  >(null);

  const openModal = (controller: "fan" | "light" | "sprinkler") => {
    setSelectedController(controller);
    setIsModalVisible(true);
  };

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

      if (result) {
        Alert.alert("AI Insights", JSON.stringify(result, null, 2));
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
    <>
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
                  {plant.datePlanted || "Not specified"}
                </Text>
              </View>
              <View className="h-px bg-gray-100 mb-3" />
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Status</Text>
                <Text className="text-gray-800 font-medium ">
                  {plant.analysis?.healthStatus || "Not specified"}
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
                title="Fan"
                icon="Fan"
                value={controller?.[0]?.fan}
                onToggle={() =>
                  handleToggleController(controller?.[0]?.fan, "fan")
                }
                onSettings={() => openModal("fan")}
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
                onSettings={() => openModal("light")}
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
                  handleToggleController(
                    controller?.[0]?.sprinkler,
                    "sprinkler"
                  )
                }
                onSettings={() => openModal("sprinkler")}
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
          <Button label="Analyze Plant" onPress={analyzePlant} />
        </ScrollView>
      </MainLayout>

      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <View className="bg-white rounded-xl p-4 shadow-md">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            {selectedController === "fan" && "Fan Threshold Settings"}
            {selectedController === "light" && "Light Threshold Settings"}
            {selectedController === "sprinkler" &&
              "Sprinkler Threshold Settings"}
          </Text>

          {selectedController === "fan" && (
            <>
              <FormInput
                label="Temperature Threshold (°C)"
                placeholder="Set temperature threshold"
                iconName="Thermometer"
                value={plant.analysis?.thresholds?.fan?.temperature || ""}
                onChangeText={() => {}}
              />
              <FormInput
                label="Humidity Threshold (%)"
                placeholder="Set humidity threshold"
                iconName="Droplet"
                value={plant.analysis?.thresholds?.fan?.humidity || ""}
                onChangeText={() => {}}
              />
            </>
          )}

          {selectedController === "light" && (
            <>
              <FormInput
                label="Light Level"
                placeholder="Set light level threshold"
                iconName="Sun"
                value={plant.analysis?.thresholds?.light?.intensity || ""}
                onChangeText={() => {}}
              />
            </>
          )}

          {selectedController === "sprinkler" && (
            <>
              <FormInput
                label="Soil Moisture Threshold (%)"
                placeholder="Set soil moisture threshold"
                iconName="Droplet"
                value={
                  plant.analysis?.thresholds?.sprinkler?.soil_moisture || ""
                }
                onChangeText={() => {}}
              />
            </>
          )}

          <View className="mt-4 flex-row gap-2 justify-end">
            <Button
              label="Cancel"
              onPress={() => setIsModalVisible(false)}
              variant="outline"
              textSize="text-sm"
              buttonHeight={40}
              styles="w-20"
            />
            <Button
              label="Save"
              onPress={() => {}}
              variant="primary"
              textSize="text-sm"
              buttonHeight={40}
              styles="w-20"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
