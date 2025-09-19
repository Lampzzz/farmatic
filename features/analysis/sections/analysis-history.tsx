import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Loader } from "@/components/loader";
import { formatFirestoreDate } from "@/utils/date";
import clsx from "clsx";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
}

const getHealthStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "healthy":
      return "bg-green-500";
    case "sick":
      return "bg-red-500";
    case "growing":
      return "bg-blue-500";
    case "needs attention":
      return "bg-orange-500";
    case "dead":
      return "bg-gray-500";
    case "harvestable":
      return "bg-purple-500";
    default:
      return "bg-gray-300";
  }
};

const getHealthStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case "healthy":
      return "Healthy";
    case "sick":
      return "Sick";
    case "growing":
      return "Growing";
    case "needs attention":
      return "Needs Attention";
    case "dead":
      return "Dead";
    case "harvestable":
      return "Harvestable";
    default:
      return "Unknown";
  }
};
export const AnalysisHistory = ({ data, loading }: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Analysis History Yet"
        description="Your analysis history will appear here. Start by analyzing your first plant."
        buttonText="Analyze Plants"
        onPress={() => router.push("/home")}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <View className="relative flex-1 bg-white rounded-2xl shadow-md flex-row items-center gap-4 overflow-hidden">
          <Image uri={item.analysis.imageUrl} width={96} height={96} />

          <View className="">
            <Text className="font-bold text-xl  mb-1">
              {item.analysis.commoName}
            </Text>
            <View className="flex-row items-center gap-2 mb-2">
              <Icon name="Calendar" size={16} color="#6B7280" />
              <Text className="text-gray-400 text-sm">
                Analyzed: {formatFirestoreDate(item.createdAt)}
              </Text>
            </View>
            <View
              className={clsx(
                "rounded-full px-2 py-1 self-start text-center",
                getHealthStatusColor(item.analysis.healthStatus)
              )}
            >
              <Text
                className={clsx(
                  "text-white text-sm capitalize",
                  getHealthStatusColor(item.analysis.healthStatus)
                )}
              >
                {item.analysis.healthStatus}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};
