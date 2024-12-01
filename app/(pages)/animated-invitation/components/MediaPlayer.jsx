"use client";

import React from "react";
import { Player } from "@remotion/player";
import MyVideo from "./MyVideo";

const MediaPlayer = () => {
  return (
    <Player
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      controls
      style={{
        direction: "ltr", // כיוון טקסט מימין לשמאל
        width: "100%", // רוחב מלא
        height: "100%", // גובה מלא
      }}
    />
  );
};

export default MediaPlayer;
