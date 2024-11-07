"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useCallback } from "react";
import useUndo from "use-undo";

const useFabricHistory = () => {
  const canvas = useAtomValue(canvas_Atom);

  //* use-undo
  const [
    historyState,
    { set: setHistory, undo, redo, canUndo, canRedo },
  ] = useUndo(null); // משתמשים ב-null כי נכניס מצבים בפועל

  const { present: currentCanvasState } = historyState;

  useEffect(() => {
    if (!canvas) return;

    // שמירת המצב ההתחלתי של הקנבס בהיסטוריה
    setHistory(JSON.stringify(canvas.toJSON()));

    const handleObjectModified = () => updateModifications(true);
    const handleObjectAdded = () => updateModifications(true);

    canvas.on("object:added", handleObjectAdded);
    canvas.on("object:modified", handleObjectModified);

    return () => {
      canvas.off("object:added", handleObjectAdded);
      canvas.off("object:modified", handleObjectModified);
    };
  }, [canvas, setHistory]);

  const updateModifications = useCallback(
    (saveHistory) => {
      if (saveHistory && canvas) {
        // מסנן אובייקטים לא רלוונטיים להיסטוריה
        const filteredObjects = canvas.getObjects().filter((obj) => {
          return !obj.isGuideLine && !obj.isMainImage;
        });

        const filteredCanvas = {
          ...canvas.toJSON(),
          objects: filteredObjects,
        };
        const currentState = JSON.stringify(filteredCanvas);

        // שמירה בהיסטוריה רק אם המצב הנוכחי שונה מהאחרון
        if (currentCanvasState !== currentState) {
          setHistory(currentState);
        }
      }
    },
    [canvas, currentCanvasState, setHistory]
  );

  const handleUndo = () => {
    if (canUndo) {
      undo();
      const previousState = JSON.parse(
        historyState.past[historyState.past.length - 1]
      );
      canvas.clear().renderAll();
      canvas.loadFromJSON(previousState, () => canvas.renderAll());
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
      const nextState = JSON.parse(historyState.future[0]);
      canvas.clear().renderAll();
      canvas.loadFromJSON(nextState, () => canvas.renderAll());
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear().renderAll();
      setHistory(null); // איפוס ההיסטוריה
    }
  };

  return {
    undo: handleUndo,
    redo: handleRedo,
    clearCanvas,
    canUndo,
    canRedo,
  };
};

export default useFabricHistory;
