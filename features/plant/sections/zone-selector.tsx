import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onChange: (value: number) => void;
  value: number;
}

export const ZoneSelector = ({ onChange, value }: Props) => {
  return (
    <View className="bg-white mb-6">
      <Text className="font-medium mb-2">Zone</Text>
      <View className="flex-row gap-4">
        {[1, 2].map((zone) => (
          <TouchableOpacity
            key={zone}
            onPress={() => onChange(zone)}
            className={`flex-1 items-center justify-center px-4 py-3 rounded-lg border ${
              value === zone
                ? "bg-primary border-primary"
                : "bg-gray/10 border-gray/20"
            }`}
          >
            <Text
              className={`${value === zone ? "text-white" : "text-gray-700"}`}
            >
              Zone {zone}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
