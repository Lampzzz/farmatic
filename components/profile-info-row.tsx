import { Text, View } from "react-native";

interface ProfileInfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export function ProfileInfoRow({
  label,
  value,
  className = "",
}: ProfileInfoRowProps) {
  return (
    <View className={`flex-row items-center justify-between mt-4 ${className}`}>
      <Text className="text-gray">{label}</Text>
      <Text className="text-black font-semibold">{value}</Text>
    </View>
  );
}
