"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import axios from "axios"; // ייבוא axios
import Avatar from "@/app/ui/Avatar";
import { Cancel02Icon, Tick04Icon } from "@/app/icons/huge-icons";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";

export default function AvatarUpload({ avatarClasses, getFile = () => {} }) {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(session?.user?.image);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const fileInputRef = useRef(null); // נשתמש ב-ref כדי לגשת לקלט המוסתר

  // פונקציה לטיפול בבחירת קובץ חדש
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // שומרים את הקובץ שנבחר
      setImageUrl(imageUrl); // מעדכנים את התצוגה עם התמונה החדשה
      getFile(file); // מוציאים את התמונה שנבחרה החוצה
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
      formData.append("public_id", `${session?.user?.id}-avatar`);
      formData.append("folder", "avatars");

      try {
        const res = await axios.post("/api/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          console.log("res: ", res);
          alert("התמונה הועלתה בהצלחה!");
          setSelectedImage(null);
          setIsUploading(false);
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
    getFile(null);
    fileInputRef.current.value = null; // מאפסים את הערך של קלט הקובץ
  };

  return (
    <span
      onMouseEnter={() => setIsImageHovered(true)}
      onMouseLeave={() => setIsImageHovered(false)}
      className="relative w-full flex-col-center justify-start gap-2 rounded-full"
    >
      {!selectedImage ? (
        <button
          type="button"
          className="z-10 absolute inset-0 rounded-full"
          onClick={handleFileSelect}
        />
      ) : isImageHovered ? (
        <button
          type="button"
          className="absolute inset-0 bg-black/50 transition-all flex-center p-6 rounded-full"
          onClick={handleCancel}
        >
          <Cancel02Icon className="size-full text-red-600 transition-all" />
        </button>
      ) : null}
      <Avatar src={imageUrl} classNames={avatarClasses} />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef} // שימוש ב-ref כדי לגשת לקלט
      />
    </span>
  );
}

{
  /* <img src={imageUrl} alt="תמונת משתמש" className="size-14 rounded-full" /> */
}

/* {selectedImage && (
  <div className="flex-center gap-2">
    <button
      //onClick={handleUpload}
      className={cn(
        "size-fit aspect-square p-1",
        "bg-green-50/50 transition-all",
        "border border-green-700/20 rounded-md",
        "hover:bg-green-600 hover:border-green-600",
        "*:hover:text-white"
      )}
      disabled={isUploading}
    >
      <Tick04Icon className="size-5 text-green-600 transition-all" />
    </button>

    <LoadingButton
      loading={isUploading}
      loadingPosition="start"
      variant="outlined"
      onClick={handleUpload}
    >
      {isUploading ? "מעלה..." : "אישור"}
    </LoadingButton>

    <button // cancel button
      onClick={handleCancel}
      className={cn(
        "size-fit aspect-square p-1.5",
        "bg-red-50/50 transition-all",
        "border border-red-700/20 rounded-md",
        "hover:bg-red-600 hover:border-red-600 *:hover:text-white"
      )}
    >
      <Cancel02Icon className="size-4 text-red-600 transition-all" />
    </button>
  </div>
)} */
