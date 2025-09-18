import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { createStaff } from "@/services/firebase/firestore/users";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, ToastAndroid } from "react-native";

export const AddStaffMemberScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    try {
      await createStaff(data);
      ToastAndroid.show("Staff member added successfully", ToastAndroid.SHORT);
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="Add New Staff"
        description="Add a new staff member to your team"
        showBackButton
      />

      <ScreenContainer scrollable>
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
            minLength: {
              value: 11,
              message: "Phone number must be 11 characters",
            },
            maxLength: {
              value: 11,
              message: "Phone number must be 11 characters",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number must only contain numbers",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Phone Number"
              placeholder="Enter phone number"
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
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, and a number",
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
      </ScreenContainer>
    </MainLayout>
  );
};
