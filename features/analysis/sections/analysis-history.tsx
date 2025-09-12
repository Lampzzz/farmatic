import { EmptyState } from "@/components/empty-state";
import { Image } from "@/components/image";
import { Loader } from "@/components/loader";
import clsx from "clsx";
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
      return "bg-orange-400";
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
        <View className="relative flex-1 bg-white rounded-2xl shadow-md flex-row items-center gap-4 overflow-hidden p-3">
          <Image uri={item.analysis.imageUrl} width={96} height={96} />

          <View className="flex-1">
            <Text className="font-semibold text-xl">
              {item.analysis.commoName}
            </Text>
            {item.analysis.issue ? (
              <Text className="text-gray-400 text-xs mb-1">
                {item.analysis.issue}
              </Text>
            ) : null}
            <View className="flex-row items-center justify-between gap-2">
              <Text className="text-gray-400 text-xs">Aug 11, 2025</Text>
              <View
                className={clsx(
                  "rounded-full px-2 py",
                  getRiskColor(item.analysis.riskLevel)
                )}
              >
                <Text className="text-gray-400 text-xs">Low Risk</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};
