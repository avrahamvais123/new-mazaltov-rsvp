"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import useOptions from "./useOptions";
import Uploader from "./Uploader";
import Files from "./Files";
import MyDropdown from "../MyDropdown";
import ActionsButton from "../ActionsButton";

const MyDropzone = () => {
  const {
    files,
    showDropzone,
    setShowDropzone,
    setAcceptedFiles,
  } = useOptions();

  return (
    <div className="relative size-full max-w-[52rem] max-h-[28rem] 2xl:max-h-[38rem] flex-col-center justify-start overflow-hidden">
      {/* header */}
      <div className="w-full p-4 -mb-1 flex-center justify-between rounded-t-lg bg-white border border-slate-200">

        <ActionsButton
          content={({ setOpen }) => {
            const onAdd = () => {
              setOpen(false);
              setShowDropzone((prev) => !prev);
            };
            const onUploadAll = () => {
              setOpen(false);
              setShowDropzone((prev) => !prev);
            };

            return (
              <>
                <button
                  onClick={onAdd}
                  className="w-full py-1 text-slate-500 hover:bg-slate-100 rounded-sm"
                >
                  הוספת קובץ
                </button>
                <button
                  onClick={onUploadAll}
                  className="w-full py-1 text-slate-500 hover:bg-slate-100 rounded-sm"
                >
                  העלאת קבצים
                </button>
              </>
            );
          }}
        />

        {/* files length */}
        <p className="">{`${files?.length} קבצים נבחרו`}</p>
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
      <div className="w-full text-end text-sm text-slate-300 bg-white p-4 -mt-1 border border-slate-200 rounded-b-lg">
        נוצר ע׳׳י זוהר מערכות
      </div>
    </div>
  );
};

export default MyDropzone;
