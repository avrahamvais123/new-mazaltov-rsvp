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

  // מערך של נתיבים קיימים
  const existingPages = [
    "/",
    "/create-event",
    "/invitation",
    "/visitor-tracking",
    "/test",
    "/katzav",
    "/berenshtein",
    "/pricing",
    "/log",
    "/rsvp",
    "/verify",
    "/users-management",
    "/settings",
    "/auth/signin",
    "/auth/signout",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  // מערך של נתיבים שיש להם תתי-נתיבים
  const parentRoutes = [
    "/editor",
    "/catalog", // יכול להכיל תתי נתיבים
    "/product", // נתיב דוגמה נוסף
  ];

  // פונקציה שבודקת אם הנתיב קיים
  function isPageExists(pathname) {
    // בדיקה אם הנתיב הוא אחד מהעמודים הקיימים
    if (existingPages.includes(pathname)) {
      return true;
    }

    // בדיקה אם הנתיב הוא תת-נתיב של אחד הנתיבים שיש להם תתי-נתיבים
    return parentRoutes.some((parentRoute) => pathname.startsWith(parentRoute));
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
