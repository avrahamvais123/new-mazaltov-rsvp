"use client";

import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const Uploader = () => {
  return (
    <FileUploaderRegular
      sourceList="local, url, camera, dropbox"
      classNameUploader="uc-light"
      pubkey="fff6eed768c116ff4753"
    />
  );
};

export default Uploader;
