import React, { useEffect } from "react";
import { FabricJSCanvas } from "fabricjs-react";

const Canvas = ({ editor, onReady, imageUrl }) => {
  useEffect(() => {
    const fabric = window.fabric;
    console.log("fabric: ", fabric);

    if (!editor || !editor.canvas || !imageUrl) return;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        console.log("Image loaded successfully:", img);

        img.scaleToWidth(editor.canvas.width);
        img.scaleToHeight(editor.canvas.height);
        img.set({
          originX: "center",
          originY: "center",
          left: editor.canvas.width / 2,
          top: editor.canvas.height / 2,
        });

        editor.canvas.setBackgroundImage(
          img,
          editor.canvas.renderAll.bind(editor.canvas),
          { centeredScaling: true }
        );
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      if (editor?.canvas) {
        // ביטול כל המאזינים לאירועים
        editor.canvas.off();

        // ניקוי הקנבס
        editor.canvas.clear();

        console.log("Canvas cleared successfully");
      }
    };
  }, [editor, imageUrl]);

  return <FabricJSCanvas className="size-full" onReady={onReady} />;
};

export default Canvas;
