import * as FileSystem from "expo-file-system";

export const saveDocuments = async (uri: string): Promise<string> => {
  if (!uri) {
    throw new Error("saveToDocuments: URI is required.");
  }

  const fileName = uri.split("/").pop();
  if (!fileName) {
    throw new Error(
      `saveToDocuments: Could not extract file name from URI: ${uri}`
    );
  }

  if (!FileSystem.documentDirectory) {
    throw new Error(
      "saveToDocuments: Document directory is not available on this platform."
    );
  }

  const newPath = FileSystem.documentDirectory + fileName;
  await FileSystem.copyAsync({ from: uri, to: newPath });

  return newPath;
};
