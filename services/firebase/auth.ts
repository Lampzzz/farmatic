import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // const ref = collection(db, "users");

    // await addDoc(ref, {
    //   id: result.user.uid,
    //   email,
    //   createdAt: Timestamp.now().toDate().toISOString(),
    // });

    return { isSuccess: true, message: "Login successful" };
  } catch (error: any) {
    let errorMessage;

    if (error instanceof FirebaseError) {
      errorMessage = "Invalid email or password";
    } else {
      errorMessage = error.message;
    }

    return { isSuccess: false, error: errorMessage };
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
