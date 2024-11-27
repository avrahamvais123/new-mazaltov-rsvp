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
  CreditCardPosIcon,
  FileAddIcon,
  Home09Icon,
  Login02Icon,
  MailOpenIcon,
  Settings04Icon,
  UserCircleIcon,
  UserLock01Icon,
} from "../icons/huge-icons";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const protectionPaths = ["/users-management", "/create-invitation", "/#prices"];
const Menu = ({ open, setOpen }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const links = [
    // "/"
    {
      href: "/",
      Text: (props) => <span {...props}>בית</span>,
      Icon: (props) => <Home09Icon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/create-invitation"
    {
      href: "/create-event",
      Text: (props) => <span {...props}>יצירת הזמנה</span>,
      Icon: (props) => <FileAddIcon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/prices"
    {
      href: "/#prices",
      Text: (props) => <span {...props}>מחירון</span>,
      Icon: (props) => <CreditCardPosIcon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/rsvp"
    {
      href: "/rsvp",
      Text: (props) => <span {...props}>אישורי הגעה</span>,
      Icon: (props) => <MailOpenIcon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/settings"
    {
      href: "/settings",
      Text: (props) => <span {...props}>הגדרות</span>,
      Icon: (props) => <Settings04Icon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/users-management"
    {
      href: "/users-management",
      Text: (props) => <span {...props}>לוח ניהול משתמשים</span>,
      Icon: (props) => <UserLock01Icon {...props} />,
      onClick: () => setOpen(false),
    },
    // "/auth/signin"
    {
      href: "/auth/signin",
      Text: (props) => <span {...props}>{session ? "יציאה" : "כניסה"}</span>,
      Icon: (props) => <Login02Icon {...props} />,
      onClick: () =>
        session
          ? signOut({
              callbackUrl: "/auth/signin",
            })
          : signIn(),
    },
  ];

  return (
    <Sheet open={open}>
      <SheetContent setOpen={setOpen} className="bg-indigo-800 px-0">
        <SheetHeader className="gap-6">
          <SheetTitle className="text-white text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              {session?.user?.image ? (
                <img
                  src={session?.user?.image}
                  className="size-16 rounded-full border-2 border-indigo-500"
                />
              ) : (
                <UserCircleIcon className="text-slate-300 size-16" />
              )}
              <p className="text-indigo-100">{session?.user?.name}</p>
            </div>
          </SheetTitle>
          <SheetDescription className="hidden" />

          <div className="text-right flex flex-col items-start">
            {links.map(({ Icon, href, Text, onClick }) => {
              const isActive = pathname === href;
              const isAdmin = session?.user?.email === ADMIN_EMAIL;

              if (protectionPaths.includes(href) && !isAdmin) return null;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClick}
                  className="w-full group"
                >
                  <div
                    className={cn(
                      "w-full px-4 py-2 flex gap-4 items-center",
                      isActive
                        ? "bg-indigo-700 text-indigo-50"
                        : "hover:bg-indigo-700/30 group-active:bg-indigo-700"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5",
                        isActive
                          ? "text-indigo-50"
                          : "text-indigo-400 group-active:text-indigo-50"
                      )}
                    />
                    <Text
                      className={
                        isActive
                          ? "text-indigo-50"
                          : "text-indigo-400 group-active:text-indigo-50"
                      }
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
