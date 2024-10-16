import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();
  const { title, url } = body;

  console.log("User navigated to title:", title);
  console.log("User navigated to:", url);

  // שמירת המידע בעוגיות
  const response = NextResponse.json({ message: "URL logged successfully" });

  // הגדרת עוגיות
  response.cookies.set("navigationData", JSON.stringify({ title, url }), {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24, // 24 שעות
  });

  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
