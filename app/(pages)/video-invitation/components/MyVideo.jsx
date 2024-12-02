"use client";

import React from "react";
import { useCurrentFrame, Audio, staticFile, interpolate } from "remotion";

import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions";

import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";

import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const MyVideo = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Audio src={staticFile("wedding1.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Slide1 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={springTiming({ config: { damping: 200 } })}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <Slide2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 30 })}
          presentation={wipe()}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Slide3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};

export default MyVideo;
