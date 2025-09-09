import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";
import { ScreenContainer } from "@/components/layout/screen-container";
import { AccountInfoSection } from "@/features/settings/sections/account-info";
import { ActionsSection } from "@/features/settings/sections/actions";
import { ProfileSection } from "@/features/settings/sections/profile";
import { StaffManagementSection } from "@/features/settings/sections/staff-management";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeFetch } from "@/hooks/use-real-time-fetch";
import { orderBy, where } from "firebase/firestore";

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

  return (
    <MainLayout>
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />
      <ScreenContainer scrollable>
        <ProfileSection />
        <AccountInfoSection />

        {user?.isAdmin && (
          <StaffManagementSection
            staffMembers={staffMembers}
            loading={staffLoading}
          />
        )}
        <ActionsSection />
      </ScreenContainer>
    </MainLayout>
  );
};
