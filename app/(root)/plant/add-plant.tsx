import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { addPlant } from "@/services/firebase/plant";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      datePlanted: "",
      imageUrl:
        "https://perenual.com/storage/species_image/682_allium_sativum_inchelium_red/medium/11301560876_8e5813f1a9_b.jpg",
    },
  });

  const onSubmit = async (data: {
    name: string;
    imageUrl: string;
    datePlanted: string;
  }) => {
    try {
      await addPlant(data, user?.uid!);
      router.back();
      ToastAndroid.show("Plant added successfully", ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Add Plant"
        description="Add a new plant to your greenhouse"
        isHasBack
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
                <View className="h-48 border border-gray/20 rounded-xl items-center justify-center">
                  <Image
                    source={{ uri: value }}
                    className="w-full h-48 rounded-xl"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => onChange("")}
                    className="absolute top-2 right-2"
                  >
                    <Icon name="X" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    const result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.Images,
                      allowsEditing: true,
                      aspect: [4, 3],
                      quality: 1,
                    });

                    if (!result.canceled) {
                      onChange(result.assets[0].uri);
                    }
                  }}
                >
                  <View className="h-48 border border-gray/20 rounded-xl items-center justify-center gap-2">
                    <Icon name="Camera" size={40} color="#16A34A" />
                    <Text className="text-gray">Upload from library</Text>
                  </View>
                </TouchableOpacity>
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
        <Button
          label="Save Plant"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </View>
    </MainLayout>
  );
}
