export const cloudinaryUpload = async (uri: string) => {
  const data = new FormData();

  data.append("file", {
    uri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);

  data.append("upload_preset", "farmatic");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/duzunjnsg/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (result.secure_url) {
    return result.secure_url;
  } else {
    console.error("Cloudinary upload failed", result);
    return null;
  }
};
