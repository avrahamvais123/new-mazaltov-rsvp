"use client";

import React from "react";
import { useCurrentFrame, OffthreadVideo, Audio, staticFile } from "remotion";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const MyVideo = () => {
  const frame = useCurrentFrame();

  // שליטה על המסכים
  return (
    <>
      <Audio src={staticFile("wedding1.mp3")} />
      {/* <OffthreadVideo src="" /> */}
      {frame < 150 && <Slide1 />} {/* מסך ראשון עד פריים 150 */}
      {frame >= 150 && frame < 300 && <Slide2 />}{" "}
      {/* מסך שני בין פריים 150-300 */}
      {frame >= 300 && <Slide3 />} {/* מסך שלישי אחרי פריים 300 */}
    </>
  );
};

export default MyVideo;
