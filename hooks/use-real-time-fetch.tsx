import { db } from "@/services/firebase/config";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useRealTimeFetch<T = any>(
  path: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, path), ...constraints);
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as T
      );
      setData(docs);
      setLoading(false);
    });

    return () => unsub();
  }, [path, JSON.stringify(constraints)]);

  return { data, loading };
}
