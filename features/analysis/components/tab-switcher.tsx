import { Bookmark, Clock, icons } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Tab = {
  key: string;
  label: string;
  icon: keyof typeof icons;
};

type TabSwitcherProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

export const TabSwitcher = ({
  tabs,
  activeTab,
  onTabChange,
}: TabSwitcherProps) => {
  return (
    <View className="flex-row bg-white rounded-2xl mb-6 shadow-md">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.key;

        const roundedClass =
          index === 0
            ? "rounded-l-2xl"
            : index === tabs.length - 1
              ? "rounded-r-2xl"
              : "";

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={`flex-1 flex-row items-center justify-center py-3 px-4 ${roundedClass} ${
              isActive ? "bg-green-100" : "bg-white"
            }`}
          >
            {tab.icon === "Bookmark" && (
              <Bookmark size={20} color={isActive ? "#16A34A" : "#6B7280"} />
            )}
            {tab.icon === "Clock" && (
              <Clock size={20} color={isActive ? "#16A34A" : "#6B7280"} />
            )}
            <Text
              className={`ml-2 font-semibold ${isActive ? "text-primary" : "text-gray"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
