import { BaseCard } from "@/components/base-card";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { Loader } from "@/components/loader";
import { analyzePlant } from "@/services/firebase/ai";
import { getBase64Data } from "@/utils/image";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

interface PlantAnalysisScreenProps {
  imageUri: string;
  type: string;
}

export const PlantAnalysisScreen = ({
  imageUri,
  type,
}: PlantAnalysisScreenProps) => {
  const decodedUri = decodeURIComponent(imageUri);

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const base64Data = await getBase64Data(imageUri);

        const result = await analyzePlant({
          plantId: null,
          analyzerId: "",
          adminId: "",
          plantName: "",
          imageUri,
          imageType: type,
          base64: base64Data,
        });

        setResult(result);
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
