// app/api/new-order/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export async function POST(req) {
  // בדיקת ה-Secret (אם הגדרת Secret בווב-הוק)
  const receivedSecret = req.headers.get("x-wc-webhook-signature");
  const expectedSecret = process.env.WC_WEBHOOK_SECRET;

  /* if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } */

  // בדיקת סוג התוכן של הבקשה
  const contentType = req.headers.get("content-type") || "";
  let orderData;

  if (contentType.includes("application/json")) {
    // במקרה של JSON, נשתמש בפענוח JSON רגיל
    orderData = await req.json();
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    // במקרה של URL-encoded, נשתמש ב-URLSearchParams כדי לפענח את הנתונים
    const formData = await req.text();
    orderData = Object.fromEntries(new URLSearchParams(formData));
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
