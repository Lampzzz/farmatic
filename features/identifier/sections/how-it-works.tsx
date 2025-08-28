import { BaseCard } from "@/components/base-card";
import { Text, View } from "react-native";
import { InstructionStep } from "../components/instruction-step";

export function HowItWorks() {
  return (
    <BaseCard styles="mb-6">
      <Text className="text-primary text-xl font-bold mb-4">How It Works</Text>

      <View className="space-y-4">
        <InstructionStep
          stepNumber={1}
          text="Take a clear photo of your plant or upload an existing image"
        />
        <InstructionStep
          stepNumber={2}
          text="Our AI will analyze the image and identify the plant species"
        />
        <InstructionStep
          stepNumber={3}
          text="Get detailed care information and tips for your plant"
        />
      </View>
    </BaseCard>
  );
}
