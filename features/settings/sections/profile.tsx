import { Icon } from "@/components/icon";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function ProfileSection() {
  const { user } = useAuth();

  return (
    <View className="mb-6 items-center justify-center">
      <View className="p-2 bg-white rounded-full items-center justify-center mb-2">
        <View className="overflow-hidden bg-primary items-center justify-center h-36 w-36 rounded-full">
          <Text className="text-white font-bold text-5xl">
            {getInitials(user?.name || "")}
          </Text>
        </View>
      </View>
      <Text className="font-bold text-xl">{user?.name || "N/A"}</Text>
      <Text className="text-gray ">{user?.email}</Text>
      <Text className="text-primary font-semibold">
        {user?.isAdmin ? "Admin" : "Staff"}
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-center gap-2 mt-4"
        onPress={() =>
          router.push(`/user/edit-user-profile?userId=${user?.id}`)
        }
      >
        <Icon name="Pencil" size={12} color="#5B8908" />
        <Text className="text-primary underline">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
