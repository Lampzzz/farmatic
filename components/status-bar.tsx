import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { View } from "lucide-react-native";

export const StatusBar = ({ style }: { style: "light" | "dark" }) => {
  return (
    <View>
      <ExpoStatusBar style={style} />
    </View>
  );
};
