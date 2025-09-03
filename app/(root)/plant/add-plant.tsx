import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { addPlant } from "@/services/firebase/plant";
import { pickImage, takePhoto } from "@/utils/image";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddPlantScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams();

  const hasSelectedPlant =
    params.selectedPlantId &&
    params.selectedPlantName &&
    params.selectedPlantImage;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: hasSelectedPlant ? (params.selectedPlantName as string) : "",
      imageUrl: hasSelectedPlant ? (params.selectedPlantImage as string) : "",
      datePlanted: "",
      zoneNumber: 1,
    },
  });

  const handleImagePicker = async () => {
    try {
      const result = await pickImage();
      if (result) {
        setValue("imageUrl", result.uri);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await takePhoto();
      if (result) {
        setValue("imageUrl", result.uri);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const onSubmit = async (data: {
    name: string;
    imageUrl: string;
    datePlanted: string;
    zoneNumber: number;
  }) => {
    try {
      const creatorId = user.isAdmin ? user.id : user.adminId;

      const result = await addPlant(data, creatorId);

      if (!result.isSuccess) {
        Alert.alert("Error", result.message);
      }

      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Add Plant"
        description={
          hasSelectedPlant
            ? "Add selected plant to your greenhouse"
            : "Add a new plant to your greenhouse"
        }
        showBackButton
      />

      <View className="p-6">
        <Controller
          control={control}
          name="imageUrl"
          rules={{ required: "Required" }}
          render={({ field: { value, onChange } }) => (
            <View className="bg-white mb-6">
              <Text className="font-medium mb-2">Plant Image</Text>
              {value ? (
                <View className="h-48 border border-gray/20 rounded-xl items-center justify-center relative">
                  <Image
                    source={{ uri: value }}
                    className="w-full h-48 rounded-xl"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => onChange("")}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                  >
                    <Icon name="X" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="h-48 border border-gray/20 rounded-xl">
                  <View className="flex-1 items-center justify-center gap-4">
                    <Text className="text-gray text-center mb-2">
                      Choose how to add your plant image
                    </Text>
                    <View className="flex-row gap-4">
                      <TouchableOpacity
                        onPress={handleImagePicker}
                        className="items-center gap-2"
                      >
                        <View className="bg-primary/10 p-3 rounded-full">
                          <Icon name="Image" size={24} color="#16A34A" />
                        </View>
                        <Text className="text-primary text-sm">Gallery</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleTakePhoto}
                        className="items-center gap-2"
                      >
                        <View className="bg-primary/10 p-3 rounded-full">
                          <Icon name="Camera" size={24} color="#16A34A" />
                        </View>
                        <Text className="text-primary text-sm">Camera</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {errors.imageUrl && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.imageUrl.message as string}
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Plant name"
              placeholder="Enter plant name"
              value={value}
              onChangeText={onChange}
              iconName="Sprout"
              styles="mb-6"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="datePlanted"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Date Planted"
              placeholder="MM-DD-YYYY"
              value={value}
              onChangeText={onChange}
              iconName="Calendar"
              styles="mb-6"
              error={errors.datePlanted?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="zoneNumber"
          render={({ field: { onChange, value } }) => (
            <View className="bg-white mb-6">
              <Text className="font-medium mb-2">Zone</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => onChange(1)}
                  className={`flex-1 items-center justify-center px-4 py-3 rounded-lg border ${value === 1 ? "bg-primary border-primary" : "bg-gray/10 border-gray/20"}`}
                >
                  <Text
                    className={`${value === 1 ? "text-white" : "text-gray-700"}`}
                  >
                    Zone 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChange(2)}
                  className={`flex-1 items-center justify-center px-4 py-3 rounded-lg border ${value === 2 ? "bg-primary border-primary" : "bg-gray/10 border-gray/20"}`}
                >
                  <Text
                    className={`${value === 2 ? "text-white" : "text-gray-700"}`}
                  >
                    Zone 2
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Button
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </View>
    </MainLayout>
  );
}
