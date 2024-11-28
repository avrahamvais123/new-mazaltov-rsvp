import axios from "axios";

const uploadPresets = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const addParamsToFormData = (params) => {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

const uploadToCloudinary = async ({ formData, setFiles, id }) => {
  try {
    // מעקב אחרי ההעלאה
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          if (progress == 100) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === id ? { ...f, progress, status: "complete" } : f
              )
            );
          } else {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === id ? { ...f, progress, status: "pending", showModal: true, } : f
              )
            );
          }
          console.log("Cloudinary Upload Progress: ", progress);
        },
      }
    );
    console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.error("Upload error: ", error);
  }
};

const sendToSignature = async (file) => {
  try {
    // פרמטרים לשליחה
    const queryString = new URLSearchParams({
      folder: "mazaltov-rsvp/invitations",
      public_id: "new-image-2",
      overwrite: true,
      upload_preset: uploadPresets,
    }).toString();

    // קבלת כתובת חתומה מראש
    const { data } = await axios.get(`/api/upload-image?${queryString}`);

    const formData = addParamsToFormData({
      ...data,
      file,
      api_key,
    });

    console.log("formData: ", formData);

    return formData;
  } catch (error) {
    console.error("Upload error: ", error);
  }
};

export const uploadImage = async ({ file, id, setFiles }) => {
  try {
    const formData = await sendToSignature(file);
    const results = await uploadToCloudinary({ formData, setFiles, id });
    console.log("results: ", results);
  } catch (error) {
    console.error("error: ", error);
  }
};
