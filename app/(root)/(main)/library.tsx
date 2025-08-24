import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { getPlants } from "@/services/perenual";
import { router, usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState<PlantLibrary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pathname = usePathname();

  const fetchPlants = useCallback(
    async (page: number, append: boolean = false) => {
      try {
        setLoading(true);
        const response = await getPlants(page, 10);

        if (append) {
          setPlants((prev) => [...prev, ...(response.data || [])]);
        } else {
          setPlants(response.data || []);
        }

        if (response.meta?.last_page) {
          setHasMore(page < response.meta.last_page);
        } else {
          setHasMore((response.data?.length || 0) === 10);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial load when pathname changes
  useEffect(() => {
    setPlants([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [pathname]);

  // Fetch whenever currentPage changes
  useEffect(() => {
    fetchPlants(currentPage, currentPage > 1);
  }, [currentPage, fetchPlants]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setCurrentPage((prev) => prev + 1);
  }, [loading, hasMore]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  };

  return (
    <MainLayout>
      <Header title="Plant Library" description="Browse our plant library">
        <FormInput
          placeholder="Search for a plant"
          value={search}
          onChangeText={setSearch}
          iconName="Search"
        />
      </Header>

      <FlatList
        className="p-6"
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <PlantCard
            key={item.id}
            image={
              item.default_image?.thumbnail || "https://via.placeholder.com/150"
            }
            title={item.common_name || ""}
            onPress={() => router.push(`/plant/library/${item.id}`)}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading ? (
            <View className="py-8 items-center">
              <Text className="text-gray-500 text-center">No plants found</Text>
            </View>
          ) : null
        }
      />
    </MainLayout>
  );
}
