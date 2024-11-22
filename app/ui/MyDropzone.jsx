"use client"

import React from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onSubmit }) => {
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles); // קבצים שהועלו
    onSubmit(acceptedFiles); // שליחת הקבצים
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4">
      <input {...getInputProps()} />
      <p>גרור ושחרר קבצים כאן, או לחץ כדי לבחור קבצים</p>
    </div>
  );
};

export default MyDropzone;
