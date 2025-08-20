import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { ProfileCard } from "@/components/profile-card";
import { ProfileInfoRow } from "@/components/profile-info-row";
import { SettingsItem } from "@/components/settings-item";
import { useStaff } from "@/hooks/use-staff";
import { useUserData } from "@/hooks/use-user-data";
import { logout } from "@/services/firebase/auth";
import { formatDate } from "@/utils/date-utils";
import clsx from "clsx";
import { Alert, Image, ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
  const { userData, loading, error } = useUserData();
  const { staffMembers, loading: staffLoading, error: staffError } = useStaff();

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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <ProfileCard styles="mb-6 items-center justify-center">
          {loading ? (
            <View className="items-center justify-center">
              <Text className="text-gray">Loading profile...</Text>
            </View>
          ) : error ? (
            <View className="items-center justify-center">
              <Text className="text-red-500">Error loading profile</Text>
              <Text className="text-gray text-sm">{error}</Text>
            </View>
          ) : userData ? (
            <>
              <Image
                source={{
                  uri: "https://picsum.photos/400/300?random=1",
                }}
                className="w-24 h-24 rounded-full mb-2"
                resizeMode="cover"
              />
              <Text className="font-bold text-xl">{userData.name}</Text>
              <Text className="text-gray ">{userData.email}</Text>
              <Text className="text-primary font-semibold">
                {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
              </Text>
              <View className="flex-row items-center justify-center gap-2 mt-4">
                <Icon name="Pencil" size={12} color="#16A34A" />
                <Text className="text-primary">Edit Profile</Text>
              </View>
            </>
          ) : (
            <View className="items-center justify-center">
              <Text className="text-gray">No user data available</Text>
            </View>
          )}
        </ProfileCard>

        <ProfileCard styles="mb-6" title="Account Information">
          {userData ? (
            <>
              <ProfileInfoRow
                label="Member Since"
                value={formatDate(userData.createdAt.toDate())}
              />
              <ProfileInfoRow
                label="Account Type"
                value={
                  userData.role.charAt(0).toUpperCase() + userData.role.slice(1)
                }
              />
            </>
          ) : (
            <>
              <ProfileInfoRow
                label="Member Since"
                value={loading ? "Loading..." : "N/A"}
              />
              <ProfileInfoRow
                label="Account Type"
                value={loading ? "Loading..." : "N/A"}
              />
            </>
          )}
        </ProfileCard>

        <ProfileCard styles="mb-6" title="Staff Management">
          <View className="mt-4">
            {staffLoading ? (
              <View className="items-center justify-center py-4">
                <Text className="text-gray">Loading staff members...</Text>
              </View>
            ) : staffError ? (
              <View className="items-center justify-center py-4">
                <Text className="text-red-500">Error loading staff</Text>
                <Text className="text-gray text-sm">{staffError}</Text>
              </View>
            ) : staffMembers.length > 0 ? (
              staffMembers.map((staff, index) => (
                <View key={staff.id}>
                  <View className="flex-row items-center justify-between mb-4">
                    <View>
                      <Text className="">{staff.name}</Text>
                    </View>
                    <View
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        staff.isActive ? "bg-primary" : "bg-gray/20"
                      )}
                    />
                  </View>
                  {index < staffMembers.length - 1 && (
                    <View className="border-b border-gray/10 mb-4" />
                  )}
                </View>
              ))
            ) : (
              <View className="items-center justify-center py-4">
                <Text className="text-gray">No staff members yet</Text>
              </View>
            )}

            {/* <View className="border-b border-gray/10 mt-2 mb-4" />
            <Pressable
              onPress={() => router.push("/staff/add-staff")}
              className="flex-row flex-1 items-center justify-center gap-2"
            >
              <Icon name="Plus" size={16} color="#16A34A" />
              <Text className="text-primary font-semibold">
                Add New Staff Member
              </Text>
            </Pressable> */}
          </View>
        </ProfileCard>

        <ProfileCard styles="">
          <SettingsItem
            icon="CircleQuestionMark"
            title="Help Center"
            onPress={() => {
              // Handle help center navigation
            }}
          />
          <SettingsItem
            icon="Settings"
            title="About Farmatic"
            onPress={() => {
              // Handle about navigation
            }}
          />
          <SettingsItem
            icon="ArchiveRestore"
            title="Archive"
            onPress={() => {
              // Handle archive navigation
            }}
          />
          <SettingsItem
            icon="LogOut"
            title="Log Out"
            iconColor="#EF4444"
            titleColor="#EF4444"
            onPress={handleLogout}
            showBorder={false}
          />
        </ProfileCard>
      </ScrollView>
    </MainLayout>
  );
}
