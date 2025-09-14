import clsx from "clsx";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "../icon";

export function FormSelect({
  placeholder,
  value,
  onChange,
  label,
  styles,
  options,
  error,
  iconName,
}: {
  placeholder: string;
  value: number;
  onChange: (val: string) => void;
  label?: string;
  styles?: string;
  options: { label: string; value: number }[];
  error?: string;
  iconName?: keyof typeof icons;
}) {
  return (
    <View className={clsx(styles)}>
      {label && <Text className="font-medium mb-2">{label}</Text>}
      <View className="bg-white border border-gray/20 rounded-xl px-4 py-1 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <View className="flex-row items-center gap-2 flex-1">
            {iconName && <Icon name={iconName} size={20} color="#6B7280" />}
            <View className="flex-1">
              <RNPickerSelect
                onValueChange={(val) => onChange(val)}
                value={value}
                items={options}
                placeholder={{ label: placeholder, value: null }}
                style={{
                  inputIOS: { fontSize: 16, paddingVertical: 8 },
                  inputAndroid: { fontSize: 16, paddingVertical: 8 },
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          </View>
          <Icon name="ChevronDown" size={20} color="#6B7280" />
        </View>
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
