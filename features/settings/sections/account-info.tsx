import { BaseCard } from "@/components/base-card";
import { Divider } from "@/components/divider";
import { ProfileInfoRow } from "@/components/profile-info-row";
import { useUserData } from "@/hooks/use-user-data";
import { formatDate } from "@/utils/date";
import { Text } from "react-native";

export function AccountInfoSection() {
  const { userData, loading } = useUserData();

  return (
    <BaseCard styles="mb-6">
      <Text className="text-xl font-bold">Account Information</Text>
      <Divider styles="mt-2" />
      {userData ? (
        <>
          <ProfileInfoRow
            label="Member Since"
            value={formatDate(userData.createdAt.toDate())}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Account Type"
            value={userData.isAdmin ? "Admin" : "Staff"}
            styles="mt-4"
          />
        </>
      ) : (
        <>
          <ProfileInfoRow
            label="Member Since"
            value={loading ? "Loading..." : "N/A"}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Account Type"
            value={loading ? "Loading..." : "N/A"}
            styles="mt-4"
          />
        </>
      )}
    </BaseCard>
  );
}
