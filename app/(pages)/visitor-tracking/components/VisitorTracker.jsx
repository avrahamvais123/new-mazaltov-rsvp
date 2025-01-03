"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  handleBeforeUnload,
  handleVisibilityChange,
  sendPageView,
} from "../utils/visitor-tracking-utils";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    sendPageView(pathname);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
