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

const textColor = "#c49c5c"; // צבע הטקסט

const text1 = `בשבח והודיה לה׳ יתברך
  אנו שמחים להזמינכם להשתתף
  בשמחת בר המצווה של בננו היקר`;

const text2 = `בשבח והודיה לה׳ יתברך
  אנו שמחים להזמינכם להשתתף
  בשמחת בר המצווה של בננו היקר`;

const Slide2 = ({ delayConfig }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  let accumulatedDelay = delayConfig.text.startDelay || 0; // דיליי התחלה לשורה הראשונה בלבד

  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 13 },
      ...props,
    });

  const animConfig = ({
    input = frame,
    inputRange = [0, 1],
    outputRange = [0, 1],
    options,
  } = {}) => interpolate(input, inputRange, outputRange, options);

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

      {/* כיתוב 1 */}
      <AbsoluteFill className="flex-col-center justify-start p-48">
        {text1
          .split("\n")
          .map((line) => line.trim()) // הסרת רווחים מיותרים מכל שורה
          .map((line, lineIndex) => {
            const lineLength = line.length;
            const { letterDelay } = delayConfig.text;

            const currentLineStartDelay =
              lineIndex === 0 ? accumulatedDelay : accumulatedDelay;

            return (
              <span
                key={lineIndex}
                className="text-center flex-center text-white"
                style={{
                  opacity: animConfig({
                    inputRange: [
                      currentLineStartDelay,
                      currentLineStartDelay + 20,
                    ],
                  }),
                }}
              >
                {line.split("").map((letter, letterIndex) => {
                  const currentLetterDelay = accumulatedDelay;
                  accumulatedDelay += letterDelay;

                  return (
                    <span key={letterIndex} className="pt-4 overflow-hidden">
                      <p
                        className={cn("text-5xl", letter === " " && "mx-2")}
                        style={{
                          color: textColor,
                          transform: `translateY(${animConfig({
                            input: bounce({
                              delay: currentLetterDelay,
                            }),
                            outputRange: [300, 0],
                          })}px)`,
                        }}
                      >
                        {letter}
                      </p>
                    </span>
                  );
                })}
              </span>
            );
          })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide2;
