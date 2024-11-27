"use client";

import { BowIcon, FoldPageIcon } from "@/app/icons/my-icons";
import { green, lime, purple, red, slate, yellow } from "tailwindcss/colors";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { cn } from "@/lib/utils";

const Preview = ({ files = [] }) => {
  const [showActions, setShowActions] = useState(null);
  const previewRef = useRef(null);
  useClickAway(previewRef, () => setShowActions(false));

  return (
    <AnimatePresence>
      {files.map((item, idx) => {
        const {
          id,
          type,
          file,
          FileImage,
          size,
          remove,
          upload,
          progress,
          status,
          paused,
        } = item;

        const { color, shadowcolor } = generateBowColor(type);

        return (
          /* wrapper */
          <div
            key={id}
            className="relative overflow-visible size-fit rounded-sm"
          >
            {/* bow */}
            <div className="absolute z-10 top-5 left-[-.9rem] overflow-visible flex-col-center">
              <BowIcon
                color={color}
                shadowcolor={shadowcolor}
                className="size-16 text-slate-200"
              />
              <span className="w-16 h-8 pb-1 absolute top-[0.73rem] left-0 flex-center shadow-lg">
                <p
                  className={cn(
                    "font-medium text-lg text-center",
                    type === "pdf"
                      ? "text-red-600"
                      : type === "svg"
                      ? "text-slate-900"
                      : "text-white"
                  )}
                >
                  {type}
                </p>
              </span>
            </div>

            {/* fold effect */}
            <FoldPageIcon
              color={slate[200]}
              className="z-20 absolute top-0 right-0 size-9"
            />

            {/* item */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onMouseEnter={() => setShowActions(idx)}
              onMouseLeave={() => setShowActions(null)}
              className="z-10 w-44 h-fit overflow-visible bg-white flex-col-center border border-slate-200 rounded-sm"
              style={{
                clipPath: "polygon(0 0, 79% 0, 100% 15%, 100% 100%, 0 100%)",
              }}
            >
              {/* actions modal */}
              <AnimatePresence>
                {showActions === idx && (
                  <div className="absolute inset-0 p-4 size-full border border-slate-200 rounded-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 p-4 size-full backdrop-blur-sm bg-white bg-opacity-60 flex-col-center gap-2 rounded-sm"
                    >
                      <button
                        onClick={() => upload(file)}
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
                  </div>
                )}
              </AnimatePresence>

              {/* image */}
              <FileImage />

              {/* text */}
              <div className="z-10 w-full py-2 px-4 bg-white flex-center -space-x-1 border-t border-slate-200 rounded-b-sm">
                <div className="w-full overflow-x-hidden">
                  <p className="text-sm text-slate-600 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{size}</p>
                </div>

                <div className="h-full w-2 mx-2 bg-slate-400" />

                {/* <img src={generateTypeImage()} className="w-6 h-7 object-cover" /> */}
              </div>
            </motion.div>
          </div>
        );
      })}
    </AnimatePresence>
  );
};

export default Preview;

const generateBowColor = (type) => {
  switch (type) {
    case "pdf":
      return { color: slate[50], shadowcolor: slate[300] };
    case "jpg":
    case "jpeg":
      return { color: lime[600], shadowcolor: lime[800] };
    case "png":
      return { color: purple[600], shadowcolor: purple[800] };
    case "svg":
      return { color: yellow[400], shadowcolor: yellow[600] };
    default:
      return { color: slate[600], shadowcolor: slate[800] };
  }
};
