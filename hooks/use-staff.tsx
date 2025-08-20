import { auth, db } from "@/services/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "staff";
  createdAt: any;
  phoneNumber?: string;
  isActive?: boolean;
}

export const useStaff = () => {
  const [staffMembers, setStaffMembers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setStaffMembers([]);
          setLoading(false);
          return;
        }

        // Query users collection for staff members
        const staffQuery = query(
          collection(db, "users"),
          where("role", "==", "staff")
        );

        const querySnapshot = await getDocs(staffQuery);
        const staffData: StaffUser[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.role === "staff") {
            staffData.push({ id: doc.id, ...data } as StaffUser);
          }
        });

        setStaffMembers(staffData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch staff members"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  return { staffMembers, loading, error };
};
