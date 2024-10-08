import { cn } from "@/lib/utils";
import { Target03Icon } from "@hugeicons/react";
import Image from "next/image";
import CallToAction from "./components/CallToAction";

const Span = ({ title, text, icon }) => {
  return (
    <div className="p-4 rounded-sm bg-white/5 backdrop-blur-sm border border-white/10">
      <span className="flex-center justify-start gap-2">
        {icon}
        <h3 className="font-bold mb-2 max-md:text-sm text-white">{title}</h3>
      </span>
      <p className="text-white/50 max-md:text-xs">{text}</p>
    </div>
  );
};

const Title = () => {
  return (
    <div className="mb-10 text-center">
      <p className="md:text-xl mb-4 text-white">ברוכים הבאים!!</p>

      <h1 className="font-bold text-2xl md:text-4xl text-white">
        מזל טוב אישורי הגעה
      </h1>

      <p className="md:text-xl text-white">המקום שלכם לאישורי הגעה</p>

      <div className="flex-center gap-4 mt-4">
        <CallToAction text="להדגמה" navigateTo="/demo" className="" />
        <CallToAction text="לכניסה" navigateTo="signin" className="" />
      </div>
    </div>
  );
};

const Background = () => {
  return (
    <div className="fixed size-full">
      <div className="z-10 absolute inset-0 size-full bg-gradient-to-r from-indigo-950/90 to-fuchsia-900/90" />
      <Image
        src="/images/רקע-בית-1.jpg"
        alt="תמונה של הזמנות לחתונה - רקע לעמוד הבית"
        fill
        className="object-cover z-0"
      />
    </div>
  );
};

export default function Home() {
  const animations = [
    "starryNight",
    "floatingBubbles",
    "gradientWave",
    "particleNetwork",
    "galaxySpiral",
    "rainbowWaves",
    "geometricShapes",
    "fireflies",
    "matrixRain",
    "quantumField",
    "electricStorm",
    "cosmicDust",
    "neonPulse",
    "auroraBorealis",
  ];

  return (
    <div className="size-full flex-col-center justify-start bg-slate-50 overflow-auto">
      <Background />

      <section className="z-10 size-full max-w-3xl flex-col-center max-md:justify-start p-4">
        <Title />

        <p className="text-white text-sm md:text-xl mb-4">
          הנה כמה סיבות טובות לעשות את אישורי ההגעה אצלנו
        </p>

        {/* grid */}
        <div
          className={cn(
            "w-full pb-4 grid gap-2 md:gap-6",
            "md:grid-cols-2 md:grid-rows-2",
            "grid-cols-1 grid-rows-1"
          )}
        >
          <Span
            title="🎯 חוסכים זמן, שומרים על הסדר"
            text={`למה להתעסק עם רשימות ידניות ושיחות טלפון מיותרות? עם "מזל טוב", אישורי
        ההגעה הופכים למשחק ילדים. שלחו הזמנה דיגיטלית מהממת וקבלו אישורי הגעה
        בלחיצת כפתור!`}
          />
          <Span
            title="🎨 עיצוב הזמנות בלתי נשכח"
            text={`מחפשים את ההזמנה שתעשה את ההבדל? אנחנו כאן
          עם עיצובים מרהיבים בהתאמה אישית שישתלבו באופן מושלם עם האירוע שלכם.
          רוצים להזמין ולנהל בסטייל? אתם במקום הנכון.
`}
          />
          <Span
            title="📲 עדכונים בזמן אמת"
            text={`מעקב שוטף וקל על כל המוזמנים שלכם – מי אישר הגעה,
          מי עדיין מתלבט, ומי צריך תזכורת קטנה 😉`}
          />
          <Span
            title="✨ כל מה שצריך לאירוע מושלם במקום אחד"
            text={`אישורי הגעה, עיצוב הזמנות ומערכת
          ניהול קלה ונוחה – הכל כדי שאתם תתמקדו בשמחה.`}
          />
        </div>
      </section>
    </div>
  );
}
