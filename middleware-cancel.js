export { default } from "next-auth/middleware";

// האזורים המוגנים
// שלא יהיה אפשר להיכנס אליהם ללא התחברות
export const config = { matcher: ["/rsvp"] };

/* matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ], */
