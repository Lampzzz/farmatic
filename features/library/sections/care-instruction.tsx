import { BaseCard } from "@/components/base-card";
import clsx from "clsx";
import { Text, View } from "react-native";
import { CareInfoRow } from "../components/care-info-row";

interface Props {
  data: any;
}

export const CareInstruction = ({ data }: Props) => {
  return (
    <>
      <View className="mb-2">
        <Text className="text-2xl font-bold text-green-500">
          Care Instructions
        </Text>
      </View>
      <BaseCard styles="mb-6">
        {data?.care_guide?.map((item: any, index: number) => (
          <View
            key={item.type}
            className={clsx(index !== data.care_guide.length - 1 && "mb-4")}
          >
            <CareInfoRow
              icon="Clock"
              title={item.type}
              description={item.description}
            />
          </View>
        ))}
      </BaseCard>
    </>
  );
};
