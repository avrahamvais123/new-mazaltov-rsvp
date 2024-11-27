"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import useOptions from "./useOptions";
import Uploader from "./Uploader";
import GridFiles from "./GridFiles";
import ActionsButton from "../ActionsButton";
import { Add01Icon, Add02Icon, FileAddIcon } from "@/app/icons/huge-icons";

const MyDropzone = () => {
  const {
    files,
    setFiles,
    showDropzone,
    setShowDropzone,
    setAcceptedFiles,
  } = useOptions();

  return (
    <div className="relative size-full max-w-[52rem] max-h-[28rem] 2xl:max-h-[38rem] flex-col-center justify-start overflow-hidden">
      {/* header */}
      <div className="w-full p-4 -mb-1 flex-center justify-between rounded-t-lg bg-white border border-slate-200">
        {/* <ActionsButton
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
        /> */}

        <button
          onClick={() => setShowDropzone((prev) => !prev)}
          className={cn(
            "h-8 py-1 px-2 text-white flex-center gap-1 rounded-sm transition-all",
            showDropzone
              ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
              : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
          )}
        >
          <Add01Icon
            className={cn(
              "size-4 text-white transition-all",
              showDropzone ? "rotate-45" : ""
            )}
          />
          {showDropzone ? null : <p>הוסף קבצים</p>}
        </button>

        {/* files length */}
        <p className="">{`${files?.length} קבצים נבחרו`}</p>
      </div>

      {/* body */}
      <div className="relative size-full bg-slate-50 border border-slate-200 overflow-hidden">
        <Uploader
          setAcceptedFiles={setAcceptedFiles}
          showDropzone={showDropzone}
        />
        <GridFiles files={files} setFiles={setFiles} />
      </div>

      {/* footer */}
      <div className="w-full text-end text-sm text-slate-300 bg-white p-4 -mt-1 border border-slate-200 rounded-b-lg">
        נוצר ע׳׳י זוהר מערכות
      </div>
    </div>
  );
};

export default MyDropzone;
