import clsx from "clsx";
import { ActivityIndicator, Pressable, Text } from "react-native";

export function Button({
  onPress,
  label,
  isLoading,
  variant = "primary",
  styles = "",
  disabled = false,
  textSize = "text-lg",
}: {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  variant?: "primary" | "outline";
  styles?: string;
  disabled?: boolean;
  textSize?: string;
}) {
  const baseClasses = "rounded-lg items-center justify-center";
  const variantClasses =
    variant === "outline"
      ? "border border-primary bg-transparent"
      : "bg-primary";

  const disabledClasses = isLoading ? "opacity-50" : "";

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={{ height: 52 }}
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
    </Pressable>
  );
}
