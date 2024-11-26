//import { v2 as cloudinary } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

/* // Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
}); */

export const POST = async (req) => {
  console.log("req: ", req);
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const public_id = formData.get("public_id");
    const folder = formData.get("folder");
    console.log("file: ", file);
    console.log("public_id: ", public_id);
    console.log("folder: ", folder);

    // Convert file to a Base64 string
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const base64Image = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      upload_preset: "my_upload_preset",
      folder: folder,
      unique_filename: true,
      public_id: public_id,
      resource_type: "auto",
      overwrite: true,
    });

    return NextResponse.json(
      { data: uploadResponse, message: "Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        message: "שגיאת שרת",
      }),
      {
        status: 500,
      }
    );
  }
};

export async function PATCH(req) {
  try {
    // קבלת נתוני הבקשה
    const body = await req.json();
    console.log("body: ", body);

    const { oldFolder, newFolder } = body;

    if (!oldFolder || !newFolder) {
      return NextResponse.json(
        { message: "Missing folder names" },
        { status: 400 }
      );
    }
    // שליפת כל הקבצים בתיקיה הישנה
    const response = await cloudinary.api.rename_folder("old-folder", "new-folder");

    console.log("response: ", response);

    return NextResponse.json({
      message: "Folder moved successfully",
    });
  } catch (error) {
    console.error("Error moving folder:", error);
    return NextResponse.json(
      { message: "Error moving folder", error },
      { status: 500 }
    );
  }
}
