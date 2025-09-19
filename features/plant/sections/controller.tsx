import { ControllerCard } from "@/features/plant/components/controller-card";
import { useRealtimeDatabase } from "@/hooks/use-real-time-databases";
import { toggleController } from "@/services/firebase/firestore/controllers";
import clsx from "clsx";
import { Text, View } from "react-native";

interface Props {
  styles?: string;
  zoneNumber: number;
  plantSpot: number;
}

export const Controller = ({ styles, zoneNumber, plantSpot }: Props) => {
  const { data: controls } = useRealtimeDatabase(
    `controllers/zones/${zoneNumber}`
  );
  const { data: sprinkler } = useRealtimeDatabase(
    `controllers/zones/${zoneNumber}/sprinklers/${plantSpot}`
  );

  return (
    <View className={clsx(styles, "mb-6")}>
      <Text className="text-xl font-bold text-gray-800 mb-4">Controller</Text>
      <ControllerCard
        title="Fan"
        icon="Fan"
        value={controls?.fan}
        onToggle={() => {
          toggleController(zoneNumber, "fan", plantSpot, controls?.fan);
        }}
        onSettings={() => {}}
        colorScheme={{
          iconBgClass: "bg-green-100",
          iconColor: "#059669",
          switchOnColor: "#10b981",
          statusBgClass: "bg-green-50",
          statusTextClass: "text-green-700",
        }}
      />
      <ControllerCard
        title="Light"
        icon="Lightbulb"
        value={controls?.light}
        onToggle={() => {
          toggleController(zoneNumber, "light", plantSpot, controls?.light);
        }}
        onSettings={() => {}}
        colorScheme={{
          iconBgClass: "bg-yellow-100",
          iconColor: "#f59e0b",
          switchOnColor: "#f59e0b",
          statusBgClass: "bg-yellow-50",
          statusTextClass: "text-yellow-700",
        }}
      />
      <ControllerCard
        title="Sprinkler"
        icon="Droplet"
        value={sprinkler}
        onToggle={() => {
          toggleController(zoneNumber, "sprinkler", plantSpot, sprinkler);
        }}
        onSettings={() => {}}
        colorScheme={{
          iconBgClass: "bg-blue-100",
          iconColor: "#60a5fa",
          switchOnColor: "#60a5fa",
          statusBgClass: "bg-blue-50",
          statusTextClass: "text-blue-700",
        }}
      />
    </View>
  );
};
