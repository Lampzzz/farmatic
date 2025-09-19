import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { AuthLayout } from "@/components/layout/auth-layout";
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
    <AuthLayout
      title="Forgot Password"
      description="Enter your email to reset your password"
      fontSize="text-3xl"
    >
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
      <View className="my-4">
        <Button onPress={handleSubmit(onSubmit)} label="Reset Password" />
      </View>
      <View className="items-center">
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-gray">Back to Login</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
};

export default ForgotPassword;
