import { db } from "@/services/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserById = (userId: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData({ id: userDoc.id, ...userDoc.data() } as User);
        } else {
          setError("User data not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, error };
};
