"use client";

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const BigMandala = ({ delayConfig, bounce }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <Img
        src={staticFile("/video-assets/big-mandala.png")}
        alt="big mandala"
        style={{
          width: "700px",
          height: "700px",
          objectFit: "contain",
          animationDuration: "5s",
          filter: "drop-shadow(0 0 50px black)",
          transform: `
            rotate(${interpolate(frame, [0, 1], [0, 1])}deg)
            scale(${interpolate(
              frame,
              [0, 1],
              [0, bounce({ delay: delayConfig.bigMandala })],
              { extrapolateRight: "clamp" }
            )})`,
        }}
      />
    </AbsoluteFill>
  );
};

export default BigMandala;
