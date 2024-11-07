export const addText = ({ canvas, setClickEvent = () => {} }) => {
  if (!canvas) return;
  console.log("fabric: ", fabric);

  const rtlText = (text) => {
    return text
      .split("\n")
      .map((line) => line.split("").reverse().join(""))
      .join("\n");
  };

  // יצירת תיבת הטקסט
  const textBox = new fabric.IText("טקסט", {
    left: canvas.width / 2, // מרכז התיבה
    top: canvas.height / 2,
    //top: canvas.height / 3, // מתחיל מעל הקנבס
    fontSize: 60, // גודל פונט ראשוני
    fill: "#000000", // צבע הפונט
    textAlign: "center", // יישור טקסט למרכז
    originX: "center",
    originY: "center",
    direction: "rtl",
    width: 300, // קביעת רוחב לתיבת הטקסט
  });

  textBox.on("text:changed", () => {
    const lines = textBox.text
      .split("\n")
      .map((line) => line.split("").reverse().join(""));
    textBox.text = lines.join("\n");

    // בדיקה אם השורות יוצאות מהמסגרת
    if (textBox.height > textBox.getBoundingRect().height) {
      textBox.height = textBox.getBoundingRect().height;
    }

    canvas.requestRenderAll();
  });

  textBox.on("mousedown", (e) => {
    console.log("e: ", e);
    e.e.preventDefault();
    if (e.button === 3) {
      // קוד 3 מסמן לחיצה ימנית
      console.log("לחיצה עם כפתור ימני על הריבוע!");
      setClickEvent(e);
    }
  });

  // הוספת תיבת הטקסט לקנבס
  canvas.add(textBox);
  canvas.setActiveObject(textBox);

  // הגדרת מיקום יעד עבור האנימציה (המרכז המקורי של הקנבס)
  const finalTop = canvas.height / 2;

  // הפעלת האנימציה של הירידה מלמעלה למטה
  /* textBox.animate("top", finalTop, {
    onChange: canvas.renderAll.bind(canvas), // רענון הקנבס תוך כדי האנימציה
    duration: 1000, // משך האנימציה במילישניות
    easing: fabric.util.ease.easeOutBounce, // סגנון האנימציה
  }); */
};

export const removeObject = ({ canvas }) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
};

export const duplicateObject = ({ canvas, setShowMenu, setClickEvent }) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.clone((cloned) => {
      cloned.set({
        left: activeObject.left + 10, // משנה מיקום כדי להימנע מחפיפה
        top: activeObject.top + 10,
      });

      // הגדרת שליטה על הידיות
      cloned.setControlVisible("ml", false); // ידית שמאל
      cloned.setControlVisible("mr", false); // ידית ימין
      cloned.setControlVisible("mt", false); // ידית עליונה
      cloned.setControlVisible("mb", false); // ידית תחתונה

      cloned.on("mousedown", (e) => {
        console.log("e: ", e);
        e.e.preventDefault();
        if (e.button === 3) {
          // קוד 3 מסמן לחיצה ימנית
          console.log("לחיצה עם כפתור ימני על הריבוע!");
          setShowMenu(true);
          setClickEvent(e);
        }
      });

      // הגדרת מיקום יעד עבור האנימציה (המרכז המקורי של הקנבס)
      const finalTop = activeObject.top + 40;

      // הפעלת האנימציה של הירידה מלמעלה למטה
      /* cloned.animate("top", finalTop, {
        onChange: canvas.renderAll.bind(canvas), // רענון הקנבס תוך כדי האנימציה
        duration: 1000, // משך האנימציה במילישניות
        easing: fabric.util.ease.easeOutBounce, // סגנון האנימציה
      }); */

      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  }
};

export const addRectangle = ({ canvas }) => {
  if (!canvas) return;
  canvas?.addRectangle();
};

export const saveCanvasState = ({ canvas, canvasState, setCanvasState }) => {
  if (!canvas) return;
  const state = canvas.toJSON();
  setCanvasState(state);
  return canvasState;
};

export const loadCanvasState = ({ canvas, state }) => {
  if (!canvas) return;
  canvas.loadFromJSON(state, () => {
    canvas.renderAll();
  });
};
// פונקציה לייצוא הקנבס כתמונה
export const getCanvasThumbnail = ({ canvas }) => {
  if (!canvas) return;

  // יצירת תמונה מוקטנת עם multiplier (יוצר תמונה ביחס של 0.2 מהגודל המקורי)
  const thumbnailDataUrl = canvas.toDataURL({
    format: "png",
    multiplier: 0.2, // יוצר תמונה בגודל 20% מהגודל המקורי
  });

  // שמירת התמונה הממוזערת בסטייט
  setFrontThumbnail(thumbnailDataUrl);
};
