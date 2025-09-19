import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { formatFirestoreDate } from "@/utils/date";
import { FlatList, Text, View } from "react-native";

interface AnalysisItem {
  id: string;
  createdAt: any;
  analysis: {
    commoName: string;
    scientificName: string;
    description: string;
    healthStatus: string;
    careGuide: string;
    imageUrl: string;
  };
}

interface Props {
  data: AnalysisItem[];
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

export const AnalysisHistoryList = ({ data, loading }: Props) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading analysis history...</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Icon name="Search" size={48} color="#9CA3AF" />
        <Text className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          No Analysis History
        </Text>
        <Text className="text-gray-500 text-center">
          Your plant analysis history will appear here once you start analyzing
          plants.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) =>
        item.id?.toString() || `analysis-${Math.random()}`
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 24 }}
      overScrollMode="never"
      renderItem={({ item, index }) => (
        <View
          className={`bg-white rounded-2xl shadow-md overflow-hidden ${index < data.length - 1 ? "mb-6" : ""}`}
        >
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <View className="flex-row items-center gap-2">
              <Icon name="Calendar" size={16} color="#6B7280" />
              <Text className="text-gray-600 font-medium">
                {formatFirestoreDate(item.createdAt)}
              </Text>
            </View>
            <View
              className={`px-4 py-1 rounded-full ${getHealthStatusColor(
                item.analysis.healthStatus
              )}`}
            >
              <Text className="text-white text-sm font-semibold">
                {getHealthStatusText(item.analysis.healthStatus)}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <View className="flex-row gap-4 mb-4">
              <Image
                uri={item.analysis.imageUrl}
                height={200}
                styles="rounded-xl"
              />
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Icon name="Info" size={20} color="#6B7280" />
                <Text className="text-lg font-semibold text-gray-700">
                  Care Guide
                </Text>
              </View>
              <Text className="text-sm text-gray-600 leading-5">
                {item.analysis.careGuide}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};
