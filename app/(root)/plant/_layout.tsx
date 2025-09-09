import { Stack } from "expo-router";

export default function PlantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="greenhouse" options={{ headerShown: false }} />
      <Stack.Screen name="library" options={{ headerShown: false }} />
      <Stack.Screen name="add-plant" options={{ headerShown: false }} />
      <Stack.Screen name="select-plant" options={{ headerShown: false }} />
      <Stack.Screen name="analyze-plant" options={{ headerShown: false }} />
    </Stack>
  );
}
