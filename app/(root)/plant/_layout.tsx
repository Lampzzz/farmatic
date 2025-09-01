import { Stack } from "expo-router";

export default function PlantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="identify" options={{ headerShown: false }} />
      <Stack.Screen name="add-plant" options={{ headerShown: false }} />
      <Stack.Screen name="select-plant" options={{ headerShown: false }} />
    </Stack>
  );
}
