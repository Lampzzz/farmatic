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
  error,
  disabled = false,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  isPassword?: boolean;
  styles?: string;
  iconName?: keyof typeof icons;
  error?: string;
  disabled?: boolean;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={clsx(styles)}>
      {label && <Text className="font-medium mb-2">{label}</Text>}
      <View
        className={clsx(
          " border border-gray/20 rounded-xl px-4 py-1 flex-row items-center justify-between gap-2",
          disabled ? "bg-gray/10" : "bg-white"
        )}
      >
        {iconName && <Icon name={iconName} size={20} color="#6B7280" />}
        <View className="flex-1">
          <TextInput
            secureTextEntry={isPassword && !isPasswordVisible}
            className="border-0"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            editable={!disabled}
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
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
