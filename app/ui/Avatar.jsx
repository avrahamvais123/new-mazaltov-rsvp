import React from "react";
import { UserCircleIcon } from "../icons/huge-icons";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Avatar = ({ src, classNames }) => {
  const { data: session, status } = useSession();

  return (
    <div className={cn("relative size-10 pointer-events-auto", classNames?.wrapper)}>
      {session?.user?.image ? (
        <img
          src={src || session?.user?.image}
          alt="User avatar"
          className={cn("size-full object-cover rounded-full", classNames?.img)}
        />
      ) : session ? (
        <div
          className={cn(
            "size-full rounded-full",
            "bg-indigo-600 text-indigo-50",
            "text-2xl flex-center",
            classNames?.imageName
          )}
        >
          {session?.user?.name?.[0]}
        </div>
      ) : (
        <UserCircleIcon
          className={cn("size-full text-slate-300", classNames?.icon)}
        />
      )}
    </div>
  );
};

export default Avatar;

/* if (session) {
    if (session?.user?.image) {
      return (
        <img
          src={src || session?.user?.image}
          className="size-10 rounded-full"
        />
      );
    } else {
      return (
        <div className="size-10 rounded-full bg-indigo-600 text-indigo-50 text-2xl flex-center">
          {session?.user?.name?.[0]}
        </div>
      );
    }
  } else {
    return <UserCircleIcon className="text-slate-300" />;
  } */
