import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="size-full flex-col-center">
      <h1 className="text-8xl text-center font-bold">404</h1>
      <p className="text-center">נראה שהעמוד שחיפשת אינו נמצא</p>
      <Link
        href="/"
        className={cn(
          "py-2 px-4 mt-10",
          "rounded-md transition-all",
          "bg-indigo-600 hover:bg-indigo-700",
          "text-indigo-50 text-sm font-medium"
        )}
      >
        חזרה לעמוד הבית
      </Link>
    </div>
  );
};

export default Page;
