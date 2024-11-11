"use client";

import {
  canvas1_Atom,
  canvas2_Atom,
  canvas_Atom,
  editingMode_Atom,
} from "@/lib/jotai";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import * as fabricModule from "fabric";
import { indigo, red, slate } from "tailwindcss/colors";
import { Cancel02Icon, Copy02Icon } from "@/app/icons/icons";
import ReactDOMServer from "react-dom/server";

const { fabric } = fabricModule;

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

const UseInitialCanvas = () => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  const [canvas, setCanvas] = useAtom(canvas_Atom);
  const [canvas1, setCanvas1] = useAtom(canvas1_Atom);
  const [canvas2, setCanvas2] = useAtom(canvas2_Atom);
  const [editingMode, setEditingMode] = useAtom(editingMode_Atom);

  const [layers, setLayers] = useState([]);
  const [isCanvas1, setIsCanvas1] = useState(true);

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

    initialCanvas1.extraProps = ['id']; // הוספת המאפיינים המותאמים אישית
    initialCanvas2.extraProps = ['id']; // הוספת המאפיינים המותאמים אישית


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
        strokeDashArray: [5, 5],
        strokeWidth: 2,
        selectable: false,
        evented: false,
        opacity: 0,
        isGuideLine: true,
        excludeFromExport: true // This object will not be recorded in history.
      }
    );

    const verticalLine = new fabric.Line([centerX, 0, centerX, canvas.height], {
      stroke: "skyblue",
      strokeDashArray: [5, 5],
      strokeWidth: 2,
      selectable: false,
      evented: false,
      opacity: 0,
      isGuideLine: true,
      excludeFromExport: true // This object will not be recorded in history.
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

  // group & unGroup
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

  return {
    canvas,
    canvas1,
    canvas2,
    isCanvas1,
    setIsCanvas1,
    canvasRef1,
    canvasRef2,
  };
};

export default UseInitialCanvas;
