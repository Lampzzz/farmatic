import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async setItem<T>(key: string, value: T) {
    try {
      if (Array.isArray(value)) {
        const existingStr = await AsyncStorage.getItem(key);
        const existingData: T[] = existingStr ? JSON.parse(existingStr) : [];

        const mergedData = [...existingData];
        for (const item of value) {
          if (!existingData.find((e: any) => e.id === (item as any).id)) {
            mergedData.push(item);
          }
        }

        await AsyncStorage.setItem(key, JSON.stringify(mergedData));
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error(`Error saving ${key}`, e);
    }
  },
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Error reading ${key}`, e);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key}`, e);
    }
  },
};
