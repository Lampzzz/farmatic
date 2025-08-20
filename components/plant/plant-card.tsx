import { Image, Text, TouchableOpacity, View } from "react-native";

export function PlantCard({
  image,
  title,
  datePlanted,
  onPress,
}: {
  image: string;
  title: string;
  datePlanted?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1">
      <View className="shadow-md relative h-40">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-40 rounded-md absolute top-0 left-0"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-white font-bold">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
