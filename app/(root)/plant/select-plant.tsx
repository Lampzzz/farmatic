import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function SelectPlantScreen() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState<PlantLibrary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantLibrary | null>(null);

  const fetchPlants = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        setLoading(true);
        const response = await getPlants(page, 10);

        if (append) {
          setPlants((prev) => [...prev, ...response.data]);
        } else {
          setPlants(response.data);
        }

        if (response.meta && response.meta.last_page) {
          setHasMore(page < response.meta.last_page);
        } else {
          setHasMore(response.data.length === 10);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchPlants(1, false);
  }, [fetchPlants]);

  // Filter plants based on search
  const filteredPlants = useMemo(() => {
    if (!search.trim()) return plants;
    return plants.filter(
      (plant) =>
        plant.common_name?.toLowerCase().includes(search.toLowerCase()) ||
        plant.scientific_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [plants, search]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPlants(nextPage, true);
    }
  }, [loading, hasMore, currentPage, fetchPlants]);

  const handlePlantSelect = (plant: PlantLibrary) => {
    setSelectedPlant(plant);
  };

  const handleContinue = () => {
    if (selectedPlant) {
      // Navigate to add-plant with selected plant data
      router.push({
        pathname: "/plant/add-plant",
        params: {
          selectedPlantId: selectedPlant.id.toString(),
          selectedPlantName: selectedPlant.common_name,
          selectedPlantImage: selectedPlant.default_image?.thumbnail || "",
        },
      });
    }
  };

  const handleSkip = () => {
    // Navigate to add-plant without selected plant
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
        isHasBack
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

        {/* {selectedPlant && (
          <View className="bg-primary/10 p-4 rounded-xl mb-6">
            <Text className="font-semibold text-primary mb-2">
              Selected Plant:
            </Text>
            <View className="flex-row items-center gap-3">
              <PlantCard
                image={
                  selectedPlant.default_image?.thumbnail ||
                  "https://via.placeholder.com/150"
                }
                title={selectedPlant.common_name}
                onPress={() => setSelectedPlant(null)}
              />
              <View className="flex-1">
                <Text className="font-medium">{selectedPlant.common_name}</Text>
                <Text className="text-gray text-sm">
                  {selectedPlant.scientific_name}
                </Text>
              </View>
            </View>
          </View>
        )} */}

        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <PlantCard
              key={item.id}
              image={
                item.default_image?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              title={item.common_name || ""}
              onPress={() => handlePlantSelect(item)}
              isSelected={selectedPlant?.id === item.id}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </MainLayout>
  );
}
