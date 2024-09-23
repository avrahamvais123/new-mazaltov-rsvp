"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserCircleIcon } from "../icons/icons";
import Hamburger from "hamburger-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Menu from "./Menu";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();

  const GenerateImage = () => {
    if (session) {
      if (session?.user?.image) {
        return (
          <img src={session?.user?.image} className="size-10 rounded-full" />
        );
      } else {
        return (
          <div className="size-10 rounded-full bg-indigo-600 text-indigo-50 text-2xl flex-center">
            {session?.user?.name[0]}
          </div>
        );
      }
    } else {
      return <UserCircleIcon className="text-slate-300" />;
    }
  };

  return (
    <>
      <Menu open={isOpen} setOpen={setOpen} />

      <header className="w-full min-h-16 px-2 flex items-center justify-between border-b">
        {/* menu */}
        <div className="flex items-center gap-2">
          <Hamburger
            rounded
            size={22}
            toggled={isOpen}
            toggle={setOpen}
            color="#94a3b8"
            className="text-slate-400"
          />
          <div className="flex flex-col items-center -space-y-1.5">
            <h2 className="text-2xl font-bold text-slate-400">מזל טוב</h2>
            <p className="text-xs tracking-[.1rem] text-slate-400">
              אישורי הגעה
            </p>
          </div>
        </div>

        {/* avatar */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger>
            <GenerateImage />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="ml-2">
            <DropdownMenuLabel>
              <p className="leading-4 text-center text-sm text-slate-400">{`${session?.user?.name}`}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (session ? signOut() : signIn())}>
              {session ? "יציאה" : "כניסה"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default Header;
