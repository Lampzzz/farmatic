import Button from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MainLayout>
      <View className="flex-1 items-center justify-center p-6">
        <View className="items-center justify-center">
          <View className="bg-primary rounded-xl p-4 mb-4">
            <Icon name="Leaf" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold">Farmatic</Text>
          <Text className="text-gray text-sm">Smart Greenhouse Management</Text>
        </View>
        <View className="bg-white shadow-md rounded-xl p-6 w-full my-6">
          <View className="items-center mb-6">
            <Text className="text-2xl font-bold">Welcome Back</Text>
            <Text className="text-gray text-sm">
              Sign in to continue to your greenhouse
            </Text>
          </View>
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            styles="mb-4"
            iconName="Mail"
          />
          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
            iconName="Lock"
          />
          <View className="flex-row items-center justify-end my-6">
            <Pressable>
              <Text className="text-sm text-gray">Forgot Password?</Text>
            </Pressable>
          </View>
          <Button onPress={() => router.push("/")} label="Login" />
          <View className="flex-row items-center justify-center my-4">
            <Text className="text-sm text-gray">Don't have an account?</Text>
            <Pressable>
              <Text className="text-sm text-primary ml-1">Sign up</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center justify-center gap-2 px-6 text-wrap">
          <Text className="text-sm text-gray text-center">
            By logging in, you agree to our{" "}
            <Text className="text-sm text-primary">Terms of Service</Text> and{" "}
            <Text className="text-sm text-primary">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </MainLayout>
  );
}
