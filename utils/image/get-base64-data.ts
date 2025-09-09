import * as FileSystem from "expo-file-system";

export const getBase64Data = async (
  uri?: string,
  base64?: string
): Promise<string> => {
  if (base64) return base64;
  if (!uri) return "";

  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64Data;
};
