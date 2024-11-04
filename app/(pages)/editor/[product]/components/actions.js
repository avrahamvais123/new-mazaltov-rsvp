export const addText = ({ editor, setShowMenu, setClickEvent }) => {
  if (!editor || !editor?.canvas) return;
  const { canvas } = editor;
  console.log("fabric: ", fabric);

  // יצירת תיבת הטקסט
  const textBox = new window.fabric.IText("טקסט", {
    left: canvas.width / 2, // מרכז התיבה
    top: canvas.height / 2, 
    //top: canvas.height / 3, // מתחיל מעל הקנבס
    fontSize: 60, // גודל פונט ראשוני
    fill: "#000000", // צבע הפונט
    textAlign: "center", // יישור טקסט למרכז
    originX: "center",
    originY: "center",
    centeredScaling: true,
    editable: false,
  });

  // הגדרת שליטה על הידיות
  textBox.setControlVisible("ml", false); // ידית שמאל
  textBox.setControlVisible("mr", false); // ידית ימין
  textBox.setControlVisible("mt", false); // ידית עליונה
  textBox.setControlVisible("mb", false); // ידית תחתונה

  textBox.on("mousedown", (e) => {
    console.log("e: ", e);
    e.e.preventDefault();
    if (e.button === 3) {
      // קוד 3 מסמן לחיצה ימנית
      console.log("לחיצה עם כפתור ימני על הריבוע!");
      setShowMenu(true);
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

export const removeObject = ({ editor }) => {
  if (!editor) return;
  const { canvas } = editor;
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
};

export const duplicateObject = ({ editor, setShowMenu, setClickEvent }) => {
  if (!editor) return;
  const { canvas } = editor;
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

export const addRectangle = ({ editor }) => {
  if (!editor) return;
  editor?.addRectangle();
};

export const saveCanvasState = ({ editor, canvasState, setCanvasState }) => {
  if (!editor) return;
  const { canvas } = editor;
  const state = canvas.toJSON();
  setCanvasState(state);
  return canvasState;
};

export const loadCanvasState = ({ editor, state }) => {
  if (!editor) return;
  const { canvas } = editor;
  canvas.loadFromJSON(state, () => {
    canvas.renderAll();
  });
};
// פונקציה לייצוא הקנבס כתמונה
export const getCanvasThumbnail = ({ editor }) => {
  if (!editor) return;
  const { canvas } = editor;

  // יצירת תמונה מוקטנת עם multiplier (יוצר תמונה ביחס של 0.2 מהגודל המקורי)
  const thumbnailDataUrl = canvas.toDataURL({
    format: "png",
    multiplier: 0.2, // יוצר תמונה בגודל 20% מהגודל המקורי
  });

  // שמירת התמונה הממוזערת בסטייט
  setFrontThumbnail(thumbnailDataUrl);
};
