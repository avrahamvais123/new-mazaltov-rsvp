"use client";

import React from "react";
import { Player } from "@remotion/player";
import MyVideo from "./MyVideo";

const MediaPlayer = () => {
  return (
    <div dir="ltr" className="size-full flex-center">
      <Player
        component={MyVideo}
        durationInFrames={1800}
        fps={30}
        //compositionWidth={1080}
        //compositionHeight={1920}
        compositionWidth={1200}
        compositionHeight={1800}
        controls
        style={{
          borderRadius: 10,
          width: 300, // רוחב מלא
          height: 450, // גובה מלא
        }}
      />
    </div>
  );
};

export default MediaPlayer;
