import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../config";

export const logout = async () => {
  try {
    await signOut(auth);
    router.replace("/login");

    return { isSuccess: true, message: "Logout successful" };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
};
