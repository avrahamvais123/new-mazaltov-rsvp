"use client";

import { AdobePdfIcon } from "@/app/icons/my-icons";
import { ViewOffSlashIcon } from "@/app/icons/huge-icons";
import { cn } from "@/lib/utils";
import React from "react";

const FileImage = ({ fileType, url }) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "svg"]; // הוספת svg
  const specialExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];
  const isImage = allowedExtensions.includes(fileType);
  const isSpecial = specialExtensions.includes(fileType);
  const isPDF = fileType === "pdf";

  const preview = isImage ? url : "";

  return (
    <div className="size-full aspect-square flex-center">
      {isImage ? (
        <img
          src={preview}
          alt={fileType}
          className={cn(
            "aspect-square rounded-t-sm",
            fileType === "svg"
              ? "size-auto object-contain"
              : "size-auto object-cover" // התנהגות שונה ל-SVG
          )}
        />
      ) : isPDF ? (
        <div className="size-full flex-center bg-red-600 rounded-t-sm">
          <AdobePdfIcon color="white" className="size-10 text-white" />
        </div>
      ) : (
        <div className="text-center flex-col-center gap-1 text-slate-400">
          <ViewOffSlashIcon className="size-10 text-slate-400" />
          <p className="text-xs">אין תצוגה מקדימה</p>
        </div>
      )}
    </div>
  );
};

export default FileImage;
