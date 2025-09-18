import { useRealtimeDatabase } from "@/hooks/use-real-time-databases";
import { Text, View } from "react-native";
import { EnvironmentalStatusCard } from "../components/environmental-status-card";
import { getReadableLightLevel } from "../utils";

export const EnvironmentalStatus = ({
  zoneNumber,
  plantSpot,
}: {
  zoneNumber: Number;
  plantSpot: Number;
}) => {
  const { data } = useRealtimeDatabase(`sensors/zones/${zoneNumber}`);
  const { data: soilMoisture } = useRealtimeDatabase(
    `sensors/zones/${zoneNumber}/soilMoisture/${plantSpot}`
  );

  const lightLevel = getReadableLightLevel(+data?.lightLevel);

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Environmental Status
      </Text>
      <View className="gap-2">
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Temperature"
            value={`${data?.temperature ?? 0}°C`}
            icon="Thermometer"
            iconColor="red"
          />
          <EnvironmentalStatusCard
            title="Humidity"
            value={`${data?.humidity ?? 0}%`}
            icon="Droplet"
            iconColor="blue"
          />
        </View>
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Light Level"
            value={lightLevel}
            icon="Sun"
            iconColor="orange"
          />
          <EnvironmentalStatusCard
            title="Soil Moisture"
            value={`${soilMoisture ?? 0}%`}
            icon="Sprout"
            iconColor="green"
          />
        </View>
      </View>
    </View>
  );
};
