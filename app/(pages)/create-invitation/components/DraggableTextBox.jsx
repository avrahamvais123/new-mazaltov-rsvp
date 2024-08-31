import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import "react-resizable/css/styles.css";

const DraggableResizableTextBox = (props) => {
  const [fontSize, setFontSize] = useState(16);
  const [size, setSize] = useState({ width: 200, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef(null);

  const handleResize = (e, direction, ref, delta, position) => {
    const newWidth = parseFloat(ref.style.width);
    const newHeight = parseFloat(ref.style.height);

    if (direction === "left" || direction === "right") {
      // התאמה אוטומטית לגובה השורות רק בעת גרירת הידיות הצדדיות
      textAreaRef.current.style.width = `${newWidth}px`;
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      setSize({ width: newWidth, height: textAreaRef.current.scrollHeight });
    } else {
      // שמירה על הפרופורציה של הטקסט בעת גרירת הפינות
      const widthRatio = newWidth / size.width;
      const newFontSize = fontSize * widthRatio;
      setFontSize(newFontSize);

      // שמירה על הפרופורציה באמצעות חישוב הגובה החדש בהתאם לרוחב החדש
      const newHeightBasedOnWidth = newWidth * (size.height / size.width);
      setSize({ width: newWidth, height: newHeightBasedOnWidth });
    }
    setPosition({ x: position.x, y: position.y });
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResize={handleResize}
      minWidth={100}
      minHeight={50}
      bounds="parent"
      className={`absolute z-10 border border-transparent border-dashed hover:border-white ${props?.className}`}
      resizeHandleStyles={{
        bottomRight: { cursor: "nwse-resize" },
        bottomLeft: { cursor: "nesw-resize" },
        topRight: { cursor: "nesw-resize" },
        topLeft: { cursor: "nwse-resize" },
        left: { cursor: "ew-resize" },
        right: { cursor: "ew-resize" },
      }}
    >
      <textarea
        ref={textAreaRef}
        className="w-full text-white text-center resize-none bg-transparent overflow-hidden"
        style={{ fontSize: `${fontSize}px` }}
        placeholder="גרור אותי"
      />
    </Rnd>
  );
};

export default DraggableResizableTextBox;
