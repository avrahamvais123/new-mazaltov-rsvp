"use client";

import { UserCircleIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const BTN_CLASSNAME = cn(
  "relative w-full bg-slate-50 text-slate-400 transition-all px-2 py-1"
);

const UserDetails = ({ currentUser }) => {
  const [currentTab, setCurrentTab] = useState("אירועים");

  const onTab = (e) => {
    const tab = e.target.textContent.trim();
    setCurrentTab(tab);
  };

  /* const createEventMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/events", {
        name: "new event",
        date: new Date(),
        description: "new event description",
        location: "new event location",
        guests: [],
        attendees: [],
      });
    },
  }); */

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
        {currentTab === "אירועים" && <div>אירועים אחרונים שהוספתי</div>}
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
