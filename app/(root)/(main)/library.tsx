import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { getPlants } from "@/services/perenual";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [page, setPage] = useState(1);
  const [plants, setPlants] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, error, loading } = useFetch(
    () => getPlants(debouncedSearch, page),
    [debouncedSearch, page]
  );

  useEffect(() => {
    if (data && page === 1) {
      setPlants(data);
    } else if (data && page > 1) {
      setPlants((prev) => [...prev, ...data]);
    }

    setLoadingMore(false);
  }, [data]);

  const handleLoadMore = () => {
    if (!loadingMore && data?.length > 0) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <MainLayout>
      <Header title="Plant Library" description="Browse our plant library">
        <FormInput
          placeholder="Search for a plant"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setPage(1);
          }}
          iconName="Search"
        />
      </Header>

      {loading && page === 1 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-center mb-2">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id.toString()}
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
              name={item.common_name}
              onPress={() => router.push(`/plant/library/${item.id}`)}
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
      )}
    </MainLayout>
  );
}
