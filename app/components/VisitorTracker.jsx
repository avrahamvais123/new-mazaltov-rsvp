"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const getVisitorId = () => {
  if (typeof window === "undefined") return null;

  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = uuidv4();
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitorId = getVisitorId();
    let startTime = Date.now();

    const sendPageView = (page) => {
      const duration = Math.round((Date.now() - startTime) / 1000); // זמן שהייה
      startTime = Date.now(); // עדכון זמן התחלה

      axios
        .post("/api/visitors", {
          visitorId,
          page,
          duration, // זמן שהייה
        })
        .then((response) => console.log("Page view updated:", response.data))
        .catch((error) => console.error("Error updating page view:", error));
    };

    // שליחת עמוד ראשוני
    sendPageView(pathname);

    // מעקב אחר שינוי עמודים
    const handlePageChange = () => {
      sendPageView(pathname);
    };

    // מעקב אחר מצב חלון
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;

      axios
        .post("/api/visitors", {
          visitorId,
          isVisible,
        })
        .then((response) => console.log("Visibility updated:", response.data))
        .catch((error) => console.error("Error updating visibility:", error));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // טיפול בעזיבת האתר
    const handleBeforeUnload = () => {
      const totalTimeSpent = Math.round((Date.now() - startTime) / 1000);
      axios.delete("/api/visitors", { data: { visitorId, totalTimeSpent } });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
