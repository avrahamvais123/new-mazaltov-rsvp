// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // חריגים
  const isExcluded = () => {
    // בדיקת סוג הקובץ כדי לנטרל בקשות לקבצים סטטיים
    const isAsset = /\.(png|jpg|jpeg|gif|svg|css|js|ico|woff|woff2|ttf|eot|otf|json)$/.test(
      url.pathname
    );

    // בדיקה אם הבקשה היא ל-API (למשל NextAuth API)
    const isApi = url.pathname.startsWith("/api");

    // בדיקה אם הבקשה היא ל-'/not-found' כדי למנוע לולאה אין סופית
    const isNotFoundPage = url.pathname === "/not-found";

    return isAsset || isApi || isNotFoundPage;
  };

  // אם זו בקשה לקובץ סטטי, ל-API, או לעמוד /not-found, אפשר להמשיך
  if (isExcluded()) {
    return NextResponse.next();
  }

  // פונקציה שבודקת אם העמוד קיים (פונקציה דמה לצורך הדוגמה)
  function isPageExists(pathname) {
    const existingPages = [
      "/",
      "/create-invitation",
      "/test",
      "/rsvp",
      "/verify",
      "/users-management",
      "/settings",
      "/auth/signin",
      "/auth/signout",
      "/auth/signup",
    ]; // נתיבים קיימים
    return existingPages.includes(pathname);
  }

  // בדיקה אם הנתיב לא נמצא
  if (!isPageExists(url.pathname)) {
    console.log("url.pathname: ", url.pathname);
    // הפניה ל-/not-found אם העמוד לא נמצא (משנה גם את הכתובת בדפדפן)
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
