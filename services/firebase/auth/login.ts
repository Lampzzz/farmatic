import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { createAdmin } from "../user";

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
