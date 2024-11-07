"use client";

import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import { useState, useEffect, useCallback } from "react";

const useUndoRedo = () => {
  const canvas = useAtomValue(canvas_Atom);
  if (!canvas) return;

  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [isUndoRedoInProgress, setIsUndoRedoInProgress] = useState(false);

  // Function to save the current canvas state
  const saveState = useCallback(() => {
    if (!isUndoRedoInProgress) {
      const json = canvas.toJSON();
      setHistory((prev) => [...prev, json]);
      setRedoHistory([]);
    }
  }, [canvas, isUndoRedoInProgress]);

  // Undo function
  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoHistory((prev) => [canvas.toJSON(), ...prev]);
      setIsUndoRedoInProgress(true);
      canvas.loadFromJSON(lastState, () => {
        canvas.renderAll();
        setHistory((prev) => prev.slice(0, -1));
        setIsUndoRedoInProgress(false);
      });
    }
  };

  // Redo function
  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[0];
      setHistory((prev) => [...prev, canvas.toJSON()]);
      setIsUndoRedoInProgress(true);
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setRedoHistory((prev) => prev.slice(1));
        setIsUndoRedoInProgress(false);
      });
    }
  };

  // Listen to changes on canvas and save them
  useEffect(() => {
    if (canvas) {
      const saveCanvasState = () => saveState();
      canvas.on("object:added", saveCanvasState);
      canvas.on("object:modified", saveCanvasState);
      canvas.on("object:removed", saveCanvasState);

      return () => {
        canvas.off("object:added", saveCanvasState);
        canvas.off("object:modified", saveCanvasState);
        canvas.off("object:removed", saveCanvasState);
      };
    }
  }, [canvas, saveState]);

  return { undo, redo };
};

export default useUndoRedo;
