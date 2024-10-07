import React from "react";
import { UserCircleIcon } from "../icons/icons";
import { useSession } from "next-auth/react";

const Avatar = ({ src, size }) => {
  const { data: session, status } = useSession();

  if (session) {
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
  }
};

export default Avatar;
