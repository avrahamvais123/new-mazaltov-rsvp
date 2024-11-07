"use client";

import { canvas_Atom } from "@/lib/jotai";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import React, { useState, useEffect } from "react";

const TextEditor = ({ classNames, title = "עריכת טקסט", currentObject }) => {
  console.log('currentObject: ', currentObject);
  const canvas = useAtomValue(canvas_Atom);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (!canvas) return;
    //const activeObject = canvas.getActiveObject();

    if (currentObject) {
      setTextValue(currentObject.text || "");
    } else {
      setTextValue("");
    }
  }, [canvas]);

  const handleTextChange = (e) => {
    if (!canvas) return;
    //const activeObject = canvas.getActiveObject();

    const newText = e.target.value;
    setTextValue(newText);

    if (currentObject) {
      currentObject.set("text", newText);
      canvas.renderAll();
    }
  };

  return (
    <fieldset
      className={cn("border border-slate-700 rounded-sm", classNames?.fieldset)}
    >
      <legend
        className={cn("px-2 mr-2 text-xs text-slate-400", classNames?.legend)}
      >
        {title}
      </legend>
      <textarea
        value={textValue}
        rows={4}
        className={cn(
          "resize-none w-full px-4 py-2",
          "bg-transparent transition-all",
          "rounded-sm text-slate-400",
          "focus:outline-none focus:border-indigo-600",
          classNames?.textarea
        )}
        onChange={handleTextChange}
      />
    </fieldset>
  );
};

export default TextEditor;

// Update textarea when selecting a text object on the canvas
/* useEffect(() => {
    const updateTextValue = () => {
      const activeObject = editor?.canvas?.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        console.log('activeObject from TextEditor: ', activeObject);
        setTextValue(activeObject.text || "");
      }
    };

    // Listen for selection changes on the canvas
    editor?.canvas?.on("selection:created", updateTextValue);
    editor?.canvas?.on("selection:updated", updateTextValue);

    return () => {
      editor?.canvas?.off("selection:created", updateTextValue);
      editor?.canvas?.off("selection:updated", updateTextValue);
    };
  }, [editor]); */
