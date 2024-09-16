import LetterPullup from "@/components/magicui/letter-pullup";
import WordRotate from "@/components/magicui/word-rotate";
import { cn } from "@/lib/utils";
import { Background_Wave } from "./ui/backgrounds";

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
      {/* <Background_Wave /> */}
      home
    </div>
  );
}
