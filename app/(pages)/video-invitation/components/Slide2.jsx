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
    <AbsoluteFill dir="rtl" className="flex-center">
      <AbsoluteFill>
        <img src="/video-assets/background.png" className="size-full object-cover" alt="" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide2;
