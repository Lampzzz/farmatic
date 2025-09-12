import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import { Text, View } from "react-native";
import { GreenhousePlantList } from "../sections/greenhouse-plant-list";

export const GreenhouseScreen = () => {
  const { adminId } = useAuth();

  const { data, loading } = useRealTimeFetch("plants", [
    where("userId", "==", adminId || ""),
    orderBy("createdAt", "desc"),
  ]);

  return (
    <MainLayout>
      <Header
        title="Farmatic"
        description="Greenhouse Dashboard"
        rightIcon="Plus"
        onRightIconPress={() => router.push("/plant/select-plant")}
      />
      <ScreenContainer>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Greenhouse Plants</Text>
        </View>
        <GreenhousePlantList data={data} loading={loading} />
      </ScreenContainer>
    </MainLayout>
  );
};
