import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { forgotPassword } from "@/services/firebase/auth";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";

export const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const { isSuccess } = await forgotPassword(data.email);
      if (!isSuccess) {
        Alert.alert("Error", "Failed to send password reset email");
        return;
      }

      Alert.alert("Success", "Password reset email sent");
      reset();
    } catch (error) {
      Alert.alert("Error", "Failed to send password reset email");
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
            <Text className="text-2xl font-bold">Forgot Password</Text>
            <Text className="text-gray text-sm">
              Enter your email to reset your password
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
                error={errors.email?.message as string}
              />
            )}
          />
          <View className="my-6">
            <Button onPress={handleSubmit(onSubmit)} label="Reset Password" />
          </View>
          <View className="items-center">
            <Pressable onPress={() => router.push("/sign-in")}>
              <Text className="text-gray underline">Back to Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default ForgotPassword;
