import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { login } from "@/services/firebase/auth";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, Text, ToastAndroid, View } from "react-native";

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "lampazaj@gmail.com", password: "test123" },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { isSuccess, message } = await login(data.email, data.password);

      if (!isSuccess) {
        Alert.alert("Error", message);
        return;
      }

      router.replace("/home");
      ToastAndroid.show(message!, ToastAndroid.SHORT);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <View className="flex-1 items-center justify-center p-6 bg-primary">
        <View className="rounded-xl p-6 w-full my-6 bg-white">
          <View className="items-center mb-6">
            <View className="bg-primary rounded-xl p-4 mb-4">
              <Icon name="Leaf" size={40} color="white" />
            </View>
            <Text className="text-2xl font-bold">Welcome Back</Text>
            <Text className="text-gray text-sm">
              Sign in to continue to your greenhouse
            </Text>
          </View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                styles="mb-4"
                iconName="Mail"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Required",
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                isPassword
                iconName="Lock"
                styles="mb-4"
                error={errors.password?.message}
              />
            )}
          />
          <View className="my-6">
            <Button
              onPress={handleSubmit(onSubmit)}
              label="Login"
              isLoading={isSubmitting}
            />
          </View>
          <View className="items-center">
            <Pressable onPress={() => router.push("/forgot-password")}>
              <Text className="text-gray underline">Forgot Password?</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default SignIn;
