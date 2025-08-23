import { Stack } from "expo-router";

export default function StaffLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-staff"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
