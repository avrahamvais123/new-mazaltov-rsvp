import redis from "@/lib/redis";
import { saveVerificationCode } from "@/lib/verification";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { mjml1 } from "@/lib/customEmails";

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

    const customHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                /* סגנונות יכולים להיות Inline */
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                  border: 1px solid #e0e0e0;
                  border-radius: 10px;
                  background-color: #f9f9f9;
                }
                .header {
                  text-align: center;
                  background-color: #4caf50;
                  color: white;
                  padding: 10px 0;
                  border-radius: 10px 10px 0 0;
                }
                .content {
                  margin: 20px 0;
                  text-align: center;
                }
                .code {
                  display: inline-block;
                  margin: 20px 0;
                  font-size: 24px;
                  font-weight: bold;
                  color: #4caf50;
                }
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>מזל טוב אישורי הגעה</h1>
                </div>
                <div class="content">
                  <p>שלום,</p>
                  <p>קוד האימות שלך הוא:</p>
                  <div class="code">${code}</div>
                  <p>קוד זה יפוג בעוד 10 דקות.</p>
                </div>
                <div class="footer">
                  <p>אם לא ביקשת את הקוד הזה, אנא התעלם מאימייל זה.</p>
                </div>
              </div>
            </body>
          </html>
        `;

    await resend.emails.send({
      from: "מזל טוב אישורי הגעה <support@mazaltov-rsvp.co.il>",
      to: email,
      subject: "קוד אימות",
      html: mjml1?.html,
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
