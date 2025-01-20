"use client";

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";

const Slide3 = () => {
  const frame = useCurrentFrame();

  // אפקט לכל אות
  const text = "בואו נתחיל!";
  const letterAnimations = text.split("").map((letter, index) => {
    const delay = index * 5; // כל אות מתעכבת ב-5 פריימים
    const letterOpacity = interpolate(
      frame,
      [300 + delay, 310 + delay],
      [0, 1]
    );
    return { letter, letterOpacity };
  });

  return (
    <AbsoluteFill
      style={{
        direction: "rtl",
        background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {letterAnimations.map(({ letter, letterOpacity }, index) => (
          <span
            key={index}
            style={{
              fontSize: "60px",
              color: "white",
              opacity: letterOpacity,
              marginRight: "5px",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default Slide3;
