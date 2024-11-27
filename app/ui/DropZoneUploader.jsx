"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CancelCircleIcon, FileUploadIcon } from "../icons/huge-icons";
import { cn } from "@/lib/utils";
import { Reorder } from "framer-motion";

export default function DropZoneUploader() {
  const [filePreviews, setFilePreviews] = useState([]);
  console.log("filePreviews: ", filePreviews);
  console.log("filePreviews?.length: ", filePreviews?.length > 0);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (filePreviews.length >= 2) {
        alert("ניתן להעלות עד שני קבצים בלבד.");
        return;
      }

      const previews = acceptedFiles
        .slice(0, 2 - filePreviews.length)
        .map((file) => {
          return {
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1048576).toFixed(2), // המרת Bytes ל-MB ועיגול לשתי ספרות
          };
        });

      setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    },
    [filePreviews]
  );

  const removeFile = (index) => {
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 2, // הגבלת מספר הקבצים לשני קבצים
  });

  return (
    <div
      className={cn(
        "size-full py-6 overflow-hidden",
        "flex-col-center justify-start gap-6"
      )}
    >
      {/* DropZone */}
      {filePreviews?.length === 0 ? (
        <div
          {...getRootProps()}
          className={cn(
            "flex-col-center",
            "w-full h-40 md:w-96 md:h-60 rounded-md",
            "bg-indigo-300/5 transition-all",
            "border-2 border-dashed border-indigo-600",
            isDragActive && "bg-indigo-100"
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <FileUploadIcon className="text-indigo-600" />
              <p className="text-indigo-600">העלה או גרור קובץ לכאן</p>
            </>
          ) : (
            <>
              <FileUploadIcon className="text-indigo-600" />
              <p className="text-indigo-600">העלה או גרור קובץ לכאן</p>
            </>
          )}
        </div>
      ) : (
        <div className="size-full overflow-hidden flex-col-center gap-2">
          {/* preview files */}
          <div
            className={cn(
              "size-full",
              "grid grid-rows-1 items-center justify-items-center	 gap-2",
              filePreviews?.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            {filePreviews?.map((file, index) => {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2"
                  >
                    <CancelCircleIcon className="size-5 text-red-600 hover:text-red-800" />
                  </button>

                  <img
                    key={index}
                    src={file?.preview}
                    className="max-w-full max-h-[300px] h-auto object-contain"
                  />
                </div>
              );
            })}
          </div>

          {/* button submit */}
          <button className="px-6 py-1.5 rounded-sm bg-indigo-800 text-indigo-50">
            המשך
          </button>
        </div>
      )}
    </div>
  );
}

/* 
<Reorder.Group
            axis="y"
            values={filePreviews}
            onReorder={setFilePreviews}
            className={cn(
              "md:w-96 size-full",
              "flex-grow overflow-y-auto",
              "flex flex-col items-start justify-start gap-2"
            )}
          >
            {filePreviews?.map((file, index) => (
              <Reorder.Item
                key={file?.name}
                value={file}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-full px-4 py-2",
                  "border border-slate-200 rounded-sm",
                  "flex justify-between gap-2"
                )}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={file?.preview}
                    alt={file?.name}
                    className="h-10 w-10 object-cover"
                  />
                  <div className="">
                    <p className="text-sm text-slate-600">{file?.name}</p>
                    <p className="text-xs text-slate-400">{file?.size} MB</p>
                  </div>
                </div>
               
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <CancelCircleIcon className="size-5 text-red-600" />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
*/
