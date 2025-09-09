import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/components/plant/plant-card";
import { router } from "expo-router";
import { FlatList } from "react-native";

interface Props {
  savedPlants: any[];
  loading: boolean;
}

export const BookmarkPlants = ({ savedPlants, loading }: Props) => {
  if (loading) return <Loader />;

  if (!savedPlants || savedPlants.length === 0) {
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
      data={savedPlants}
      keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      columnWrapperStyle={{ gap: 12 }}
      numColumns={2}
      renderItem={({ item }) => (
        <PlantCard
          image={item.plant.imageUrl}
          name={item.plant.name}
          onPress={() => router.push(`/plant/plant-library/${item.id}`)}
        />
      )}
    />
  );
};
