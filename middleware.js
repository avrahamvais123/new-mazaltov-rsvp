import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // חריגים
  const isExcluded = () => {
    const isAsset =
      /\.(png|jpg|jpeg|gif|svg|css|js|ico|woff|woff2|ttf|eot|otf|json|mp3|wav|ogg|mp4|webm|avi)$/.test(
        url.pathname
      );

    const isApi = url.pathname.startsWith("/api");
    const isNotFoundPage = url.pathname === "/not-found";

    return isAsset || isApi || isNotFoundPage;
  };

  if (isExcluded()) {
    return NextResponse.next();
  }

  const existingPages = [
    "/",
    "/create-event",
    "/invitation",
    "/visitor-tracking",
    "/animated-invitation",
    "/video-invitation",
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

  const parentRoutes = [
    "/editor",
    "/catalog",
    "/product",
    "/video-invitations",
  ];

  function isPageExists(pathname) {
    if (existingPages.includes(pathname)) {
      return true;
    }

    return parentRoutes.some((parentRoute) => pathname.startsWith(parentRoute));
  }

  if (!isPageExists(url.pathname)) {
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// הגדרה להחלת middleware על כל הנתיבים
export const config = {
  matcher: "/:path*",
};
