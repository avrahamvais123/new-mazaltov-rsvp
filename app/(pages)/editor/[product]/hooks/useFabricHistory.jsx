"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

const useFabricHistory = () => {
  const canvas = useAtomValue(canvas_Atom);
  const state = useRef([]); // מערך היסטוריה של JSON
  const mods = useRef(0); // משתנה למעקב אחר המיקום בהיסטוריה

  useEffect(() => {
    if (!canvas) return;

    // שמור את המצב הראשוני של הקנבס בהיסטוריה
    state.current.push(JSON.stringify(canvas.toJSON()));

    const handleObjectModified = () => updateModifications(true);
    const handleObjectAdded = () => updateModifications(true);

    canvas.on("object:added", handleObjectAdded);
    canvas.on("object:modified", handleObjectModified);

    return () => {
      if (!canvas) return;
      canvas.off("object:added", handleObjectAdded);
      canvas.off("object:modified", handleObjectModified);
    };
  }, [canvas]);

  const updateModifications = (saveHistory) => {
    if (saveHistory && canvas) {
      // סינון האובייקטים הלא רלוונטיים להיסטוריה
      const filteredObjects = canvas
        .getObjects()
        .filter((obj) => !obj.isGuideLine && !obj.isMainImage);
      const filteredCanvas = {
        ...canvas.toJSON(["id"]),
        objects: filteredObjects.map((obj) => obj.toObject(["id"])), // שמירת המאפיין 'id' בלבד
      };
      const currentState = JSON.stringify(filteredCanvas);

      // בדיקה אם המצב הנוכחי שונה מהמצב האחרון שנשמר
      if (state.current[state.current.length - 1] !== currentState) {
        state.current.push(currentState);
        mods.current = 0; // איפוס המיקום בהיסטוריה
      }
    }
  };

  const undo = () => {
    if (mods.current < state.current.length - 1) {
      mods.current += 1;
      const previousState =
        state.current[state.current.length - 1 - mods.current];
      console.log("previousState: ", previousState);
      canvas.clear();
      canvas.renderAll();
      canvas.loadFromJSON(previousState, (o, object) => {
        console.log("o: ", o);
        console.log("object: ", object);
        canvas.renderAll();
      });
    }
  };

  const redo = () => {
    if (mods.current > 0) {
      mods.current -= 1;
      const nextState = state.current[state.current.length - 1 - mods.current];
      canvas.clear();
      canvas.renderAll();
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
      });
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear().renderAll();
      state.current = [];
      mods.current = 0;
    }
  };

  return { undo, redo, clearCanvas };
};

export default useFabricHistory;
