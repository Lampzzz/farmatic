import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { SelectPlantList } from "@/features/plant/sections/select-plant-list";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export const SelectPlantScreen = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [selectedPlant, setSelectedPlant] = useState<PlantLibrary | null>(null);

  const { data, loading } = useFetch(
    () => getPlants(debouncedSearch),
    [debouncedSearch]
  );
  const handlePlantSelect = (plant: any) => {
    setSelectedPlant(plant);
  };

  const handleContinue = () => {
    if (selectedPlant) {
      router.push({
        pathname: "/plant/add-plant",
        params: {
          selectedPlantId: selectedPlant.id.toString(),
          selectedPlantName: selectedPlant.scientific_name,
          selectedPlantImage: selectedPlant.default_image?.thumbnail || "",
        },
      });
    }
  };

  const handleSkip = () => {
    router.push("/plant/add-plant");
  };

  return (
    <MainLayout>
      <Header
        title="Select Plant"
        description="Choose a plant from our library or add manually"
        showBackButton
      />

      <View className="flex-row gap-4 px-6 my-6">
        <Button
          label="Skip & Add Manually"
          onPress={handleSkip}
          variant="outline"
          styles="flex-1"
          textSize="text-sm"
        />
        <Button
          label="Continue with Selected"
          onPress={handleContinue}
          disabled={!selectedPlant}
          styles="flex-1"
          textSize="text-sm"
        />
      </View>

      <View className="px-6 pt-6">
        <FormInput
          placeholder="Search for a plant"
          value={search}
          onChangeText={setSearch}
          iconName="Search"
          styles="mb-6"
        />
      </View>

      <SelectPlantList
        data={data}
        loading={loading}
        handlePlantSelect={handlePlantSelect}
        selectedPlant={selectedPlant}
      />
    </MainLayout>
  );
};
