import { Image, Text, View } from "react-native";

import clsx from "clsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../icon";

export const AuthLayout = ({
  children,
  title,
  description,
  fontSize = "text-5xl",
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  fontSize?: string;
}) => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 relative">
        <Image
          source={require("@/assets/images/image-background.png")}
          className="absolute inset-0 w-full h-full"
        />

        <View className="flex-1">
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-xl p-4 mb-2">
              <Icon name="Leaf" size={40} color="#5B8908" />
            </View>
            <Text className="text-white text-5xl font-bold mb-2">Farmatic</Text>
            <Text className="text-white text-sm">Smart Plant Care System</Text>
          </View>
          <View className="bg-white w-full p-8 rounded-tr-[5rem]">
            <View className="items-center mb-6">
              <Text className={clsx("font-bold pb-2", fontSize)}>{title}</Text>
              <Text className="text-gray">{description}</Text>
            </View>
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
