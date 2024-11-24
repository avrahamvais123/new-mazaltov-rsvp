"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  CheckmarkCircle01Icon as CheckIcon,
  CancelCircleFillIcon as CancelIcon,
  Delete02Icon,
  ReloadIcon,
} from "@/app/icons/icons";

const NextDropzone = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({}); // 'idle', 'uploading', 'done', 'error'

  // פונקציה לדימוי העלאה
  const simulateUpload = (fileId) => {
    setUploadStatus((prev) => ({ ...prev, [fileId]: "uploading" }));

    let progressValue = 0;
    const interval = setInterval(() => {
      if (progressValue < 100) {
        progressValue += 10;
        setProgress((prev) => ({ ...prev, [fileId]: progressValue }));
      } else {
        clearInterval(interval);
        setUploadStatus((prev) => ({ ...prev, [fileId]: "done" }));
      }
    }, 500);
  };

  const handleRetry = useCallback((fileId) => {
    console.log(`Retrying upload for file ID: ${fileId}`);
    setUploadStatus((prev) => ({ ...prev, [fileId]: "uploading" }));
    simulateUpload(fileId);
  }, []);

  const handleAbort = useCallback((fileId) => {
    console.log(`Aborting upload for file ID: ${fileId}`);
    setUploadStatus((prev) => ({ ...prev, [fileId]: "idle" }));
    setProgress((prev) => ({ ...prev, [fileId]: 0 }));
  }, []);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const updatedFiles = droppedFiles.map((file) => ({
      file,
      id: file.name + Date.now(), // Unique ID for each file
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...updatedFiles]);
  };

  const handleUpload = () => {
    files.forEach(({ id }) => {
      simulateUpload(id);
    });
  };

  return (
    <div>
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "w-full p-4 border-2 border-dashed rounded-md",
          "border-gray-300 text-gray-500 flex flex-col items-center justify-center"
        )}
      >
        Drag & Drop your files here or{" "}
        <label className="text-indigo-600 cursor-pointer">
          click to select files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileDrop(e)}
          />
        </label>
      </div>

      <div className="mt-4">
        {files.length > 0 && (
          <div>
            <h3 className="text-gray-700 font-bold mb-2">Files:</h3>
            <div className="flex flex-col gap-4">
              {files.map(({ id, file, preview }) => (
                <div
                  key={id}
                  className={cn(
                    "p-2 flex items-center justify-between",
                    "border border-gray-200 rounded-md bg-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={preview}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm font-medium">
                        {file.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {Math.round(file.size / 1024)} KB
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Progress
                      value={progress[id] || 0}
                      className="w-24"
                      dir="rtl"
                    />
                    {uploadStatus[id] === "done" ? (
                      <CheckIcon className="text-green-500" />
                    ) : (
                      <>
                        <ReloadIcon
                          className="cursor-pointer text-blue-500"
                          onClick={() => handleRetry(id)}
                        />
                        <CancelIcon
                          className="cursor-pointer text-red-500"
                          onClick={() => handleAbort(id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className={cn(
          "mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md",
          "hover:bg-indigo-600 active:bg-indigo-700 transition-all"
        )}
        onClick={handleUpload}
      >
        Upload All
      </button>
    </div>
  );
};

export default NextDropzone;
