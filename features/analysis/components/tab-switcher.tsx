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
    <View className="flex-row bg-white rounded-2xl shadow-md overflow-hidden mb-6">
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
            className={`flex-1 flex-row gap-2 items-center justify-center py-3 px-4 ${roundedClass} ${
              isActive ? "bg-primary/20" : "bg-white"
            }`}
          >
            {tab.icon === "Bookmark" && (
              <Bookmark size={20} color={isActive ? "#5B8908" : "#6B7280"} />
            )}
            {tab.icon === "Clock" && (
              <Clock size={20} color={isActive ? "#5B8908" : "#6B7280"} />
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
