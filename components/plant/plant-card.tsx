import { Image, Text, View } from "react-native";

export function PlantCard({
  image,
  title,
  datePlanted,
}: {
  image: string;
  title: string;
  datePlanted: string;
}) {
  return (
    <View className="min-w-[47.7%]">
      <View className="shadow-md bg-white rounded-b-lg">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-32 rounded-t-lg"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-primary font-semibold">{title}</Text>
          <Text className="text-gray text-sm">Planted: {datePlanted}</Text>
        </View>
      </View>
    </View>
  );
}
