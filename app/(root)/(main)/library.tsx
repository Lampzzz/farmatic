import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, error, loading } = useFetch(
    () => getPlants(debouncedSearch),
    [debouncedSearch]
  );

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
        </View>
      ) : (
        <FlatList
          // className="px-6 pt-6"
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{
            gap: 12,
            padding: 20,
          }}
          renderItem={({ item }) => (
            <PlantCard
              key={item.id}
              image={
                item.default_image?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              commonName={item.common_name || ""}
              scientificName={item.scientific_name || ""}
              onPress={() => router.push(`/plant/library/${item.id}`)}
            />
          )}
        />
      )}
    </MainLayout>
  );
}
