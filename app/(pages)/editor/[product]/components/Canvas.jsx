import React, { useEffect } from "react";
import { FabricJSCanvas } from "fabricjs-react";

const Canvas = ({ editor, onReady, imageUrl }) => {
  useEffect(() => {
    if (!editor || !editor.canvas || !imageUrl) return;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
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

  const handleCanvasReady = (canvas) => {
    // הגדרות קנבס מותאמות אישית
    canvas.fireRightClick = true; // מאפשר זיהוי לחיצה ימנית
    canvas.stopContextMenu = true; // מונע תפריט ברירת מחדל של הדפדפן בלחיצה ימנית
    canvas.renderAll(); // רענון הקנבס עם ההגדרות החדשות
  };

  return (
    <FabricJSCanvas
      className="size-full"
      onReady={(canvas) => {
        onReady(canvas); // מבטיח שהקנבס נוצר
        handleCanvasReady(canvas); // הגדרות מותאמות אישית עבור הקנבס
      }}
    />
  );
};

export default Canvas;
