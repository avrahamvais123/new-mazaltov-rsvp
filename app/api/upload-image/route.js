import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);

    // אסוף את כל הפרמטרים מהבקשה
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // הוסף timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = { ...searchParams, timestamp };

    // חתום רק על פרמטרים קיימים
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_SECRET
    );

    return NextResponse.json({
      signature,
      ...paramsToSign,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    console.log("formData: ", formData);
    const file = formData.get("file");
    const options = JSON.parse(decodeURIComponent(formData.get("options")));
    console.log("options: ", options);
    console.log("file: ", file);

    // Convert file to a Base64 string
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const base64Image = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      upload_preset: "my_upload_preset",
      ...options,
    });

    /* דוגמה לשליחה לא למחוק
      public_id: "new-image",
      folder: "/assets",
      unique_filename: true,
      resource_type: "auto",
      overwrite: true,
    */

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

export const PATCH = async (req) => {
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
};
