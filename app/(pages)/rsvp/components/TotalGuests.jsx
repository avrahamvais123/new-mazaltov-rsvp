"use client";

import {
  CancelCircleFillIcon as CancelIcon,
  CheckmarkCircle02Icon as CheckmarkIcon,
  HelpCircleIcon as QuestionmarkIcon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";

const TotalGuests = ({ status }) => {
  const iconsMap = {
    מגיעים: CheckmarkIcon,
    "לא מגיעים": CancelIcon,
    "אולי מגיעים": QuestionmarkIcon,
  };

  return (
    <div className="w-full flex-center gap-2">
      {Object.entries(status).map(([key, value], idx) => {
        const Icon = iconsMap[key];
        return (
          <div
            key={idx}
            className="relative w-32 py-4 text-slate-600 border flex-col-center rounded-sm"
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
