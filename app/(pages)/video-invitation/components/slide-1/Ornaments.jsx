"use client";

import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";

const Ornaments = ({ delayConfig, bounce }) => {
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
      <div
        style={{
          height: "256px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px",
          margin: "40px",
        }}
      >
        <Img
          src={staticFile("/video-assets/ornament.png")}
          alt="big mandala"
          style={{
            width: "fit-content",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${interpolate(
              bounce({ delay: delayConfig.ornaments.right }),
              [0, 1],
              [0, 1]
            )})`,
          }}
        />
        <Img
          src={staticFile("/video-assets/ornament.png")}
          alt="big mandala"
          style={{
            width: "fit-content",
            height: "100%",
            objectFit: "cover",
            transform: `rotateY(180deg) scale(${interpolate(
              bounce({ delay: delayConfig.ornaments.left }),
              [0, 1],
              [0, 1]
            )})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default Ornaments;
