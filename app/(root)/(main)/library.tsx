import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { usePathname } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState<PlantLibrary[]>([]);
  const pathname = usePathname();

  // useEffect(() => {
  //   const fetchPlants = async () => {
  //     const plants = await getPlants();
  //     setPlants(plants);
  //   };
  //   fetchPlants();
  // }, [pathname]);

  return (
    <MainLayout>
      <Header title="Plant Library" description="Browse our plant library" />
      <View className="p-6">
        <FormInput
          placeholder="Search for a plant"
          value={search}
          onChangeText={setSearch}
          styles="mb-4"
          iconName="Search"
        />

        <View className="mt-4">
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 8 }}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <View className="flex-1 h-32 rounded-md">
                {item.default_image?.thumbnail && (
                  <Image
                    source={{ uri: item.default_image?.thumbnail }}
                    className="w-full h-32 rounded-md"
                    resizeMode="cover"
                  />
                )}
                <Text>{item.common_name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </MainLayout>
  );
}
