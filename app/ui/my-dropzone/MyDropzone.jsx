"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Cancel02Icon, UploadCircle01Icon } from "../../icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import useOnDrop from "./useOnDrop";
import { useDropzone } from "react-dropzone";
import Preview from "./Preview";

const MyDropzone = () => {
  const { files, showDropzone, setShowDropzone, setAcceptedFiles } =
    useOnDrop();

  console.log("files: ", files);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isFileDialogActive,
    ...rest
  } = useDropzone({
    onDrop: setAcceptedFiles,
  });
  console.log("rest: ", rest);

  return (
    <div className="relative size-full max-w-[42rem] max-h-[38rem] flex-col-center justify-start overflow-hidden">
      {/* header */}
      <div className="w-full p-4 -mb-1 flex-center justify-start rounded-t-lg bg-white border border-slate-200">
        <button
          onClick={() => setShowDropzone((prev) => !prev)}
          className={cn(
            "text-white px-3 py-1 rounded-sm transition-all",
            showDropzone
              ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
              : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
        >
          {showDropzone ? "ביטול" : "הוסף קבצים"}
        </button>
      </div>

      {/* body */}
      <div className="relative size-full bg-slate-50 border border-slate-200 overflow-hidden">
        {/* dropzone */}
        <AnimatePresence>
          {showDropzone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...getRootProps()}
              className={cn(
                "z-10 absolute inset-0",
                "size-full p-4 transition-all",
                "flex-col-center gap-2",
                "border-2 border-dashed",
                "hover:bg-slate-100",
                isDragActive || isFileDialogActive
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 bg-white"
              )}
            >
              <input {...getInputProps()} />
              <UploadCircle01Icon
                className={cn(
                  "size-20 transition-all",
                  isDragActive || isFileDialogActive
                    ? "text-indigo-600"
                    : "text-slate-300"
                )}
              />
              <p className="text-md text-center">
                גרור ושחרר קבצים כאן, <br />
                או לחץ כדי לבחור קבצים
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* files list */}
        {files.length > 0 && (
          <div
            className={cn(
              "size-full max-h-fit p-4 overflow-auto",
              "grid grid-cols-3 auto-rows-auto gap-2",
              "max-md:grid-cols-2 max-sm:grid-cols-1",
              "place-items-center md:place-items-start"
            )}
          >
            <Preview files={files} />
          </div>
        )}
      </div>

      {/* footer */}
      <div className="w-full bg-white p-4 -mt-1 border border-slate-200 rounded-b-lg">
        sdfdf
      </div>
    </div>
  );
};

export default MyDropzone;


