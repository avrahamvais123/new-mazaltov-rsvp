"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const DraggableResizableTextBox = (props) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // שמירה על מצב ההובר
  const [fontSize, setFontSize] = useState(16); // גודל פונט התחלתי
  const sizeRef = useRef({ width: 200, height: 100 }); // שמירה על הגודל הקודם של התיבה

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleResize = (event, { size }) => {
    if (isShiftPressed) {
      // שינוי הפונט רק אם גודל התיבה השתנה
      const widthRatio = size.width / sizeRef.current.width;
      const newFontSize = fontSize * widthRatio;
      setFontSize(newFontSize);
    }
    sizeRef.current = size; // שמירה על הגודל הנוכחי בתור גודל קודם
  };

  return (
    <div className="absolute inset-0 z-10">
      <Draggable handle=".handle">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ResizableBox
            width={200}
            height={100}
            minConstraints={[100, 50]}
            maxConstraints={[500, 300]}
            resizeHandles={["sw"]}
            className={cn(
              "relative",
              isHovered ? "border border-dashed" : "border-none",
              props?.className
            )}
            onResize={handleResize}
            handle={
              isHovered && (
                <span className="absolute -bottom-2 -left-2 size-5 bg-white cursor-nwse-resize" />
              )
            }
          >
            {/* ידית לגרירה */}
            {isHovered && (
              <div className="handle absolute -top-2 -right-2 size-5 bg-white p-1 cursor-move" />
            )}

            {/* תיבת הטקסט */}
            <textarea
              rows="4"
              className="size-full text-white text-center resize-none bg-transparent"
              style={{ fontSize: `${fontSize}px` }}
              placeholder="גרור אותי"
            />
          </ResizableBox>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableResizableTextBox;
