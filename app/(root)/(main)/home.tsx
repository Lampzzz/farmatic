import EmptyGreenhousePlant from "@/components/empty-state/empty-greenhouse-plant";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/components/plant/plant-card";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  const userId = user?.isAdmin ? user.id : user?.adminId;

  const { data, loading } = useRealTimeFetch("plants", [
    where("userId", "==", userId || ""),
    orderBy("createdAt", "desc"),
  ]);

  return (
    <MainLayout>
      <Header title="Farmatic" description="Greenhouse Dashboard"></Header>
      <ScreenContainer>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
          <TouchableOpacity
            onPress={() => router.push("/plant/select-plant")}
            className="bg-primary rounded-full p-2 w-10 h-10 items-center justify-center"
          >
            <Icon name="Plus" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loader />
        ) : data.length === 0 ? (
          <EmptyGreenhousePlant />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) =>
              item.id?.toString() || `item-${Math.random()}`
            }
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <PlantCard
                image={item.imageUrl}
                name={item.name}
                onPress={() =>
                  router.push({
                    pathname: "/plant/greenhouse/[id]",
                    params: { id: item.id },
                  })
                }
              />
            )}
          />
        )}
      </ScreenContainer>
    </MainLayout>
  );
}
