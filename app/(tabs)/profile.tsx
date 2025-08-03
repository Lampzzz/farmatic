import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { MainLayout } from "@/components/layout/main-layout";
import { ProfileCard } from "@/components/profile-card";
import { ProfileInfoRow } from "@/components/profile-info-row";
import { Image, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <MainLayout>
      <Header
        title="Profile"
        description="Manage your account and preferences"
      />

      <View className="p-6">
        <ProfileCard styles="mb-6 items-center justify-center">
          <Image
            source={{
              uri: "https://picsum.photos/400/300?random=1",
            }}
            className="w-24 h-24 rounded-full mb-2"
            resizeMode="cover"
          />
          <Text className="font-bold text-xl">Mark Coloma</Text>
          <Text className="text-gray ">markcoloma@gmail.com</Text>
          <Text className="text-primary font-semibold">Admin</Text>
          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Icon name="Pencil" size={12} color="#16A34A" />
            <Text className="text-primary">Edit Profile</Text>
          </View>
        </ProfileCard>

        <ProfileCard styles="mb-6" title="Account Information">
          <ProfileInfoRow label="Member Since" value="Aug 17, 2023" />
          <ProfileInfoRow label="Account Type" value="Admin" />
        </ProfileCard>

        <ProfileCard styles="mb-6" title="Staff Management">
          <View className=" mt-4">
            <View className="flex-row flex-1 items-center justify-between mb-4">
              <View>
                <Text className="">James Lampaza</Text>
                <Text className="text-gray">Staff</Text>
              </View>
              <View className="w-4 h-4 bg-primary rounded-full" />
            </View>
            <View className="border-b border-gray/10 mb-2" />
            <View className="flex-row flex-1 items-center justify-between">
              <View>
                <Text className="">Rovic Villaralvo</Text>
                <Text className="text-gray">Staff</Text>
              </View>
              <View className="w-4 h-4 bg-gray rounded-full" />
            </View>
            <View className="border-b border-gray/10 mt-2 mb-4" />
            <View className="flex-row flex-1 items-center justify-center gap-2">
              <Icon name="Plus" size={16} color="#16A34A" />
              <Text className="text-primary font-semibold">
                Add New Staff Member
              </Text>
            </View>
          </View>
        </ProfileCard>

        <ProfileCard styles="mb-6">
          <View className="flex-row items-center justify-start gap-4">
            <Icon name="CircleQuestionMark" size={24} color="#16A34A" />
            <Text className="text-gray">Help Center</Text>
          </View>
          <View className="border-b border-gray/10 my-4" />
          <View className="flex-row items-center justify-start gap-4">
            <Icon name="Settings" size={24} color="#16A34A" />
            <Text className="text-gray">About Farmatic</Text>
          </View>
          <View className="border-b border-gray/10 my-4" />
          <View className="flex-row items-center justify-start gap-4">
            <Icon name="LogOut" size={24} color="#EF4444" />
            <Text className="text-red-500">Log Out</Text>
          </View>
        </ProfileCard>

        {/* <View className="bg-white shadow-md rounded-xl p-4">
          <View className="flex-row items-center justify-center gap-2">
            <Icon name="LogOut" size={24} color="#EF4444" />
            <Text className="text-red-500 font-medium">Log Out</Text>
          </View>
        </View> */}
      </View>
    </MainLayout>
  );
}
