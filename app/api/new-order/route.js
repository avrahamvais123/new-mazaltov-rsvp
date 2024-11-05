// app/api/new-order/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WC_WEBHOOK_SECRET = process.env.WC_WEBHOOK_SECRET;
const resend = new Resend(RESEND_API_KEY);

export async function POST(req) {
  // קריאת תוכן הבקשה כטקסט לצורך חישוב ה-HMAC
  const requestBody = await req.text();

  // בדיקת ה-Secret
  const receivedSecret = req.headers.get("x-wc-webhook-signature");
  console.log("receivedSecret: ", receivedSecret);

  // חישוב ה-HMAC באמצעות הסוד שלנו
  const hmac = crypto
    .createHmac("sha256", WC_WEBHOOK_SECRET)
    .update(requestBody, "utf8")
    .digest("base64");

  console.log("calculated HMAC: ", hmac);

  // בדיקת ההתאמה בין החתימה שקיבלנו לבין זו שחישבנו
  if (receivedSecret !== hmac) {
    console.log(
      "Authentication failed: calculated HMAC does not match received signature."
    );
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // קריאת הנתונים מהבקשה על סמך סוג התוכן
  const contentType = req.headers.get("content-type") || "";
  let orderData;

  if (contentType.includes("application/json")) {
    // במקרה של JSON, נשתמש בפענוח JSON רגיל
    orderData = JSON.parse(requestBody);
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    // במקרה של URL-encoded, נשתמש ב-URLSearchParams כדי לפענח את הנתונים
    orderData = Object.fromEntries(new URLSearchParams(requestBody));
  } else {
    return NextResponse.json(
      { message: "Unsupported content type" },
      { status: 415 }
    );
  }

  console.log("New order received:", orderData);

  // שליחת המייל אם יש צורך
  const email = orderData.billing.email; // נניח שכתובת האימייל נמצאת בשדה זה
  const paymentlink = `https://pages.greeninvoice.co.il/payments/links/447b0484-8d47-4bd5-8724-f0d95daacd32`;

  await resend.emails.send({
    from: "הזמנות מזל טוב <support@mazaltov-rsvp.co.il>",
    to: email,
    subject: "קישור לתשלום",
    html: `
      <table dir="rtl" width="100%" height="100%" style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; text-align: center;">
        <tr>
          <td>
            <p>לחץ על הקישור למעבר לעמוד התשלום:</p>
            <a href="${paymentlink}" style="font-size: 18px; color: #4f46e5;">לתשלום לחץ כאן</a>
          </td>
        </tr>
        <tr>
          <td>
            <p>בברכה,<br />צוות מזל טוב</p>
          </td>
        </tr>
      </table>
    `,
  });

  // תשובה ל-WooCommerce שהבקשה התקבלה
  return NextResponse.json({
    message: "Order received successfully",
    orderData,
  });
}
