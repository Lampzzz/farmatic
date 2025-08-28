import { Text, View } from "react-native";

type InstructionStepProps = {
  stepNumber: number;
  text: string;
};

export function InstructionStep({ stepNumber, text }: InstructionStepProps) {
  return (
    <View className="flex-row items-center mb-2">
      <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
        <Text className="text-white font-bold text-sm">{stepNumber}</Text>
      </View>
      <Text className="text-gray flex-1">{text}</Text>
    </View>
  );
}
