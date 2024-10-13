import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url); // משיג את כל הפרמטרים מה-URL
    const password = searchParams.get("password"); // מקבל את הערך של הפרמטר 'id'
    console.log("password: ", password);

    const verifyCode = Math.floor(100000 + Math.random() * 900000); // מייצר קוד בן 6 ספרות
    console.log("verifyCode: ", verifyCode);

    resend.emails.send({
      //from: "מזל טוב אישורי הגעה <onboarding@resend.dev>",
      from: "מזל טוב אישורי הגעה <hazmanotmazaltov@gmail.com>",
      to: ["avrahamvais123@gmail.com", "hazmanotmazaltov@gmail.com"],
      subject: "סיסמה חד פעמית",
      html: `<p>סיסמתך החד פעמית היא: <br /> <strong>${verifyCode}</strong></p>`,
    });

    return NextResponse.json({ message: "הגישה אושרה" });
  } catch (error) {
    return NextResponse.json({ message: "הגישה אינה מורשה" }, { status: 500 });
  }
};
