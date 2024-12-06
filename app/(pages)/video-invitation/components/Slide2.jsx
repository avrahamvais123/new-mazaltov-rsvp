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
import { animteText } from "../utils/animateText";
import { display, lineHeight } from "@mui/system";

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
      //className="flex-col-center bg-gradient-to-t to-[#293647] from-[#0A1528]"
    >
      {/* מסגרת זהב */}
      <AbsoluteFill
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
      </AbsoluteFill>

      {/* עיטורים */}
      <AbsoluteFill
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        //className="size-full flex justify-between"
      >
        {/* עיטורים למעלה */}
        <div
          className="h-64 flex justify-between items-center p-10 m-16"
          style={{
            transform: `rotate(180deg)`,
            height: 256,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 40,
            margin: 64,
          }}
        >
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            //className="w-fit h-full object-cover"
            style={{
              width: "fit-content",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.tl }),
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            //className="w-fit h-full object-cover"
            style={{
              width: "fit-content",
              height: "100%",
              objectFit: "cover",
              transform: `rotateY(180deg) scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.tr }),
              })})`,
            }}
          />
        </div>

        {/* עיטורים למטה */}
        <div
          style={{
            height: 256,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 40,
            margin: 64,
          }}
          //className="h-64 flex justify-between items-center p-10 m-16"
        >
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            //className="w-fit h-full object-cover"
            style={{
              width: "fit-content",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.br }),
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            //className="w-fit h-full object-cover"
            style={{
              width: "fit-content",
              height: "100%",
              objectFit: "cover",
              transform: `rotateY(180deg) scale(${animConfig({
                input: bounce({ delay: delayConfig.ornaments.bl }),
              })})`,
            }}
          />
        </div>
      </AbsoluteFill>

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
        {/*  */}
        <span>
          {animteText({
            text: text1,
            startDelay:  delayConfig.text.startDelay,
            letterDelay: delayConfig.text.letterDelay,
            lineStyle: (currentLineStartDelay) => ({
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              opacity: animConfig({
                inputRange: [currentLineStartDelay, currentLineStartDelay + 20],
              }),
            }),
            lettersStyle: (currentLetterDelay, letter) => ({
              marginInline: letter === " " ? 8 : 0,
              color: textColor,
              fontSize: 48,
              lineHeight: 1,
              transform: `translateY(${animConfig({
                input: bounce({
                  delay: currentLetterDelay,
                }),
                outputRange: [300, 0],
              })}px)`,
            }),
          })}
        </span>

        <p
          style={{ color: textColor, fontSize: 128, lineHeight: 1 }}
          //className="text-9xl"
        >
          משה
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide2;
