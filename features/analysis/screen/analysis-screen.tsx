import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { where } from "firebase/firestore";
import { useState } from "react";
import { View } from "react-native";
import { TabSwitcher } from "../components/tab-switcher";
import { AnalysisHistory } from "../sections/analysis-history";
import { BookmarkPlants } from "../sections/bookmark-plants";

type AnalysisActiveTab = "bookmark" | "history";

export const AnalysisScreen = () => {
  const { adminId } = useAuth();
  const [activeTab, setActiveTab] = useState<AnalysisActiveTab>("bookmark");

  const { data: savedPlants, loading } = useRealTimeFetch("plantBookmarks", [
    where("userId", "==", adminId || ""),
  ]);

  const { data: analysisHistory } = useRealTimeFetch("analyses", [
    where("adminId", "==", adminId || ""),
  ]);

  const tabs = [
    { key: "bookmark", label: "Saved Plants", icon: "Bookmark" as const },
    { key: "history", label: "Analysis History", icon: "Clock" as const },
  ];

  const plants = savedPlants.map((plant) => plant.plant);

  return (
    <MainLayout>
      <Header
        title="Analysis"
        description="Your plant library and identification history"
      />

      <View className="flex-1 px-6 pt-6">
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as "bookmark" | "history")}
        />

        <View className="flex-1">
          {activeTab === "bookmark" ? (
            <BookmarkPlants data={plants} loading={loading} />
          ) : (
            <AnalysisHistory data={analysisHistory} loading={loading} />
          )}
        </View>
      </View>
    </MainLayout>
  );
};
