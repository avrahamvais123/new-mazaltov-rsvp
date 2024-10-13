import { Fredoka, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Main from "./components/Main";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
//import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

const fredoka = Fredoka({ subsets: ["hebrew"] });
const notoSansHebrew = Noto_Sans_Hebrew({ subsets: ["hebrew"] });

export const metadata = {
  title: "מזל טוב אישורי הגעה",
  description: "מערכת אישורי הגעה לאירועים",
};

const localization = {
  userButton: {
    action__manageAccount: "הגדרות",
    action__signOut: "יציאה",
  },
  userProfile: {
    connectedAccountPage: {
      formHint: "דגחכחךדח",
    },
  },
};

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
console.log("GA_TRACKING_ID: ", GA_TRACKING_ID);

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className="*:box-border h-dvh w-dvw">
      <body
        className={cn(
          notoSansHebrew.className,
          "overflow-hidden size-full flex-col-center"
        )}
      >
        <Main>{children}</Main>
        <Analytics />
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
        <Toaster
          theme="light"
          position="top-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "md:min-w-80 flex-center justify-start gap-2 py-3 px-4 rounded-sm",
              title: "",
              description: "",
              actionButton: "py-1 px-2 rounded-sm text-xs",
              cancelButton: "",
              closeButton: "",
              error: "bg-red-50 border border-red-600/20 text-red-600",
              success: "bg-green-50 border border-green-600/20 text-green-600",
              warning:
                "bg-yellow-50 border border-yellow-600/20 text-yellow-600",
              info: "bg-blue-50 border border-blue-600/20 text-blue-600",
            },
          }}
        />
      </body>
    </html>
  );
}

{
  /* <GoogleTagManager gtmId={GA_TRACKING_ID} /> */
}
