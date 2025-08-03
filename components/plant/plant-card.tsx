import { Image, Text, View } from "react-native";

export function PlantCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-1 min-w-[45%]">
      <View className="shadow-lg bg-white rounded-b-lg">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-36 rounded-t-lg"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-primary font-semibold">{title}</Text>
          <Text className="text-gray text-sm">{description}</Text>
        </View>
      </View>
    </View>
  );
}
