import { EmptyState } from "@/components/empty-state";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/components/plant/plant-card";
import { analysisHistory } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { router } from "expo-router";
import { where } from "firebase/firestore";
import { Bookmark, Clock } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function AnalysisScreen() {
  const [activeTab, setActiveTab] = useState<"saved" | "history">("saved");
  const { userId } = useAuth();

  const { data: savedPlants, loading } = useRealTimeFetch("plantBookmarks", [
    where("userId", "==", userId || ""),
  ]);

  const renderSavedLibrary = () => (
    <View className="flex-1">
      <Text className="text-xl font-bold mb-4">
        Your Saved Plants ({savedPlants?.length})
      </Text>
      {loading ? (
        <Loader />
      ) : savedPlants?.length === 0 ? (
        <EmptyState
          title="No Saved Plants Yet"
          description="Your saved plants will appear here. Start by saving your first plant."
          buttonText="Browse Plants"
          onPress={() => router.push("/library")}
        />
      ) : (
        <FlatList
          data={savedPlants}
          keyExtractor={(item) =>
            item.id?.toString() || `item-${Math.random()}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          numColumns={2}
          renderItem={({ item }) => (
            <PlantCard
              image={item.plant.imageUrl}
              name={item.plant.name}
              onPress={() => router.push(`/plant/plant-library/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );

  const renderAnalysisHistory = () => (
    <View className="flex-1">
      <Text className="text-xl font-bold  mb-4">
        Your Analysis History ({analysisHistory?.length})
      </Text>
      {loading ? (
        <Loader />
      ) : analysisHistory?.length === 0 ? (
        <EmptyState
          title="No Analysis History Yet"
          description="Your analysis history will appear here. Start by analyzing your first plant."
          buttonText="Analyze Plants"
          onPress={() => router.push("/home")}
        />
      ) : (
        <FlatList
          data={analysisHistory}
          keyExtractor={(item) =>
            item.id?.toString() || `item-${Math.random()}`
          }
          key={analysisHistory.length}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          // columnWrapperStyle={{ gap: 12 }}
          // numColumns={1}
          renderItem={({ item }) => (
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-md flex-row items-center gap-4">
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-2xl"
              />
              <View className="flex-1">
                <Text className="font-semibold">{item.name}</Text>
                <Text className="text-gray text-sm">{item.healthStatus}</Text>
                <Text className="text-gray text-sm">{item.createdAt}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );

  return (
    <MainLayout>
      <Header
        title="Analysis"
        description="Your plant library and identification history"
      />

      <View className="flex-1 px-6 pt-6">
        <View className="flex-row bg-white rounded-2xl mb-6 shadow-md">
          <TouchableOpacity
            onPress={() => setActiveTab("saved")}
            className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-l-2xl ${
              activeTab === "saved" ? "bg-green-100" : "bg-white"
            }`}
          >
            <Bookmark
              size={20}
              color={activeTab === "saved" ? "#16A34A" : "#6B7280"}
            />
            <Text
              className={`ml-2 font-semibold ${
                activeTab === "saved" ? "text-primary" : "text-gray"
              }`}
            >
              Saved Plants
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("history")}
            className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-r-2xl ${
              activeTab === "history" ? "bg-green-100" : "bg-white"
            }`}
          >
            <Clock
              size={20}
              color={activeTab === "history" ? "#16A34A" : "#6B7280"}
            />
            <Text
              className={`ml-2 font-semibold ${
                activeTab === "history" ? "text-font-primary" : "text-gray"
              }`}
            >
              Analysis History
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          {activeTab === "saved"
            ? renderSavedLibrary()
            : renderAnalysisHistory()}
        </View>
      </View>
    </MainLayout>
  );
}
