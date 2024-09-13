import LetterPullup from "@/components/magicui/letter-pullup";
import WordRotate from "@/components/magicui/word-rotate";
import { cn } from "@/lib/utils";

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
    <div className="size-full flex-col-center bg-indigo-900">
      {/* <LetterPullup
        words="הזמנות מזל טוב"
        delay={0.15}
        className="!text-9xl text-white"
      /> */}
    </div>
  );
}
