import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useFetch } from "@/hooks/use-fetch";
import { getPlantDetails } from "@/services/perenual";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

export default function LibraryPlant() {
  const { id } = useLocalSearchParams();

  const { data, error, loading, refetch } = useFetch(
    () => getPlantDetails(id as string),
    []
  );

  console.log(JSON.stringify(data, null, 2));

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
      </ScrollView>
    </MainLayout>
  );
}
