import { useCallback, useEffect, useState } from "react";

export function useFetch(fetchFunction: () => Promise<any>, dependencies = []) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const runFetch = useCallback(async () => {
    if (typeof fetchFunction !== "function") return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    runFetch();
  }, dependencies);

  return { data, error, loading, refetch: runFetch };
}
