"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Preview from "./Preview";
import { InboxUploadIcon } from "@/app/icons/huge-icons";

const Files = ({ files, setFiles }) => {
  return (
    <>
      {files.length > 0 ? (
        <div
          className={cn(
            "relative size-full max-h-fit w-fit p-4 overflow-y-auto overflow-x-visible",
            "grid grid-cols-4 auto-rows-auto gap-7",
            "max-md:w-full",
            "max-md:grid-cols-3 max-sm:grid-cols-2 max-[375px]:grid-cols-1",
            "place-items-center md:place-items-start"
          )}
        >
          <Preview files={files} setFiles={setFiles} />
        </div>
      ) : (
        <div className="absolute inset-0 flex-col-center gap-1">
          <InboxUploadIcon className="size-24 text-slate-200" />
          <h4 className="text-center text-slate-200">אין קבצים</h4>
        </div>
      )}
    </>
  );
};

export default Files;
