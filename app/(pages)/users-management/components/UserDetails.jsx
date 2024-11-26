"use client";

import { UserCircleIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BTN_CLASSNAME = cn(
  "relative w-full bg-slate-50 text-slate-400 transition-all px-2 py-1"
);

const UserDetails = ({ currentUser }) => {
  const [currentTab, setCurrentTab] = useState("אירועים");
  const [events, setEvents] = useState([]);
  console.log("events: ", events);

  const getEventMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(
          `/api/events?linkedEmail=${currentUser?.email}`
        );
        setEvents(res?.data?.events);
        console.log("res: ", res);
      } catch (error) {
        console.error("error: ", error);
      }
    },
  });

  const onTab = (e) => {
    const tab = e.target.textContent.trim();
    setCurrentTab(tab);
  };

  useEffect(() => {
    getEventMutation.mutate();
  }, [currentUser]);

  return (
    <div
      className={cn(
        "max-md:hidden",
        "w-full h-1/2 md:h-full md:w-1/2",
        "md:order-1 p-4 overflow-auto",
        "flex flex-col gap-2",
        "border border-slate-100 rounded-md"
      )}
    >
      <h4>פרטים</h4>
      <span className="flex-center justify-start gap-2">
        <UserCircleIcon className="size-6 text-slate-400" />
        {currentUser?.name}
      </span>

      {/* tabs */}
      <div className="w-full flex-center bg-white">
        {["אירועים", "עיצובים", "עריכה"].map((tab, idx) => {
          const activeTab = currentTab === tab;
          return (
            <button
              key={idx}
              onClick={onTab}
              className={cn(
                BTN_CLASSNAME,
                activeTab ? "bg-indigo-50 text-indigo-600" : ""
              )}
            >
              {activeTab && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full transition-all bg-indigo-600" />
              )}
              {tab}
            </button>
          );
        })}
      </div>

      <div className="">
        {/* content */}
        {currentTab === "אירועים" && (
          <div className="size-full flex-col-center gap-2">
            {events.map(
              ({ title, date, img_1, googleMap, waze, eventType, link }, i) => {
                return (
                  <Link
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full p-4 rounded-sm transition-all",
                      "flex-col-center items-start gap-0.5",
                      "bg-slate-50 border border-slate-200",
                      "hover:bg-indigo-50 hover:border-indigo-700",
                      "active:bg-indigo-100 active:border-indigo-800"
                    )}
                  >
                    <p>{title}</p>
                    <p>תאריך האירוע: {date}</p>
                    <img
                      src={img_1}
                      alt="תמונת ההזמנה"
                      className="object-contain size-32 rounded-sm"
                    />
                  </Link>
                );
              }
            )}
          </div>
        )}
        {currentTab === "עיצובים" && <div>עיצובים אחרוינים שהוספתי</div>}
        {currentTab === "עריכה" && (
          <div>
            <p>
              <b>שם: </b>
              {currentUser?.name}
            </p>
            <p>
              <b>מייל: </b>
              {currentUser?.email}
            </p>
            <p>
              <b>מזהה לקוח: </b>
              {currentUser?._id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
