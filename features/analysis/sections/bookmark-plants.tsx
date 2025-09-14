import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/features/plant/components/plant-card";
import { router } from "expo-router";
import { FlatList } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
}

export const BookmarkPlants = ({ data, loading }: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Saved Plants Yet"
        description="Your saved plants will appear here. Start by saving your first plant."
        buttonText="Browse Plants"
        onPress={() => router.push("/library")}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      columnWrapperStyle={{ gap: 12 }}
      numColumns={2}
      renderItem={({ item }) => (
        <PlantCard
          image={item.imageUrl}
          name={item.name}
          onPress={() => router.push(`/plant/library/${item.id}`)}
        />
      )}
    />
  );
};
