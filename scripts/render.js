import { renderMedia } from "@remotion/renderer";
import path from "path";

const renderVideo = async () => {
  const serveUrl = "http://localhost:50085"; // הכתובת של השרת המקומי שלך
  const compositionId = "MyVideo"; // שם הקומפוזיציה
  const outputLocation = path.join(process.cwd(), "out/video.mp4"); // היכן לשמור את הסרטון

  try {
    console.log("🎥 רינדור הסרטון מתחיל...");
    await renderMedia({
      serveUrl,
      composition: {
        id: compositionId,
        fps: 30,
        width: 1200,
        height: 1800,
        durationInFrames: 1800,
      },
      codec: "h264", // יצירת סרטון בפורמט MP4
      outputLocation,
    });
    console.log(`✅ הסרטון נוצר בהצלחה: ${outputLocation}`);
  } catch (error) {
    console.error("❌ שגיאה ביצירת הסרטון:", error);
  }
};

renderVideo();
