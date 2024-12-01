"use client";

import React from "react";
import { Player } from "@remotion/player";
import MyVideo from "./MyVideo";

const MediaPlayer = () => {
  const compositionWidth = 300;
  const compositionHeight = 200;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "gray",
        // Any container with "position: relative" will work
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          aspectRatio: `${compositionWidth} / ${compositionHeight}`,
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        <Player
          component={MyVideo}
          durationInFrames={150}
          fps={30}
          compositionWidth={1920} // יחס גובה-רוחב 16:9
          compositionHeight={1080}
          controls
          style={{
            width: "100%", // ממלא את כל הרוחב
            height: "100%", // ממלא את כל הגובה
            maxWidth: "100%", // מגביל לרוחב מסך מלא
            maxHeight: "100%", // מגביל לגובה מסך מלא
            objectFit: "contain", // שמירה על יחס גובה-רוחב
          }}
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
