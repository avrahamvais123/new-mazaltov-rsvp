"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { UserCircleIcon } from "@/app/icons/icons";

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
          console.log("currentPage: ", currentPage);
          return (
            <li
              key={visitor.visitorId}
              className="p-4 flex gap-2 bg-white border border-slate-200 rounded-sm"
            >
              <UserCircleIcon className="text-slate-300" />
              <div className="">
                <strong>מזהה מבקר:</strong> {visitor.visitorId} <br />
                <strong>אונליין:</strong> {visitor.isVisible ? "כן" : "לא"}{" "}
                <br />
                <strong>עמוד נוכחי:</strong> {currentPage} <br />
                <strong>רשימת עמודים:</strong>
                <ul className="h-20 overflow-auto p-2 border border-slate-200 rounded-sm">
                  {visitor.pages.map((page, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <strong>עמוד:</strong> {page.path} <br />
                          <strong>תאריך:</strong>{" "}
                          {new Date(page.date).toLocaleString()}
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
