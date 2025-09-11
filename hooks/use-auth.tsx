import { auth, db } from "@/services/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adminId = user?.isAdmin ? user.id : user?.adminId;

  useEffect(() => {
    let unsubUser: (() => void) | null = null;

    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        setIsAuthenticated(true);

        const userRef = doc(db, "users", firebaseUser.uid);
        unsubUser = onSnapshot(
          userRef,
          (snapshot) => {
            if (snapshot.exists()) {
              setUser({ id: snapshot.id, ...snapshot.data() });
            } else {
              setUser(null);
            }
            setIsLoading(false);
          },
          (err) => {
            setError(err.message);
            setIsLoading(false);
          }
        );
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubUser) unsubUser();
    };
  }, []);

  return { isAuthenticated, user, isLoading, error, adminId };
};
