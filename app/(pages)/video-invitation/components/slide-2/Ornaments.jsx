"use client";

import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";

const Ornaments = ({ bounce }) => {
  const ornaments = [
    {
      top: 100,
      left: 100,
      rotate: "180deg",
      delay: 0,
    },
    {
      top: 100,
      right: 100,
      rotate: "270deg",
      delay: 10,
    },
    {
      bottom: 100,
      right: 100,
      rotate: "0deg",
      delay: 20,
    },
    {
      bottom: 100,
      left: 100,
      rotate: "90deg",
      delay: 30,
    },
  ];
  return (
    <AbsoluteFill>
      {ornaments.map(({ top, left, right, bottom, rotate, delay }, index) => {
        return (
          <Img
            key={index}
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            style={{
              position: "absolute",
              top,
              left,
              right,
              bottom,
              rotate,
              width: 200,
              height: 200,
              objectFit: "cover",
              transform: `scale(${interpolate(
                bounce({ delay }),
                [0, 1],
                [0, 1]
              )})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default Ornaments;
