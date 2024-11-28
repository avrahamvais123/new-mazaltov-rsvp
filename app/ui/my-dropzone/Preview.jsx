"use client";

import { BowIcon, FoldPageIcon } from "@/app/icons/my-icons";
import { slate } from "tailwindcss/colors";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { cn } from "@/lib/utils";
import { generateBowColor } from "./utils/generateBowColor";
import ModalActions from "./ModalActions";

const Preview = ({ files = [], setFiles }) => {
  const previewRef = useRef(null);
  useClickAway(previewRef, () => setShowActions(false));

  const handleShowModal = (id) => {
    console.log("id: ", id);
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.id === id ? { ...f, showModal: true } : f))
    );
  };

  const handleHideModal = (id, status) => {
    if (status === "pending" || status === "complete") return;
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.id === id ? { ...f, showModal: false } : f))
    );
  };

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
          progress,
          status,
          showModal,
        } = item;
        const { color, shadowcolor } = generateBowColor(type);

        return (
          /* wrapper */
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ filter: `drop-shadow(0 2px 2px ${slate[200]})` }}
            className="relative bg-transparent overflow-visible size-fit rounded-sm"
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
              onMouseEnter={() => handleShowModal(id)}
              onMouseLeave={() => handleHideModal(id, status)}
              className="z-10 w-44 h-fit overflow-visible bg-white flex-col-center border border-slate-200 rounded-sm"
              style={{
                clipPath: "polygon(0 0, 79% 0, 100% 15%, 100% 100%, 0 100%)",
              }}
            >
              {/* actions modal */}
              <ModalActions {...item} setFiles={setFiles} />

              {/* image */}
              <FileImage />

              {/* text */}
              <div className="z-10 w-full py-2 px-4 bg-white flex-col-center -space-x-1 border-t border-slate-200 rounded-b-sm">
                <div className="w-full overflow-x-hidden">
                  <p className="text-sm text-slate-600 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{size}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default Preview;
