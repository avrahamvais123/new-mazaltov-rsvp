import domtoimage from "dom-to-image";

export const take_screenshot = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found!");
    return;
  }

  try {
    // קביעת קנה מידה לרזולוציה גבוהה
    const scaleFactor = 4; // למשל, 4 כפול רזולוציה נוכחית

    const dataUrl = await domtoimage.toPng(element, {
      quality: 1, // איכות מרבית
      width: element.offsetWidth * scaleFactor,
      height: element.offsetHeight * scaleFactor,
      style: {
        transform: `scale(${scaleFactor})`,
        transformOrigin: "top left",
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
    });

    // הורדת התמונה
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
};
