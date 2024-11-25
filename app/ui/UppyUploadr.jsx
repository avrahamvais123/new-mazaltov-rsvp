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
import { useState, useRef, useEffect, useMemo } from "react";
import Hebrew from "@uppy/locales/lib/he_IL";

const strings = {
  closeModal: "סגור חלון",
  addMoreFiles: "הוסף קבצים נוספים",
  addingMoreFiles: "מוסיף קבצים נוספים",
  importFrom: "ייבוא מ-%{name}",
  dashboardWindowTitle: "חלון לוח בקרה של Uppy (לחץ על Escape כדי לסגור)",
  dashboardTitle: "לוח בקרה של Uppy",
  copyLinkToClipboardSuccess: "הקישור הועתק ללוח.",
  copyLinkToClipboardFallback: "העתק את הקישור למטה",
  copyLink: "העתק קישור",
  back: "חזור",
  removeFile: "הסר קובץ",
  editFile: "ערוך קובץ",
  editing: "עורך %{file}",
  finishEditingFile: "סיים לערוך את הקובץ",
  saveChanges: "שמור שינויים",
  myDevice: "המכשיר שלי",
  dropHint: "שחרר את הקבצים כאן",
  uploadComplete: "העלאה הושלמה",
  uploadPaused: "העלאה נעצרה",
  resumeUpload: "המשך העלאה",
  pauseUpload: "הפסק העלאה",
  retryUpload: "נסה שוב להעלות",
  cancelUpload: "בטל העלאה",
  xFilesSelected: {
    0: "%{smart_count} קובץ נבחר",
    1: "%{smart_count} קבצים נבחרו",
  },
  uploadingXFiles: {
    0: "מעלה %{smart_count} קובץ",
    1: "מעלה %{smart_count} קבצים",
  },
  processingXFiles: {
    0: "מעבד %{smart_count} קובץ",
    1: "מעבד %{smart_count} קבצים",
  },
  poweredBy: "מופעל על ידי %{uppy}",
  addMore: "הוסף עוד",
  editFileWithFilename: "ערוך קובץ %{file}",
  save: "שמור",
  cancel: "בטל",
  dropPasteFiles: "שחרר קבצים כאן או %{browseFiles}",
  dropPasteFolders: "שחרר תיקיות כאן או %{browseFolders}",
  dropPasteBoth: "שחרר קבצים כאן, %{browseFiles} או %{browseFolders}",
  dropPasteImportFiles: "שחרר קבצים כאן, %{browseFiles} או ייבוא מ:",
  dropPasteImportFolders: "שחרר תיקיות כאן, %{browseFolders} או ייבוא מ:",
  dropPasteImportBoth:
    "שחרר קבצים כאן, %{browseFiles}, %{browseFolders} או ייבוא מ:",
  importFiles: "ייבא קבצים מ:",
  browseFiles: "עיין בקבצים",
  browseFolders: "עיין בתיקיות",
  recoveredXFiles: {
    0: "לא הצלחנו לשחזר קובץ אחד. נא לבחור מחדש ולהמשיך את ההעלאה.",
    1: "לא הצלחנו לשחזר %{smart_count} קבצים. נא לבחור מחדש ולהמשיך את ההעלאה.",
  },
  recoveredAllFiles: "שחזרנו את כל הקבצים. ניתן להמשיך את ההעלאה.",
  sessionRestored: "הפעלה שוחזרה",
  reSelect: "בחר מחדש",
  missingRequiredMetaFields: {
    0: "שדה מטה נדרש חסר: %{fields}.",
    1: "שדות מטה נדרשים חסרים: %{fields}.",
  },
};

const UppyUploader = (props) => {
  const progressBarRef = useRef(null);
  console.log('progressBarRef: ', progressBarRef);
  const statusBarRef = useRef(null);
  console.log('statusBarRef: ', statusBarRef);

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: { maxNumberOfFiles: 3 },
      autoProceed: false,
      locale: Hebrew,
    }).use(
      Tus,
      { endpoint: "https://httpbin.org/post" },
      ProgressBar,
      { id: "ProgressBar", target: progressBarRef.current },
      StatusBar,
      { id: "StatusBar", target: statusBarRef.current }
    )
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
    if (!uppy || !progressBarRef.current || !statusBarRef.current) return;

    uppy.on("complete", (result) => {
      console.log("Upload complete:", result.successful);
    });

    return () => uppy.close();
  }, [uppy]);

  return (
    <div dir="ltr">
      <Dashboard
        uppy={uppy}
        plugins={["DragDrop", "ProgressBar", "StatusBar"]}
        showProgressDetails
        {...props}
      ></Dashboard>
    </div>
  );
};

export default UppyUploader;
