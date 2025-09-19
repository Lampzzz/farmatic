import { EmptyState } from "@/components/empty-state";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { Loader } from "@/components/loader";
import { router } from "expo-router";
import { AnalysisHistoryList } from "../sections/analysis-history-list";

export const AnalyzePlantHistoryScreen = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  if (loading) return <Loader />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Analysis History Yet"
        description="Your analysis history will appear here. Start by analyzing your first plant."
        buttonText="Analyze Plants"
        onPress={() => router.push("/plant/add-plant")}
      />
    );
  }

  return (
    <MainLayout>
      <Header
        showBackButton
        title="Plant Analysis History"
        description="Monitor your plants health status and care progress"
      />
      <AnalysisHistoryList data={data} loading={loading} />
    </MainLayout>
  );
};
