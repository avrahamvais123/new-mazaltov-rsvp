import { verifyCode } from "@/lib/verification";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json(
      { error: "Email and code are required" },
      {
        status: 400,
      }
    );
  }

  try {
    const isValid = await verifyCode(email, code);

    if (isValid) {
      return NextResponse.json({ message: "הקוד אומת בהצלחה!" });
    } else {
      return NextResponse.json(
        { error: "הקוד אינו נכון או אינו תקף" },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "אירעה שגיאה" },
      {
        status: 500,
      }
    );
  }
}
