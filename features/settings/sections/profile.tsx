import { BaseCard } from "@/components/base-card";
import { Icon } from "@/components/icon";
import { useAuth } from "@/hooks/use-auth";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function ProfileSection() {
  const { user } = useAuth();

  return (
    <BaseCard styles="mb-6 items-center justify-center">
      <View
        className="overflow-hidden bg-gray-200 mb-2"
        style={{ width: 100, height: 100, borderRadius: 50 }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text className="font-bold text-xl">{user?.name || "N/A"}</Text>
      <Text className="text-gray ">{user?.email}</Text>
      <Text className="text-primary font-semibold">
        {user?.isAdmin ? "Admin" : "Staff"}
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-center gap-2 mt-4"
        onPress={() => router.push(`/user/edit-profile?userId=${user?.id}`)}
      >
        <Icon name="Pencil" size={12} color="#16A34A" />
        <Text className="text-primary underline">Edit Profile</Text>
      </TouchableOpacity>
    </BaseCard>
  );
}
