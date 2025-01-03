"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCanvasThumbnail, loadCanvasState } from "./actions";
import {
  Layers01Icon,
  PaintBoardIcon,
  StarIcon,
  TextIcon,
} from "@/app/icons/huge-icons";
import ExtendedMenu from "./ExtendedMenu";
import EditorButton from "./EditorButton";
import TextDesignOption from "./TextDesignOption";
import ColorsOption from "./ColorsOption";
import LayersOption from "./LayersOption";
import { useAtomValue } from "jotai";
import { canvas_Atom } from "@/lib/jotai";
import UploadElements from "./UploadElements";
import AddElementsOption from "./AddElementsOption";

const buttonCn = (isActiveOption) =>
  cn(
    "z-10 relative w-full h-fit px-4 py-2",
    "transition-all group",
    "flex-col-center gap-1",
    "aspect-square rounded-none",
    isActiveOption
      ? "bg-indigo-600 *:text-indigo-50 *:hover:text-indigo-100 hover:bg-indigo-700"
      : "bg-slate-800 hover:bg-slate-900/30 *:text-slate-500 *:hover:text-indigo-600"
  );

const content = {
  "": null,
  text: <div className="size-full p-2 flex-col-center">text</div>,
};

const actions = ({ canvas, content, setContent }) => [
  // text
  {
    title: "טקסט",
    className: () => cn(""),
    icon: <TextIcon className="w-full h-1/2" />,
    action: ({ isActiveOption }) => {
      if (!canvas) return;
      setContent(isActiveOption && content ? null : <TextDesignOption />);
    },
  },
  // colors
  {
    title: "צבעים",
    className: () => cn(""),
    icon: <PaintBoardIcon className="w-full h-1/2" />,
    action: ({ isActiveOption }) => {
      setContent(isActiveOption && content ? null : <ColorsOption />);
    },
  },
  //layers
  {
    title: "שכבות",
    className: () => cn(""),
    icon: <Layers01Icon className="w-full h-1/2" />,
    action: ({ isActiveOption }) =>
      setContent(isActiveOption && content ? null : <LayersOption />),
  },
  // add elements
  {
    title: "הוספת אלמנטים",
    className: () => cn(""),
    icon: <StarIcon className="w-full h-1/2" />,
    action: ({ isActiveOption }) =>
      setContent(isActiveOption && content ? null : <AddElementsOption />),
  },
  {
    title: "טעינת תבנית",
    className: () => cn(""),
    icon: <TextIcon className="w-full h-1/2 text-slate-500" />,
    action: () => {},
  },
  {
    title: "תמונת תצוגה",
    className: () => cn(""),
    icon: <TextIcon className="w-full h-1/2" />,
    action: () => {},
  },
];

const RightMenu = ({ setShowMenu, setClickEvent }) => {
  const canvas = useAtomValue(canvas_Atom);
  const [state, setState] = useState(null);
  const [canvasState, setCanvasState] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [content, setContent] = useState(null);

  return (
    <div className="z-10 relative overflow-visible bg-slate-800 size-full max-w-20 flex-col-center justify-start">
      <ExtendedMenu content={content} />
      <div className="overflow-auto w-full h-fit grid grid-cols-1 bg-transparent auto-rows-auto">
        {actions({
          canvas,
          setClickEvent,
          setShowMenu,
          content,
          setContent,
          canvasState,
          setCanvasState,
          state,
        }).map(({ title, icon, action, className }, i) => {
          const isActiveOption = i === activeOption;
          return (
            <EditorButton
              key={i}
              className={cn(
                buttonCn(isActiveOption),
                className({ isActiveOption, activeOption })
              )}
              onClick={() => {
                action({ isActiveOption });
                setActiveOption(i);
              }}
            >
              {icon}
              <p className="text-xs leading-4 select-none">{title}</p>
            </EditorButton>
          );
        })}
      </div>

      {/* עורך טקסט */}
      {/* <TextEditor activeObject={activeObject} editor={editor} /> */}
    </div>
  );
};

export default RightMenu;

{
  /* <img
        src={frontThumbnail}
        alt="תצוגה מקדימה של הקנבס"
        className="size-40"
      /> */
}
