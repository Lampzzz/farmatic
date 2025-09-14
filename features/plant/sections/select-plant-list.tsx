import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { PlantCard } from "@/features/plant/components/plant-card";
import { FlatList } from "react-native";

interface Props {
  data: any[];
  loading: boolean;
  handlePlantSelect: (plant: any) => void;
  selectedPlant: any;
}

export const SelectPlantList = ({
  data,
  loading,
  handlePlantSelect,
  selectedPlant,
}: Props) => {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Plants Yet"
        description="Your plants will appear here. Start by adding your first plant."
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
      renderItem={({ item }) => (
        <PlantCard
          image={item.default_image?.thumbnail}
          name={item.scientific_name}
          onPress={() => handlePlantSelect(item)}
          isSelected={selectedPlant?.id === item.id}
        />
      )}
    />
  );
};
