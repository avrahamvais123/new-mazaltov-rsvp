"use client";

import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import GoldFrame from "./slide-1/GoldFrame2";
import Ornaments from "./slide-2/Ornaments";
import Text from "./slide-2/Text";
import Name from "./slide-2/Name";

const textColor = "#c49c5c"; // צבע הטקסט

const text1 = `בשבח והודיה לה׳ יתברך
  אנו שמחים להזמינכם להשתתף
  בשמחת בר המצווה של בננו היקר`;

const delayConfig = {
  goldFrame: 3,
  opacityMandala: 6,
  ornaments: {
    tr: 10,
    br: 15,
    bl: 20,
    tl: 25,
  },
  text: {
    startDelay: 30, // השהיה לפני תחילת הטקסט
    letterDelay: 1, // השהיה בין כל אות לאות
  },
  name: {
    startDelay: 120, // השהיה לפני תחילת הטקסט
    letterDelay: 10, // השהיה בין כל אות לאות
    overflow: 160, // תצפית על השם
  },
};

const Slide2 = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const bounce = (props) =>
    spring({
      frame,
      fps,
      config: { damping: 15 },
      ...props,
    });

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
      <GoldFrame
        delayConfig={delayConfig}
        bounce={bounce}
        mandalaOpacity={0.4}
      />

      {/* עיטורים */}
      <Ornaments delayConfig={delayConfig} bounce={bounce} />

      {/* כיתוב */}
      <AbsoluteFill
        style={{
          padding: 192,
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: 80,
        }}
      >
        <Text
          delayConfig={delayConfig}
          bounce={bounce}
          text1={text1}
          textColor={textColor}
        />

        <Name
          delayConfig={delayConfig}
          bounce={bounce}
          name="יעקב"
          textColor={textColor}
        />
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
