"use client";

import { cn } from "@/lib/utils";
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

/* האותיות בצורה הפוכה */
const paths = [
  "M256.88,58.56c0,6.13-4.35,12.82-13.04,20.05-1.02.97-1.68,1.46-1.98,1.46-.93,0-1.61-.26-2.05-.79-1.1-1.1-1.65-2.09-1.65-2.98,0-.79.6-1.37,1.79-1.72,4.1-1.5,7.21-3.57,9.33-6.22,2.65-3.18,3.97-6.31,3.97-9.4,0-4.24-2.27-6.35-6.82-6.35-4.1,0-9.62,1.5-16.54,4.5-8.12,3.35-13.21,6.77-15.29,10.26-.22.35-.53.53-.93.53-1.1,0-1.65-.35-1.65-1.06,0-.31.22-.62.66-.93,3.48-2.6,8.82-5.65,16.01-9.13,7.59-3.71,13.63-5.56,18.13-5.56,3.53,0,6.33.86,8.4,2.58,1.1.93,1.65,2.51,1.65,4.76ZM228.02,69.81c0,2.56-2.1,5.8-6.29,9.73-.35.31-.57.35-.66.13-.04-.26.04-.49.26-.66,2.38-1.76,3.57-3.62,3.57-5.56,0-1.68-.6-3.02-1.79-4.04-.44-.44-.66-.95-.66-1.52,0-1.5.82-2.25,2.45-2.25.31,0,.65.07,1.03.2.37.13.72.35,1.03.66.31.31.56.74.76,1.29.2.55.3,1.22.3,2.02Z",
  "M212.08,62.93c0,3.62-4.76,7.9-14.29,12.84-.31.18-.66.26-1.06.26-.71,0-1.38-.29-2.02-.86-.64-.57-.96-1.19-.96-1.85,0-.62.31-.97.93-1.06,1.28-.18,2.6-.51,3.97-.99,1.37-.49,2.8-1.1,4.3-1.85,3.71-1.99,5.56-4.01,5.56-6.09,0-2.25-2.07-3.38-6.22-3.38-2.07,0-4.46.4-7.15,1.19-3.27,1.01-6.44,3.13-9.53,6.35-.26.26-.79.35-1.59.26-.4,0-.6-.18-.6-.53,0-.13.2-.44.6-.93,2.51-2.65,6.26-4.68,11.25-6.09,1.81-.48,3.47-.84,5-1.06s2.92-.29,4.2-.2c5.07.31,7.61,1.63,7.61,3.97Z",
  "M181.44,24.02c-.04.44-.6.84-1.65,1.19-4.06,1.72-7.3,6.15-9.73,13.3-.97,2.78-2.12,6.2-3.44,10.26-1.32,4.06-2.85,8.82-4.57,14.29l-6.48,22.43c-.44,1.37-1.26,2.05-2.45,2.05-1.06,0-1.54-.6-1.46-1.79.04-.57.31-1.24.79-1.99,2.51-4.01,5.36-11.2,8.54-21.57.48-1.68,1.42-4.52,2.81-8.54,1.39-4.01,3.25-9.2,5.59-15.55,3.04-8.51,6.37-13.43,9.99-14.76.44-.04.9-.04,1.39,0,.44.18.66.4.66.66ZM186.21,73.58c-.71,1.32-3.75,2.69-9.13,4.1-2.82.62-6.2.93-10.12.93-4.46,0-6.68-.95-6.68-2.85,0-3.71,5.34-8.67,16.01-14.89.44-.26.84-.4,1.19-.4.75,0,1.44.26,2.08.79.64.53.96,1.17.96,1.92,0,.44-.55.75-1.65.93-2.82.53-6.09,1.99-9.79,4.37-3.66,2.34-5.49,4.37-5.49,6.09s2.03,2.62,6.09,2.71c2.25,0,5.62-.6,10.12-1.79,3.66-.97,5.6-1.57,5.82-1.79.18-.26.37-.4.6-.4v.26Z",
  "M189.05,3.31c-.09.09-.62-.02-1.59-.33-2.07-.62-3.53-.93-4.37-.93-3.62,0-7.08,1.59-10.39,4.76-5.16,5.03-10.06,15.46-14.69,31.3-1.1,3.97-2.18,7.91-3.24,11.81-1.06,3.9-2.1,7.86-3.11,11.88-3,10.01-5.85,16.56-8.54,19.65-.62.79-2.05,1.19-4.3,1.19-1.06,0-1.59-.57-1.59-1.72,0-.62.22-1.3.66-2.05,3.31-1.37,7.08-7.59,11.32-18.66,1.46-3.88,3.9-11.29,7.35-22.23.97-3.18,1.89-6.01,2.75-8.5.86-2.49,1.71-4.69,2.55-6.58,3.18-7.19,6.66-12.68,10.46-16.48,4.23-4.28,8.47-6.42,12.7-6.42,1.5,0,2.76.29,3.77.86,1.41.71,1.5,1.52.26,2.45Z",
  "M112.95,53.27c0,.35-.13.68-.4.99-.71.97-1.32,2.14-1.85,3.51-.44,1.32-1.37,3.53-2.78,6.62-1.81,3.71-2.98,5.56-3.51,5.56-2.12,0-2.07-1.99.13-5.96,2.96-5.47,4.46-8.76,4.5-9.86.22-1.81.9-2.71,2.05-2.71,1.23,0,1.85.62,1.85,1.85Z",
  "M105.01,46.65c0,.79-.18,1.79-.53,2.98-1.5,4.68-4.63,9.77-9.4,15.29-1.37,1.54-3.22,3.24-5.56,5.09-2.34,1.85-5.18,3.9-8.54,6.15-1.02.71-1.63,2.56-1.85,5.56-.18,3.62.35,5.43,1.59,5.43,2.65,0,5.87-1.9,9.66-5.69.48-.57.98-1.12,1.49-1.62.51-.51,1-1,1.49-1.49,1.85-1.99,2.8-3.66,2.85-5.03.18-1.06.57-1.59,1.19-1.59.71,0,1.06.49,1.06,1.46,0,.49-.18,1.12-.53,1.92-.31.71-1.43,1.92-3.37,3.64l-3.77,3.37c-5.38,5.25-9.42,7.88-12.11,7.88s-3.9-2.41-3.9-7.21c0-2.65.88-6.29,2.65-10.92,1.81-4.81,3.99-9.07,6.55-12.77,3.09-4.67,6.4-8.51,9.93-11.51,3.26-2.87,5.78-4.3,7.54-4.3,2.38,0,3.57,1.12,3.57,3.37ZM102.96,48.97c.31-1.99,0-2.98-.93-2.98-3.35,0-8.1,4.5-14.23,13.5-3.66,5.38-5.85,9.68-6.55,12.9-.04.44.04.75.26.93.31.18.68.18,1.12,0,3.93-1.37,7.9-4.43,11.91-9.2,4.76-5.69,7.56-10.74,8.4-15.15Z",
  "M74.84,62.93c0,3.62-4.76,7.9-14.29,12.84-.31.18-.66.26-1.06.26-.71,0-1.38-.29-2.02-.86-.64-.57-.96-1.19-.96-1.85,0-.62.31-.97.93-1.06,1.28-.18,2.6-.51,3.97-.99,1.37-.49,2.8-1.1,4.3-1.85,3.71-1.99,5.56-4.01,5.56-6.09,0-2.25-2.07-3.38-6.22-3.38-2.07,0-4.46.4-7.15,1.19-3.27,1.01-6.44,3.13-9.53,6.35-.26.26-.79.35-1.59.26-.4,0-.6-.18-.6-.53,0-.13.2-.44.6-.93,2.51-2.65,6.26-4.68,11.25-6.09,1.81-.48,3.47-.84,5-1.06s2.92-.29,4.2-.2c5.07.31,7.61,1.63,7.61,3.97Z",
  "M44.2,24.02c-.04.44-.6.84-1.65,1.19-4.06,1.72-7.3,6.15-9.73,13.3-.97,2.78-2.12,6.2-3.44,10.26-1.32,4.06-2.85,8.82-4.57,14.29l-6.48,22.43c-.44,1.37-1.26,2.05-2.45,2.05-1.06,0-1.54-.6-1.46-1.79.04-.57.31-1.24.79-1.99,2.51-4.01,5.36-11.2,8.54-21.57.48-1.68,1.42-4.52,2.81-8.54,1.39-4.01,3.25-9.2,5.59-15.55,3.04-8.51,6.37-13.43,9.99-14.76.44-.04.9-.04,1.39,0,.44.18.66.4.66.66ZM48.97,73.58c-.71,1.32-3.75,2.69-9.13,4.1-2.82.62-6.2.93-10.12.93-4.46,0-6.68-.95-6.68-2.85,0-3.71,5.34-8.67,16.01-14.89.44-.26.84-.4,1.19-.4.75,0,1.44.26,2.08.79.64.53.96,1.17.96,1.92,0,.44-.55.75-1.65.93-2.82.53-6.09,1.99-9.79,4.37-3.66,2.34-5.49,4.37-5.49,6.09s2.03,2.62,6.09,2.71c2.25,0,5.62-.6,10.12-1.79,3.66-.97,5.6-1.57,5.82-1.79.18-.26.37-.4.6-.4v.26Z",
  "M51.81,3.31c-.09.09-.62-.02-1.59-.33-2.07-.62-3.53-.93-4.37-.93-3.62,0-7.08,1.59-10.39,4.76-5.16,5.03-10.06,15.46-14.69,31.3-1.1,3.97-2.18,7.91-3.24,11.81-1.06,3.9-2.1,7.86-3.11,11.88-3,10.01-5.85,16.56-8.54,19.65-.62.79-2.05,1.19-4.3,1.19-1.06,0-1.59-.57-1.59-1.72,0-.62.22-1.3.66-2.05,3.31-1.37,7.08-7.59,11.32-18.66,1.46-3.88,3.9-11.29,7.35-22.23.97-3.18,1.89-6.01,2.75-8.5.86-2.49,1.71-4.69,2.55-6.58,3.18-7.19,6.66-12.68,10.46-16.48,4.23-4.28,8.47-6.42,12.7-6.42,1.5,0,2.76.29,3.77.86,1.41.71,1.5,1.52.26,2.45Z",
];

const totalFramesPerPath = 10; // מספר פריימים לכל נתיב
const delayPerPath = 5; // עיכוב בפריימים בין כל נתיב

const textColor = "#c49c5c"; // צבע הטקסט

const Slide1 = () => {
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
            transform: `scale(${animConfig({
              input: bounce({ delay: 6 }),
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
              input: bounce({ delay: 3 }),
            })})`,
          }}
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
            transform: `
            rotate(${animConfig({ options: { extrapolateRight: "loop" } })}deg)
            scale(${animConfig({
              inputRange: [0, 1, durationInFrames - 100, durationInFrames], // טווחים חדשים
              outputRange: [0, bounce({ delay: 12 }), 1, 30], // טווחי הסקייל
            })})`,
            zIndex: animConfig({
              inputRange: [0, durationInFrames - 100, durationInFrames],
              outputRange: [0, 0, 20],
              options: { extrapolateRight: "clamp" },
            }),
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
            height: `${animConfig({
              input: bounce({ delay: 9 }),
              inputRange: [0, 1],
              outputRange: [0, 55],
              options: { extrapolateRight: "clamp" },
            })}%`,
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
              transform: `scale(${animConfig({
                input: bounce({ delay: 12 }),
              })})`,
            }}
          />
          <Img
            src={staticFile("/video-assets/ornament.png")}
            alt="big mandala"
            className="w-fit h-full object-cover"
            style={{
              transform: `rotateY(180deg) scale(${animConfig({
                input: bounce({ delay: 6 }),
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
            transform: `
            rotate(${animConfig({ outputRange: [0, -360] })}deg)
            scale(${animConfig({
              inputRange: [0, 1, durationInFrames - 100, durationInFrames], // טווחים חדשים
              outputRange: [0, bounce({ delay: 18 }), 1, 30], // טווחי הסקייל
            })})`, // סיבוב ברוורס
            zIndex: animConfig({
              inputRange: [0, durationInFrames - 100, durationInFrames],
              outputRange: [0, 0, 20],
              options: { extrapolateRight: "clamp" },
            }),
          }}
          alt="big mandala"
          className="size-[250px] object-contain"
        />
      </AbsoluteFill>

      {/* כיתוב */}
      <AbsoluteFill className="flex-col-center justify-end">
        <div className="relative flex-col-center mb-[28rem] gap-8">
          {/* שם הילד */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256.88 89.99"
            className="w-[55rem] absolute bottom-full"
          >
            {paths.map((d, index) => {
              const startFrame = index * (totalFramesPerPath + delayPerPath);
              const endFrame = startFrame + totalFramesPerPath;

              // חישוב המילוי (fill-opacity)
              const fillOpacity = animConfig({
                inputRange: [startFrame, endFrame],
                outputRange: [0, 1],
                options: {
                  extrapolateRight: "clamp",
                  easing: Easing.easeInOut,
                },
              });

              return (
                <path
                  key={index}
                  d={d}
                  fill={textColor}
                  fillOpacity={fillOpacity} // אנימציה על המילוי
                />
              );
            })}
          </svg>

          {/* בר מצווה */}
          <div className="absolute top-0 flex-center gap-2">
            {"בר מצווה".split("").map((letter, index) => {
              const nameTotalFrames =
                (paths.length - 1) * (totalFramesPerPath + delayPerPath) +
                totalFramesPerPath;

              return (
                <span key={index} className="relative pt-10 overflow-hidden">
                  <p
                    className={cn("text-8xl", letter === " " && "mx-2")}
                    style={{
                      color: textColor,
                      transform: `translateY(${animConfig({
                        input: bounce({ delay: nameTotalFrames + index * 5 }),
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                      })}px)`,
                    }}
                  >
                    {letter}
                  </p>
                </span>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Slide1;

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
