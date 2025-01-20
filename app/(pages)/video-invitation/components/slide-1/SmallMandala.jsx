"use client";

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SmallMandala = ({ delayConfig, bounce }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();


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
        src={staticFile("/video-assets/small-mandala.png")}
        style={{
          animationDuration: "5s",
          width: 250,
          height: 250,
          objectFit: "contain",
          filter: `
           drop-shadow(0 0 50px black)
           blur(${interpolate(
             frame,
             [0, durationInFrames - 100, durationInFrames],
             [0, 0, 10]
           )}px)`,
          transform: `
           rotate(${interpolate(frame, [0, 1], [1, 0])}deg)
           scale(${interpolate(
             frame,
             [0, 1, durationInFrames - 100, durationInFrames], // טווחים חדשים
             [0, bounce({ delay: delayConfig.smallMandala }), 1, 30] // טווחי הסקייל
           )})`, // סיבוב ברוורס
          zIndex: interpolate(
            frame,
            [0, durationInFrames - 100, durationInFrames],
            [0, 0, 10]
          ),
        }}
        alt="small mandala"
      />
    </AbsoluteFill>
  );
};

export default SmallMandala;
