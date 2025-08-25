import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState<PlantLibrary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = async (query: string = "") => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPlants(1, 30, query); // fetch only first page
      setPlants(response.data || []);
    } catch (err: any) {
      console.error("Error fetching plants:", err);
      setError("Failed to load plants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <MainLayout>
      <Header title="Plant Library" description="Browse our plant library">
        <FormInput
          placeholder="Search for a plant"
          value={search}
          onChangeText={setSearch}
          iconName="Search"
        />
      </Header>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-center mb-2">{error}</Text>
          <Text
            className="text-green-600 underline"
            onPress={() => fetchPlants(search)}
          >
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          className="p-6"
          data={plants}
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
              onPress={() => router.push(`/plant/library/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <View className="py-8 items-center">
              <Text className="text-gray-500 text-center">No plants found</Text>
            </View>
          }
        />
      )}
    </MainLayout>
  );
}
