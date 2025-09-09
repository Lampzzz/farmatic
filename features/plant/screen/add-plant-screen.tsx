import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { addPlant } from "@/services/firebase/plant";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import dayjs from "dayjs";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, ToastAndroid, View } from "react-native";
import { ImagePicker } from "../sections/image-picker";
import { ZoneSelector } from "../sections/zone-selector";

interface Props {
  selectedPlantId?: string;
  selectedPlantName?: string;
  selectedPlantImage?: string;
}

export const AddPlantScreen = (params: Props) => {
  const { userId } = useAuth();

  const hasSelectedPlant =
    params.selectedPlantId &&
    params.selectedPlantName &&
    params.selectedPlantImage;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: hasSelectedPlant ? (params.selectedPlantName as string) : "",
      imageUrl: hasSelectedPlant ? (params.selectedPlantImage as string) : "",
      imageType: "",
      datePlanted: dayjs().format("MMMM DD, YYYY"),
      zoneNumber: 1,
    },
  });

  const handleImagePicker = async () => {
    try {
      const result = await pickImage();

      if (result) {
        const type = getImageType(result.uri);
        setValue("imageType", type);
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
        const type = getImageType(result.uri);
        setValue("imageType", type);
        setValue("imageUrl", result.uri);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const onSubmit = async (data: {
    name: string;
    imageUrl: string;
    imageType: string;
    datePlanted: string;
    zoneNumber: number;
  }) => {
    try {
      const result = await addPlant(data, userId);

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
            <ImagePicker
              value={value}
              onChange={onChange}
              handleImagePicker={handleImagePicker}
              handleTakePhoto={handleTakePhoto}
              errors={errors}
            />
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
          name="zoneNumber"
          render={({ field: { onChange, value } }) => (
            <ZoneSelector onChange={onChange} value={value} />
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
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </View>
    </MainLayout>
  );
};
