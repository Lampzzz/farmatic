import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { ControllerCard } from "@/components/greenhouse/controller-card";
import { useRealtimeDatabase } from "@/hooks/use-real-time-databases";
import clsx from "clsx";
import { Modal, Text, View } from "react-native";
import { getSprinkler } from "../utils";

interface Props {
  openModal: (name: string) => void;
  styles?: string;
  zoneNumber: number;
  plantSpot: number;
}

export const Controller = ({
  openModal,
  styles,
  zoneNumber,
  plantSpot,
}: Props) => {
  const { data } = useRealtimeDatabase("controls");
  const zoneData = zoneNumber == 1 ? data?.zone1 : data?.zone2;
  const sprinkler = getSprinkler(zoneData, plantSpot);

  return (
    <View className={clsx(styles, "mb-6")}>
      <Text className="text-xl font-bold text-gray-800 mb-4">Controller</Text>
      <ControllerCard
        title="Fan"
        icon="Fan"
        value={zoneData?.fan}
        onToggle={() => {}}
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
        value={zoneData?.light}
        onToggle={() => {}}
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
        onToggle={() => {}}
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

interface ControllerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedController: string;
  plant: any;
}

export const ControllerModal = ({
  visible,
  onClose,
  selectedController,
  plant,
}: ControllerModalProps) => (
  <Modal visible={visible} onRequestClose={onClose}>
    <View className="bg-white rounded-xl p-4 shadow-md">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        {selectedController === "fan" && "Fan Threshold Settings"}
        {selectedController === "light" && "Light Threshold Settings"}
        {selectedController === "sprinkler" && "Sprinkler Threshold Settings"}
      </Text>

      {selectedController === "fan" && (
        <>
          <FormInput
            label="Temperature Threshold (°C)"
            placeholder="Set temperature threshold"
            iconName="Thermometer"
            value={plant.analysis?.thresholds?.fan?.temperature || ""}
            onChangeText={() => {}}
          />
          <FormInput
            label="Humidity Threshold (%)"
            placeholder="Set humidity threshold"
            iconName="Droplet"
            value={plant.analysis?.thresholds?.fan?.humidity || ""}
            onChangeText={() => {}}
          />
        </>
      )}

      {selectedController === "light" && (
        <FormInput
          label="Light Level"
          placeholder="Set light level threshold"
          iconName="Sun"
          value={plant.analysis?.thresholds?.light?.intensity || ""}
          onChangeText={() => {}}
        />
      )}

      {selectedController === "sprinkler" && (
        <FormInput
          label="Soil Moisture Threshold (%)"
          placeholder="Set soil moisture threshold"
          iconName="Droplet"
          value={plant.analysis?.thresholds?.sprinkler?.soil_moisture || ""}
          onChangeText={() => {}}
        />
      )}

      <View className="mt-4 flex-row gap-2 justify-end">
        <Button
          label="Cancel"
          onPress={onClose}
          variant="outline"
          textSize="text-sm"
          buttonHeight={40}
          styles="w-20"
        />
        <Button
          label="Save"
          onPress={() => {}}
          variant="primary"
          textSize="text-sm"
          buttonHeight={40}
          styles="w-20"
        />
      </View>
    </View>
  </Modal>
);
