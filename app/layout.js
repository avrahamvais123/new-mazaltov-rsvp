import { Fredoka, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Main from "./components/Main";
import { cn } from "@/lib/utils";

const fredoka = Fredoka({ subsets: ["hebrew"] });
const noto_Sans_Hebrew = Noto_Sans_Hebrew({ subsets: ["hebrew"] });

export const metadata = {
  title: "מזל טוב אישורי הגעה",
  description: "מערכת אישורי הגעה לאירועים",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className="h-dvh w-dvw">
      <body
        className={cn(
          noto_Sans_Hebrew.className,
          "overflow-hidden size-full flex flex-col items-center"
        )}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
