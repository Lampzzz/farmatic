import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function SelectPlantScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [selectedPlant, setSelectedPlant] = useState<PlantLibrary | null>(null);

  const { data, error, loading } = useFetch(
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

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  };

  return (
    <MainLayout>
      <Header
        title="Select Plant"
        description="Choose a plant from our library or add manually"
        showBackButton
      />

      <View className="flex-row gap-3 px-6 mt-6">
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

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <PlantCard
            image={item.default_image?.thumbnail}
            name={item.scientific_name}
            onPress={() => handlePlantSelect(item)}
            isSelected={selectedPlant?.id === item.id}
          />
        )}
      />
    </MainLayout>
  );
}
