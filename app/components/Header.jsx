"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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
import { usePathname, useRouter } from "next/navigation";
import Avatar from "../ui/Avatar";
import { Login03Icon, Settings04Icon } from "../icons/icons";
import axios from "axios";
import { sendGTMEvent } from "@next/third-parties/google";
import { cn } from "@/lib/utils";

const Header = () => {
  /* מסתיר את ההידר בעמוד הבית */
  const pathname = usePathname();
  const hiddenHeaderPaths = ["/not-found"];
  const [isOpen, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const deleteTracks = async () => {
    try {
      const res = await axios.delete("/api/track/visit");
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (hiddenHeaderPaths.includes(pathname)) return null;

  return (
    <>
      <Menu open={isOpen} setOpen={setOpen} />

      <header
        className={cn(
          "z-50 w-full min-h-16 px-2 absolute top-0",
          "flex items-center justify-between",
          !isHomePage && "border-b static"
        )}
      >
        {/* menu */}
        <div className="flex items-center gap-2">
          <Hamburger
            rounded
            size={22}
            toggled={isOpen}
            toggle={setOpen}
            color={!isHomePage ? "#94a3b8" : "white"}
            className="text-slate-400"
          />
          <div
            className={cn(
              "flex flex-col items-center -space-y-1.5",
              !isHomePage ? "*:text-slate-400" : "*:text-white"
            )}
          >
            <h2 className="text-2xl font-bold">מזל טוב</h2>
            <p className="text-xs tracking-[.1rem]">אישורי הגעה</p>
          </div>
        </div>

        {/* avatar */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger>
            <Avatar classNames={{ icon: isHomePage && "text-white" }} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="ml-2 min-w-60">
            <DropdownMenuLabel className="flex-center justify-start gap-2">
              <Avatar />
              <span className="flex-col-center items-start">
                <h2 className="leading-4 text-start text-sm text-slate-400">
                  {session?.user?.name || "אורח"}
                </h2>
                <p className="leading-4 text-start text-xs text-slate-400">
                  {session?.user?.email}
                </p>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* settings */}
            <DropdownMenuItem
              className="flex-center justify-start gap-1 px-2 *:text-slate-400 focus:bg-slate-200/40"
              onClick={() => router.push("/settings")}
            >
              <Settings04Icon className="size-5" />
              <p className="">הגדרות</p>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* exit */}
            <DropdownMenuItem
              className="bg-red-50 focus:bg-red-200/40 flex-center justify-start gap-1 px-2"
              onClick={() =>
                session
                  ? signOut({
                      callbackUrl: "/auth/signin",
                    })
                  : signIn()
              }
            >
              <Login03Icon className="text-red-600 size-5" />
              <p className="text-red-600">{session ? "יציאה" : "כניסה"}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default Header;

/*
document.cookie ="next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
 document.cookie ="next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
 */

/*  <SignedOut>
          <SignInButton
            appearance={{
              variables: {
                colorPrimary: "#4f46e5", // צבע מותאם אישית
              },
            }}
          >
            כניסה
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              variables: {
                colorPrimary: colors.red[600],
              },
              elements: {
                alertIcon: colors.green[600],
              },
            }}
          />
        </SignedIn> */

{
  /* <button onClick={deleteTracks} className="">
          מחק מעקבים
        </button> */
}

{
  /* <button
          onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}
        >
          Send Event
        </button> */
}
