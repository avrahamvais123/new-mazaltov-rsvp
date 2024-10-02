import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const POST = async (req) => {
  try {
    console.log("req: ", req);
    const res = await req.json();

    console.log("res: ", res);

    const uploadResponse = await cloudinary.uploader.upload(res, {
      upload_preset: "your_upload_preset",
    });

    console.log("uploadResponse: ", uploadResponse);

    return NextResponse.json(
      { data: uploadResult, message: "שגיאת שרת" },
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
