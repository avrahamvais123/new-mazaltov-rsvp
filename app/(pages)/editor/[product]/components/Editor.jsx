"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import FlipCanvas from "./FlipCanvas";
import Canvas from "./Canvas";
import RightMenu from "./RightMenu";
import ContextMenu from "./ContextMenu";
import EditorHeader from "./EditorHeader";
import ToolBar from "./ToolBar";
import * as fabricModule from "fabric";
import UseInitialCanvas from "../hooks/useInitialCanvas";
import "fabric-history";

const { fabric } = fabricModule;

// zoom in and out
const zoomInOut = ({ canvas }) => {
  if (!canvas) return;

  // Function to update zoom level centered on canvas center
  const zoomCanvas = (zoomIn) => {
    const currentZoom = canvas.getZoom();
    const newZoom = zoomIn ? currentZoom + 0.1 : currentZoom - 0.1;
    const canvasCenter = new fabric.Point(canvas.width / 2, canvas.height / 2);
    canvas.zoomToPoint(canvasCenter, newZoom);
    canvas.requestRenderAll();
  };

  // Keyboard event handler for zoom
  const handleKeyPress = (event) => {
    if (event.key === "=") {
      zoomCanvas(true);
    } else if (event.key === "-") {
      zoomCanvas(false);
    }
  };
  return { zoomCanvas, handleKeyPress };
};

// define layers
const sortObjects = ({ canvas }) => {
  canvas._objects.sort((a, b) => (a.zIndex > b.zIndex ? 1 : -1));
  canvas.renderAll();
};

const Editor = ({ imageUrl_1, imageUrl_2 }) => {
  const {
    canvas,
    canvas1,
    canvas2,
    isCanvas1,
    setIsCanvas1,
    canvasRef1,
    canvasRef2,
  } = UseInitialCanvas();

  const [activeObject, setActiveObject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [clickEvent, setClickEvent] = useState({});

  return (
    <div className="size-full bg-slate-100 flex-col-center overflow-hidden">
      <EditorHeader />

      <div className="relative size-full bg-slate-100 flex-center overflow-hidden">
        <RightMenu
          activeObject={activeObject}
          setShowMenu={setShowMenu}
          setClickEvent={setClickEvent}
        />

        {/* flip canvases */}
        <div className="relative size-full flex-col-center">
          <ToolBar showToolbar={showToolbar} setShowToolbar={setShowToolbar} />
          <div className="size-full flex-col-center gap-4 p-9">
            <ContextMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              clickEvent={clickEvent}
            />

            <FlipCanvas
              sizes={{ width: 120 * 2.8, height: 180 * 2.8 }}
              isFlipped={!isCanvas1}
              frontContent={
                <Canvas
                  canvas={canvas1}
                  imageUrl={imageUrl_1}
                  canvasRef={canvasRef1}
                />
              }
              backContent={
                <Canvas
                  canvas={canvas2}
                  imageUrl={imageUrl_2}
                  canvasRef={canvasRef2}
                />
              }
            />

            {/* החלפת צד */}
            <button
              onClick={() => {
                canvas.discardActiveObject();
                canvas.requestRenderAll();
                setIsCanvas1(!isCanvas1);
              }}
              className={cn(
                "flex-center gap-1 py-2 px-4 rounded-sm",
                "border border-transparent",
                isCanvas1
                  ? "bg-indigo-600 text-indigo-50 hover:bg-indigo-700 active:bg-indigo-800"
                  : "bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
              )}
            >
              <p className="">{isCanvas1 ? "החלפה לצד א" : "החלפה לצד ב"}</p>
            </button>
          </div>
        </div>
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

//! היסטוריה
/* 
  const historyNew = () => {
    fabric.Canvas.prototype.historyInit = function () {
      this.historyUndo = [];
      this.historyNextState = this.historyNext();

      this.on({
        "object:added": this.historySaveAction,
        "object:removed": this.historySaveAction,
        "object:modified": this.historySaveAction,
      });
    };

    fabric.Canvas.prototype.historyNext = function () {
      return JSON.stringify(this.toDatalessJSON(this.extraProps));
    };

    fabric.Canvas.prototype.historySaveAction = function () {
      if (this.historyProcessing) return;

      const json = this.historyNextState;
      this.historyUndo.push(json);
      this.historyNextState = this.historyNext();
    };

    fabric.Canvas.prototype.undo = function () {
      // The undo process will render the new states of the objects
      // Therefore, object:added and object:modified events will triggered again
      // To ignore those events, we are setting a flag.
      this.historyProcessing = true;

      const history = this.historyUndo.pop();
      if (history) {
        this.loadFromJSON(history).renderAll();
      }

      this.historyProcessing = false;
    };
  }; */

//! לא למחוק
/* editor={editor1}
                  onReady={onReady1}
                  */
