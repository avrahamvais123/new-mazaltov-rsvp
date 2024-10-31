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
import { fontSize } from "@mui/system";
import Link from "next/link";

const buttonClassName = cn(
  "cursor-pointer h-full w-10 p-1.5",
  "bg-slate-700 text-slate-400",
  "transition-all rounded-sm",
  "hover:bg-slate-600 active:bg-slate-500"
);

const Editor = ({ imageUrl_1, imageUrl_2 }) => {
  const [isCanvas1, setIsCanvas1] = useState(true);
  const [activeObject, setActiveObject] = useState(null);
  const { editor: editor1, onReady: onReady1 } = useFabricJSEditor();
  const { editor: editor2, onReady: onReady2 } = useFabricJSEditor();
  const editor = isCanvas1 ? editor1 : editor2;

  const addText = () => {
    if (editor && editor.canvas) {
      const text = new window.fabric.Textbox("טקסט", {
        left: editor.canvas.width / 2, // מרכז התיבה
        top: editor.canvas.height / 2, // מרכז התיבה
        fontSize: 40, // גודל פונט ראשוני
        fill: "#000000", // צבע הפונט
        textAlign: "center", // יישור טקסט למרכז
        originX: "center",
        originY: "center",
        centeredScaling: true,
      });

      // מוסיף את תיבת הטקסט ומרענן את הקנבס
      editor.canvas.add(text);
      editor.canvas.setActiveObject(text);
      editor.canvas.renderAll();
    }
  };

  const addRectangle = () => {
    editor?.addRectangle();
  };

  const flipCanvas = () => {
    setIsCanvas1(!isCanvas1);
  };

  // Editor component
  useEffect(() => {
    if (!editor) return;

    const { canvas } = editor;

    const updateActiveObject = () => {
      const activeObj = canvas.getActiveObject();
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

  return (
    <div className="size-full bg-slate-100 flex-center overflow-hidden">
      {/* menu right */}
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        {/* <button onClick={downloadCanvasAsImage}>הורד תמונה</button> */}

        <Image
          src="/images/לוגו.png"
          alt="לוגו מזל טוב אישורי הגעה"
          height={100}
          width={100}
          priority
          className="mb-5"
        />

        <Link href="/catalog">לקטלוג</Link>

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

      {/* editor */}
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
          onClick={flipCanvas}
        >
          {/* <Exchange01Icon className="text-indigo-50" /> */}
          <p className="">{isCanvas1 ? "החלפה לצד א" : "החלפה לצד ב"}</p>
        </button>
      </div>

      {/* menu left */}
      <div className="size-full bg-slate-800 overflow-auto p-6 max-w-60 flex-col-center justify-start gap-2">
        <AlignObjects buttonClassName={buttonClassName} editor={editor} />
        <AlignText buttonClassName={buttonClassName} editor={editor} />
        <TextDesign
          activeObject={activeObject}
          buttonClassName={buttonClassName}
          editor={editor}
        />
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
