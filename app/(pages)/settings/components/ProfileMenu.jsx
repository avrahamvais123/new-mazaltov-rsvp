"use client";
import { CreditCardIcon, ProfileIcon } from "@/app/icons/huge-icons";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import DetailsOption from "./DetailsOption";

const options = [
  {
    title: "פרטים אישיים",
    icon: null,
  },
  {
    title: "תשלומים",
    icon: null,
  },
];

function ProfileMenu() {
  const [activeOption, setActiveOption] = useState(options[0].title);

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
    <>
      {/* התפריט */}
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

      {/* המידע */}
      <div className="size-full">
        {activeOption === options[0].title ? <DetailsOption /> : null}
      </div>
    </>
  );
}

export default ProfileMenu;
