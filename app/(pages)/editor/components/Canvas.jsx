"use client";

import { FabricJSCanvas } from "fabricjs-react";
import React, { useEffect } from "react";

const Canvas = ({ editor, onReady, imageUrl }) => {
  useEffect(() => {
    if (!editor || !editor.canvas || !imageUrl) return;

    const fabric = window.fabric;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        console.log("Image loaded successfully:", img);

        // מרכז את התמונה בקנבס
        img.scaleToWidth(editor.canvas.width);
        img.scaleToHeight(editor.canvas.height);
        img.set({
          originX: "center",
          originY: "center",
          left: editor.canvas.width / 2,
          top: editor.canvas.height / 2,
        });

        // הגדרת התמונה כרקע
        editor.canvas.setBackgroundImage(
          img,
          editor.canvas.renderAll.bind(editor.canvas),
          { centeredScaling: true }
        );
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      editor.canvas.clear();
    };
  }, [editor]);
  return <FabricJSCanvas className="size-full" onReady={onReady} />;
};

export default Canvas;
