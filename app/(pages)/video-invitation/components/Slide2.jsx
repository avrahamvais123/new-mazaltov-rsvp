"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  Img,
  staticFile,
  Easing,
} from "remotion";

import {
  interpolateStyles,
  makeTransform,
  translateY,
} from "@remotion/animation-utils";

const textColor = "#c49c5c"; // צבע הטקסט

const Slide2 = ({delayConfig}) => {
  const frame = useCurrentFrame();
  const { fps, height, width, durationInFrames } = useVideoConfig();

  // אנימציה לטקסט במסך הראשון
  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 10 },
      ...props,
    });

  const animConfig = ({
    input = frame,
    inputRange = [0, 1],
    outputRange = [0, 1],
    options,
  } = {}) => interpolate(input, inputRange, outputRange, options);

  const stylesConfig = ({ input = frame, ...rest } = {}) =>
    interpolateStyles({ input, ...rest });

  return (
    <AbsoluteFill
      style={{ height, width, direction: "rtl" }}
      className="flex-col-center bg-gradient-to-t to-[#293647] from-[#0A1528]"
    >
      {/* רקע מנדלה שקופה */}
      <AbsoluteFill className="flex-center">
        <Img
          src={staticFile("/video-assets/opacity-mandala.png")}
          alt="big mandala"
          className="size-full object-cover mix-blend-overlay opacity-30"
          style={{
            transform: `scale(${animConfig({
              input: bounce({ delay: delayConfig.opacityMandala }),
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* מסגרת זהב */}
      <AbsoluteFill className="flex-center p-16">
        <Img
          src={staticFile("/video-assets/gold-frame.png")}
          className="size-full"
          style={{
            transform: `scale(${animConfig({
              input: bounce({ delay: delayConfig.goldFrame }),
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* עיטורים */}
      <AbsoluteFill className="size-full flex justify-between">
        {/* עיטורים למעלה */}
        <div
          className="h-64 flex justify-between items-center p-10 m-16"
          style={{ transform: `rotate(180deg)` }}
        >
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.tl }),
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `rotateY(180deg) scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.tr }),
              })})`,
            }}
          />
        </div>

        {/* עיטורים למטה */}
        <div className="h-64 flex justify-between items-center p-10 m-16">
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.br }),
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `rotateY(180deg) scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.bl }),
              })})`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* כיתוב */}
      <AbsoluteFill className="flex-col-center justify-start">
        <p className="text-8xl text-white">סלייד שני</p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide2;

{
  /* <span className="absolute bottom-[42rem] flex-center gap-2">
{name.split("").map((letter, index) => {
  return (
    <p
      key={index}
      className="text-[10rem] text-white"
      style={{
        transform: `translateY(${translateY({
          input: bounce({ delay: 40 + index * 5 }),
          inputRange: [0, 2],
          outputRange: [300, 0],
        })}px)`,
        opacity: opacity([45, 90]),
      }}
    >
      {letter}
    </p>
  );
})}
</span>

<p
className="text-[5.5rem] absolute bottom-[24rem] text-white"
style={{
  opacity: opacity([70, 90]),
}}
>
בר מצווה
</p> */
}
