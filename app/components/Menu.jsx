"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FileAddIcon,
  Home09Icon,
  Login02Icon,
  MailOpenIcon,
  Settings04Icon,
  UserCircleIcon,
} from "../icons/icons";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai";
import { cn } from "@/lib/utils";

const Menu = ({ open, setOpen }) => {
  const [user, setUser] = useAtom(userAtom);
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      Text: (props) => <span {...props}>בית</span>,
      Icon: (props) => <Home09Icon {...props} />,
    },
    {
      href: "/create-invitation",
      Text: (props) => <span {...props}>יצירת הזמנה</span>,
      Icon: (props) => <FileAddIcon {...props} />,
    },
    {
      href: "/rsvp",
      Text: (props) => <span {...props}>אישורי הגעה</span>,
      Icon: (props) => <MailOpenIcon {...props} />,
    },
    {
      href: "/settings",
      Text: (props) => <span {...props}>הגדרות</span>,
      Icon: (props) => <Settings04Icon {...props} />,
    },
    {
      href: "/auth/signin",
      Text: (props) => <span {...props}>{session ? "יציאה" : "כניסה"}</span>,
      Icon: (props) => <Login02Icon {...props} />,
      onClick: session ? signOut : () => signIn(),
      checkActive: () => (session ? false : pathname.includes("/auth/signin")), // Check if the current path matches the signin path
    },
  ];

  return (
    <Sheet open={open}>
      <SheetContent setOpen={setOpen} className="bg-indigo-800 px-0">
        <SheetHeader className="gap-6">
          <SheetTitle className="text-white text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              {user?.image ? (
                <img
                  src={user?.image}
                  className="size-16 rounded-full border-2 border-indigo-500"
                />
              ) : (
                <UserCircleIcon className="text-slate-300 size-16" />
              )}
              <p className="text-indigo-100">{user?.name}</p>
            </div>
          </SheetTitle>
          <SheetDescription className="hidden" />

          <div className="text-right flex flex-col items-start">
            {links.map(({ Icon, href, Text, onClick, checkActive }, i) => {
              const isActive =
                typeof checkActive === "function"
                  ? checkActive()
                  : pathname === href;

              const Component = onClick ? "button" : Link;

              return (
                <Component
                  href={onClick ? undefined : href}
                  key={i}
                  onClick={onClick}
                  className={cn(
                    "group w-full px-4 py-2 flex gap-4 items-center",
                    isActive
                      ? "bg-indigo-700 text-indigo-50"
                      : "hover:bg-indigo-700 group-hover:text-indigo-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      isActive
                        ? "text-indigo-50"
                        : "text-indigo-400 group-hover:text-indigo-50"
                    )}
                  />
                  <Text
                    className={cn(
                      isActive
                        ? "text-indigo-50"
                        : "text-indigo-400 group-hover:text-indigo-50"
                    )}
                  />
                </Component>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
