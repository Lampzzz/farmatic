import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function PlantCard({
  image,
  title,
  onPress,
  isSelected = false,
}: {
  image: string;
  title: string;
  onPress: () => void;
  isSelected?: boolean;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1 rounded-md">
      <View
        className={`shadow-md relative h-40 ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
      >
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-40 rounded-md absolute top-0 left-0"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
          style={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
          className="absolute bottom-0 left-0 right-0 h-16 "
        />

        <View className="absolute bottom-0 left-0 right-0 p-2">
          <Text className="text-white font-bold">{title}</Text>
        </View>

        {isSelected && (
          <View className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <Text className="text-white text-xs font-bold">✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
