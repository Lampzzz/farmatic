import React from "react";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

type ScreenContainerProps = {
  scrollable?: boolean;
  children: React.ReactNode;
} & (ViewProps | ScrollViewProps);

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = false,
  children,
  ...props
}) => {
  if (scrollable) {
    return (
      <ScrollView
        className="p-6 flex-1"
        showsVerticalScrollIndicator={false}
        {...(props as ScrollViewProps)}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View className="p-6 flex-1" {...(props as ViewProps)}>
      {children}
    </View>
  );
};
