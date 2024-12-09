"use client";

import { animteText } from "../../utils/animateText";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const Text = ({ bounce, delayConfig, text1, textColor }) => {
  const frame = useCurrentFrame();

  return (
    <span style={{ overflow: "hidden", paddingTop: 30 }}>
      {animteText({
        text: text1,
        startDelay: delayConfig.text.startDelay,
        letterDelay: delayConfig.text.letterDelay,
        lineStyle: (currentLineStartDelay) => ({
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(
            frame,
            [currentLineStartDelay, currentLineStartDelay + 20],
            [0, 1]
          ),
        }),
        lettersStyle: (currentLetterDelay, letter, letterIndex) => ({
          marginInline: letter === " " ? 8 : 0,
          color: textColor,
          fontSize: 50,
          lineHeight: 1,
          fontFamily: "carish",
          transform: `translateY(${interpolate(
            bounce({
              delay: currentLetterDelay,
            }),
            [0, 1],
            [600, 0]
          )}px)`,
        }),
      })}
    </span>
  );
};

export default Text;
