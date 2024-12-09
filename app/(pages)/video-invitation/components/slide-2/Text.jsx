"use client";

import { animteText } from "../../utils/animateText";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { createStyleObject } from "@capsizecss/core";
import { useEffect, useState } from "react";

const Text = ({ bounce, delayConfig, text1, textColor }) => {
  const frame = useCurrentFrame();
  const [capsizeStyles, setCapsizeStyles] = useState({});
  const overflowState = frame < 50 ? 'hidden' : 'visible';

  useEffect(() => {
    const fontMetrics = {
      ascent: 900,
      descent: -300,
      lineGap: 0,
      unitsPerEm: 1000,
    };

    const capsize = createStyleObject({
      capHeight: 120,
      lineGap: 0,
      fontMetrics,
    });

    setCapsizeStyles(capsize);
  }, []);

  return (
    <AbsoluteFill
      style={{
        gap: 40,
        padding: 192,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/*  בשבח והודיה לה׳ יתברך */}
      <span
        style={{ overflow: "hidden", paddingTop: 30 }}
      >
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

      {/* שם הילד */}
      <span
        style={{
          overflow: overflowState,
          paddingTop: 30,
        }}
      >
        {animteText({
          text: "יעקב",
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
            fontSize: 200,
            ...capsizeStyles,
            marginInline: letter === " " ? 8 : 0,
            color: textColor,
            //border: "8px solid green",
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
    </AbsoluteFill>
  );
};

export default Text;
