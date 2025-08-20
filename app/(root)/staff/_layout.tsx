import { Stack } from "expo-router";

export default function StaffLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add-staff"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
