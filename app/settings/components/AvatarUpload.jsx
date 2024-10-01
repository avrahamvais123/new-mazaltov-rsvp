"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import axios from "axios"; // ייבוא axios

export default function AvatarUpload({ session }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(session?.user?.image);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null); // נשתמש ב-ref כדי לגשת לקלט המוסתר

  // פונקציה לטיפול בבחירת קובץ חדש
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // שומרים את הקובץ שנבחר
      setImageUrl(imageUrl); // מעדכנים את התצוגה עם התמונה החדשה
    }
  };

  // פונקציה לפתיחת חלון הבחירה של קובץ
  const handleFileSelect = () => {
    fileInputRef.current.click(); // מבצע לחיצה על הקלט המוסתר
  };

  // פונקציה להעלאת התמונה לשרת ולמונגו
  const handleUpload = async () => {
    if (selectedImage) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedImage);

      try {
        const response = await axios.post("/api/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          alert("התמונה הועלתה בהצלחה!");
        } else {
          alert("שגיאה בהעלאת התמונה");
        }
      } catch (error) {
        alert("שגיאה בשרת");
      } finally {
        setIsUploading(false);
      }
    }
  };

  // פונקציה לביטול בחירת התמונה
  const handleCancel = () => {
    setSelectedImage(null);
    setImageUrl(session?.user?.image); // מחזירים את תמונת המשתמש המקורית
    fileInputRef.current.value = null; // מאפסים את הערך של קלט הקובץ
  };

  return (
    <span className="w-full flex-center justify-start gap-3">
      <img src={imageUrl} alt="תמונת משתמש" className="size-14 rounded-full" />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef} // שימוש ב-ref כדי לגשת לקלט
      />
      <button
        onClick={handleFileSelect} // לחיצה על הכפתור תפתח את חלון הבחירה
        className={cn(
          "py-1.5 px-3 text-sm",
          "border rounded-md transition-all",
          "hover:bg-indigo-600 hover:border-indigo-600 hover:text-white"
        )}
      >
        העלה תמונה
      </button>
      {selectedImage && (
        <>
          <button
            onClick={handleUpload}
            className={cn(
              "py-1.5 px-3 text-sm",
              "border rounded-md transition-all",
              "hover:bg-green-600 hover:border-green-600 hover:text-white"
            )}
            disabled={isUploading}
          >
            {isUploading ? "מעלה..." : "אשר העלאה"}
          </button>
          <button
            onClick={handleCancel}
            className={cn(
              "py-1.5 px-3 text-sm",
              "border rounded-md transition-all",
              "hover:bg-red-600 hover:border-red-600 hover:text-white"
            )}
          >
            בטל
          </button>
        </>
      )}
    </span>
  );
}
