import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";
import { createAdmin } from "./user";

export const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user.uid) await createAdmin(result.user.uid, email);

    return { isSuccess: true, message: "Login successful" };
  } catch (error: any) {
    let errorMessage;

    if (error instanceof FirebaseError) {
      errorMessage = "Invalid email or password";
    } else {
      errorMessage = error.message;
    }

    return { isSuccess: false, message: errorMessage };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    router.replace("/sign-in");
    return { isSuccess: true, message: "Logout successful" };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { isSuccess: true, message: "Password reset email sent" };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
};
