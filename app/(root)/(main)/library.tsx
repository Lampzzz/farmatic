import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { PlantCard } from "@/components/plant/plant-card";
import { getPlants } from "@/services/perenual";
import { usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState<PlantLibrary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pathname = usePathname();

  const fetchPlants = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        setLoading(true);
        const response = await getPlants(page, 10);

        // Debug: Log the response structure
        // console.log("API Response:", JSON.stringify(response, null, 2));

        if (append) {
          setPlants((prev) => [...prev, ...response.data]);
        } else {
          setPlants(response.data);
        }

        // Add safety check for meta property
        if (response.meta && response.meta.last_page) {
          setHasMore(page < response.meta.last_page);
        } else {
          // Fallback: check if we got a full page of results
          setHasMore(response.data.length === 10);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchPlants(1, false);
  }, [pathname, fetchPlants]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPlants(nextPage, true);
    }
  }, [loading, hasMore, currentPage, fetchPlants]);

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
        className="px-6 pt-6"
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
            onPress={() => {}}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </MainLayout>
  );
}
