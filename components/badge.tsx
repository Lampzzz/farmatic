import clsx from "clsx";
import { Text, View } from "react-native";

type BadgeVariant = "success" | "warning" | "error" | "neutral";
type BadgeSize = "sm" | "md";

const variantStyles: Record<BadgeVariant, { container: string; text: string }> =
  {
    success: { container: "bg-green-500", text: "text-white" },
    warning: { container: "bg-orange-400", text: "text-white" },
    error: { container: "bg-red-500", text: "text-white" },
    neutral: { container: "bg-gray-200", text: "text-gray-700" },
  };

const sizeStyles: Record<BadgeSize, { container: string; text: string }> = {
  sm: { container: "px-2 py-0.5", text: "text-xs" },
  md: { container: "px-2.5 py-1", text: "text-sm" },
};

export function Badge({
  label,
  variant = "neutral",
  size = "sm",
  className,
}: {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}) {
  return (
    <View
      className={clsx(
        "rounded-full items-center justify-center",
        variantStyles[variant].container,
        sizeStyles[size].container,
        className
      )}
    >
      <Text
        className={clsx(
          "font-medium",
          variantStyles[variant].text,
          sizeStyles[size].text
        )}
      >
        {label}
      </Text>
    </View>
  );
}
