import { Icon } from "@/components/icon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#16A34A",
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="Sprout" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="Book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="controller"
        options={{
          title: "Controller",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="Fan" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="User" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
