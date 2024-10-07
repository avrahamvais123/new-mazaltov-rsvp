import { Fredoka, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Main from "./components/Main";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
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

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className="*:box-border h-dvh w-dvw">
      <body
        className={cn(
          notoSansHebrew.className,
          "overflow-hidden size-full flex flex-col items-center"
        )}
      >
        <Main>{children}</Main>
        <Analytics />
        <GoogleTagManager gtmId="GTM-XYZ" />
      </body>
    </html>
  );
}
