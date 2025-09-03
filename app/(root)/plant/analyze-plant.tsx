import { BaseCard } from "@/components/base-card";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { analyzePlantImage } from "@/services/firebase/plant";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const AnalyzePlant = () => {
  const { imageUri, type } = useLocalSearchParams<{
    imageUri: string;
    type: string;
  }>();

  const decodedUri = decodeURIComponent(imageUri);

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const base64Data = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const res = await analyzePlantImage(imageUri, type, base64Data);
        setResult(res);
      } catch (err) {
        console.error(err);
        setResult({ error: "Failed to analyze plant." });
      } finally {
        setIsLoading(false);
      }
    };

    if (imageUri && type) fetchAnalysis();
  }, [imageUri, type]);

  if (isLoading) {
    return <Loader message="Analyzing plant..." />;
  }

  if (!result || result.error) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-red-500">
          Error: {result?.error || "Unknown error"}
        </Text>
      </View>
    );
  }

  return (
    <MainLayout>
      <Header
        title={result.common_name || "Unknown Plant"}
        description={result.scientific_name || "Unknown Plant"}
        showBackButton
      />
      <ScreenContainer scrollable>
        <View className="relative h-80 rounded-xl overflow-hidden mb-6">
          <Image
            source={{ uri: decodedUri }}
            className="w-full h-80"
            resizeMode="cover"
          />
        </View>
        <BaseCard styles="mb-6">
          <Text className="text-gray text-lg">{result.description}</Text>
        </BaseCard>
      </ScreenContainer>
    </MainLayout>
  );
};

export default AnalyzePlant;
