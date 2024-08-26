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
import { userAtom } from "@/lib/jotai";
import { useAtom } from "jotai";

const Header = () => {
  const [user, setUser] = useAtom(userAtom);
  console.log("user: ", user);
  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("session: ", session);
      setUser({ ...user, ...session.user });
    }
  }, [session]);

  return (
    <>
      <Menu open={isOpen} setOpen={setOpen} />

      <header className="w-full min-h-14 px-2 flex items-center justify-between border-b">
        {/* menu */}
        <div className="flex items-center gap-2">
          <Hamburger rounded size={22} toggled={isOpen} toggle={setOpen} />
          <div className="flex flex-col items-center -space-y-1.5">
            <h2 className="text-2xl font-bold">מזל טוב</h2>
            <p className="text-xs tracking-[.1rem]">אישורי הגעה</p>
          </div>
        </div>

        {/* avatar */}
        <div className="flex items-center gap-2">
          <p className="leading-4 text-sm text-slate-400">
            שלום
            <br />
            {`${user?.name}`}
          </p>

          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger>
              {user?.image ? (
                <img src={user?.image} className="size-10 rounded-full" />
              ) : (
                <UserCircleIcon className="text-slate-300" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="ml-2">
              <DropdownMenuLabel>תפריט</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (session ? signOut() : signIn())}
              >
                {session ? "יציאה" : "כניסה"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
