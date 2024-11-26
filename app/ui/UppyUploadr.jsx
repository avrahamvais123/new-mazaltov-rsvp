"use client";

import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import ProgressBar from "@uppy/progress-bar";
import StatusBar from "@uppy/status-bar";
import { DragDrop, Dashboard, useUppyState } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const UppyUploader = (props) => {

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
    <div className="h-full p-4">
      <Dashboard id="dashboard" uppy={uppy} plugins={["DragDrop"]} {...props} />
      <style jsx global>{`
        .uppy-Dashboard-AddFiles, .uppy-Dashboard-inner, .uppy-Dashboard-innerWrap, .uppy-Container, .uppy-Root, .uppy-Dashboard {
          height: 100% !important;
        }
        .uppy-StatusBar-actions{
          justify-content: flex-end;
        }
        .uppy-DashboardContent-back{
          background-color: ${red[600]};
          color: white;
          padding: 8px 12px;
          font-size: 16px !important;
          &:hover{
            background-color: ${red[700]};
            color: white;
          }
          &:active{
            background-color: ${red[800]};
            color: white;
          }
          .uppy-Dashboard-browse{
            color: ${indigo[600]} !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UppyUploader;
