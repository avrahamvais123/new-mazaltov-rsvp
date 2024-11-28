"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { uploadImage } from "./utils/upload-to-cloudinary";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import checkAnimation from "@/public/lottie-animations/Check.json";

const ModalActions = ({
  setFiles,
  file,
  id,
  showModal,
  status,
  progress,
  remove,
}) => {
  return (
    <AnimatePresence>
      {showModal && (
        <div className="z-20 absolute inset-0 p-4 size-full border border-slate-200 rounded-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 p-4 size-full backdrop-blur-sm bg-white bg-opacity-60 flex-col-center gap-2 rounded-sm"
          >
            {status === "complete" ? (
              <div className="relative flex-col-center p-2 pt-0">
                <Lottie loop={false} animationData={checkAnimation} />
                <p className="absolute-center top-[115%] w-full text-lime-600 text-center text-[1rem] leading-[1.2rem] font-semibold">
                  ההעלאה הושלמה בהצלחה
                </p>
              </div>
            ) : (
              <>
                <button
                  disabled={status === "complete"}
                  onClick={() => uploadImage({ file, id, setFiles })}
                  className="relative h-10 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white w-full py-2 disabled:cursor-not-allowed"
                >
                  <span className="z-10 absolute-center w-full">
                    {status === "idle"
                      ? "ממתין"
                      : status === "pending"
                      ? `מעלה קבצים... ${progress}%`
                      : status === "complete"
                      ? `ההעלאה הושלמה`
                      : "העלאה"}
                  </span>
                  <div
                    style={{ width: `${progress}%` }}
                    className={cn(
                      "absolute inset-0 h-full bg-indigo-900 transition-all",
                      status === "complete" && "bg-green-600"
                    )}
                  />
                </button>
                <button
                  onClick={remove}
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white w-full py-2"
                >
                  ביטול
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalActions;
