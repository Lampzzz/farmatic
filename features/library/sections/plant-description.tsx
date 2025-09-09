import { BaseCard } from "@/components/base-card";
import { Text } from "react-native";

interface Props {
  description?: string;
}

export const PlantDescription = ({ description }: Props) => (
  <BaseCard styles="mb-6">
    <Text className="text-gray text-lg">{description}</Text>
  </BaseCard>
);
