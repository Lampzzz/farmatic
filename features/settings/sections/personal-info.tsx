import { BaseCard } from "@/components/base-card";
import { Divider } from "@/components/divider";
import { ProfileInfoRow } from "@/features/settings/components/profile-info-row";
import { useUserData } from "@/hooks/use-user-data";
import { Text } from "react-native";

export function PersonalInfoSection() {
  const { userData, loading } = useUserData();

  return (
    <BaseCard styles="mb-6">
      <Text className="text-xl font-bold">Personal Information</Text>
      <Divider styles="mt-2" />
      {userData ? (
        <>
          <ProfileInfoRow
            label="Full Name"
            value={userData.name || "N/A"}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Email Address"
            value={userData.email || "N/A"}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Phone Number"
            value={`${userData.phoneNumber || "N/A"}`}
            styles="mt-4"
          />
        </>
      ) : (
        <>
          <ProfileInfoRow
            label="Full Name"
            value={loading ? "Loading..." : "N/A"}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Email Address"
            value={loading ? "Loading..." : "N/A"}
            styles="mt-4"
          />
          <ProfileInfoRow
            label="Phone Number"
            value={loading ? "Loading..." : "N/A"}
            styles="mt-4"
          />
        </>
      )}
    </BaseCard>
  );
}
