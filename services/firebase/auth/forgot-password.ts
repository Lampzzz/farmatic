import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config";

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { isSuccess: true, message: "Password reset email sent" };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
};
