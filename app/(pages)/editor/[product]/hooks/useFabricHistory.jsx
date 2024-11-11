"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

const useFabricHistory = () => {
  const canvas = useAtomValue(canvas_Atom);
  const state = useRef([]); // מערך היסטוריה של JSON
  const mods = useRef(0); // משתנה למעקב אחר המיקום בהיסטוריה
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvas) return;

    // שמור את המצב הראשוני של הקנבס בהיסטוריה
    state.current.push(JSON.stringify(canvas.toJSON(["id"])));

    const handleObjectModified = () => updateModifications(true);
    const handleObjectAdded = () => updateModifications(true);

    canvas.on("object:added", handleObjectAdded);
    canvas.on("object:modified", handleObjectModified);

    return () => {
      canvas.off("object:added", handleObjectAdded);
      canvas.off("object:modified", handleObjectModified);
    };
  }, [canvas]);

  const updateModifications = (saveHistory) => {
    if (saveHistory && canvas) {
      const filteredObjects = canvas
        .getObjects()
        .filter((obj) => !obj.isGuideLine && !obj.isMainImage);
      const filteredCanvas = {
        ...canvas.toJSON(["id"]),
        objects: filteredObjects.map((obj) => obj.toObject(["id"])),
      };
      const currentState = JSON.stringify(filteredCanvas);

      if (state.current[state.current.length - 1] !== currentState) {
        if (mods.current > 0) {
          state.current.splice(
            state.current.length - mods.current,
            mods.current
          );
          mods.current = 0;
        }
        state.current.push(currentState);
        setCanUndo(true);
        setCanRedo(false);
      }
    }
  };

  const undo = () => {
    if (mods.current < state.current.length - 1) {
      mods.current += 1;
      const previousState =
        state.current[state.current.length - 1 - mods.current];
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setCanUndo(mods.current < state.current.length - 1);
        setCanRedo(mods.current > 0);
      });
    }
  };

  const redo = () => {
    if (mods.current > 0) {
      mods.current -= 1;
      const nextState = state.current[state.current.length - 1 - mods.current];
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setCanUndo(mods.current < state.current.length - 1);
        setCanRedo(mods.current > 0);
      });
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear().renderAll();
      state.current = [];
      mods.current = 0;
      setCanUndo(false);
      setCanRedo(false);
    }
  };

  return { undo, redo, clearCanvas, canUndo, canRedo };
};

export default useFabricHistory;
