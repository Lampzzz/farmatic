import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { useAuth } from "@/hooks/use-auth";
import { usePlantsRealtime } from "@/hooks/use-plants";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const { plants, loading, error } = usePlantsRealtime(user?.uid);

  const MAX_ITEMS = 6;
  const placeholdersCount = Math.max(0, MAX_ITEMS - plants.length);

  const listData = [
    ...plants.map((plant) => ({ ...plant, __type: "plant" }) as const),
    ...Array.from({ length: placeholdersCount }).map(
      (_, index) => ({ id: `add-${index}`, __type: "add" }) as const
    ),
  ];

  if (loading) {
    return (
      <MainLayout>
        <Header title="Farmatic" description="Greenhouse Dashboard"></Header>
        <View className="p-6">
          <View className="mb-6">
            <Text className="text-2xl font-bold">Greenhouse Plants</Text>
          </View>
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#16A34A" />
            <Text className="text-gray-600 mt-4">Loading your plants...</Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Header title="Farmatic" description="Greenhouse Dashboard"></Header>
        <View className="p-6">
          <View className="mb-6">
            <Text className="text-2xl font-bold">Greenhouse Plants</Text>
          </View>
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-red-600 text-center">
              Error loading plants: {error.message}
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header title="Farmatic" description="Greenhouse Dashboard"></Header>

      <View className="p-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
        </View>

        <FlatList
          data={listData}
          keyExtractor={(item) =>
            item.id?.toString() || `item-${Math.random()}`
          }
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) =>
            "imageUrl" in item ? (
              <PlantCard
                key={item.id}
                image={item.imageUrl}
                title={item.name}
                onPress={() =>
                  router.push({
                    pathname: "/plant/[id]",
                    params: { id: item.id || "" },
                  })
                }
              />
            ) : (
              <TouchableOpacity
                className="flex-1"
                onPress={() => router.push("/plant/add-plant")}
              >
                <View className="h-40 bg-white items-center justify-center gap-2 rounded-md border border-primary border-dashed">
                  <Icon name="Plus" size={24} color="#16A34A" />
                  <Text className="text-primary font-semibold">Add Plant</Text>
                </View>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </MainLayout>
  );
}
