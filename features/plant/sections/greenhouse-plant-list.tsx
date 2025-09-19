import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/features/plant/components/plant-card";
import { router } from "expo-router";
import { FlatList } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
}

export const GreenhousePlantList = ({ data, loading }: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Greenhouse Plants Yet"
        description="Your greenhouse plants will appear here. Start by adding your first plant."
        buttonText="Add Plant"
        onPress={() => router.push("/plant/add-plant")}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 12 }}
      overScrollMode="never"
      renderItem={({ item }) => (
        <PlantCard
          image={item.imageUrl}
          name={item.name}
          zoneNumber={item.zoneNumber}
          onPress={() =>
            router.push({
              pathname: "/plant/greenhouse/[id]",
              params: { id: item.id },
            })
          }
        />
      )}
    />
  );
};
