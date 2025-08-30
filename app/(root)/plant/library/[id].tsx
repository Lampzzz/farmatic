import { BaseCard } from "@/components/base-card";
import PlantImagePlaceholder from "@/components/empty-state/plant-image-placeholder";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { CareInfoRow } from "@/features/library/components/care-info-row";
import { PlantProfileRow } from "@/features/library/components/plant-profile-row";
import { useFetch } from "@/hooks/use-fetch";
import { getPlantDetails, getPlantGuideDetails } from "@/services/perenual";
import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function LibraryPlant() {
  const { id } = useLocalSearchParams();

  const { data } = useFetch(() => getPlantDetails(id as string), []);

  const { data: guideData } = useFetch(
    () => getPlantGuideDetails(id as string),
    []
  );

  return (
    <MainLayout>
      <Header
        title={data?.common_name}
        description={data?.scientific_name}
        isHasBack
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        {data?.default_image?.original_url ? (
          <Image
            source={{
              uri: data.default_image.original_url,
            }}
            className="w-full h-80 rounded-xl overflow-hidden mb-6"
            resizeMode="cover"
          />
        ) : (
          <PlantImagePlaceholder />
        )}

        <BaseCard styles="mb-6">
          <Text className="text-gray text-lg">{data?.description}</Text>
        </BaseCard>

        {/* Plant Profile */}
        <View className="mb-2">
          <Text className="text-2xl font-bold text-green-500">
            Plant Profile
          </Text>
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
            value={
              data?.attracts && data.attracts.length > 0
                ? data.attracts.join(", ")
                : "N/A"
            }
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
                    : "N/A"
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
                    : "N/A"
            }
          />

          <PlantProfileRow
            icon="Heart"
            label="Medical"
            value={data?.medicinal ? "Yes" : "No"}
            showDivider={false}
          />
        </BaseCard>

        {/* Care Instructions */}
        <View className="mb-2">
          <Text className="text-2xl font-bold text-green-500">
            Care Instructions
          </Text>
        </View>
        <BaseCard styles="mb-6">
          {guideData?.section.map((item: any, index: number) => (
            <View
              key={item.type}
              className={clsx(index !== guideData.section.length - 1 && "mb-4")}
            >
              <CareInfoRow
                icon="Clock"
                title={item.type}
                description={item.description}
              />
            </View>
          ))}
        </BaseCard>
      </ScrollView>
    </MainLayout>
  );
}
