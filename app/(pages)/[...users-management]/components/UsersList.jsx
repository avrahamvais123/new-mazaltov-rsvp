"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useState } from "react";

const BTN_CLASSNAME = cn("w-full bg-slate-50 text-slate-600 px-2 py-1");
const UsersList = ({ users = [] }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentTab, setCurrentTab] = useState("");
  console.log("currentTab: ", currentTab);

  const onTab = (e) => {
    const tab = e.target.textContent.trim();
    console.log("tab: ", tab);
    setCurrentTab(tab);
  };

  return (
    <div className="size-full flex-col-center md:flex-row gap-4 overflow-hidden">
      {/* details */}
      <div
        className={cn(
          "w-full h-1/2 md:h-full md:w-1/2",
          "md:order-1 p-4 overflow-auto",
          "flex-col gap-2",
          "border border-slate-100 rounded-md"
        )}
      >
        <h4>פרטים</h4>
        <p className="">{`שם: ${currentUser?.name}`}</p>

        <div className="w-full flex-center bg-white">
          {["אירועים", "עיצובים", "אישי"].map((tab, idx) => {
            const activeTab = currentTab === tab;
            return (
              <button
                onClick={onTab}
                className={cn(
                  BTN_CLASSNAME,
                  activeTab ? "bg-indigo-50 text-indigo-600" : ""
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* users list */}
      <div className="size-full overflow-auto flex-col-center items-start justify-start -space-y">
        {users.map((user, idx) => {
          const activeUser = user?.email === currentUser?.email;

          return (
            <Fragment key={idx}>
              <button
                onClick={() => setCurrentUser(user)}
                className={cn(
                  "w-full p-4 flex gap-3",
                  "border-b first:border-t",
                  activeUser ? "bg-slate-50" : ""
                )}
              >
                <Image
                  src={user?.image || "/images/user-1.png"}
                  alt="תמונת המשתמש"
                  width={40}
                  height={40}
                  className="rounded-full bg-slate-50 ring-4 ring-slate-100"
                />
                <div className="flex-col-center items-start">
                  <h4 className="text-sm -mb-0.5">{user?.name}</h4>
                  <p className="text-sm text-slate-400">{user?.email}</p>
                </div>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
