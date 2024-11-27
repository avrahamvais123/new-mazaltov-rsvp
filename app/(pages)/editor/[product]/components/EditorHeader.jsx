"use client";

import { ArrowTurnBackwardIcon, ArrowTurnForwardIcon } from "@/app/icons/huge-icons";
import { canvas_Atom } from "@/lib/jotai";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import useFabricHistory from "../hooks/useFabricHistory";
import useUndoRedo from "../hooks/useUndoRedo";

const EditorHeader = () => {
  //const { undo, redo, canUndo, canRedo } = useFabricHistory();
  //const { undo, redo, canUndo, canRedo } = useUndoRedo();
  const canvas = useAtomValue(canvas_Atom);

  const undo = () => {
    if (!canvas) return;
    canvas?.undo();
  };
  const redo = () => {
    if (!canvas) return;
    canvas?.redo();
  };

  return (
    <div className="w-full h-20 flex-center justify-between py-2 px-6 bg-slate-800">
      <Image
        src="/images/לוגו.png"
        alt="לוגו מזל טוב אישורי הגעה"
        width={60}
        height={60}
        priority
        className="my-2 aspect-square select-none"
      />

      <div className="h-full w-fit flex-center gap-2">
        <ArrowTurnForwardIcon
          onClick={undo}
          className="cursor-pointer size-10 p-2 text-indigo-50 bg-indigo-600 hover:brightness-90 active:brightness-75 transition-all rounded-sm"
        />
        <ArrowTurnBackwardIcon
          onClick={redo}
          className="cursor-pointer size-10 p-2 text-indigo-50 bg-indigo-600 hover:brightness-90 active:brightness-75 transition-all rounded-sm"
        />
      </div>

      <button className="px-4 py-1.5 bg-indigo-600 hover:brightness-90 active:brightness-75 transition-all text-white rounded-sm">
        שמירה
      </button>
    </div>
  );
};

export default EditorHeader;
