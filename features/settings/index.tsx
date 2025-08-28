import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { AccountInfoSection } from "@/features/settings/sections/account-info";
import { ActionsSection } from "@/features/settings/sections/actions";
import { ProfileSection } from "@/features/settings/sections/profile";
import { StaffManagementSection } from "@/features/settings/sections/staff-management";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { orderBy, where } from "firebase/firestore";
import { ScrollView } from "react-native";

export default function SettingsScreen() {
  const { user } = useAuth();

  const { data: staffMembers, loading: staffLoading } = useRealTimeFetch(
    "users",
    [
      where("adminId", "==", user?.id || ""),
      where("isAdmin", "==", false),
      orderBy("createdAt", "desc"),
    ]
  );

  return (
    <MainLayout>
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <ProfileSection />
        <AccountInfoSection />
        {user?.isAdmin && (
          <StaffManagementSection
            staffMembers={staffMembers}
            loading={staffLoading}
          />
        )}
        <ActionsSection />
      </ScrollView>
    </MainLayout>
  );
}
