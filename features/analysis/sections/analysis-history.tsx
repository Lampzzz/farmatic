import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { router } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";

interface Props {
  savedPlants: any[];
  loading: boolean;
}

export const AnalysisHistory = ({ savedPlants, loading }: Props) => {
  if (loading) return <Loader />;

  if (!savedPlants || savedPlants.length === 0) {
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
      data={savedPlants}
      keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
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
  );
};
