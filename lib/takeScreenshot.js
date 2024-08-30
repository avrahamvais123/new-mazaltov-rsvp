import html2canvas from "html2canvas";

export const takeScreenshot = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found!");
    return;
  }

  try {
    const scaleFactor = 4; // מכפיל את הרזולוציה
    const canvas = await html2canvas(element, {
      scale: scaleFactor,
      width: element.offsetWidth,
      height: element.offsetHeight,
      useCORS: true,
    });

    const dataUrl = canvas.toDataURL("image/png", 1.0); // איכות מרבית

    // הורדת התמונה
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
};
