import { Text, View } from "react-native";

interface ProfileInfoRowProps {
  label: string;
  value: string;
  styles?: string;
}

export function ProfileInfoRow({
  label,
  value,
  styles = "",
}: ProfileInfoRowProps) {
  return (
    <View className={`flex-row items-center justify-between ${styles}`}>
      <Text className="text-gray">{label}</Text>
      <Text className="text-black font-semibold">{value}</Text>
    </View>
  );
}
