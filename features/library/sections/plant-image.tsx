import { Image } from "react-native";
import { PlantImagePlaceholder } from "../components/plant-image-placeholder";

interface Props {
  imageUrl?: string;
}

export const PlantImage = ({ imageUrl }: Props) => {
  if (!imageUrl) return <PlantImagePlaceholder />;
  return (
    <Image
      source={{ uri: imageUrl }}
      className="w-full h-80 rounded-xl overflow-hidden mb-6"
      resizeMode="cover"
    />
  );
};
