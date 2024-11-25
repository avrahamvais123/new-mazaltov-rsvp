"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Cancel02Icon, UploadCircle01Icon } from "../icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import useOnDrop from "../hooks/useOnDrop";
import { useDropzone } from "react-dropzone";

const MyDropzone = () => {
  const {
    files,
    setFiles,
    showDropzone,
    setShowDropzone,
    acceptedFiles,
    setAcceptedFiles,
  } = useOnDrop();
  
  console.log('files: ', files);
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isFileDialogActive,
    ...rest
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(acceptedFiles);
    },
  });
  console.log("rest: ", rest);

  return (
    <div className="relative size-full max-w-[42rem] max-h-[38rem] flex-col-center justify-start gap-4 overflow-hidden">
      <div className="w-full flex-center">
        <button
          onClick={() => setShowDropzone((prev) => !prev)}
          className="bg-indigo-600 text-white rounded-md p-2"
        >
          {showDropzone ? "הסתר קבצים" : "הוסף קבצים"}
        </button>
      </div>
      {/* dropzone */}
      <AnimatePresence>
        {showDropzone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...getRootProps()}
            className={cn(
              "z-10 absolute-center",
              "size-full p-4 transition-all",
              "flex-col-center gap-2",
              "border-2 border-dashed rounded-md",
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

      <div className="size-full bg-slate-50 rounded-lg overflow-hidden">
        {/* files list */}
        {files.length > 0 && (
          <div
            className={cn(
              "size-full max-h-fit p-4 overflow-auto",
              "grid grid-cols-3 auto-rows-auto gap-2",
              "max-md:grid-cols-2 max-sm:grid-cols-1",
              "place-items-center md:place-items-start",
              "border-slate-100 border rounded-lg"
            )}
          >
            <Preview files={files} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDropzone;

const Preview = ({ files = [] }) => {
  return (
    <>
      {files.map((item, idx) => {
        const {
          id,
          file,
          PreviewImage,
          size,
          remove,
          progress,
          status,
          paused,
        } = item;

        return (
          <div
            key={idx}
            className="relative w-52 h-fit shadow-md shadow-slate-200 bg-white flex-col-center border border-slate-200 rounded-sm"
          >
            <Cancel02Icon
              onClick={remove}
              className="cursor-pointer text-red-600 size-6 absolute -top-2 -right-2"
            />
            <PreviewImage />
            <div className="w-full border-t border-slate-200 p-2">
              <p className="text-sm truncate w-full overflow-x-hidden">
                {file.name}
              </p>
              <p className="text-xs">{`${size} MB`}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
