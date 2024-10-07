// middleware.js
import axios from "axios";
import { NextResponse } from "next/server";

export function middleware(req) {
  const ip = req.headers.get("x-forwarded-for") || req.ip;
  const page = req.nextUrl.pathname;
  const referrer = req.headers.get("referer") || "Direct"; // איסוף ה-referrer

  // שלח את הנתונים ל-API Route באמצעות axios
  const trackVisitUrl = new URL("/api/track/visit", req.url);
  axios.post(trackVisitUrl, {
    ip,
    page,
    referrer,
    timestamp: Date.now(),
  });

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // הפעל את ה-middleware על כל הדפים
};
