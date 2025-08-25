import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useFetch } from "@/hooks/use-fetch";
import { getPlantDetails, getPlantGuideDetails } from "@/services/perenual";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function LibraryPlant() {
  const { id } = useLocalSearchParams();

  const { data, error, loading, refetch } = useFetch(
    () => getPlantDetails(id as string),
    []
  );

  const {
    data: guideData,
    error: guideError,
    loading: guideLoading,
    refetch: guideRefetch,
  } = useFetch(() => getPlantGuideDetails(id as string), []);

  // console.log(JSON.stringify(guideData, null, 2));

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
          <View className="w-full h-80 rounded-xl overflow-hidden mb-6 bg-green-100 items-center justify-center">
            <Icon name="Sprout" size={80} color="#16A34A" />
          </View>
        )}
        <View className="p-4 bg-white rounded-md">
          <Text className="text-gray text-lg">{data?.description}</Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
}
