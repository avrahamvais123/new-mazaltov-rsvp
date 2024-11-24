"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = () => {
  const [files, setFiles] = useState([]); // סטייט לניהול קבצים
  console.log("files: ", files);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      const fileData = {
        file,
        name: file.name,
        preview: null,
        progress: 0,
        status: "pending", // סטטוס ראשוני
        paused: false, // סטטוס של השהיה
      };

      setFiles((prevFiles) => [...prevFiles, fileData]);

      reader.onprogress = (event) => {
        if (event.loaded && event.total) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.file === file ? { ...f, progress } : f))
          );
        }
      };

      reader.onload = () => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file
              ? { ...f, preview: reader.result, status: "ready" }
              : f
          )
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const startUpload = (file) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.file === file ? { ...f, status: "uploading", paused: false } : f
      )
    );

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://httpbin.org/post");

    // מעקב אחרי התקדמות העלאה
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.file === file ? { ...f, progress } : f))
        );
      }
    };

    // תגובה לאחר העלאה מוצלחת
    xhr.onload = () => {
      if (xhr.status === 200) {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file ? { ...f, status: "uploaded" } : f
          )
        );
      }
    };

    // טיפול בשגיאות
    xhr.onerror = () => {
      alert("שגיאה בהעלאת הקובץ!");
    };

    xhr.send(formData);
  };

  const pauseUpload = (file) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.file === file ? { ...f, paused: true } : f))
    );
  };

  const resumeUpload = (file) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.file === file ? { ...f, paused: false } : f))
    );
    startUpload(file); // ממשיך העלאה
  };

  const cancelUpload = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.file !== file));
  };

  const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });
  console.log("rest: ", rest);

  return (
    <div>
      {/* dropzone */}
      <div {...getRootProps()} className="border-2 border-dashed p-4">
        <input {...getInputProps()} />
        <p>גרור ושחרר קבצים כאן, או לחץ כדי לבחור קבצים</p>
      </div>

      {/* files list */}
      {files.length > 0 && (
        <div className="">
          {files.map(({ file, preview, progress, status, paused }) => (
            <div
              key={file.name}
              className="mb-4 p-2 flex-center gap-2 border border-slate-200 rounded-sm"
            >
              {preview && (
                <img
                  src={preview}
                  alt={file.name}
                  className="size-16 object-cover rounded-sm"
                />
              )}
              <div className="flex-1">
                <p>{file.name}</p>
                <div className="h-2 w-full bg-gray-200 rounded mb-2">
                  <div
                    className="h-full bg-blue-500 rounded"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  {status === "pending" && (
                    <button
                      onClick={() => startUpload(file)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      העלה
                    </button>
                  )}
                  {status === "uploading" && !paused && (
                    <button
                      onClick={() => pauseUpload(file)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      השהה
                    </button>
                  )}
                  {paused && (
                    <button
                      onClick={() => resumeUpload(file)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      המשך
                    </button>
                  )}
                  <button
                    onClick={() => cancelUpload(file)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    בטל
                  </button>
                </div>
                {status === "uploaded" && (
                  <p className="text-green-500">הועלה בהצלחה!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDropzone;
