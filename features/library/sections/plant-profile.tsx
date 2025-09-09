import { BaseCard } from "@/components/base-card";
import { PlantProfileRow } from "@/features/library/components/plant-profile-row";
import { Text, View } from "react-native";

interface Props {
  data: any;
}

export const PlantProfile = ({ data }: Props) => (
  <>
    <View className="mb-2">
      <Text className="text-2xl font-bold text-green-500">Plant Profile</Text>
    </View>
    <BaseCard styles="mb-6">
      <PlantProfileRow icon="Clock" label="Cycle" value={data?.cycle} />
      <PlantProfileRow
        icon="Star"
        label="Care Level"
        value={data?.care_level}
      />
      <PlantProfileRow
        icon="Sprout"
        label="Attracts"
        value={data?.attracts?.length ? data.attracts.join(", ") : "N/A"}
      />
      <PlantProfileRow
        icon="Scissors"
        label="Harvest"
        value={data?.harvest_method ?? "N/A"}
      />
      <PlantProfileRow
        icon="Leaf"
        label="Edible"
        value={
          data?.edible_leaf && data?.edible_fruit
            ? "Leaf / Fruit"
            : data?.edible_leaf
              ? "Leaf"
              : data?.edible_fruit
                ? "Fruit"
                : "No"
        }
      />
      <PlantProfileRow
        icon="Shield"
        label="Poisonous"
        value={
          data?.poisonous_to_humans && data?.poisonous_to_pets
            ? "To humans and pets"
            : data?.poisonous_to_humans
              ? "To humans"
              : data?.poisonous_to_pets
                ? "To pets"
                : "No"
        }
      />
      <PlantProfileRow
        icon="Heart"
        label="Medical"
        value={data?.medicinal ? "Yes" : "No"}
        showDivider={false}
      />
    </BaseCard>
  </>
);
