"use client";

import { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { FileUploadIcon } from "../icons/icons";
import { cn } from "@/lib/utils";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { CheckmarkCircle01Icon as CheckIcon } from "@/app/icons/icons";
import localforage from "localforage";
import { useUpdate } from "react-use";

const greenColor = "#05C851";

export default function MyUploader({ setSteps, carouselApi }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const update = useUpdate();

  const getUploadParams = ({ meta }) => {
    console.log("meta from getUploadParams: ", meta);
    return { url: "https://httpbin.org/post" };
  };

  const Preview = ({ meta }) => {
    console.log("meta: ", meta);
    const { name, percent, status, previewUrl } = meta;

    return (
      <div
        className={cn(
          "w-full md:w-96 p-2",
          "bg-slate-50 border border-slate-200 rounded-sm",
          "flex-center justify-between",
          status === "done" && "bg-lime-50 border-lime-200"
        )}
      >
        {/* image & text */}
        <div className="flex-center gap-2">
          {/* image */}
          <img
            src={previewUrl}
            alt={name}
            className="size-10 object-cover rounded-sm"
          />
          {/* text */}
          <div className="flex flex-col overflow-hidden">
            {/* שם הקובץ */}
            <span
              className={cn(
                status === "done" ? "text-lime-600" : "text-slate-400",
                "truncate max-w-[90%]"
              )}
            >
              {name}
            </span>

            {/* הצגת אחוזים רק בזמן העלאה */}
            {status === "uploading" ? (
              <span className="text-sm">{Math.round(percent)}% עלה</span>
            ) : status === "done" ? (
              <span className="text-lime-600 rounded-sm text-xs font-bold">
                העלאה הושלמה
              </span>
            ) : null}
          </div>
        </div>

        {status === "done" && <CheckIcon className="size-5 text-lime-600" />}
      </div>
    );
  };

  const Input = (props) => {
    const { accept, onFiles, files, getFilesFromEvent } = props;

    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <FileUploadIcon className="size-14 text-slate-400" />
        <div className="flex-col-center text-sm text-slate-400">
          <span>גרור לכאן קבצים</span>
          <span>
            או לחץ
            <label
              className={cn(
                "mx-1 text-indigo-600 cursor-pointer",
                "hover:text-indigo-500 active:text-indigo-700"
              )}
            >
              כאן
              <input
                type="file"
                accept={accept}
                multiple
                className="hidden"
                onChange={(e) => {
                  getFilesFromEvent(e).then((chosenFiles) => {
                    onFiles(chosenFiles);
                  });
                }}
              />
            </label>
            כדי לבחור קובץ
          </span>
        </div>
      </div>
    );
  };

  const Layout = ({ input, previews, submitButton, dropzoneProps, files }) => {
    return (
      <div className="size-full flex-col-center justify-start md:py-8 gap-4">
        <h1 className="text-xl font-bold text-slate-400">העלאת קבצים</h1>
        <div
          {...dropzoneProps}
          className={cn(
            "aaa w-full h-32 min-h-32",
            "md:h-40 md:min-h-40 md:w-96",
            "rounded-lg p-4",
            "border-2 border-dashed border-slate-200",
            "flex-col-center gap-4",
            files.length <= 0 && "md:h-60 md:min-h-60"
          )}
        >
          {input}
        </div>
        {files.length > 0 && (
          <>
            <div
              className={cn(
                "w-full flex-grow max-h-[300px]",
                "overflow-auto py-2 gap-2",
                "flex-col-center justify-start"
              )}
            >
              {previews}
            </div>
            {submitButton}
          </>
        )}
      </div>
    );
  };

  const SubmitButton = ({ files, onSubmit }) => {
    return (
      <button
        className={cn(
          "w-full md:w-96",
          "bg-indigo-500 text-white px-4 py-2 rounded-md",
          "hover:bg-indigo-600 active:bg-indigo-700",
          "transition-all duration-200"
        )}
        type="button"
        onClick={() => onSubmit(files)}
      >
        העלה
      </button>
    );
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log("status: ", status);
    console.log("meta from handleChangeStatus: ", meta);

    if (status === "uploading") {
      console.log(`${meta?.name} uploading: ${meta?.percent}%`);
    }

    const statusArray = ["done", "uploading", "headers_received"];
    
    update();

    /* if (status === "done") {
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
    } else if (status === "removed") {
      setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    } */
  };

  const handleSubmit = (files) => {
    console.log(files.map((f) => f.meta));
  };

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  const saveAndNext = () => {
    //localforage.setItem("uploadedFiles", uploadedFiles);
    setSteps((prev) =>
      prev.map((step) => (step.id === 2 ? { ...step, status: "done" } : step))
    );
  };

  return (
    <>
      <button className="" onClick={saveAndNext}>
        click
      </button>

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        getFilesFromEvent={getFilesFromEvent}
        LayoutComponent={Layout}
        InputComponent={Input}
        PreviewComponent={Preview}
        SubmitButtonComponent={SubmitButton}
        accept="image/*,audio/*,video/*"
        inputContent="העלה קבצים"
        inputLabel="גרור קבצים לכאן או לחץ כדי לבחור"
        submitButtonContent="העלה"
        inputWithFilesContent={(files) => `${files.length} קבצים נבחרו`}
        classNames={{
          dropzoneActive: "border-indigo-500",
          inputLabel: "text-blue-500 text-lg font-semibold",
          previewImage: "rounded-lg shadow-lg flex-grow",
        }}
      />
    </>
  );
}
