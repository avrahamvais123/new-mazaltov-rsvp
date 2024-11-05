// app/api/new-order/route.js

import { NextResponse } from "next/server";

export async function POST(req) {
  // בדיקת ה-Secret (אם הגדרת Secret בווב-הוק)
  const receivedSecret = req.headers.get("x-wc-webhook-signature");
  const expectedSecret = process.env.WC_WEBHOOK_SECRET;

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // קריאת נתוני ההזמנה
  const orderData = await req.json();

  // עיבוד הנתונים או ביצוע פעולות נוספות
  console.log("New order received:", orderData);

  // תשובה ל-WooCommerce שהבקשה התקבלה
  return NextResponse.json({ message: "Order received successfully" });
}
