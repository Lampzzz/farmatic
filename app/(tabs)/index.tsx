import { StatusCard } from "@/components/greenhouse/status-card";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { AddPlant } from "@/components/plant/add-plant";
import { PlantCard } from "@/components/plant/plant-card";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <MainLayout>
      <Header title="Farmatic" description="Greenhouse Dashboard">
        <View className="flex-row gap-4">
          <StatusCard title="Temp." value="20°C" icon="Thermometer" />
          <StatusCard title="Humidity" value="20%" icon="Droplet" />
          <StatusCard title="Light" value="High" icon="Sun" />
        </View>
      </Header>
      <View className="px-6 py-4">
        <Text className="text-2xl font-bold mb-4">My Plants</Text>
        <View className="flex-row flex-wrap gap-4">
          <PlantCard
            image="https://picsum.photos/400/300?random=1"
            title="Tomato"
            description="Planted: Aug 17, 2023"
          />
          <PlantCard
            image="https://picsum.photos/400/300?random=2"
            title="Lettuce"
            description="Planted: Sep 21, 2023"
          />
          <PlantCard
            image="https://picsum.photos/400/300?random=3"
            title="Carrot"
            description="Planted: Oct 15, 2023"
          />
          <AddPlant />
        </View>
      </View>
    </MainLayout>
  );
}
