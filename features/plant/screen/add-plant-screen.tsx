import { Button } from "@/components/form/button";
import { DatePicker } from "@/components/form/date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { createPlant } from "@/services/firebase/firestore/plants";
import { getPlantAvailableSpot } from "@/services/firebase/firestore/plants/plant-available-spot";
import { getImageType, pickImage, takePhoto } from "@/utils/image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ToastAndroid } from "react-native";
import { ImagePicker } from "../sections/image-picker";

interface Props {
  selectedPlantId?: string;
  selectedPlantName?: string;
  selectedPlantImage?: string;
}

interface AvailableSpot {
  label: string;
  value: number;
}

const zones = [
  { label: "Zone 1", value: 1 },
  { label: "Zone 2", value: 2 },
];

export const AddPlantScreen = (selectedPlant: Props) => {
  const { adminId } = useAuth();
  const [availableSpots, setAvailableSpots] = useState<AvailableSpot[]>([]);

  const hasSelectedPlant =
    selectedPlant.selectedPlantId &&
    selectedPlant.selectedPlantName &&
    selectedPlant.selectedPlantImage;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: hasSelectedPlant ? (selectedPlant.selectedPlantName as string) : "",
      imageUrl: hasSelectedPlant
        ? (selectedPlant.selectedPlantImage as string)
        : "",
      imageType: "",
      datePlanted: new Date(),
      zoneNumber: 1,
      plantSpot: 1,
    },
  });

  const zoneNumber = watch("zoneNumber");

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      const result = await getPlantAvailableSpot({
        adminId,
        zoneNumber,
      });

      if (result.length === 0) {
        setAvailableSpots([]);
        return;
      }

      const availableSpots = result.map((spot: number) => ({
        label: `Spot ${spot}`,
        value: spot,
      }));

      setAvailableSpots(availableSpots);
      setValue("plantSpot", availableSpots[0].value);
    };
    fetchAvailableSpots();
  }, [adminId, zoneNumber]);

  const handleSelectOrCaptureImage = async (mode: "upload" | "capture") => {
    try {
      const result = mode === "upload" ? await pickImage() : await takePhoto();

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
    datePlanted: Date;
    zoneNumber: number;
    plantSpot: number;
  }) => {
    try {
      const result = await createPlant(data, adminId);

      if (!result.isSuccess) return Alert.alert("Error", result.message);

      ToastAndroid.show("Plant added successfully", ToastAndroid.SHORT);
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

      <ScreenContainer scrollable>
        <Controller
          control={control}
          name="imageUrl"
          rules={{ required: "Required" }}
          render={({ field: { value, onChange } }) => (
            <ImagePicker
              value={value}
              onChange={onChange}
              handleImagePicker={() => handleSelectOrCaptureImage("upload")}
              handleTakePhoto={() => handleSelectOrCaptureImage("capture")}
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
            <FormSelect
              label="Zone Number"
              placeholder="Select zone number"
              options={zones}
              onChange={onChange}
              value={value}
              styles="mb-6"
              iconName="Layers2"
            />
          )}
        />
        <Controller
          control={control}
          name="plantSpot"
          render={({ field: { onChange, value } }) => (
            <FormSelect
              label="Plant Spot"
              placeholder="Select plant spot"
              options={availableSpots}
              onChange={onChange}
              value={value}
              styles="mb-6"
              iconName="MapPin"
            />
          )}
        />
        <Controller
          control={control}
          name="datePlanted"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Date Planted"
              handleChange={onChange}
              value={value as Date}
              styles="mb-6"
            />
          )}
        />
        <Button
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </ScreenContainer>
    </MainLayout>
  );
};
