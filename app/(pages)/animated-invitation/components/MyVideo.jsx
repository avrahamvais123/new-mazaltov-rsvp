"use client";

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const MyVideo = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // יצירת אפקט קפיצה
  const bounce = spring({
    frame,
    fps,
    config: { damping: 10 },
  });

  // מיקום האנימציה
  const translateY = interpolate(bounce, [0, 1], [500, 0]);

  return (
    <AbsoluteFill
      style={{
        direction: "rtl", // כיוון טקסט מימין לשמאל
        width: width, // התאמה מלאה לרוחב ה-Player
        height: height, // התאמה מלאה לגובה ה-Player
        background: "linear-gradient(90deg, #ff7eb3, #ff758c)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          color: "white",
          transform: `translateY(${translateY}px)`,
        }}
      >
        ברוכים הבאים!
      </h1>
    </AbsoluteFill>
  );
};

export default MyVideo;
