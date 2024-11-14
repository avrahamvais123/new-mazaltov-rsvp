"use client";

import { Delete02Icon, MoreVerticalIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import UserDetails from "./UserDetails";
import MyDialog from "@/app/ui/MyDialog";
import MyDropdown from "@/app/ui/MyDropdown";

const actions = ({
  user,
  setOpenDialog,
  setDialogTitle,
  setDialogContent,
  setDialogOnConfirm,
}) => [
  {
    text: (
      <div className="flex-center gap-2">
        <Delete02Icon className="size-5 text-slate-400" />
        מחיקה
      </div>
    ),
    action: (e) => {
      console.log("delete", user);
      setOpenDialog(true);
      setDialogTitle("מחיקת לקוח");
      setDialogContent(
        <div>{`האם אתה בטוח שברצונך למחוק את ${user?.name}?`}</div>
      );
      const onConfirm = () => {
        console.log("הלקוח נמחק בהצלחה");
      };
      setDialogOnConfirm(() => onConfirm);
    },
  },
];

const UsersList = ({ users = [] }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogOnConfirm, setDialogOnConfirm] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const Content = ({ open, setOpen }) => {
    return dialogContent;
  };

  return (
    <>
      <MyDialog
        title={dialogTitle}
        noDescription
        content={Content}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={dialogOnConfirm}
      />
      <div className="size-full flex-col-center md:flex-row gap-4 overflow-hidden">
        {/* details */}
        <UserDetails currentUser={currentUser} />

        {/* users list */}
        <div className="size-full overflow-auto flex-col-center items-start justify-start -space-y">
          {users.map((user, idx) => {
            const activeUser = user?.email === currentUser?.email;

            return (
              <div
                key={idx}
                onClick={() => setCurrentUser(user)}
                className={cn(
                  "cursor-pointer w-full p-4 flex-center justify-between",
                  "border-b first:border-t border-indigo-50",
                  activeUser ? "bg-indigo-50 text-indigo-800" : ""
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
                      activeUser ? "ring-indigo-200" : "ring-indigo-50"
                    )}
                  />
                  <div className="flex-col-center items-start">
                    <h4 className="text-sm -mb-0.5">{user?.name}</h4>
                    <p
                      className={cn(
                        "text-sm text-slate-400 truncate text-left direction-ltr max-w-32",
                        activeUser ? "text-indigo-800" : ""
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
                  items={actions({
                    setOpenDialog,
                    setDialogTitle,
                    setDialogContent,
                    setDialogOnConfirm,
                    user,
                  })}
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
      </div>
    </>
  );
};

export default UsersList;
