"use client";

import { cn } from "@/lib/utils";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import GoldFrame from "./slide-1/GoldFrame2";
import BigMandala from "./slide-1/BigMandala";
import HalfBackground from "./slide-1/HalfBackground";
import Ornaments from "./slide-1/Ornaments";
import SmallMandala from "./slide-1/SmallMandala";
import Text from "./slide-1/Text";

const textColor = "#c49c5c"; // צבע הטקסט

const delayConfig = {
  goldFrame: 5,
  opacityMandala: 10,
  subBackground: 20,
  bigMandala: 30,
  smallMandala: 20,
  ornaments: {
    right: 20,
    left: 30,
  },
  text: {
    totalFramesPerPath: 10, // מספר פריימים לכל נתיב
    delayPerPath: 5, // עיכוב בפריימים בין כל נתיב
    globalDelay: 60,
  },
};

const Slide1 = () => {
  const frame = useCurrentFrame();
  const { fps, height, width, durationInFrames } = useVideoConfig();

  // אנימציה לטקסט במסך הראשון
  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 10 },
      ...props,
    });

  return (
    <AbsoluteFill
      style={{
        height,
        width,
        direction: "rtl",
        display: "flex", // מחלקת flex
        flexDirection: "column", // מחלקת flex-col
        alignItems: "center", // מרכז כיווניות
        justifyContent: "center", // מרכז ציר
        backgroundImage: "linear-gradient(to top, #293647, #0A1528)",
      }}
    >
      {/* מסגרת זהב מסתובבת */}
      <GoldFrame delayConfig={delayConfig} bounce={bounce} />

      {/* מנדלה גדולה */}
      <BigMandala delayConfig={delayConfig} bounce={bounce} />

      {/* חצי רקע */}
      <HalfBackground delayConfig={delayConfig} bounce={bounce} />

      {/* עיטורים */}
      <Ornaments delayConfig={delayConfig} bounce={bounce} />

      {/* מנדלה קטנה */}
      <SmallMandala delayConfig={delayConfig} bounce={bounce} />

      {/* כיתוב */}
      <Text delayConfig={delayConfig} bounce={bounce} textColor={textColor} />
    </AbsoluteFill>
  );
};

export default Slide1;
