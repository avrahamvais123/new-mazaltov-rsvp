import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="size-full flex-col-center p-6">
        <Image
          src="/images/not-found.png"
          alt="תמונה של 404"
          width={400}
          height={300}
          className="object-cover"
          priority
        />

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
