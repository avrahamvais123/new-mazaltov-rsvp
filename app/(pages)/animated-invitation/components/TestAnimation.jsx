"use client";

import React from "react";
import { motion } from "framer-motion";

const TestAnimation = ({ text, duration = 0.2, lineGap = 0, delay = 0 }) => {
  const splitedToLines = () => {
    return text.split("\n").map((line) => {
      const lineTrimmed = line.trim();
      return lineTrimmed.split(" ");
    });
  };

  const calculateLineDelays = (lines) => {
    let delays = [];
    let cumulativeDelay = delay; // מתחיל עם העיכוב הכללי

    lines.forEach((line) => {
      const lineDuration = line.length * duration; // זמן האנימציה עבור כל המילים בשורה
      delays.push(cumulativeDelay); // העיכוב של השורה הנוכחית
      cumulativeDelay += lineDuration + lineGap; // מוסיפים עיכוב כולל לשורה הבאה
    });

    return delays;
  };

  const lines = splitedToLines();
  const lineDelays = calculateLineDelays(lines);

  return (
    <div className="flex-col-center gap-2">
      {lines.map((line, lineIndex) => {
        const lineDelay = lineDelays[lineIndex]; // עיכוב עבור השורה הנוכחית

        return (
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lineDelay, duration }}
            className="line flex-center gap-x-2"
          >
            {line.map((word, wordIndex) => {
              const wordDelay = lineDelay + wordIndex * duration; // עיכוב עבור כל מילה בשורה

              return (
                <motion.div
                  key={wordIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: wordDelay, duration, type: "spring" }}
                  className="text-xl md:text-4xl"
                >
                  {word}
                </motion.div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TestAnimation;
