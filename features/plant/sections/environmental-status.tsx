import { useRealtimeDatabase } from "@/hooks/use-real-time-databases";
import { updateAutoController } from "@/services/firebase/firestore/controllers";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { EnvironmentalStatusCard } from "../components/environmental-status-card";
import { getReadableLightLevel, getSoilMoisture } from "../utils";

export const EnvironmentalStatus = ({
  zoneNumber,
  plantSpot,
  thresholds,
}: {
  zoneNumber: Number;
  plantSpot: Number;
  thresholds: any;
}) => {
  const { data: sensors } = useRealtimeDatabase(`sensors/zone${zoneNumber}`);

  const soilMoisture = getSoilMoisture(sensors, +plantSpot);
  const lightLevel = getReadableLightLevel(+sensors?.lightLevel);

  useEffect(() => {
    const updateControllers = async () => {
      if (sensors && thresholds) {
        try {
          const controllers = await updateAutoController(
            +zoneNumber,
            +plantSpot,
            sensors,
            thresholds
          );
          console.log("Auto controller updated:", controllers);
        } catch (err) {
          console.error("Error updating controller:", err);
        }
      }
    };

    updateControllers();
  }, [sensors, zoneNumber, plantSpot, thresholds]);

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Environmental Status
      </Text>
      <View className="gap-2">
        <View className="flex-row gap-2">
          <EnvironmentalStatusCard
            title="Temperature"
            value={`${sensors?.temperature ?? 0}°C`}
            icon="Thermometer"
            iconColor="red"
          />
          <EnvironmentalStatusCard
            title="Humidity"
            value={`${sensors?.humidity ?? 0}%`}
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
