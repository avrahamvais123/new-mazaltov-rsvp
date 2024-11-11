"use client";

import { useEffect, useCallback, useState } from "react";

const useUndoRedo = (canvas) => {
  const [historyUndo, setHistoryUndo] = useState([]);
  const [historyRedo, setHistoryRedo] = useState([]);
  const [historyProcessing, setHistoryProcessing] = useState(false);

  const extraProps = ["selectable", "editable"];

  const _historyNext = useCallback(() => {
    return JSON.stringify(canvas.toDatalessJSON(extraProps));
  }, [canvas]);

  const _saveAction = useCallback(() => {
    if (!historyProcessing && canvas) {
      const nextState = _historyNext();
      setHistoryUndo((prevUndo) => [...prevUndo, nextState]);
      setHistoryRedo([]); // Reset redo history after a new action
    }
  }, [canvas, historyProcessing, _historyNext]);

  const undo = useCallback(() => {
    if (historyUndo.length === 0 || historyProcessing) return;
    setHistoryProcessing(true);

    const prevState = historyUndo.pop();
    setHistoryUndo([...historyUndo]);
    setHistoryRedo((prevRedo) => [...prevRedo, _historyNext()]);

    canvas.loadFromJSON(prevState, () => {
      canvas.renderAll();
      setHistoryProcessing(false);
    });
  }, [canvas, historyUndo, historyProcessing, _historyNext]);

  const redo = useCallback(() => {
    if (historyRedo.length === 0 || historyProcessing) return;
    setHistoryProcessing(true);

    const nextState = historyRedo.pop();
    setHistoryRedo([...historyRedo]);
    setHistoryUndo((prevUndo) => [...prevUndo, _historyNext()]);

    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
      setHistoryProcessing(false);
    });
  }, [canvas, historyRedo, historyProcessing, _historyNext]);

  useEffect(() => {
    if (!canvas) return;

    const events = {
      "object:added": _saveAction,
      "object:removed": _saveAction,
      "object:modified": _saveAction,
      "object:skewing": _saveAction,
    };

    canvas.on(events);
    setHistoryUndo([_historyNext()]); // Initial state in history

    return () => {
      canvas.off(events);
    };
  }, [canvas, _saveAction, _historyNext]);

  const clearHistory = useCallback(() => {
    setHistoryUndo([]);
    setHistoryRedo([]);
  }, []);

  const canUndo = historyUndo.length > 0;
  const canRedo = historyRedo.length > 0;

  return {
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
  };
};

export default useUndoRedo;
