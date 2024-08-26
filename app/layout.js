import { Fredoka, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Main from "./components/Main";

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
        className={(fredoka.className, "size-full flex flex-col items-center")}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
