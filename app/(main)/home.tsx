import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { myPlants } from "@/constants";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const MAX_ITEMS = 6;
  const placeholdersCount = Math.max(0, MAX_ITEMS - myPlants.length);
  const listData = [
    ...myPlants.map((plant) => ({ ...plant, __type: "plant" }) as const),
    ...Array.from({ length: placeholdersCount }).map(
      (_, index) => ({ id: `add-${index}`, __type: "add" }) as const
    ),
  ];

  return (
    <MainLayout>
      <Header title="Farmatic" description="Greenhouse Dashboard">
        {/* <View className="flex-row gap-4">
          <StatusCard title="Temp." value="20°C" icon="Thermometer" />
          <StatusCard title="Humidity" value="20%" icon="Droplet" />
          <StatusCard title="Light" value="High" icon="Sun" />
        </View> */}
      </Header>

      <View className="p-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
        </View>

        <FlatList
          data={listData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) =>
            "image" in item ? (
              <PlantCard key={item.id} image={item.image} title={item.name} />
            ) : (
              <TouchableOpacity
                className="flex-1"
                onPress={() => router.push("/add-plant")}
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
