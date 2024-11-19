import redis from "@/lib/redis";
import { saveVerificationCode } from "@/lib/verification";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { indigo, slate } from "tailwindcss/colors";
import { html1, html2 } from "@/app/email-templates/emailTemplates";

// הגדרת Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      {
        status: 400,
      }
    );
  }

  // יצירת קוד אקראי בן 6 ספרות
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // שמירת הקוד ב-Redis עם זמן תפוגה של 10 דקות
    await saveVerificationCode(email, code, 600);
    const storedCode = await redis.get(`verification:${email}`);
    console.log("storedCode: ", storedCode);

    console.log(`Code ${code} sent to email: ${email}`);

    await resend.emails.send({
      from: "מזל טוב אישורי הגעה <support@mazaltov-rsvp.co.il>",
      to: email,
      subject: "קוד אימות",
      html: html2(code),
    });

    return NextResponse.json(
      { message: "Verification code sent!" },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send verification code." },
      { status: 500 }
    );
  }
}
