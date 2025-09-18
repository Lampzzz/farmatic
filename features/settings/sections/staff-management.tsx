import { BaseCard } from "@/components/base-card";
import { Divider } from "@/components/divider";
import { Icon } from "@/components/icon";
import clsx from "clsx";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Staff = {
  id: string;
  name: string;
  isActive?: boolean;
};

type Props = {
  staffMembers: Staff[];
  loading: boolean;
  error?: string | null;
};

export function StaffManagementSection({
  staffMembers,
  loading,
  error,
}: Props) {
  return (
    <BaseCard styles="mb-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold">Staff Management</Text>
        <TouchableOpacity
          onPress={() => router.push("/user/add-staff-member")}
          className="bg-primary rounded-full p-2 w-8 h-8 items-center justify-center"
        >
          <Icon name="Plus" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Divider styles="mt-2 mb-4" />
      {loading && staffMembers.length === 0 ? (
        <View className="items-center justify-center py-4">
          <Text className="text-gray">Loading staff members...</Text>
        </View>
      ) : error ? (
        <View className="items-center justify-center py-4">
          <Text className="text-red-500">Error loading staff</Text>
          <Text className="text-gray text-sm">{error}</Text>
        </View>
      ) : staffMembers.length > 0 ? (
        staffMembers.map((staff, index) => (
          <TouchableOpacity
            key={staff.id}
            onPress={() =>
              router.push(`/user/edit-user-profile?userId=${staff.id}`)
            }
          >
            <View
              className={clsx(
                "flex-row items-center justify-between",
                index !== staffMembers.length - 1 && "mb-4"
              )}
            >
              <View>
                <Text className="">{staff.name}</Text>
              </View>
              {/* <View
                className={clsx(
                  "w-4 h-4 rounded-full",
                  staff.isActive ? "bg-primary" : "bg-gray/20"
                )}
              /> */}
              <View>
                <Icon name="ChevronRight" size={16} color="#6B7280" />
              </View>
            </View>
            {index !== staffMembers.length - 1 && (
              <View className="mb-4">
                <Divider />
              </View>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <View className="items-center justify-center" style={{ height: 150 }}>
          <Text className="text-gray">No staff members yet</Text>
        </View>
      )}
    </BaseCard>
  );
}
