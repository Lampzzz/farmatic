import { BaseCard } from "@/components/base-card";
import { SettingsItem } from "@/features/settings/components/settings-item";
import { logout } from "@/services/firebase/auth";
import { Alert } from "react-native";

export function ActionsSection() {
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
    <BaseCard>
      <SettingsItem icon="Settings" title="About Farmatic" onPress={() => {}} />
      <SettingsItem
        icon="ArchiveRestore"
        title="Archive"
        onPress={() => {}}
        showBorder={false}
      />
      {/* <SettingsItem
        icon="LogOut"
        title="Log Out"
        iconColor="#EF4444"
        titleColor="text-red-500"
        onPress={handleLogout}
        showBorder={false}
      /> */}
    </BaseCard>
  );
}
