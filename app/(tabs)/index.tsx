import { StatusCard } from "@/components/greenhouse/status-card";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { myPlants } from "@/constants";
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
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold">My Plants</Text>
          <View className="bg-primary h-10 w-10 items-center justify-center rounded-full shadow-xl">
            <Icon name="Plus" size={18} color="white" />
          </View>
        </View>
        <View className="flex-row flex-wrap gap-4">
          {myPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              image={plant.image}
              title={plant.name}
              datePlanted={plant.datePlanted}
            />
          ))}
        </View>
      </View>
    </MainLayout>
  );
}
