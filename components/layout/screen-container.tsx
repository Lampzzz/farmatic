import {
  Image,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from "react-native";

type ScreenContainerProps = {
  scrollable?: boolean;
  children: React.ReactNode;
  showGradientCircles?: boolean;
} & (ViewProps | ScrollViewProps);

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = false,
  children,
  showGradientCircles = false,
  ...props
}) => {
  if (scrollable) {
    return (
      <ScrollView
        className="flex-1 relative"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        {...(props as ScrollViewProps)}
      >
        {showGradientCircles && (
          <>
            <Image
              source={require("@/assets/images/gradient-circle-1.png")}
              className="absolute top-0 -right-16 w-[250px] h-[250px]"
            />
            <Image
              source={require("@/assets/images/gradient-circle-2.png")}
              className="absolute top-0 -left-10 w-[180px] h-[180px]"
            />
            <Image
              source={require("@/assets/images/gradient-circle-3.png")}
              className="absolute top-12 left-5 w-[300px] h-[300px]"
            />
            <Image
              source={require("@/assets/images/gradient-circle-4.png")}
              className="absolute top-36 right-0 w-[200px] h-[200px]"
            />
          </>
        )}
        {children}
      </ScrollView>
    );
  }

  return (
    <View className="p-6 flex-1 relative" {...(props as ViewProps)}>
      {showGradientCircles && (
        <>
          <Image
            source={require("@/assets/images/gradient-circle-1.png")}
            className="absolute top-0 -right-16 w-[250px] h-[250px]"
          />
          <Image
            source={require("@/assets/images/gradient-circle-2.png")}
            className="absolute top-0 -left-10 w-[180px] h-[180px]"
          />
          <Image
            source={require("@/assets/images/gradient-circle-3.png")}
            className="absolute top-12 left-5 w-[300px] h-[300px]"
          />
          <Image
            source={require("@/assets/images/gradient-circle-4.png")}
            className="absolute top-36 right-0 w-[200px] h-[200px]"
          />
        </>
      )}
      {children}
    </View>
  );
};
