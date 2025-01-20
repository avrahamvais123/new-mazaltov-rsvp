"use clinet";

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { animteText } from "../../utils/animateText";
import { fontCarish_regular } from "../../css/slide1.module.css";
import { translate } from "@remotion/animation-utils";

const Text = ({ delayConfig, bounce, textColor }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <Sequence from={30} durationInFrames={durationInFrames - 120}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
            //overflow: "hidden",
            height: 650,
            width: "100%",
            //border: "8px solid red",
          }}
        >
          {/* שם הילד */}
          {animteText({
            text: "יעקב",
            startDelay: 30,
            letterDelay: 5,
            lineStyle: (currentLineStartDelay) => ({
              position: "absolute",
              top: 0,
              left: "50%",
              translate: "-50% -50%",
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
              fontSize: 600,
              lineHeight: 1,
              fontFamily: letterIndex == 1 ? "egotrip-set-1" : "egotrip",
              transform: `translateY(${interpolate(
                bounce({
                  delay: currentLetterDelay,
                }),
                [0, 1],
                [600, 0]
              )}px)`,
            }),
          })}

          {/* בר מצווה */}
          {animteText({
            text: "בר מצווה",
            startDelay: 80,
            letterDelay: 5,
            lineStyle: (currentLineStartDelay) => ({
              position: "absolute",
              bottom: 0,
              left: "50%",
              translate: "-50% 0%",
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
              marginInline: letter === " " ? 25 : 5,
              color: textColor,
              fontSize: 300,
              fontFamily: letterIndex === 1 ? "egotrip-set-2" : letterIndex === 4 ? "egotrip-set-1": "egotrip",
              transform: `translateY(${interpolate(
                bounce({
                  delay: currentLetterDelay,
                }),
                [0, 1],
                [300, 0]
              )}px)`,
            }),
          })}
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export default Text;
