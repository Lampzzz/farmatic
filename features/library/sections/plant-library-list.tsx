import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/components/plant/plant-card";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
  handleLoadMore: () => void;
  loadingMore: boolean;
}

export const PlantLibraryList = ({
  data,
  loading,
  handleLoadMore,
  loadingMore,
}: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Plant Library Yet"
        description="Your plant library will appear here. Start by adding your first plant."
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{
        gap: 12,
        padding: 20,
      }}
      renderItem={({ item }) => (
        <PlantCard
          image={item.default_image?.thumbnail}
          name={item.scientific_name}
          onPress={() => router.push(`/plant/plant-library/${item.id}`)}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <View className="py-4">
            <ActivityIndicator size="small" color="#22c55e" />
          </View>
        ) : null
      }
    />
  );
};
