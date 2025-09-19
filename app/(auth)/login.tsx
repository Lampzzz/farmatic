import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { AuthLayout } from "@/components/layout/auth-layout";
import { login } from "@/services/firebase/auth";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, Text, ToastAndroid, View } from "react-native";

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
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
    <AuthLayout title="Login" description="Sign in to continue ">
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
            styles="mb-2"
            error={errors.password?.message}
          />
        )}
      />
      <View className="my-4">
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Login"
          isLoading={isSubmitting}
        />
      </View>
      <View className="items-center">
        <Pressable onPress={() => router.push("/forgot-password")}>
          <Text className="text-gray">
            Forgot Password? <Text className="text-primary">Click here</Text>
          </Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
};

export default Login;
