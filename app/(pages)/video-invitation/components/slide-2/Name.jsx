"use client";

import { createStyleObject } from "@capsizecss/core";
import { useEffect, useState } from "react";
import { animteText } from "../../utils/animateText";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const Name = ({ delayConfig, bounce, name = "שם הילד", textColor, fontFamily }) => {
  const frame = useCurrentFrame();
  const [capsizeStyles, setCapsizeStyles] = useState({});
  const overflowState = frame < delayConfig.name.overflow ? "hidden" : "visible";

  useEffect(() => {
    const fontMetrics = {
      familyName: "Fb Egotrip",
      fullName: "Fb Egotrip",
      postscriptName: "FbEgotrip-Regular",
      capHeight: 1350,
      ascent: 1681,
      descent: -484,
      lineGap: 50,
      unitsPerEm: 2048,
      xHeight: 911,
      xWidthAvg: 1358,
      subsets: {
        latin: {
          xWidthAvg: 1358
        },
        thai: {
          xWidthAvg: 1593
        }
      }
    };

    const capsize = createStyleObject({
      capHeight: 400,
      lineGap: 22,
      fontMetrics,
    });

    console.log('capsize: ', capsize);
    setCapsizeStyles(capsize);
  }, []);

  return (
    <span
      style={{
        overflow: overflowState,
        paddingTop: 30,
      }}
    >
      {animteText({
        text: name,
        startDelay: delayConfig.name.startDelay,
        letterDelay: delayConfig.name.letterDelay,
        lineStyle: (currentLineStartDelay) => ({
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "8px solid green",
          opacity: interpolate(
            frame,
            [currentLineStartDelay, currentLineStartDelay + 20],
            [0, 1]
          ),
        }),
        lettersStyle: (currentLetterDelay, letter, letterIndex) => ({
          //fontSize: 450,
          ...capsizeStyles,
          marginInline: letter === " " ? 8 : 0,
          color: textColor,
          border: "8px solid red",
          fontFamily: letterIndex === 1 ? "egotrip-set-1" : "egotrip",
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

export default Name;
