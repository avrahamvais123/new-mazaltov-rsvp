import { v4 as uuidv4 } from "uuid";
import axios from "axios";

let startTime = Date.now();

export const getVisitorId = () => {
  if (typeof window === "undefined") return null;

  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = uuidv4();
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

const visitorId = getVisitorId();

export const sendPageView = () => {
  const duration = Math.round((Date.now() - startTime) / 1000); // זמן שהייה
  startTime = Date.now(); // עדכון זמן התחלה

  axios
    .post("/api/visitors", {
      visitorId,
      page: { path: pathname, date: new Date().toISOString() }, // נתוני עמוד עם תאריך
      duration,
    })
    .then((response) => console.log("Page view updated:", response.data))
    .catch((error) => console.error("Error updating page view:", error));
};

// מעקב אחר מצב חלון
export const handleVisibilityChange = () => {
  const isVisible = !document.hidden;

  axios
    .post("/api/visitors", {
      visitorId,
      isVisible,
    })
    .then((response) => console.log("Visibility updated:", response.data))
    .catch((error) => console.error("Error updating visibility:", error));
};

// טיפול בעזיבת האתר
export const handleBeforeUnload = () => {
  const totalTimeSpent = Math.round((Date.now() - startTime) / 1000);
  axios.delete("/api/visitors", {
    data: { visitorId, totalTimeSpent },
  });
};
