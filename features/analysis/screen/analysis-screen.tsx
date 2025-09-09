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

export const AnalysisScreen = () => {
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState<"bookmark" | "history">(
    "bookmark"
  );

  const { data: savedPlants, loading } = useRealTimeFetch("plantBookmarks", [
    where("userId", "==", userId || ""),
  ]);

  const tabs = [
    { key: "bookmark", label: "Saved Plants", icon: "Bookmark" as const },
    { key: "history", label: "Analysis History", icon: "Clock" as const },
  ];

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
            <BookmarkPlants savedPlants={savedPlants} loading={loading} />
          ) : (
            <AnalysisHistory savedPlants={savedPlants} loading={loading} />
          )}
        </View>
      </View>
    </MainLayout>
  );
};
