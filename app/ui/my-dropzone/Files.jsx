"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Preview from "./Preview";
import { InboxUploadIcon } from "@/app/icons/icons";

const Files = ({ files }) => {
  return (
    <>
      {files.length > 0 ? (
        <Preview files={files} />
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
