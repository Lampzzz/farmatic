import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { togglePlantBookmark } from "@/services/firebase/firestore/bookmarks";
import { getPlantDetails } from "@/services/perenual";
import { where } from "firebase/firestore";
import { ToastAndroid } from "react-native";
import { CareInstruction } from "../sections/care-instruction";
import { PlantDescription } from "../sections/plant-description";
import { PlantImage } from "../sections/plant-image";
import { PlantProfile } from "../sections/plant-profile";

export const PlantLibraryDetailsScreen = ({ id }: { id: string }) => {
  const { adminId } = useAuth();

  const { data } = useFetch(() => getPlantDetails(id as string), []);
  if (!data) return null;

  const { data: bookmarks } = useRealTimeFetch("plantBookmarks", [
    where("userId", "==", adminId || ""),
    where("plant.id", "==", id as string),
  ]);

  const handleBookmark = () => {
    togglePlantBookmark(
      adminId,
      id as string,
      data?.scientific_name[0] || "",
      data?.default_image?.thumbnail || ""
    );

    if (bookmarks?.length > 0) {
      ToastAndroid.show("Plant Unsaved", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Plant Saved", ToastAndroid.SHORT);
    }
  };

  return (
    <MainLayout>
      <Header
        title={data?.common_name}
        description={data?.scientific_name}
        showBackButton
        rightIcon={bookmarks?.length > 0 ? "BookmarkCheck" : "Bookmark"}
        onRightIconPress={handleBookmark}
      />
      <ScreenContainer scrollable>
        <PlantImage imageUrl={data?.default_image?.original_url} />
        <PlantDescription description={data?.description} />
        <PlantProfile data={data} />
        <CareInstruction data={data} />
      </ScreenContainer>
    </MainLayout>
  );
};
