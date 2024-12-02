"use client";

import { delay } from "framer-motion";
import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";

const Slide1 = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  // אנימציה לטקסט במסך הראשון
  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 10 },
      ...props,
    });

  const translateY = interpolate(bounce(), [0, 1], [300, 0]);

  const opacity = interpolate(frame, [45, 90], [0, 1]);

  // חישוב זווית הסיבוב
  const rotation = interpolate(frame, [0, 360], [0, 360], {
    extrapolateRight: "loop", // חזרה על האנימציה כל הזמן
  });

  // סיבוב ברוורס
  const reverseRotation = interpolate(frame, [0, 360], [0, -360], {
    extrapolateRight: "loop", // ממשיך בלולאה
  });

  const scale = ({ input, inputRange, outputRange }) =>
    interpolate(input, inputRange, outputRange);

  const text1 = `
      בשבח והודיה לה׳ יתברך\n
      אנו שמחים להודיעכם על\n
      הכנסת בננו בבריתו של אברהם אע׳׳ה
    `;

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
          className="size-full object-cover mix-blend-overlay opacity-75"
          style={{
            transform: `scale(${scale({
              input: bounce({ delay: 6 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* מסגרת זהב */}
      <AbsoluteFill className="flex-center p-16">
        <Img
          src={staticFile("/video-assets/gold-frame.png")}
          style={{
            transform: `scale(${scale({
              input: bounce({ delay: 3 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`,
          }}
          className="size-full"
        />
      </AbsoluteFill>

      {/* מנדלה גדולה */}
      <AbsoluteFill className="flex-center">
        <Img
          src={staticFile("/video-assets/big-mandala.png")}
          alt="big mandala"
          className="size-[700px] object-contain"
          style={{
            animationDuration: "5s",
            filter: "drop-shadow(0 0 50px black)",
            transform: `rotate(${rotation}deg) scale(${scale({
              input: bounce({ delay: 9 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* חצי רקע */}
      <AbsoluteFill className="size-full flex justify-end">
        <Img
          src={staticFile("/video-assets/sub-background.png")}
          alt="big mandala"
          className="w-full h-[55%] object-cover"
          style={{
            filter: "drop-shadow(0 0 50px black)",
            transform: `scale(${scale({
              input: bounce({ delay: 9 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`,
          }}
        />
      </AbsoluteFill>

      {/* עיטורים */}
      <AbsoluteFill className="size-full flex justify-end">
        <div className="h-64 flex justify-between items-center p-10 m-10">
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `scale(${scale({
                input: bounce({ delay: 12 }),
                inputRange: [0, 1],
                outputRange: [0, 1],
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `rotateY(180deg) scale(${scale({
                input: bounce({ delay: 6 }),
                inputRange: [0, 1],
                outputRange: [0, 1],
              })})`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* מנדלה קטנה */}
      <AbsoluteFill className="flex-center">
        <Img
          src={staticFile("/video-assets/small-mandala.png")}
          style={{
            animationDuration: "5s",
            filter: "drop-shadow(0 0 50px black)",
            transform: `rotate(${reverseRotation}deg) scale(${scale({
              input: bounce({ delay: 6 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`, // סיבוב ברוורס
          }}
          alt="big mandala"
          className="size-[250px] object-contain"
        />
      </AbsoluteFill>

      {/* כיתוב */}
      <AbsoluteFill className="flex-center justify-end pb-[500px]">
        <p
          className="text-center text-[60px] whitespace-pre-line leading-[30px] text-white"
          style={{
            /* transform: `scale(${scale({
              input: bounce({ delay: 18 }),
              inputRange: [0, 1],
              outputRange: [0, 1],
            })})`, */
            opacity: opacity,
          }}
        >
          {text1.trim()}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide1;
