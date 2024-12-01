"use client";

import React, { useRef } from "react";
import anime from "animejs";
import WordPullUp from "@/components/ui/word-pull-up";

const AnimatedText = ({ text }) => {
  /* const textRef = useRef(null);

  React.useEffect(() => {
    // פיצול הטקסט למילים
    const lines = Array.from(textRef.current.querySelectorAll(".line"));
    lines.forEach((line) => {
      line.innerHTML = splitTextToWords(line.textContent);
    });

    const words = textRef.current.querySelectorAll(".word");

    // יצירת Timeline באמצעות anime.js
    const timeline = anime.timeline({
      easing: "easeOutQuad", // עקומת האנימציה
      duration: 300, // משך זמן בסיסי
    });

    timeline.add({
      targets: words,
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(100), // מרווח בין מילים
    });

    // ניתן להוסיף פעולות נוספות לטיים ליין כאן
  }, []);

  // פונקציה לפיצול הטקסט לשורות
  const splitTextToWords = (line) => {
    const words = line.split(" ");
    return words
      .map(
        (word) =>
          `<span class="word" style="display:inline-block">${word}</span>`
      )
      .join(" ");
  };

  // פונקציה לפיצול הטקסט לשורות
  const splitTextToLines = (text) => {
    return text.split("\n").map((line, index) => (
      <div key={index} className="line" style={{ overflow: "hidden" }}>
        {line}
      </div>
    ));
  }; */

  /* return (
    <div ref={textRef} className="text-center md:text-4xl">
      {splitTextToLines(text)}
    </div>
  ); */

  const words = "שורה שלישית ואחרונה מספר 3";
  return (
    <>
      <WordPullUp
        className="text-xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="שורה ראשונה"
        wrapperFramerProps={{}}
      />
      <WordPullUp
        className="text-xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="שורה שניה מספר 2"
      />
      <WordPullUp
        className="text-xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="שורה שלישית ואחרונה מספר 3"
      />
    </>
  );
};

export default AnimatedText;
