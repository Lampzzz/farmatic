import Button from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { Text, View } from "react-native";

export default function AddPlantScreen() {
  const [plant, setPlant] = useState("");
  return (
    <MainLayout>
      <Header
        title="Add Plant"
        description="Add a new plant to your greenhouse"
        isHasBack
      />

      <View className="p-6">
        <View className="bg-white mb-6">
          <Text className="font-medium mb-2">Plant Image</Text>
          <View className="h-40 border border-gray/20 rounded-xl px-4 py-1 items-center justify-center  gap-2">
            <View className="items-center gap-2">
              <Icon name="Camera" size={40} color="#16A34A" />
              <Text className="text-gray">Upload from library</Text>
            </View>
          </View>
        </View>
        <FormInput
          label="Plant name"
          placeholder="Enter plant name"
          value={plant}
          onChangeText={setPlant}
          iconName="Sprout"
          styles="mb-6"
        />
        <FormInput
          label="Date Planted"
          placeholder="MM-DD-YYYY"
          value={plant}
          onChangeText={setPlant}
          iconName="Calendar"
          styles="mb-6"
        />
        <Button label="Save Plant" onPress={() => {}} />
      </View>
    </MainLayout>
  );
}
