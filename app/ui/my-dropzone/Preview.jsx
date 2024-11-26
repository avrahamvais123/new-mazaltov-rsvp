"use client";

import { Cancel02Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { BowIcon } from "@/app/icons/icons";
import { green, purple, red, slate, yellow } from "tailwindcss/colors";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

const Preview = ({ files = [] }) => {
  const [showActions, setShowActions] = useState(null);
  const previewRfer = useRef(null);
  useClickAway(previewRfer, () => setShowActions(false));

  return (
    <div
      className={cn(
        "relative size-full max-h-fit p-4 overflow-y-auto overflow-x-visible",
        "grid grid-cols-3 auto-rows-auto gap-6",
        "max-md:grid-cols-2 max-sm:grid-cols-1",
        "place-items-center md:place-items-start"
      )}
    >
      {files.map((item, idx) => {
        const {
          id,
          type,
          file,
          PreviewImage,
          size,
          remove,
          progress,
          status,
          paused,
        } = item;
        console.log("type: ", type);

        const { color, shadowcolor } = generateBowColor(type);

        return (
          <div
            key={idx}
            onMouseEnter={() => setShowActions(idx)}
            onMouseLeave={() => setShowActions(null)}
            className="relative w-52 h-fit shadow-md shadow-slate-200 bg-white flex-col-center border border-slate-200 rounded-sm"
          >
            {/* <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 clip-triangle"></div> */}

            {/* actions modal */}
            <AnimatePresence>
              {showActions === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 z-10 p-4 size-full backdrop-blur-sm bg-white bg-opacity-60 flex-col-center gap-2 rounded-sm"
                >
                  <button
                    onClick={remove}
                    className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white w-full py-2"
                  >
                    העלאה
                  </button>
                  <button
                    onClick={remove}
                    className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white w-full py-2"
                  >
                    ביטול
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* bow */}
            <div className="absolute z-10 top-3 left-[-0.9rem] flex-col-center">
              <BowIcon
                color={color}
                shadowcolor={shadowcolor}
                className="size-16 text-slate-200"
              />
              <span className="w-16 h-8 pb-1 absolute top-[0.73rem] left-0 flex-center">
                <p className="text-white font-medium text-lg text-center">
                  {type}
                </p>
              </span>
            </div>

            <PreviewImage />

            {/* text */}
            <div className="w-full py-2 px-4 flex-center -space-x-1 border-t border-slate-200">
              <div className="w-full overflow-x-hidden">
                <p className="text-sm text-slate-600 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{size}</p>
              </div>

              <div className="h-full w-2 mx-2 bg-slate-400" />

              {/* <img src={generateTypeImage()} className="w-6 h-7 object-cover" /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;

const generateTypeImage = (type) => {
  switch (type) {
    case "pdf":
      return "/images/pdf.png";
    case "jpg":
    case "jpeg":
      return "/images/jpg.png";
    case "png":
      return "/images/png.png";
    case "svg":
      return "/images/svg.png";
    default:
      return null;
  }
};

const generateBowColor = (type) => {
  switch (type) {
    case "pdf":
      return { color: red[600], shadowcolor: red[800] };
    case "jpg":
    case "jpeg":
      return { color: green[600], shadowcolor: green[800] };
    case "png":
      return { color: purple[600], shadowcolor: purple[800] };
    case "svg":
      return { color: yellow[600], shadowcolor: yellow[800] };
    default:
      return { color: slate[600], shadowcolor: slate[800] };
  }
};
