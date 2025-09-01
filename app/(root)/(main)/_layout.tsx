import { Icon } from "@/components/icon";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

export const MainLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#16A34A",
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
        },
        tabBarButton: (props: any) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
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
        name="identifier"
        options={{
          title: "Identifier",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="Focus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="ChartPie" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="Settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
