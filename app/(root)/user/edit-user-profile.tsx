import { EditUserProfileScreen } from "@/features/settings";
import { useLocalSearchParams } from "expo-router";

const EditUserProfile = () => {
  const { userId } = useLocalSearchParams();
  return <EditUserProfileScreen userId={userId as string} />;
};

export default EditUserProfile;
