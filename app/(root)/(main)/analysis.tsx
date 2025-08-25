import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { Bookmark, Clock } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AnalysisScreen() {
  const [activeTab, setActiveTab] = useState<"saved" | "history">("saved");

  const renderSavedLibrary = () => (
    <View className="flex-1">
      <Text className="text-xl font-bold mb-4">Your Saved Plants (0)</Text>
    </View>
  );

  const renderAnalysisHistory = () => (
    <View className="flex-1">
      <Text className="text-xl font-bold  mb-4">Your Analysis History (0)</Text>
    </View>
  );

  return (
    <MainLayout>
      <Header
        title="Analysis"
        description="Your plant library and identification history"
      />

      <View className="flex-1 px-6 pt-6">
        {/* Tab Navigation */}
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
              Saved Library
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

        {/* Tab Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {activeTab === "saved"
            ? renderSavedLibrary()
            : renderAnalysisHistory()}
        </ScrollView>
      </View>
    </MainLayout>
  );
}
