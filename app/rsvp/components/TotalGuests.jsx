"use client";

import {
  CancelCircleFillIcon as CancelIcon,
  CheckmarkCircle02Icon as CheckmarkIcon,
  HelpCircleIcon as QuestionmarkIcon,
  AlertCircleIcon as AlertIcon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const TotalGuests = ({ status, data, setStatus }) => {
  // יצירת מיפוי של אייקונים לכל סטטוס
  const iconsMap = {
    מגיעים: CheckmarkIcon,
    "לא מגיעים": CancelIcon,
    "אולי מגיעים": QuestionmarkIcon,
  };

  useEffect(() => {
    const result = data.reduce((acc, curr) => {
      // אם הסטטוס לא קיים במצבר, נתחיל אותו ב-0
      if (!acc[curr.status]) {
        acc[curr.status] = 0;
      }

      // אם הסטטוס הוא "לא מגיעים", נוסיף 1, אחרת נוסיף את הכמות
      if (curr.status === "לא מגיעים") {
        acc[curr.status] += 1;
      } else {
        acc[curr.status] += Number(curr.quantity);
      }

      return acc;
    }, {});

    setStatus(result);
  }, [data]);

  return (
    <div className="w-full flex-center gap-2">
      {Object.entries(status)?.map(([key, value], idx) => {
        const Icon = iconsMap[key]; // קבלת האייקון המתאים מהאובייקט
        return (
          <div
            key={idx}
            className={cn(
              "relative w-32 py-4 text-slate-600 border flex-col-center rounded-sm"
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-8 absolute-center top-0 left-full",
                  "outline rounded-full",
                  {
                    "text-green-600": key === "מגיעים",
                    "text-red-600": key === "לא מגיעים",
                    "text-slate-600": key === "אולי מגיעים",
                  }
                )}
              />
            )}
            <span className="text-3xl font-bold">{value}</span>
            <span>{key}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TotalGuests;
