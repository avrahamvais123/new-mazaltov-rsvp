"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);
  //const container = useRef();

  useGSAP(
    () => {
      const words = textRef.current.querySelectorAll("span");
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2, // מרווח בין מילים
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
    //{ scope: container }
  ); // <-- scope is for selector text (optional)

  /* useEffect(() => {
    const words = textRef.current.querySelectorAll("span");
    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2, // מרווח בין מילים
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, []); */

  const splitTextToWords = (text) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="inline-block ml-1.5">
        {word}
      </span>
    ));
  };

  return (
    <div
      dir="rtl"
      ref={textRef}
      className="text-center text-xl leading-4 inline-block"
    >
      {text.split("\n").map((line, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {splitTextToWords(line)}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;

/* style={{
        lineHeight: "0.5rem", // גובה שורה
        textAlign: "center", // יישור לאמצע
        direction: "rtl", // כיוון RTL
        display: "inline-block", // שמירה על רוחב אוטומטי
      }} */
