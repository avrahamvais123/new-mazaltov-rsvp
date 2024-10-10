"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function EditableText({
  initialText,
  text = initialText || "",
  setText = () => {},
  onChange = () => {},
  onBlur = () => {},
  classNames = {},
  width = null,
}) {
  const [isEditing, setIsEditing] = useState(false);
  //const [text, setText] = useState(initialText || "");

  const handleInputChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onBlur();
  };

  useEffect(() => {
    setText(initialText); // עדכון הטקסט כאשר הטקסט הראשוני משתנה
  }, [initialText]);

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          autoFocus
          value={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ width: width ? width : `${text.length + 10}ch` }}
          className={cn(
            "border border-gray-300 px-2 rounded-sm focus:outline-none",
            classNames?.input
          )}
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={cn(
            "cursor-pointer border border-transparent",
            classNames?.text
          )}
        >
          {text}
        </span>
      )}
    </>
  );
}
