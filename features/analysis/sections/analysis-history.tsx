import { EmptyState } from "@/components/empty-state";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Loader } from "@/components/loader";
import { formatFirestoreDate } from "@/utils/date";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
}

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case "low":
      return "bg-green-500";
    case "medium":
      return "bg-orange-500";
    case "high":
      return "bg-red-500";
    default:
      return "bg-gray-300";
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
            <View className="flex-row items-center gap-2">
              <Icon name="Calendar" size={16} color="#6B7280" />
              <Text className="text-gray-400 text-sm">
                Analyzed: {formatFirestoreDate(item.createdAt)}
              </Text>
            </View>
            {/* <View
              className={clsx(
                "rounded-full px-2 py-1 text-center",
                getRiskColor(item.analysis.riskLevel)
              )}
            >
              <Text className="text-white text-sm capitalize">
                {item.analysis.riskLevel} Risk
              </Text>
            </View> */}
          </View>
        </View>
      )}
    />
  );
};
