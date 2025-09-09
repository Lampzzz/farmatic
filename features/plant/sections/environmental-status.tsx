import { Text, View } from "react-native";
import { EnvironmentalStatusCard } from "../components/environmental-status-card";

interface Props {
  temp: string;
  humidity: string;
  soilMoisture: string;
}

export const EnvironmentalStatus = ({
  temp,
  humidity,
  soilMoisture,
}: Props) => (
  <View className="mb-6">
    <Text className="text-xl font-bold text-gray-800 mb-4">
      Environmental Status
    </Text>
    <View className="flex-row gap-2">
      <EnvironmentalStatusCard
        title="Temp."
        value={temp}
        icon="Thermometer"
        iconColor="green"
      />
      <EnvironmentalStatusCard
        title="Humidity"
        value={humidity}
        icon="Droplet"
        iconColor="blue"
      />
      <EnvironmentalStatusCard
        title="Soil Moisture"
        value={soilMoisture}
        icon="Sun"
        iconColor="orange"
      />
    </View>
  </View>
);
