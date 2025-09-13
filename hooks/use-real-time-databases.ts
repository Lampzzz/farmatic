import { realTimeDB } from "@/services/firebase/config";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

export function useRealtimeDatabase(path: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(realTimeDB, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path]);

  // Add new item
  const add = useCallback(
    async (value: any) => {
      const dbRef = ref(realTimeDB, path);
      return await push(dbRef, value);
    },
    [path]
  );

  // Set/replace data at a node
  const setDataAtPath = useCallback(
    async (value: any) => {
      const dbRef = ref(realTimeDB, path);
      return await set(dbRef, value);
    },
    [path]
  );

  // Update specific fields
  const updateData = useCallback(
    async (updates: any) => {
      const dbRef = ref(realTimeDB, path);
      return await update(dbRef, updates);
    },
    [path]
  );

  // Delete node
  const deleteData = useCallback(async () => {
    const dbRef = ref(realTimeDB, path);
    return await remove(dbRef);
  }, [path]);

  return { data, loading, add, setDataAtPath, updateData, deleteData };
}
