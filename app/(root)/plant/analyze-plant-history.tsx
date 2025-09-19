import { AnalyzePlantHistoryScreen } from "@/features/plant";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { useLocalSearchParams } from "expo-router";
import { orderBy, where } from "firebase/firestore";

const AnalyzePlantHistory = () => {
  const { plantId, adminId } = useLocalSearchParams();

  const { data: analysisHistory, loading } = useRealTimeFetch("analyses", [
    where("adminId", "==", adminId || ""),
    where("plantId", "==", plantId || ""),
    orderBy("createdAt", "desc"),
  ]);

  return <AnalyzePlantHistoryScreen data={analysisHistory} loading={loading} />;
};

export default AnalyzePlantHistory;
