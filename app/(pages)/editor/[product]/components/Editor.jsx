"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { cn } from "@/lib/utils";
import TextEditor from "./TextEditor";
import Image from "next/image";
import AlignObjects from "./AlignObjects";
import AlignText from "./AlignText";
import TextDesign from "./TextDesign";
import Templates from "./Templates";
import FlipCanvas from "./FlipCanvas";
import Canvas from "./Canvas";
import { useRouter } from "next/navigation";
import FontSize from "./FontSize";
import ColorPicker from "./ColorPicker";
import { indigo, slate } from "tailwindcss/colors";
import LineHeight from "./LineHeight";

const buttonClassName = cn(
  "cursor-pointer h-full w-10 p-1.5",
  "bg-slate-700 text-slate-400",
  "transition-all rounded-sm",
  "hover:bg-slate-600 active:bg-slate-500"
);

const Editor = ({ imageUrl_1, imageUrl_2 }) => {
  const router = useRouter();
  const [isCanvas1, setIsCanvas1] = useState(true);
  const [activeObject, setActiveObject] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  const { editor: editor1, onReady: onReady1 } = useFabricJSEditor();
  const { editor: editor2, onReady: onReady2 } = useFabricJSEditor();
  const editor = isCanvas1 ? editor1 : editor2;

  const addText = () => {
    if (editor && editor.canvas) {
      console.log("fabric: ", fabric);
      const textBox = new window.fabric.IText("טקסט", {
        left: editor.canvas.width / 2, // מרכז התיבה
        top: editor.canvas.height / 2, // מרכז התיבה
        fontSize: 60, // גודל פונט ראשוני
        fill: "#000000", // צבע הפונט
        textAlign: "center", // יישור טקסט למרכז
        originX: "center",
        originY: "center",
        centeredScaling: true,
        editable: false,
      });

      textBox.setControlVisible("ml", false); // ידית שמאל
      textBox.setControlVisible("mr", false); // ידית ימין
      textBox.setControlVisible("mt", false); // ידית עליונה
      textBox.setControlVisible("mb", false); // ידית תחתונה

      // מוסיף את תיבת הטקסט ומרענן את הקנבס
      editor.canvas.add(textBox);
      editor.canvas.setActiveObject(textBox);
      editor.canvas.renderAll();
    }
  };

  const addRectangle = () => {
    editor?.addRectangle();
  };

  /* initial fabric */
  useEffect(() => {
    fabric.Object.prototype.set({
      borderColor: indigo[700], // צבע מסגרת ברירת המחדל
      borderDashArray: [5, 5], // סגנון קווי המסגרת
      borderScaleFactor: 2, // רוחב המסגרת
      cornerStyle: "circle", // סגנון הידיות
      cornerStrokeColor: indigo[700], // צבע קו הידיות
      cornerColor: indigo[300], // צבע הידיות
      cornerScaleFactor: 2, // גודל הידיות
      transparentCorners: false,
    });
  }, []);

  // Editor component
  useEffect(() => {
    if (!editor) return;
    const { canvas } = editor;

    const updateActiveObject = () => {
      const activeObj = canvas.getActiveObject();
      console.log("activeObj: ", activeObj);
      setActiveObject(activeObj || null);
    };

    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", () => setActiveObject(null));

    return () => {
      canvas.off("selection:created", updateActiveObject);
      canvas.off("selection:updated", updateActiveObject);
      canvas.off("selection:cleared");
    };
  }, [editor]);

  // Update selectedColor when activeObject changes
  useEffect(() => {
    if (activeObject) {
      const fillColor = activeObject.get("fill");
      setSelectedColor(fillColor);
    }
  }, [activeObject]);

  return (
    <div className="relative size-full bg-slate-100 flex-center overflow-hidden">
      {/* menu right */}
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        {/* <button onClick={downloadCanvasAsImage}>הורד תמונה</button> */}

        <button
          className="absolute top-4 right-4"
          onClick={() => router.back()}
        >
          יציאה
        </button>

        <Image
          src="/images/לוגו.png"
          alt="לוגו מזל טוב אישורי הגעה"
          height={100}
          width={100}
          priority
          className="mb-5"
        />

        {/* תבניות עיצוב */}
        <Templates />

        {/* הוספת טקסט */}
        <button
          className={cn(
            buttonClassName,
            "w-full h-fit p-3 text-indigo-100",
            "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
          onClick={addText}
        >
          הוספת טקסט
        </button>

        {/* עורך טקסט */}
        <TextEditor activeObject={activeObject} editor={editor} />
      </div>

      {/* flip canvases */}
      <div className="size-full flex-col-center gap-4 p-9">
        <FlipCanvas
          isFlipped={!isCanvas1}
          frontContent={
            <Canvas editor={editor1} onReady={onReady1} imageUrl={imageUrl_1} />
          }
          backContent={
            <Canvas editor={editor2} onReady={onReady2} imageUrl={imageUrl_2} />
          }
        />
        {/* החלפת צד */}
        <button
          className={cn(
            "flex-center gap-1 py-2 px-4 rounded-sm",
            "border border-transparent",
            isCanvas1
              ? "bg-indigo-600 text-indigo-50 hover:bg-indigo-700 active:bg-indigo-800"
              : "bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
          )}
          onClick={() => setIsCanvas1(!isCanvas1)}
        >
          {/* <Exchange01Icon className="text-indigo-50" /> */}
          <p className="">{isCanvas1 ? "החלפה לצד א" : "החלפה לצד ב"}</p>
        </button>
      </div>

      {/* menu left */}
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        <ColorPicker
          editor={editor}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          activeObject={activeObject}
        />
        <FontSize editor={editor} />
        <LineHeight editor={editor} />
        <TextDesign
          activeObject={activeObject}
          buttonClassName={buttonClassName}
          editor={editor}
        />
        <AlignText buttonClassName={buttonClassName} editor={editor} />
        <AlignObjects buttonClassName={buttonClassName} editor={editor} />
      </div>
    </div>
  );
};

export default Editor;

/* useEffect(() => {
    if (!fabric) return;
    console.log('fabric: ', fabric);
    fabric?.Image.fromURL("/images/user-1.png", (oImg) => {
      editor?.canvas.add(oImg);
    });
  }, [fabric, editor]); */

/* const predicate = (event) => {
    console.log("event.key: ", event.key);
    event.key === "Backspace" && editor?.deleteSelected();
  }; */

//useKey(predicate);

//! לא למחוק
/* const downloadCanvasAsImage = () => {
    const format = "png";

    if (!editor || !editor.canvas) return;

    // הגדרת פורמט התמונה: PNG או JPEG
    const dataURL = editor.canvas.toDataURL({
      format: format,
      quality: 1.0, // איכות גבוהה (ל-JPEG)
      multiplier: 2,
    });

    // יצירת קישור להורדה
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `canvas-image.${format}`;

    // הוספה וקליק אוטומטי להורדה
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; */

/*  
  <div className="relative flex group">
  {showColorPicker && (
    <div className="absolute inset-0 size-full cursor-pointer" />
  )}
  <button
    className={cn(
      buttonClassName,
      "size-full p-1.5 flex group-hover:bg-slate-600 group-active:bg-slate-500"
    )}
    onClick={() => setShowColorPicker(!showColorPicker)}
  >
    <span
      style={{
        backgroundColor: selectedColor,
      }}
      className="size-full bg-white rounded-sm"
    />
  </button>
</div> */
