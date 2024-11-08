"use client";

import { canvas_Atom, editingMode_Atom } from "@/lib/jotai";
import { cn } from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState, useEffect } from "react";

const TextEditor = ({ classNames, title = "עריכת טקסט", activeObject }) => {
  console.log("activeObject: ", activeObject);
  const canvas = useAtomValue(canvas_Atom);
  const [editingMode, setEditingMode] = useAtom(editingMode_Atom);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (!canvas) return;

    console.log('activeObject from TextEditor: ', activeObject);

    if (activeObject) {
      setTextValue(activeObject?.text || "");
    } else {
      setTextValue("");
    }
  }, [canvas, activeObject]);

  useEffect(() => {
    console.log("editingMode: ", editingMode);
  }, [editingMode]);

  const handleTextChange = (e) => {
    if (!canvas) return;

    setEditingMode(true);

    const newText = e.target.value;
    setTextValue(newText);

    console.log("activeObject: ", activeObject);

    if (activeObject) {
      activeObject?.set("text", newText);
      activeObject?.set("isEditing", true);
      canvas.renderAll();
    }
  };

  const handleFocus = () => {
    if (!canvas) return;

    setEditingMode(true);
    console.log("on focus");

    if (activeObject) {
      activeObject?.set("isEditing", true);
      canvas.renderAll();
    }
  };

  const handleBlur = () => {
    if (!canvas) return;

    setEditingMode(false);
    console.log("on blur");

    if (activeObject) {
      activeObject?.set("isEditing", false);
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
          "border border-transparent outline-none",
          classNames?.textarea
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
