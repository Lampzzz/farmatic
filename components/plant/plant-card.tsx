import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../icon";

export function PlantCard({
  image,
  name,
  onPress,
  isSelected = false,
  zoneNumber,
}: {
  image: string;
  name: string;
  onPress: () => void;
  isSelected?: boolean;
  zoneNumber?: number;
}) {
  const imageUrl =
    image || "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";

  return (
    <TouchableOpacity onPress={onPress} className="flex-1 rounded-md">
      <View className="rounded-lg overflow-hidden relative h-40">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-full h-40"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
          style={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
          className="absolute bottom-0 left-0 right-0 h-16 "
        />

        {zoneNumber && (
          <View className="absolute top-0 right-0 p-2 bg-primary rounded-bl-lg">
            <Text className="text-white font-bold text-sm">
              Zone {zoneNumber}
            </Text>
          </View>
        )}
        <View className="absolute bottom-0 left-0 right-0 p-2">
          <Text className="text-white font-bold">{name || "N/A"}</Text>
        </View>

        {isSelected && (
          <View className="absolute top-2 right-2 bg-primary rounded-full h-8 w-8 items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
