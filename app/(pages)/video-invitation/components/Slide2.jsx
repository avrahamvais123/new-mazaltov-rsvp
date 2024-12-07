"use client";

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
import { animteText } from "../utils/animateText";
import GoldFrame from "./slide-1/GoldFrame2";
import Ornaments from "./slide-2/Ornaments";

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

  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 15 },
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
      style={{
        height,
        width,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to top, #293647, #0A1528)",
      }}
    >
      {/* מסגרת זהב */}
      <GoldFrame delayConfig={delayConfig} bounce={bounce} />

      {/* עיטורים */}
      <Ornaments delayConfig={delayConfig} bounce={bounce} />

      {/* כיתוב 1 */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 40,
          padding: 192,
        }}
      >
        <span style={{ overflow: "hidden", paddingTop: 30 }}>
          {animteText({
            text: text1,
            startDelay: delayConfig.text.startDelay,
            letterDelay: delayConfig.text.letterDelay,
            lineStyle: (currentLineStartDelay) => ({
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: interpolate(
                frame,
                [currentLineStartDelay, currentLineStartDelay + 20],
                [0, 1]
              ),
            }),
            lettersStyle: (currentLetterDelay, letter, letterIndex) => ({
              marginInline: letter === " " ? 8 : 0,
              color: textColor,
              fontSize: 50,
              lineHeight: 1,
              fontFamily: "carish",
              transform: `translateY(${interpolate(
                bounce({
                  delay: currentLetterDelay,
                }),
                [0, 1],
                [600, 0]
              )}px)`,
            }),
          })}
        </span>

        <p style={{ color: textColor, fontSize: 128, lineHeight: 1 }}>משה</p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide2;

//! לא למחוק!
{
  /* <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
        }}
        //className="flex-center p-16"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            padding: 8,
            overflow: "hidden",
            transform: `scale(${animConfig({
              input: bounce({ delay: delayConfig.goldFrame }),
            })})`,
          }}
          //className="relative size-full flex p-2 overflow-hidden"
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#ca7339",
            }}
            //className="absolute inset-0 bg-[#ca7339]"
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(to right, #ddc28d, #9b411f, #ddc28d)",
              filter: "blur(24px)",
              rotate: `${animConfig()}deg`,
            }}
            //className="absolute inset-0 bg-gradient-to-r from-[#ddc28d] via-[#9b411f] to-[#ddc28d] blur-xl"
          />
          <span
            style={{
              zIndex: 10,
              width: "100%",
              height: "100%",
              backgroundImage: "linear-gradient(to top, #293647, #0A1528)",
            }}
            //className="z-10 size-full bg-gradient-to-t to-[#293647] from-[#0A1528]"
          >
            <Img
              src={staticFile("/video-assets/opacity-mandala.png")}
              alt="big mandala"
              //className="size-full object-cover mix-blend-overlay opacity-30"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mixBlendMode: "overlay",
                opacity: 0.3,
                transform: `scale(${animConfig({
                  input: bounce({ delay: delayConfig.opacityMandala }),
                })})`,
              }}
            />
          </span>
        </div>
      </AbsoluteFill> */
}
