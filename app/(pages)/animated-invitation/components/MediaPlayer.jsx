"use client";

import React from "react";
import { Player } from "@remotion/player";
import MyVideo from "./MyVideo";

const MediaPlayer = () => {
  return (
    <div className="size-full flex-center">
      <Player
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        style={{
          direction: "ltr", // כיוון טקסט מימין לשמאל
          width: 960, // רוחב מלא
          height: 540, // גובה מלא
        }}
      />
    </div>
  );
};

export default MediaPlayer;
