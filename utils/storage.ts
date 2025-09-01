import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const setItem = (key: string, value: any) => {
  if (typeof value === "string") {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
};

export const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
};

export const removeItem = (key: string) => {
  storage.delete(key);
};

export const hasItem = (key: string) => {
  return storage.contains(key);
};
