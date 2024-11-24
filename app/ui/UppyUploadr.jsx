"use client";

import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import {
  DragDrop,
  Dashboard,
  ProgressBar,
  StatusBar,
  useUppyState,
} from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const UppyUploader = (props) => {
  /* const uppy = useMemo(() => {
    return new Uppy({
      restrictions: { maxNumberOfFiles: 3 },
      autoProceed: false,
      locale: { strings: { dropHereOr: "dfgdfgdfgdfgdfg" } },
    }).use(Tus, { endpoint: "https://httpbin.org/post" });
  }, []); */

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: { maxNumberOfFiles: 3 },
      autoProceed: false,
      defaultLocale: { strings: {  cancel: "ביטול"      } },
    }).use(Tus, { endpoint: "https://httpbin.org/post" })
  );

  console.log("uppy: ", uppy);

  const files = useUppyState(uppy, (state) => state.files);
  console.log("files: ", files);
  const totalProgress = useUppyState(uppy, (state) => state.totalProgress);
  console.log("totalProgress: ", totalProgress);
  // We can also get specific plugin state.
  // Note that the value on `plugins` depends on the `id` of the plugin.
  const metaFields = useUppyState(
    uppy,
    (state) => state.plugins?.Dashboard?.metaFields
  );
  console.log("metaFields: ", metaFields);

  useEffect(() => {
    uppy.on("complete", (result) => {
      console.log("Upload complete:", result.successful);
    });

    return () => uppy.close();
  }, [uppy]);

  return (
    <div>
      <Dashboard uppy={uppy} plugins={["DragDrop"]} {...props} />
      <ProgressBar uppy={uppy} hideAfterFinish={true} />
    </div>
  );
};

export default UppyUploader;
