import * as ImagePicker from "expo-image-picker";
import { saveDocuments } from "./save-documents";

export const pickImage = async () => {
  try {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      // Signal to callers that this failure is specifically a permission denial
      throw new Error("PERMISSION_DENIED");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const savedUri = await saveDocuments(asset.uri);

      return {
        uri: savedUri,
        type: asset.type || "image/jpeg",
        fileName: asset.fileName || "plant_image.jpg",
        fileSize: asset.fileSize,
      };
    }

    return null;
  } catch (error: any) {
    // Re-throw permission errors so the UI can react appropriately
    if (
      error &&
      (error.message === "PERMISSION_DENIED" ||
        error.code === "PERMISSION_DENIED")
    ) {
      throw error;
    }
    console.error("Error picking image:", error);
    return null;
  }
};
