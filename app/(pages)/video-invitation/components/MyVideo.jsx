"use client";

import React from "react";
import { Audio, staticFile, Composition } from "remotion";

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
import { loadFont } from "@remotion/fonts";

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
    text: {
      startDelay: 30, // השהיה לפני תחילת הטקסט
      letterDelay: 1, // השהיה בין כל אות לאות
    },
  },
};

loadFont({
  family: "carish",
  url: staticFile("/licensed-fonts/FbCarish-Regular.otf"),
  weight: 400,
}).then(() => console.log("Font loaded!"));

loadFont({
  family: "egotrip",
  url: staticFile("/licensed-fonts/FbEgotrip-Regular.otf"),
  weight: 400,
}).then(() => console.log("Font loaded!"));

loadFont({
  family: "egotrip-set-1",
  url: staticFile("/licensed-fonts/FbEgotriPinSet1-Regular.otf"),
  weight: 400,
}).then(() => console.log("Font loaded!"));

loadFont({
  family: "egotrip-set-2",
  url: staticFile("/licensed-fonts/FbEgotriPinSet2-Regular.otf"),
  weight: 400,
}).then(() => console.log("Font loaded!"));


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
        <TransitionSeries.Sequence durationInFrames={720}>
          <Slide2 delayConfig={delayConfig.slide2} />
        </TransitionSeries.Sequence>

        {/* transition 2 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 30 })}
          presentation={fade()}
        />

        {/* slide 3 */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Slide3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

export default MyVideo;
