"use client";

import { MoreVerticalIcon } from "@/app/icons/icons";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MyDropdown from "@/app/ui/MyDropdown";
import { BounceLoader, PulseLoader } from "react-spinners";
import { indigo } from "tailwindcss/colors";

const LIstUsers = ({
  isLoading,
  users = [],
  actions,
  currentUser,
  setCurrentUser,
  setDialogDetails,
  setOpenDialog,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="size-full overflow-auto flex-col-center items-start justify-start -space-y">
      {isLoading && (
        <div className="size-full flex-col-center gap-1">
          <PulseLoader size={15} color={indigo[600]} />
          <h4 className="">טוען משתמשים...</h4>
        </div>
      )}

      {users.map((user, idx) => {
        const activeUser = user?.email === currentUser?.email;

        return (
          <div
            key={idx}
            onClick={() => setCurrentUser(user)}
            className={cn(
              "cursor-pointer w-full p-4 flex-center justify-between",
              "border-b first:border-t border-slate-200",
              activeUser ? "bg-slate-50 text-slate-600" : "text-slate-400"
            )}
          >
            <div className="flex-center gap-3">
              <Image
                src={user?.image || "/images/user-1.png"}
                alt="תמונת המשתמש"
                width={40}
                height={40}
                className={cn(
                  "rounded-full bg-slate-50 ring-2",
                  activeUser ? "ring-slate-200" : "ring-slate-50"
                )}
              />
              <div className="flex-col-center items-start">
                <h4 className="text-sm -mb-0.5">{user?.name}</h4>
                <p
                  className={cn(
                    "text-sm text-slate-400 max-md:truncate text-left direction-ltr max-md:max-w-40",
                    activeUser ? "text-slate-600" : ""
                  )}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <MyDropdown
              open={openDropdown}
              setOpen={setOpenDropdown}
              title="פעולות"
              items={actions({ user, setOpenDialog, setDialogDetails })}
            >
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className=""
              >
                <MoreVerticalIcon />
              </button>
            </MyDropdown>
          </div>
        );
      })}
    </div>
  );
};

export default LIstUsers;
