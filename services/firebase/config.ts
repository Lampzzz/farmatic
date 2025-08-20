import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyC31rJQlCDvhoYYQP654m1LmsIG0mMBaf4",
  authDomain: "farmatic-f3097.firebaseapp.com",
  projectId: "farmatic-f3097",
  storageBucket: "farmatic-f3097.firebasestorage.app",
  messagingSenderId: "676394454104",
  appId: "1:676394454104:web:8e0401463c5e1804d8ce2d",
  measurementId: "G-5XEG22YQL6",
};

const app = initializeApp(config);

const db = getFirestore(app);
const storage = getStorage(app);

let auth: any;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error: any) {
  if (error.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    console.error("Firebase Auth Error:", error);
    auth = getAuth(app);
  }
}

export { app, auth, db, storage };
