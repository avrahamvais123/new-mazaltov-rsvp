"use client";

import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";

const HalfBackground = ({ delayConfig, bounce }) => {
  return (
    <AbsoluteFill
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 10,
      }}
    >
      <Img
        src={staticFile("/video-assets/sub-background.png")}
        alt="big mandala"
        style={{
          width: "100%",
          height: "55%",
          objectFit: "cover",
          filter: "drop-shadow(0 0 50px black)",
          height: `${interpolate(
            bounce({ delay: delayConfig.subBackground }),
            [0, 1],
            [0, 55],
            { extrapolateRight: "clamp" }
          )}%`,
        }}
      />
    </AbsoluteFill>
  );
};

export default HalfBackground;
