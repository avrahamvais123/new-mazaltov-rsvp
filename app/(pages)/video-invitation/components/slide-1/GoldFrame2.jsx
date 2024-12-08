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

const GoldFrame = ({ delayConfig, bounce }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // גודל העיגול המנצנץ
  const size = 600;

  const flashEffect = ({ delay = 0, speed = 0.7 } = {}) => {
    // Adjust frame to include delay
    const adjustedFrame = Math.max(0, frame - delay) * speed;

    // Calculate opacity for the flashing effect
    const opacity =
      adjustedFrame === 0
        ? 0 // No opacity during delay
        : interpolate(
            Math.sin((adjustedFrame / fps) * Math.PI * 2), // Oscillation using sine wave
            [0, 1, 2],
            [0, 1, 0] // Opacity range
            //{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

    return opacity;
  };

  const flashlights = [
    {
      // top left
      top: 0,
      left: 0,
      opacity: flashEffect(),
    },
    {
      // top middle
      top: 0,
      left: "50%",
      opacity: flashEffect({ delay: 10 }),
    },
    {
      // top right
      top: 0,
      left: "100%",
      opacity: flashEffect({ delay: 20 }),
    },
    {
      // right middle
      top: "50%",
      left: "100%",
      opacity: flashEffect({ delay: 30 }),
    },
    {
      // bottom right
      top: "100%",
      left: "100%",
      opacity: flashEffect({ delay: 40 }),
    },
    {
      // bottom middle
      top: "100%",
      left: "50%",
      opacity: flashEffect({ delay: 50 }),
    },
    {
      // bottom left
      top: "100%",
      left: 0,
      opacity: flashEffect({ delay: 60 }),
    },
    {
      // left middle
      top: "50%",
      left: 0,
      opacity: flashEffect({ delay: 70 }),
    },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "12px",
          overflow: "hidden",
          transform: `scale(${interpolate(
            bounce({ delay: delayConfig.goldFrame }),
            [0, 1],
            [0, 1]
          )})`,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#ca7339",
          }}
        />
        {/* אורות מהבהבים */}
        {flashlights.map(({ top, left, opacity }, index) => {
          return (
            <span
              key={index}
              style={{
                position: "absolute",
                top,
                left,
                opacity,
                translate: "-50% -50%",
                backgroundColor: "#ddc28d",
                filter: "blur(30px)",
                borderRadius: "50%",
                height: size,
                width: size,
              }}
            />
          );
        })}

        {/* המנדלה השקופה */}
        <span
          style={{
            zIndex: 10,
            height: "100%",
            width: "100%",
            backgroundImage: "linear-gradient(to top, #293647, #0A1528)",
          }}
        >
          <Img
            src={staticFile("/video-assets/opacity-mandala.png")}
            alt="opacity mandala"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.75,
              mixBlendMode: "overlay",
              transform: `scale(${interpolate(
                bounce({ delay: delayConfig.opacityMandala }),
                [0, 1],
                [0, 1]
              )})`,
            }}
          />
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default GoldFrame;

//backgroundImage:
//"linear-gradient(to right, #ddc28d, #9b411f, #ddc28d)",
