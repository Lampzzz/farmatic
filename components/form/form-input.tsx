import clsx from "clsx";
import { icons } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "../icon";

export function FormInput({
  placeholder,
  value,
  onChangeText,
  label,
  isPassword = false,
  styles,
  iconName,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  isPassword?: boolean;
  styles?: string;
  iconName?: keyof typeof icons;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={clsx(styles)}>
      <Text className="text-sm font-medium mb-2">{label}</Text>
      <View className="border border-gray/20 rounded-xl px-4 py-1 flex-row items-center justify-between gap-2">
        {iconName && <Icon name={iconName} size={20} color="#6B7280" />}
        <View className="flex-1">
          <TextInput
            secureTextEntry={isPassword && !isPasswordVisible}
            className="border-0"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
        {isPassword && (
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? "EyeOff" : "Eye"}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
