import Button from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <MainLayout>
      <View className="flex-1 items-center justify-center p-6 bg-primary">
        <View className="rounded-xl p-6 w-full my-6 bg-white">
          <View className="items-center mb-6">
            <View className="bg-primary rounded-xl p-4 mb-4">
              <Icon name="Leaf" size={40} color="white" />
            </View>
            <Text className="text-2xl font-bold">Forgot Password</Text>
            <Text className="text-gray text-sm">
              Enter your email to reset your password
            </Text>
          </View>
          <FormInput
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            iconName="Mail"
          />
          <View className="my-6">
            <Button
              onPress={() => router.push("/home")}
              label="Reset Password"
            />
          </View>
          <View className="items-center">
            <Pressable onPress={() => router.push("/sign-in")}>
              <Text className="text-gray">Back to Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
