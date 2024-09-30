"use client";

import { AlertCircleIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("התרחשה איזו שגיאה");

  useEffect(() => {
    const error = searchParams.get("error");

    // מפענח את סוג השגיאה ומציג הודעה מתאימה
    if (error === "OAuthAccountNotLinked") {
      setErrorMessage("כבר יש לך חשבון עם השם הזה, אנא התחבר עם החשבון הקיים");
    } else if (error === "CredentialsSignin") {
      setErrorMessage("הכניסה נכשלה, אנא נסה שוב");
    } else if (error === "AccessDenied") {
      setErrorMessage("המשתמש אינו קיים");
    }
  }, [searchParams]);

  return (
    <div className="size-full flex-col-center justify-start pt-10 bg-slate-100">
      <div className="w-full md:w-fit transition-all flex-col-center bg-white gap-2 py-8 md:px-16 rounded-md">
        <AlertCircleIcon className="text-red-600 size-14" />

        <span className="flex-col-center">
          <h1 className="text-4xl font-bold">שגיאה</h1>
          <p>{errorMessage}</p>
        </span>

        <button
          onClick={() => router.push("/auth/signup")}
          className={cn(
            "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800",
            "text-white px-4 py-2 rounded-sm mt-3"
          )}
        >
          עבור לעמוד ההרשמה
        </button>
      </div>
    </div>
  );
}
