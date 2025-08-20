import { Stack } from "expo-router";

export default function RootLayout() {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Redirect href="/sign-in" />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="plant" options={{ headerShown: false }} />
    </Stack>
  );
}
