"use client";

import React from "react";

import { useState, useEffect } from "react";

const TextEditor = ({ editor }) => {
  const [textValue, setTextValue] = useState("");

  // Update textarea when selecting a text object on the canvas
  useEffect(() => {
    const updateTextValue = () => {
      const activeObject = editor?.canvas?.getActiveObject();
      if (activeObject && activeObject.type === "text") {
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
  }, [editor]);

  // Update the active object's text on canvas when editing the textarea
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setTextValue(newText);

    const activeObject = editor?.canvas?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set("text", newText);
      editor.canvas.renderAll();
    }
  };

  return (
    <fieldset className="border border-slate-700 rounded-sm">
      <legend className="px-2 mr-2 text-xs text-slate-400">עריכת טקסט</legend>
      <textarea
        value={textValue}
        rows={4}
        placeholder="הכנס טקסט..."
        className="resize-none w-full px-4 py-2 bg-transparent transition-all rounded-sm text-slate-400 focus:outline-none focus:border-indigo-600"
        onChange={handleTextChange}
      />
    </fieldset>
  );
};

export default TextEditor;
