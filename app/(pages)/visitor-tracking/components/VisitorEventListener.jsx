"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { UserCircleIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";

const VisitorEventListener = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("public-visitors");

    channel.bind("visitor-updated", (data) => {
      setVisitors((prev) => {
        const index = prev.findIndex(
          (visitor) => visitor.visitorId === data.visitorId
        );
        if (index > -1) {
          prev[index] = { ...prev[index], ...data };
          return [...prev];
        }
        return [...prev, data];
      });
    });

    channel.bind("visitor-left", (data) => {
      setVisitors((prev) =>
        prev.filter((visitor) => visitor.visitorId !== data.visitorId)
      );
    });

    return () => {
      pusher.unsubscribe("public-visitors");
    };
  }, []);

  return (
    <div className="size-full p-4 flex flex-col gap-4 overflow-hidden bg-slate-50">
      <h1 className="text-2xl">רשימת מבקרים באתר:</h1>
      <ul className="flex flex-col gap-2 overflow-auto">
        {visitors.map((visitor) => {
          console.log("visitor: ", visitor);
          const currentPage =
            visitor.pages[visitor?.pages?.length - 1]?.path || "";
          return (
            <li
              key={visitor.visitorId}
              className="p-4 flex gap-2 bg-white border border-slate-200 rounded-sm"
            >
              {/* image */}
              <div className="relative size-fit">
                <UserCircleIcon className="text-slate-300" />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-3.5 border-2 border-white rounded-full",
                    visitor.isVisible ? "bg-green-600" : "bg-red-600"
                  )}
                />
              </div>

              {/* details */}
              <div className="">
                <strong>מזהה משתמש:</strong> {visitor.visitorId} <br />
                <strong>עמוד נוכחי:</strong> {currentPage} <br />
                <strong>רשימת עמודים:</strong>
                <ul className="h-20 overflow-auto p-2 border border-slate-200 rounded-sm">
                  {visitor.pages.map((page, index) => {
                    return (
                      <li key={index}>
                        <div className="flex items-end gap-2">
                          <span>{page.path}</span> <br />
                          <span className="text-[.6rem] mb-0.5">
                            {new Date(page.date).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <strong>משך הזמן באתר:</strong> {visitor.totalTimeSpent || 0}{" "}
                שניות
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VisitorEventListener;
