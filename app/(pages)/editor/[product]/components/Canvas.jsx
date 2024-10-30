import React, { useEffect } from "react";
import { FabricJSCanvas } from "fabricjs-react";

const Canvas = ({ editor, onReady, imageUrl }) => {
  useEffect(() => {
    const loadImageToCanvas = async () => {
      const fabricModule = await import("fabric");
      const fabric = fabricModule.fabric;

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
    };

    loadImageToCanvas();

    return () => {
      if (editor?.canvas) {
        try {
          editor.canvas.clear();
          editor.canvas.dispose();
        } catch (error) {
          console.warn("Failed to clear or dispose canvas:", error);
        }
      }
    };
  }, [editor, imageUrl]);

  return <FabricJSCanvas className="size-full" onReady={onReady} />;
};

export default Canvas;
