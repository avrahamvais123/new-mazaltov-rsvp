// app/api/new-order/route.js

import { NextResponse } from "next/server";
import { Resend } from "resend";

const BASE_URL = process.env.BASE_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export async function POST(req) {
  // בדיקת ה-Secret (אם הגדרת Secret בווב-הוק)
  const receivedSecret = req.headers.get("x-wc-webhook-signature");
  console.log('receivedSecret: ', receivedSecret);
  const expectedSecret = process.env.WC_WEBHOOK_SECRET;
  console.log('expectedSecret: ', expectedSecret);

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // קריאת נתוני ההזמנה
  const orderData = await req.json();
  console.log('orderData: ', orderData);

  // עיבוד הנתונים או ביצוע פעולות נוספות
  console.log("New order received:", orderData);

  // בניית הקישור לאיפוס סיסמה
  /* const paymentlink = ""

  resend.emails.send({
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
  }); */

  // תשובה ל-WooCommerce שהבקשה התקבלה
  return NextResponse.json({
    message: "Order received successfully",
    orderData,
  });
}
