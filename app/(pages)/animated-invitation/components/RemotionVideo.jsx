"use client";

import React from "react";
import { Composition } from "remotion";
import MyVideo from "./MyVideo";
import { border, maxWidth } from "@mui/system";

const RemotionVideo = () => {
  return (
    <div className="size-full flex-center test">
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={150} // 5 שניות ב-30 פריימים לשנייה
        fps={30}
        //height={1080}
        //width={1920}
        height={600}
        width={900}
      />
    </div>
  );
};

export default RemotionVideo;
