export function getReadableLightLevel(lux: number): string {
  if (lux < 1) return "Dark";
  if (lux < 50) return "Dim";
  if (lux < 300) return "Low";
  if (lux < 1000) return "Normal";
  if (lux < 10000) return "Bright";
  if (lux < 30000) return "Sunny";
  return "Blinding";
}

export function getSoilMoisture(zoneData: any, plantSpot: number) {
  if (!zoneData) return null;

  switch (plantSpot) {
    case 1:
      return zoneData.soilMoisture1;
    case 2:
      return zoneData.soilMoisture2;
    case 3:
      return zoneData.soilMoisture3;
    default:
      return null;
  }
}

export function getSprinkler(zoneData: any, plantSpot: number) {
  if (!zoneData) return null;

  switch (plantSpot) {
    case 1:
      return zoneData.sprinkler1;
    case 2:
      return zoneData.sprinkler2;
    case 3:
      return zoneData.sprinkler3;
    default:
      return null;
  }
}
