import { Button } from "@/components/form/button";
import { FormInput } from "@/components/form/form-input";
import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/hooks/use-auth";
import { useFetch } from "@/hooks/use-fetch";
import { getUserById, updateUserProfile } from "@/services/firebase/user";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, ToastAndroid } from "react-native";

export default function EditProfileScreen() {
  const params = useLocalSearchParams();
  const targetUserId = params.userId as string;

  const {
    user: currentUserData,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = useAuth();

  const {
    data: targetUserData,
    loading: targetUserLoading,
    error: targetUserError,
  } = useFetch(() => getUserById(targetUserId));

  const userData = targetUserId ? targetUserData : currentUserData;
  const loading = targetUserId ? targetUserLoading : currentUserLoading;
  const error = targetUserId ? targetUserError : currentUserError;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        password: "",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    if (!userData?.id) {
      Alert.alert("Error", "User data not available");
      return;
    }

    try {
      await updateUserProfile(userData.id, data);
      ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title={
          targetUserId && targetUserId !== currentUserData?.id
            ? `Edit ${userData?.name}'s Profile`
            : "Edit Profile"
        }
        description="Update your personal information"
        showBackButton
      />

      <ScrollView
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
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
              placeholder="Enter phone number "
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
          label={
            targetUserId && targetUserId !== currentUserData?.id
              ? "Update Staff Profile"
              : "Update Profile"
          }
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </MainLayout>
  );
}
