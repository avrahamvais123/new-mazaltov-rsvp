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
  const { height, width, durationInFrames } = useVideoConfig();
  // גודל העיגול המנצנץ
  const size = 500;

  // משך האנימציה למחזור אחד
  const cycleDuration = durationInFrames / 2;

  // מסגרת יחסית בתוך מחזור
  const relativeFrame = frame % cycleDuration;

  // חישוב ה-`left` וה-`top` לכדור הראשון
  const leftBall1 = interpolate(
    relativeFrame,
    [
      0,
      cycleDuration / 4,
      cycleDuration / 2,
      (3 * cycleDuration) / 4,
      cycleDuration,
    ],
    [0, width - size / 2, width - size / 2, -(size / 2), -(size / 2)]
  );

  const topBall1 = interpolate(
    relativeFrame,
    [
      0,
      cycleDuration / 4,
      cycleDuration / 2,
      (3 * cycleDuration) / 4,
      cycleDuration,
    ],
    [
      -(size / 2),
      -(size / 2),
      height - size / 2,
      height - size / 2,
      -(size / 2),
    ]
  );

  // חישוב ה-`left` וה-`top` לכדור השני (תנועה הפוכה)
  const leftBall2 = interpolate(
    relativeFrame,
    [
      0,
      cycleDuration / 4,
      cycleDuration / 2,
      (3 * cycleDuration) / 4,
      cycleDuration,
    ],
    [width - size / 2, 0, 0, width - size / 2, width - size / 2]
  );

  const topBall2 = interpolate(
    relativeFrame,
    [
      0,
      cycleDuration / 4,
      cycleDuration / 2,
      (3 * cycleDuration) / 4,
      cycleDuration,
    ],
    [
      height - size / 2,
      height - size / 2,
      -(size / 2),
      -(size / 2),
      height - size / 2,
    ]
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "64px",
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
            //backgroundImage:
            //"linear-gradient(to right, #ddc28d, #9b411f, #ddc28d)",
          }}
        />
        {/* כדור ראשון */}
        <span
          style={{
            position: "absolute",
            top: topBall1,
            left: leftBall1,
            backgroundColor: "#ddc28d",
            filter: "blur(30px)",
            transform: "rotate(45deg)",
            borderRadius: "50%",
            height: size,
            width: size,
          }}
        />
        {/* כדור שני */}
        <span
          style={{
            position: "absolute",
            top: topBall2,
            left: leftBall2,
            backgroundColor: "#ddc28d",
            filter: "blur(30px)",
            transform: "rotate(45deg)",
            borderRadius: "50%",
            height: size,
            width: size,
          }}
        />
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
