import { Fredoka, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Main from "./components/Main";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
//import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

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
      </body>
    </html>
  );
}

{
  /* <GoogleTagManager gtmId={GA_TRACKING_ID} /> */
}
