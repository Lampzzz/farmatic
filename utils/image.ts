import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export interface ImagePickerResult {
  uri: string;
  type: string;
  fileName: string;
  fileSize?: number;
}

export const saveToDocuments = async (uri: string): Promise<string> => {
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

export const pickImage = async (): Promise<ImagePickerResult | null> => {
  try {
    // Request permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      throw new Error("Permission to access camera roll is required!");
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const savedUri = await saveToDocuments(asset.uri);

      return {
        uri: savedUri,
        type: asset.type || "image/jpeg",
        fileName: asset.fileName || "plant_image.jpg",
        fileSize: asset.fileSize,
      };
    }

    return null;
  } catch (error) {
    console.error("Error picking image:", error);
    throw error;
  }
};

export const takePhoto = async (): Promise<ImagePickerResult | null> => {
  try {
    // Request permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      throw new Error("Permission to access camera is required!");
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const savedUri = await saveToDocuments(asset.uri);

      return {
        uri: savedUri,
        type: asset.type || "image/jpeg",
        fileName: asset.fileName || "plant_photo.jpg",
        fileSize: asset.fileSize,
      };
    }

    return null;
  } catch (error) {
    console.error("Error taking photo:", error);
    throw error;
  }
};

export const validateImage = (imageUri: string): boolean => {
  // Basic validation - check if URI exists and is not empty
  return !!imageUri && imageUri.trim().length > 0;
};

export const getImageType = (uri: string): string => {
  // Extract file extension from URI
  const extension = uri.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
};
