"use client";

import React, { useState, useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import Tus from "@uppy/tus";
import Hebrew from "@uppy/locales/lib/he_IL";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

const UppyDropzone = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const uppyRef = useRef(null); // Reference to store Uppy instance

  useEffect(() => {
    // Initialize Uppy
    uppyRef.current = new Uppy({
      debug: true,
      autoProceed: false, // Manual upload
      restrictions: {
        maxFileSize: 10485760, // 10MB
        allowedFileTypes: ["image/*", "video/*", "application/pdf"], // Limit file types
      },
      locale: Hebrew,
    });

    uppyRef.current.use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" });

    // Generate preview images
    uppyRef.current.on("file-added", (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => [
          ...prev,
          { id: file.id, src: reader.result },
        ]);
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file.data);
      }
    });

    // Update progress for each file
    uppyRef.current.on("upload-progress", (file, progressData) => {
      setProgress((prev) => ({
        ...prev,
        [file.id]: Math.round(
          (progressData.bytesUploaded / progressData.bytesTotal) * 100
        ),
      }));
    });

    // Handle successful uploads
    uppyRef.current.on("complete", (result) => {
      const uploaded = result.successful.map((file) => ({
        id: file.id,
        name: file.name,
        url: file.uploadURL,
      }));
      setUploadedFiles(uploaded);
      setProgress({});
    });

    return () => {
      uppyRef.current.reset(); // Cleanup
    };
  }, []);

  const handleRemove = (id) => {
    uppyRef.current.removeFile(id);
    setPreviewImages((prev) => prev.filter((img) => img.id !== id));
    setProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const handleRetry = (id) => {
    uppyRef.current.retryUpload(id);
  };

  return (
    <div style={{ direction: "rtl", textAlign: "center" }}>
      <h3>העלאת קבצים</h3>
      {uppyRef.current && <DragDrop uppy={uppyRef.current} />}
      <div style={{ marginTop: "20px" }}>
        {previewImages.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {previewImages.map((img) => (
              <div
                key={img.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <img
                  src={img.src}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                {progress[img.id] !== undefined && (
                  <p style={{ fontSize: "12px" }}>
                    התקדמות: {progress[img.id]}%
                  </p>
                )}
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleRemove(img.id)}
                    style={{ marginRight: "5px", cursor: "pointer" }}
                  >
                    ביטול
                  </button>
                  <button
                    onClick={() => handleRetry(img.id)}
                    style={{ cursor: "pointer" }}
                  >
                    העלאה מחדש
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>קבצים שהועלו:</h4>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.id}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UppyDropzone;
