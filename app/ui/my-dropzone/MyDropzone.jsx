"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import useOptions from "./useOptions";
import Uploader from "./Uploader";
import Files from "./Files";

const MyDropzone = () => {
  const {
    files,
    showDropzone,
    setShowDropzone,
    setAcceptedFiles,
  } = useOptions();

  console.log("files: ", files);

  return (
    <div className="relative size-full max-w-[45rem] max-h-[38rem] flex-col-center justify-start overflow-hidden">
      {/* header */}
      <div className="w-full p-4 -mb-1 flex-center justify-between rounded-t-lg bg-white border border-slate-200">
        {/* add file */}
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

        {/* files length */}
        <p className="">{`${files?.length} קבצים נבחרו`}</p>

        {/* upload */}
        <button
        disabled={files.length < 1}
          onClick={() => setShowDropzone((prev) => !prev)}
          className={cn(
            "text-white px-3 py-1 rounded-sm transition-all bg-lime-600 hover:bg-lime-700 active:bg-lime-800 disabled:bg-slate-200",
          )}
        >
          העלאה
        </button>
      </div>

      {/* body */}
      <div className="relative size-full bg-slate-50 border border-slate-200 overflow-hidden">
        <Uploader
          setAcceptedFiles={setAcceptedFiles}
          showDropzone={showDropzone}
        />
        <Files files={files} />
      </div>

      {/* footer */}
      <div className="w-full bg-white p-4 -mt-1 border border-slate-200 rounded-b-lg">
        footer
      </div>
    </div>
  );
};

export default MyDropzone;
