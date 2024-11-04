"use client";

import React, { useEffect, useState } from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { cn } from "@/lib/utils";
import FlipCanvas from "./FlipCanvas";
import Canvas from "./Canvas";
import { indigo, red, slate } from "tailwindcss/colors";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import ContextMenu from "./ContextMenu";
import { Cancel02Icon, Copy02Icon } from "@/app/icons/icons";
import ReactDOMServer from "react-dom/server"; // ייבוא ReactDOMServer
import { duplicateObject, removeObject } from "./actions";
import "fabric-history";
import * as fabricModules from "fabric";
import EditorHeader from "./EditorHeader";
import ExtendedMenu from "./ExtendedMenu";

const buttonClassName = cn(
  "cursor-pointer h-full w-10 p-1.5",
  "bg-slate-700 text-slate-400",
  "transition-all rounded-sm",
  "hover:brightness-90 active:brightness-75"
  //"hover:bg-slate-600 active:bg-slate-500"
);

// פונקציה שממירה את ה-SVG למחרוזת Base64
const getSVGAsImage = (SVGComponent) => {
  const svgString = ReactDOMServer.renderToString(SVGComponent);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const deleteIconSrc = getSVGAsImage(
  <Cancel02Icon
    style={{
      color: red[600],
    }}
  />
);

const duplicateIconSrc = getSVGAsImage(
  <Copy02Icon
    style={{
      color: slate[300],
    }}
  />
);

const Editor = ({ imageUrl_1, imageUrl_2 }) => {
  const [isCanvas1, setIsCanvas1] = useState(true);
  const [activeObject, setActiveObject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [clickEvent, setClickEvent] = useState({});
  const { editor: editor1, onReady: onReady1 } = useFabricJSEditor();
  const { editor: editor2, onReady: onReady2 } = useFabricJSEditor();
  const editor = isCanvas1 ? editor1 : editor2;

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

    if (!editor) return;
    const { canvas } = editor;

    // מוודאים שהפונקציות של fabric-history יתווספו
    canvas.includeDefaultHistory = true;

    return () => {
      canvas.off();
    };
  }, []);

 

  // guide lines
  useEffect(() => {
    if (!editor || !editor.canvas) return;
    const { canvas } = editor;
    const { fabric } = fabricModules;

    const updateActiveObject = () => {
      const activeObj = canvas.getActiveObject();
      setActiveObject(activeObj || null);
    };

    // חשב את מרכז הקנבס
    const canvasCenterX = canvas.getWidth() / 2;
    const canvasCenterY = canvas.getHeight() / 2;

    let horizontalLine = null;
    let verticalLine = null;

    const moveObjectEvent = (e) => {
      const obj = e.target;

      // חשב את מיקום מרכז האובייקט בעזרת getCenterPoint
      const objCenter = obj.getCenterPoint();
      const objCenterX = objCenter.x;
      const objCenterY = objCenter.y;

      // בדוק אם מרכז האובייקט נמצא במרכז הקנבס
      //const isCenterX = Math.abs(objCenterX - canvasCenterX) < 5;
      const isCenterX = Math.abs(objCenterX - canvasCenterX) < 1;
      const isCenterY = Math.abs(objCenterY - canvasCenterY) < 1;

      // אם מרכז האובייקט קרוב למרכז הקנבס ואין קווים, צור אותם
      if (isCenterX && !verticalLine) {
        verticalLine = new fabric.Line(
          [canvasCenterX, 0, canvasCenterX, canvas.getHeight()],
          {
            stroke: "red",
            selectable: false,
            evented: false,
            hasBorders: false,
            hasControls: false,
            hoverCursor: "default",
            excludeFromExport: true,
          }
        );
        canvas.add(verticalLine);
        canvas.discardActiveObject(); // הסר כל אובייקט נבחר בקנבס
      }

      if (isCenterY && !horizontalLine) {
        horizontalLine = new fabric.Line(
          [0, canvasCenterY, canvas.getWidth(), canvasCenterY],
          {
            stroke: "red",
            selectable: false,
            evented: false,
            hasBorders: false,
            hasControls: false,
            hoverCursor: "default",
            excludeFromExport: true,
          }
        );
        canvas.add(horizontalLine);
        canvas.discardActiveObject(); // הסר כל אובייקט נבחר בקנבס
      }

      // הסר את הקווים אם האובייקט כבר לא במרכז הקנבס
      if (!isCenterX && verticalLine) {
        canvas.remove(verticalLine);
        verticalLine = null;
      }

      if (!isCenterY && horizontalLine) {
        canvas.remove(horizontalLine);
        horizontalLine = null;
      }

      // החזר את הפוקוס לאובייקט המוזז
      canvas.setActiveObject(obj);
      canvas.renderAll();
    };

    // הסר את הקווים כאשר המשתמש משחרר את העכבר
    const removeLines = () => {
      if (horizontalLine) {
        canvas.remove(horizontalLine);
        horizontalLine = null;
      }
      if (verticalLine) {
        canvas.remove(verticalLine);
        verticalLine = null;
      }
      canvas.renderAll();
    };

    // האזן לאירוע של הזזת אובייקט
    canvas.on("object:moving", moveObjectEvent);
    // הסר את הקווים כשמשחררים את העכבר
    canvas.on("mouse:up", removeLines);
    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", () => setActiveObject(null));

    // נקה את הקנבס כשהקומפוננטה מתפרקת
    return () => {
      canvas.off("object:moving", moveObjectEvent);
      canvas.off("mouse:up", removeLines);
      canvas.off("selection:created", updateActiveObject);
      canvas.off("selection:updated", updateActiveObject);
      canvas.off("selection:cleared");
    };
  }, [editor]);

  // פונקציות undo ו-redo
  const undo = () => {
    if (!editor) return;
    const { canvas } = editor;
    canvas.undo();
  };

  const redo = () => {
    if (!editor) return;
    const { canvas } = editor;
    canvas.redo();
  };

  return (
    <div className="size-full bg-slate-100 flex-col-center overflow-hidden">
      <EditorHeader editor={editor} />

      <div className="size-full bg-slate-100 flex-center overflow-hidden">
        <RightMenu
          editor={editor}
          activeObject={activeObject}
          buttonClassName={buttonClassName}
          setShowMenu={setShowMenu}
          setClickEvent={setClickEvent}
        />

        {/* flip canvases */}
        <div className="relative size-full flex-col-center">
          <div className="size-full flex-col-center gap-4 p-9">
            <ContextMenu
              editor={editor}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              clickEvent={clickEvent}
            />

            <FlipCanvas
              isFlipped={!isCanvas1}
              frontContent={
                <Canvas
                  editor={editor1}
                  onReady={onReady1}
                  imageUrl={imageUrl_1}
                />
              }
              backContent={
                <Canvas
                  editor={editor2}
                  onReady={onReady2}
                  imageUrl={imageUrl_2}
                />
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
        </div>

        {/* menu left */}
        <LeftMenu
          editor={editor}
          activeObject={activeObject}
          buttonClassName={buttonClassName}
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

//! לא למחוק
/* fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      cursorStyle: "pointer",
      mouseUpHandler: (eventData, transform) => {
        const target = transform.target;
        const canvas = target.canvas;
        if (canvas) {
          canvas.remove(target); // מחיקת האובייקט מהקנבס
          canvas.requestRenderAll();
        }
      },
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const img = new Image();
        img.src = svgImageSrc; // שימוש ב-B64 של ה-SVG
        img.onload = () => {
          ctx.drawImage(img, left - img.width / 2, top - img.height / 2);
        };
      },
    });

    editor.canvas.renderAll(); */

// ! /* עיצוב הידיות */
/* useEffect(() => {
    if (!editor) return;

    // הגדרת הידית העליונה-ימנית (מחיקה) עם האייקון
    fabric.Object.prototype.controls.tr = new fabric.Control({
      x: 0.5,
      y: -0.5,
      cursorStyle: "pointer",
      mouseUpHandler: () => removeObject({ editor }), // שימוש בפונקציה למחיקת האובייקט
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const size = 30;
        const img = new Image();
        img.src = deleteIconSrc;
        img.onload = () => {
          ctx.drawImage(img, left - size / 2, top - size / 2, size, size);
        };
      },
    });

    // הגדרת הידית העליונה-שמאלית (שכפול) עם האייקון
    fabric.Object.prototype.controls.tl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      cursorStyle: "pointer",
      mouseUpHandler: () =>
        duplicateObject({ editor, setShowMenu, setClickEvent }), // שימוש בפונקציה לשכפול האובייקט
      render: (ctx, left, top, styleOverride, fabricObject) => {
        const size = 30;
        const img = new Image();
        img.src = duplicateIconSrc;
        img.onload = () => {
          ctx.drawImage(img, left - size / 2, top - size / 2, size, size);
        };
      },
    });

    editor.canvas.renderAll();
  }, [editor, deleteIconSrc, duplicateIconSrc]); */
