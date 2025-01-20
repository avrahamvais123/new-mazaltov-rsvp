"use client";

import React from "react";
import { Composition } from "remotion";
import MyVideo from "./MyVideo";

const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={1800} // משך הסרטון
      fps={30} // פריימים לשנייה
      width={1200} // רוחב זוגי
      height={1800} // גובה זוגי
    />
  );
};

export default RemotionRoot;
