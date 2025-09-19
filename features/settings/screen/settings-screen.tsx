import { BaseCard } from "@/components/base-card";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { AccountInfoSection } from "@/features/settings/sections/account-info";
import { ActionsSection } from "@/features/settings/sections/actions";
import { PersonalInfoSection } from "@/features/settings/sections/personal-info";
import { ProfileSection } from "@/features/settings/sections/profile";
import { StaffManagementSection } from "@/features/settings/sections/staff-management";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { logout } from "@/services/firebase/auth";
import { orderBy, where } from "firebase/firestore";
import { Alert, Text, TouchableOpacity } from "react-native";

export const SettingsScreen = () => {
  const { user } = useAuth();

  const { data: staffMembers, loading: staffLoading } = useRealTimeFetch(
    "users",
    [
      where("adminId", "==", user?.id || ""),
      where("isAdmin", "==", false),
      orderBy("createdAt", "desc"),
    ]
  );

  const handleLogout = async () => {
    return Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => await logout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <MainLayout>
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />
      <ScreenContainer scrollable>
        {/* <View className="my-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <Icon name="Settings" size={28} color="#5B8908" />
            <Text className="text-3xl font-bold">Settings</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/user/edit-user-profile")}
          >
            <Icon name="SquarePen" size={28} color="#5B8908" />
          </TouchableOpacity>
        </View> */}
        <ProfileSection />
        <PersonalInfoSection />
        <AccountInfoSection />

        {user?.isAdmin && (
          <StaffManagementSection
            staffMembers={staffMembers}
            loading={staffLoading}
          />
        )}
        <ActionsSection />

        <BaseCard styles="mt-6" padding="p-4">
          <TouchableOpacity
            className="flex-row items-center justify-center gap-4"
            onPress={handleLogout}
          >
            <Icon name="LogOut" size={24} color="#EF4444" />
            <Text className="text-red-500">Log Out</Text>
          </TouchableOpacity>
        </BaseCard>
      </ScreenContainer>
    </MainLayout>
  );
};
