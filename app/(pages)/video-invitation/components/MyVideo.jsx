"use client";

import React from "react";
import { Audio, staticFile } from "remotion";

import {
  linearTiming,
  springTiming,
  TransitionSeries,
  useTransitionProgress,
} from "@remotion/transitions";

import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";

import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const delayConfig = {
  slide1: {
    goldFrame: 5,
    opacityMandala: 10,
    subBackground: 20,
    bigMandala: 30,
    smallMandala: 20,
    ornaments: {
      right: 20,
      left: 30,
    },
    text: {
      totalFramesPerPath: 10, // מספר פריימים לכל נתיב
      delayPerPath: 5, // עיכוב בפריימים בין כל נתיב
      globalDelay: 60,
    },
  },
  slide2: {
    goldFrame: 3,
    opacityMandala: 6,
    ornaments: {
      tr: 10,
      br: 15,
      bl: 20,
      tl: 25,
    },
    text: {},
  },
};

const MyVideo = () => {
  return (
    <>
      <Audio src={staticFile("/audio/wedding1.mp3")} />

      <TransitionSeries>
        {/* slide 1 */}
        <TransitionSeries.Sequence durationInFrames={360}>
          <Slide1 delayConfig={delayConfig.slide1} />
        </TransitionSeries.Sequence>

        {/* transition 1 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={wipe()}
        />

        {/* slide 2 */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Slide2 delayConfig={delayConfig.slide2} />
        </TransitionSeries.Sequence>

        {/* transition 2 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 30 })}
          presentation={fade()}
        />

        {/* slide 3 */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Slide3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

export default MyVideo;
