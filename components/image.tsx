import clsx from "clsx";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  uri?: string | null;
  styles?: string;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: any;
  fallback?: any;
}

export const Image = ({
  uri,
  styles,
  contentFit = "cover",
  placeholder,
  fallback,
}: Props) => {
  return (
    <View className={clsx(styles, "overflow-hidden rounded-xl")}>
      <ExpoImage
        source={uri ? { uri } : fallback}
        style={{ width: "100%", height: "100%" }}
        contentFit={contentFit}
        placeholder={placeholder}
        transition={300}
        cachePolicy="memory-disk"
      />
      {!uri && !fallback && (
        <ActivityIndicator
          style={{ position: "absolute", top: "50%", left: "50%" }}
          size="small"
          color="#666"
        />
      )}
    </View>
  );
};
