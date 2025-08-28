import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");

  const { data, error, loading, refetch } = useFetch(() => getPlants(), []);

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
          className="p-6"
          data={data || []}
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
