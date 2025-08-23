import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { auth } from "@/services/firebase/config";
import { createStaffMember } from "@/services/firebase/staff";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, ToastAndroid, View } from "react-native";

export default function AddStaffScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "Gmail Dummy",
      email: "gdumy7@gmail.com",
      phoneNumber: "09123456789",
      password: "test123",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    try {
      await createStaffMember(data);
      ToastAndroid.show("Staff member added successfully", ToastAndroid.SHORT);

      // Check if we're still logged in
      if (auth.currentUser) {
        router.back();
      } else {
        // If we're logged out, show a message and redirect to sign in
        Alert.alert(
          "Staff Created Successfully",
          "The staff member has been added to your team. You have been logged out for security reasons. Please log in again.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(auth)/sign-in"),
            },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Add New Staff"
        description="Add a new staff member to your team"
        isHasBack
      />

      <ScrollView
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <Text className="text-blue-800 text-sm">
            <Text className="font-semibold">Note:</Text> After creating a staff
            account, you will be logged out for security reasons. You'll need to
            log in again to continue.
          </Text>
        </View>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Full Name"
              placeholder="Enter full name"
              value={value}
              onChangeText={onChange}
              iconName="User"
              styles="mb-6"
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email Address"
              placeholder="Enter email address"
              value={value}
              onChangeText={onChange}
              iconName="Mail"
              styles="mb-6"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: "Required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Phone Number"
              placeholder="+63"
              value={value}
              onChangeText={onChange}
              iconName="Phone"
              styles="mb-6"
              error={errors.phoneNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Required",
            pattern: {
              value: /^.{8,}$/,
              message: "Minimum 8 characters",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Password"
              placeholder="Enter password"
              value={value}
              onChangeText={onChange}
              iconName="Lock"
              styles="mb-6"
              error={errors.password?.message}
              isPassword
            />
          )}
        />

        <Button
          label="Submit"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </MainLayout>
  );
}
