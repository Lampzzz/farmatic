import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export function Button({
  onPress,
  label,
  isLoading,
  variant = "primary",
  styles = "",
  textSize = "text-lg",
  buttonHeight = 52,
  disabled,
}: {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  variant?: "primary" | "outline";
  styles?: string;
  textSize?: string;
  buttonHeight?: number;
  disabled?: boolean;
}) {
  const baseClasses = "rounded-lg items-center justify-center";

  const variantClasses =
    variant === "outline"
      ? "border border-primary bg-transparent"
      : "bg-primary";

  const disabledClasses = isLoading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading || disabled}
      style={{ height: buttonHeight }}
      className={clsx(baseClasses, variantClasses, disabledClasses, styles)}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#16A34A" : "white"}
        />
      ) : (
        <Text
          className={clsx(
            textSize,
            "font-bold",
            variant === "outline" ? "text-primary" : "text-white"
          )}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
