import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const options = JSON.parse(decodeURIComponent(formData.get("options")));
    console.log("file: ", file);

    /* const { public_id, folder, unique_filename, overwrite, resource_type } = options;
    console.log('resource_type: ', resource_type);
    console.log('overwrite: ', overwrite);
    console.log('unique_filename: ', unique_filename);
    console.log('folder: ', folder);
    console.log('public_id: ', public_id); */

    // Convert file to a Base64 string
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const base64Image = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      upload_preset: "my_upload_preset",
      ...options
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
    const response = await cloudinary.api.rename_folder(
      "old-folder",
      "new-folder"
    );

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
