"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import SplitText from "@/gsap/SplitText"; // ייבוא הפלאגין

gsap.registerPlugin(SplitText);

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current.querySelectorAll(".line");
      const timeline = gsap.timeline(); // יוצר Timeline

      lines.forEach((line) => {
        // מחלק את השורה הנוכחית למילים ואותיות
        const split = new SplitText(line, {
          type: "words,chars", // מחלק למילים ואותיות
        });

        // מוסיף את האנימציה של השורה הנוכחית ל-Timeline
        timeline.fromTo(
          split.words,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2, // מרווח בין אותיות
            duration: 0.5, // משך זמן האנימציה של כל אות
            ease: "power2.out",
          }
        );

        // מנקה את החלוקה לאחר סיום
        return () => split.revert();
      });
    }, textRef);

    return () => ctx.revert(); // מנקה את ה-GSAP context
  }, []);

  // פונקציה לפיצול הטקסט לשורות
  const splitTextToLines = (text) => {
    return text.split("\n").map((line, index) => (
      <div key={index} className="line" style={{ overflow: "hidden" }}>
        {line}
      </div>
    ));
  };

  return (
    <div
      ref={textRef}
      className="text-center md:text-4xl"
      /* style={{
        lineHeight: "1.5em", // גובה שורה
        textAlign: "center", // יישור למרכז
        direction: "rtl", // תמיכה בעברית
        fontSize: "2rem", // גודל טקסט
        display: "inline-block", // שמירה על פורמט אחיד
      }} */
    >
      {splitTextToLines(text)}
    </div>
  );
};

export default AnimatedText;
