"use client";

import React from "react";
import { useCurrentFrame, Audio, staticFile, interpolate } from "remotion";

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

const MyVideo = () => {
  return (
    <>
      <Audio src={staticFile("/audio/wedding1.mp3")} />

      <TransitionSeries>
        {/* slide 1 */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Slide1 />
        </TransitionSeries.Sequence>

        {/* transition 1 */}
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={fade()}
        />

        {/* slide 2 */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Slide2 />
        </TransitionSeries.Sequence>

        {/* transition 2 */}
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 30 })}
          presentation={wipe()}
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
