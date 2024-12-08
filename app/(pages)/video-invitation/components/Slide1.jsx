"use client";

import { cn } from "@/lib/utils";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  Img,
  staticFile,
  Easing,
  Sequence,
} from "remotion";
import { animteText } from "../utils/animateText";
import GoldFrame from "./slide-1/GoldFrame";
import BigMandala from "./slide-1/BigMandala";
import HalfBackground from "./slide-1/HalfBackground";
import Ornaments from "./slide-1/Ornaments";
import SmallMandala from "./slide-1/SmallMandala";
import Text from "./slide-1/Text";

const text1 = `בשבח והודיה לה׳ יתברך
  אנו שמחים להזמינכם להשתתף
  בשמחת בר המצווה של בננו היקר`;

const textColor = "#c49c5c"; // צבע הטקסט

const Slide1 = ({ delayConfig }) => {
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

  const animConfig = ({
    input = frame,
    inputRange = [0, 1],
    outputRange = [0, 1],
    options,
  } = {}) => interpolate(input, inputRange, outputRange, options);

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
