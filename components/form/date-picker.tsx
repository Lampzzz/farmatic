// import { Icon } from "@/components/icon";
// import { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { DatePickerModal } from "react-native-paper-dates";

// type Props = {
//   label: string;
//   value?: string;
//   onChange: (date: string) => void;
//   error?: string;
//   placeholder?: string;
// };

// export function DatePicker({
//   label,
//   value,
//   onChange,
//   error,
//   placeholder = "MM-DD-YYYY",
// }: Props) {
//   const [open, setOpen] = useState(false);

//   const handleConfirm = (params: { date: Date }) => {
//     setOpen(false);
//     if (params.date) {
//       const formatted = params.date.toISOString().split("T")[0];
//       onChange(formatted);
//     }
//   };

//   return (
//     <View className="mb-6">
//       <Text className="font-medium mb-2">{label}</Text>
//       <TouchableOpacity
//         onPress={() => setOpen(true)}
//         className="flex-row items-center justify-between border border-gray/20 rounded-xl px-4 py-3 bg-white"
//       >
//         <Text className={`text-base ${value ? "text-black" : "text-gray"}`}>
//           {value || placeholder}
//         </Text>
//         <Icon name="Calendar" size={20} color="#16A34A" />
//       </TouchableOpacity>

//       {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

//       <DatePickerModal
//         locale="en"
//         mode="single"
//         visible={open}
//         date={value ? new Date(value) : undefined}
//         onDismiss={() => setOpen(false)}
//         onConfirm={handleConfirm}
//       />
//     </View>
//   );
// }
