import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BASE_URL = process.env.BASE_URL;
const resend = new Resend(RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const POST = async () => {
  try {
    // יצירת טוקן עם תוקף של שעה (3600 שניות)
    const token = jwt.sign({}, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token: ", token);

    const verificationUrl = `${BASE_URL}/users-management?token=${token}`;

    resend.emails.send({
      from: "מזל טוב אישורי הגעה <support@mazaltov-rsvp.co.il>",
      to: ADMIN_EMAIL,
      subject: "קישור לניהול משתמשים",
      html: `
          <table dir="rtl" width="100%" height="100%" style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; text-align: center;">
            <tr>
              <td>
                <p>לחץ על הקישור הבא כדי להיכנס לעמוד ניהול המשתמשים:</p>
                <a href="${verificationUrl}" style="font-size: 18px; color: #4f46e5;">לאימות החשבון לחץ כאן</a>
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

    return NextResponse.json({ message: "הגישה אושרה" });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
