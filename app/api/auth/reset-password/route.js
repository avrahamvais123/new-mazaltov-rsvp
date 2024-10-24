import { getCollection } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    console.log("email: ", email);

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email: email });

    // אם האימייל לא תואם
    if (!user) {
      return NextResponse.json(
        { message: "לא נמצא משתמש עם אימייל זה" },
        { status: 400 }
      );
    }

    // יצירת טוקן עם תוקף של שעה (3600 שניות)
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("token: ", token);

    // בניית הקישור לאיפוס סיסמה
    const resetUrl = `${BASE_URL}/auth/reset-password?token=${token}`;
    console.log("resetUrl: ", resetUrl);

    resend.emails.send({
      from: "מזל טוב אישורי הגעה <support@mazaltov-rsvp.co.il>",
      to: email,
      subject: "קישור לאיפוס סיסמה",
      html: `
          <table dir="rtl" width="100%" height="100%" style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; text-align: center;">
            <tr>
              <td>
                <p>לחץ על הקישור הבא כדי לאפס את סיסמתך:</p>
                <a href="${resetUrl}" style="font-size: 18px; color: #4f46e5;">לאימות החשבון לחץ כאן</a>
                <p>הקישור תקף ל-60 דקות.</p>
              </td>
            </tr>
            <tr>
            <td>
                <p>תודה רבה,<br />צוות מזל טוב אישורי הגעה</p>
              </td>
            </tr>
          </table>
        `,
    });

    return NextResponse.json(
      { message: "קישור נשלח לאימייל שהזמנת" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { message: "שגיאה בשליחת הקישור" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req) => {
  try {
    const { newPassword, email } = await req.json();
    console.log("newPassword: ", newPassword);
    console.log("email: ", email);

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { message: "לא נמצא משתמש עם אימייל זה" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usersCollection.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json(
      { message: "הסיסמה עודכנה בהצלחה" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { message: "שגיאה בעדכון הסיסמה" },
      { status: 500 }
    );
  }
};
