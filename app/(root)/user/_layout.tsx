import { Stack } from "expo-router";

export default function StaffLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit-user-profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-staff-member"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
