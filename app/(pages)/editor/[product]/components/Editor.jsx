"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { cn } from "@/lib/utils";
import FlipCanvas from "./FlipCanvas";
import Canvas from "./Canvas";
import { indigo, red, slate } from "tailwindcss/colors";
import RightMenu from "./RightMenu";
import ContextMenu from "./ContextMenu";
import { Cancel02Icon, Copy02Icon } from "@/app/icons/icons";
import ReactDOMServer from "react-dom/server"; // ייבוא ReactDOMServer
//import "fabric-history";
import EditorHeader from "./EditorHeader";
import ToolBar from "./ToolBar";
import { v4 as uuidv4 } from "uuid"; // ייבוא של uuid
import { useAtom, useAtomValue } from "jotai";
import {
  canvas_Atom,
  canvas1_Atom,
  canvas2_Atom,
  editingMode_Atom,
} from "@/lib/jotai";
import * as fabricModule from "fabric";

const { fabric } = fabricModule;

const definedCustomProperty = () => {
  // הוספת המאפיין המותאם אישית באופן גלובלי
  fabric.Object.prototype.toObject = (function (toObject) {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        id: this.id,
      });
    };
  })(fabric.Object.prototype.toObject);
};

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

// guide lines
const createGuidelines = ({ canvas }) => {
  if (!canvas) return;
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
          isGuideLine: true,
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
          isGuideLine: true,
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

  return { moveObjectEvent, removeLines };
};

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
  const [canvas, setCanvas] = useAtom(canvas_Atom);
  const [canvas1, setCanvas1] = useAtom(canvas1_Atom);
  const [canvas2, setCanvas2] = useAtom(canvas2_Atom);
  const [editingMode, setEditingMode] = useAtom(editingMode_Atom);

  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  const [layers, setLayers] = useState([]);
  const [isCanvas1, setIsCanvas1] = useState(true);
  const [activeObject, setActiveObject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [clickEvent, setClickEvent] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosX, setLastPosX] = useState(0);
  const [lastPosY, setLastPosY] = useState(0);

  /* initial fabric */
  useEffect(() => {
    // הגדרות מותאמות אישית לאובייקטים ב-Fabric.js
    fabric.Object.prototype.set({
      borderColor: indigo[700],
      borderDashArray: [5, 5],
      borderScaleFactor: 2,
      cornerStyle: "circle",
      cornerStrokeColor: indigo[700],
      cornerColor: indigo[300],
      cornerScaleFactor: 2,
      transparentCorners: false,
    });

    fabric.Object.prototype.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      tl: true,
      tr: true,
      bl: true,
      br: true,
    });

    fabric.Textbox.prototype.centeredScaling = true;
    fabric.IText.prototype.centeredScaling = true;
  }, []);

  // initial canvas
  useEffect(() => {
    console.log("fabric: ", fabric);

    const parentWidth = canvasRef1.current?.parentNode?.clientWidth;
    const parentHeight = canvasRef1.current?.parentNode?.clientHeight;

    const initialCanvas1 = new fabric.Canvas(canvasRef1.current, {
      width: parentWidth,
      height: parentHeight,
      fireRightClick: true, // מאפשר זיהוי לחיצה ימנית
      stopContextMenu: true, // מונע תפריט ברירת מחדל של הדפדפן בלחיצה ימנית
      selection: true, // מאפשר בחירת אובייקטים וקבוצות
      centeredScaling: true,
    });

    const initialCanvas2 = new fabric.Canvas(canvasRef2.current, {
      width: parentWidth,
      height: parentHeight,
      fireRightClick: true, // מאפשר זיהוי לחיצה ימנית
      stopContextMenu: true, // מונע תפריט ברירת מחדל של הדפדפן בלחיצה ימנית
      selection: true, // מאפשר בחירת אובייקטים וקבוצות
      centeredScaling: true,
    });

    setCanvas(initialCanvas1);
    setCanvas1(initialCanvas1);
    setCanvas2(initialCanvas2);
    return () => {
      initialCanvas1?.dispose();
      initialCanvas2?.dispose();
    };
  }, [fabric]);

  // set current canvas
  useEffect(() => {
    setCanvas(isCanvas1 ? canvas1 : canvas2);
  }, [isCanvas1, canvas1, canvas2]);

  // set editor & guide lines
  /* useEffect(() => {
    if (!canvas) return;

    const { moveObjectEvent, removeLines } = createGuidelines({ canvas });
    const { handleKeyPress } = zoomInOut({ canvas });

    // Mouse events for panning (moving) the canvas
    canvas.on("mouse:down", (event) => {
      setIsDragging(true);
      setLastPosX(event.e.clientX);
      setLastPosY(event.e.clientY);
    });

    canvas.on("mouse:move", (event) => {
      if (isDragging) {
        const deltaX = event.e.clientX - lastPosX;
        const deltaY = event.e.clientY - lastPosY;
        canvas.relativePan(new fabric.Point(deltaX, deltaY));
        setLastPosX(event.e.clientX);
        setLastPosY(event.e.clientY);
      }
    });

    canvas.on("mouse:up", () => {
      setIsDragging(false);
    });

    // Add event listener for keyboard input
    window.addEventListener("keydown", handleKeyPress);

    const updateActiveObject = () => {
      const activeObj = canvas.getActiveObject();
      setActiveObject(activeObj || null);
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
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [canvas]); */

  // create guide lines
  useEffect(() => {
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const textTypes = ["text", "i-text", "textbox"];

    // יצירת קווי עזר אופקיים ואנכיים
    const horizontalLine = new fabric.Line(
      [0, centerY, canvas.width, centerY],
      {
        stroke: "skyblue",
        borderDashArray: [5, 5],
        selectable: false,
        evented: false,
        opacity: 0,
      }
    );

    const verticalLine = new fabric.Line([centerX, 0, centerX, canvas.height], {
      stroke: "skyblue",
      borderDashArray: [5, 5],
      selectable: false,
      evented: false,
      opacity: 0,
    });

    canvas.add(horizontalLine, verticalLine);

    // פונקציה להצגת והסתרת קווי עזר
    const showGuidelines = (showHorizontal, showVertical) => {
      horizontalLine.set("opacity", showHorizontal ? 1 : 0);
      verticalLine.set("opacity", showVertical ? 1 : 0);
      canvas.renderAll();
    };

    // פונקציה לבדוק אם מרכז האובייקט קרוב למרכז הקנבס
    const snapObjToCenter = (obj) => {
      const tolerance = 10; // טולרנס לצימוד למרכז

      // חישוב מרכז האובייקט עם מיקום וסקייל
      const objCenterX = obj.left + obj.getScaledWidth() / 2;
      const objCenterY = obj.top + obj.getScaledHeight() / 2;

      const isNearCenterX = Math.abs(objCenterX - centerX) < tolerance;
      const isNearCenterY = Math.abs(objCenterY - centerY) < tolerance;

      // הצגת קווים לפי הקרבה למרכז בכיוונים השונים
      showGuidelines(isNearCenterY, isNearCenterX);

      // הצמדה למרכז רק כאשר יש התאמה
      if (isNearCenterX) obj.set({ left: centerX - obj.getScaledWidth() / 2 });
      if (isNearCenterY) obj.set({ top: centerY - obj.getScaledHeight() / 2 });

      return isNearCenterX || isNearCenterY;
    };
    
    // פונקציה לבדוק אם מרכז תיבת הטקסט קרוב למרכז הקנבס
    const snapTextToCenter = (obj) => {
      const tolerance = 10; // טולרנס לצימוד למרכז

      // חישוב מרכז האובייקט עם מיקום וסקייל, תוך התחשבות ב-originX ו-originY כמרכז
      let objCenterX = obj.left;
      let objCenterY = obj.top;

      const isNearCenterX = Math.abs(objCenterX - centerX) < tolerance;
      const isNearCenterY = Math.abs(objCenterY - centerY) < tolerance;

      // הצגת קווים לפי הקרבה למרכז בכיוונים השונים
      showGuidelines(isNearCenterY, isNearCenterX);

      // הצמדה למרכז רק כאשר יש התאמה
      if (isNearCenterX) obj.set({ left: centerX });
      if (isNearCenterY) obj.set({ top: centerY });

      return isNearCenterX || isNearCenterY;
    };

    // הצמדת אובייקטים לקווים המרכזיים
    canvas.on("object:moving", (e) => {
      const obj = e.target;
      if (textTypes?.includes(obj?.type)) {
        snapTextToCenter(obj);
      } else {
        snapObjToCenter(obj);
      }
    });

    // הסתרת קווי עזר בסיום הזזת אובייקט
    canvas.on("mouse:up", () => {
      showGuidelines(false, false);
    });
  }, [canvas]);

  // update layers
  useEffect(() => {
    if (!canvas) return;

    const updateLayers = () => {
      setLayers(canvas.getObjects());
      console.log("canvas.getObjects(): ", canvas.getObjects());
    };

    // מוודאים שהפונקציות של fabric-history יתווספו
    //canvas?.includeDefaultHistory = true;

    canvas.on("object:created", updateLayers);
    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("object:moved", updateLayers);

    return () => {
      canvas.off("object:created", updateLayers);
      canvas.off("object:added", updateLayers);
      canvas.off("object:removed", updateLayers);
      canvas.off("object:moved", updateLayers);
    };
  }, [canvas]);

  // manage remove object
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        const activeObject = canvas.getActiveObject();

        // בודק אם האובייקט לא במצב עריכה ושאין אינפוט חיצוני בפוקוס
        if (!editingMode && !activeObject?.isEditing) {
          event.preventDefault();
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }
    };

    // הוספת מאזין לאירוע מקלדת
    window.addEventListener("keydown", handleKeyDown);

    // ניקוי מאזין האירועים כשעוזבים את הרכיב
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, editingMode]);

  useEffect(() => {
    if (!canvas) return;

    // פונקציה לקיבוץ אובייקטים
    const groupObjects = () => {
      // בחר את האובייקטים שברצונך לקבץ
      const selectedObjects = canvas.getActiveObject();
      selectedObjects.toGroup();
      canvas.renderAll();
    };

    // פונקציה לפירוק קבוצה
    const ungroupObjects = () => {
      // בדוק אם הקבוצה נבחרה
      const group = canvas.getActiveObject();
      if (group && group.type === "group") {
        group.toActiveSelection();
        canvas.requestRenderAll();
      }
    };

    // פונקציה שתבוצע בעת לחיצה על קיצור מקלדת
    const handleKeyDown = (event) => {
      console.log("event: ", event);
      // קיבוץ: Ctrl + G או Cmd + G
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "g" &&
        !event.shiftKey
      ) {
        event.preventDefault(); // מניעת פעולות ברירת מחדל
        groupObjects();
      }
      // פירוק קבוצה: Ctrl + Shift + G או Cmd + Shift + G
      else if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "g"
      ) {
        event.preventDefault(); // מניעת פעולות ברירת מחדל
        ungroupObjects();
      }
    };

    // הוספת האזנה לאירוע keydown
    window.addEventListener("keydown", handleKeyDown);

    // הסרת ההאזנה כאשר הרכיב יוצא מהדף
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  const guideLines = ({
    canvas,
    obj,
    guideLines,
    setGuideLines,
    clearGuideLines = () => {},
    guideLineExists = () => {},
    createVerticalGuideLine = () => {},
    createHorizontalGuideLine = () => {},
  }) => {
    if (!canvas) return;

    const snappingDistance = 10;

    const canvasWidth = canvas?.width;
    const canvasHeight = canvas?.height;

    const top = obj?.top;
    const left = obj?.left;
    const right = left + obj?.width * obj?.scaleX;
    const bottom = top + obj?.height * obj?.scaleY;

    const centerX = left + (obj?.width * obj?.scaleX) / 2;
    const centerY = top + (obj?.height * obj?.scaleY) / 2;

    let newGuideLines = [];

    clearGuideLines(canvas);

    let snapped = false;

    // vertical guide line
    if (Math.abs(centerX - canvasWidth / 2 < snappingDistance)) {
      obj?.set({ left: 0 });
      if (!guideLineExists(canvas, "vertical-center")) {
        const line = createVerticalGuideLine(
          canvas,
          canvasWidth / 2,
          "vertical-center"
        );
        newGuideLines.push(line);
        canvas.add(line);
      }
      snapped = true;
    }

    if (Math.abs(centerY - canvasHeight / 2 < snappingDistance)) {
      obj?.set({ left: 0 });
      if (!guideLineExists(canvas, "vertical-center")) {
        const line = createVerticalGuideLine(
          canvas,
          canvasWidth / 2,
          "vertical-center"
        );
        newGuideLines.push(line);
        canvas.add(line);
      }
      snapped = true;
    }
  };

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
