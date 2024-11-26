"use client";

import { UploadCircle01Icon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDropzone } from "react-dropzone";

const Uploader = ({ setAcceptedFiles, showDropzone }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isFileDialogActive,
    ...rest
  } = useDropzone({
    onDrop: setAcceptedFiles,
    accept: {
      "image/*": [], // קבצי תמונה מכל הסוגים
      "application/pdf": [], // קבצי PDF
    },
  });

  return (
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
  );
};

export default Uploader;
