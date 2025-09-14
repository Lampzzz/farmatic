import { realTimeDB } from "@/services/firebase/config";
import { ref, update } from "firebase/database";

interface Thresholds {
  fan: { humidity: number; temperature: number };
  light: { lightLevel: number };
  sprinkler: { soilMoisture: number };
}

interface ZoneData {
  temperature?: number;
  humidity?: number;
  lightLevel?: number;
  soilMoisture1?: number;
  soilMoisture2?: number;
  soilMoisture3?: number;
}

export async function updateAutoController(
  zoneNumber: number,
  plantSpot: number,
  zoneData: ZoneData,
  thresholds: Thresholds
) {
  if (!zoneData) return;

  const soilMoisture =
    plantSpot === 1
      ? zoneData.soilMoisture1
      : plantSpot === 2
        ? zoneData.soilMoisture2
        : zoneData.soilMoisture3;

  const fan =
    zoneData.temperature! >= thresholds.fan.temperature ||
    zoneData.humidity! >= thresholds.fan.humidity;

  const light = zoneData.lightLevel! >= thresholds.light.lightLevel;

  const sprinklerKey = `sprinkler${plantSpot}`;
  const sprinklerValue = soilMoisture! >= thresholds.sprinkler.soilMoisture;

  const controllerRef = ref(realTimeDB, `controls/zone${zoneNumber}`);

  await update(controllerRef, {
    fan,
    light,
    [sprinklerKey]: sprinklerValue,
  });

  return { fan, light, [sprinklerKey]: sprinklerValue };
}
