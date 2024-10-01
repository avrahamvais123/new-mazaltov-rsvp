"use client";
import {
  CreditCardIcon,
  DashboardSquare01Icon,
  ProfileIcon,
  SecurityLockIcon,
  SquareLock02Icon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

function ProfileMenu({ options = [], defaultOption = "", active = () => {} }) {
  const [activeOption, setActiveOption] = useState(defaultOption);
  console.log("activeOption: ", activeOption);

  useEffect(() => {
    active(activeOption);
  }, [activeOption]);

  const icons = (option) => [
    <ProfileIcon
      key={option.title}
      className={cn(
        activeOption === option.title ? "text-indigo-700" : "text-slate-400"
      )}
    />,
    <CreditCardIcon
      key={option.title}
      className={cn(
        activeOption === option.title ? "text-indigo-700" : "text-slate-400"
      )}
    />,
  ];

  return (
    <div className="max-md:hidden size-full max-w-[15rem] rounded-md flex-col-center justify-start gap-2">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setActiveOption(option.title);
            }}
            className={cn(
              "w-full py-2.5 px-4",
              "flex-center justify-start gap-2",
              "rounded-md transition-all",
              activeOption === option.title
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-400 hover:bg-slate-50"
            )}
          >
            {icons(option)[index]}
            {option.title}
          </button>
        );
      })}
    </div>
  );
}

export default ProfileMenu;
