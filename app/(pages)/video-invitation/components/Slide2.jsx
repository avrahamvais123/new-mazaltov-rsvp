"use client";

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";

const Slide2 = () => {
  const frame = useCurrentFrame();

  // אנימציה למסך השני
  const opacity = interpolate(frame, [150, 180], [0, 1]); // Fade In
  return (
    <AbsoluteFill
      style={{
        direction: "rtl",
        background: "linear-gradient(90deg, #7ee8fa, #80ff72)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "70px",
          color: "black",
          opacity,
        }}
      >
        זהו המסך השני!
      </h1>
    </AbsoluteFill>
  );
};

export default Slide2;
