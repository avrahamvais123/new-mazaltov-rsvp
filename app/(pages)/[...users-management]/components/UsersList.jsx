"use client";

import {
  Delete02Icon,
  MoreVerticalIcon,
  InboxIcon,
  Edit02Icon,
  PartyIcon,
  PaintBoardIcon,
} from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import UserDetails from "./UserDetails";
import MyDialog from "@/app/ui/MyDialog";
import MyDropdown from "@/app/ui/MyDropdown";

const actions = ({ user, setDialogDetails, setOpenDialog }) => [
  /* אירועים */
  {
    text: (
      <div className="flex-center gap-2">
        <PartyIcon className="size-5 text-slate-400" />
        אירועים
      </div>
    ),
    action: (e) => {
      console.log("events", user);
      setOpenDialog(true);
      setDialogDetails({
        title: "כל האירועים של הלקוח",
        content: () => (
          <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
        ),
        onConfirm: () => {
          console.log("הלקוח נערך בהצלחה!!");
        },
      });
    },
  },
  /* עיצובים */
  {
    text: (
      <div className="flex-center gap-2">
        <PaintBoardIcon className="size-5 text-slate-400" />
        עיצובים
      </div>
    ),
    action: (e) => {
      console.log("designs", user);
      setOpenDialog(true);
      setDialogDetails({
        title: "כל העיצובים של הלקוח",
        content: () => (
          <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
        ),
        onConfirm: () => {
          console.log("הלקוח נערך בהצלחה!!");
        },
      });
    },
  },
  /* עריכת לקוח */
  {
    text: (
      <div className="flex-center gap-2">
        <Edit02Icon className="size-5 text-slate-400" />
        עריכת לקוח
      </div>
    ),
    action: (e) => {
      console.log("edit", user);
      setOpenDialog(true);
      setDialogDetails({
        title: "עריכת לקוח",
        content: () => (
          <div>{`האם אתה בטוח שברצונך לערוך את ${user?.name}?`}</div>
        ),
        onConfirm: () => {
          console.log("הלקוח נערך בהצלחה!!");
        },
      });
    },
  },
  /* מחיקת לקוח */
  {
    text: (
      <div className="flex-center gap-2">
        <Delete02Icon className="size-5 text-slate-400" />
        מחיקת לקוח
      </div>
    ),

    action: (e) => {
      console.log("delete", user);
      setOpenDialog(true);
      setDialogDetails({
        title: "מחיקת לקוח",
        content: () => (
          <div>{`האם אתה בטוח שברצונך למחוק את ${user?.name}?`}</div>
        ),
        onConfirm: () => {
          console.log("הלקוח נמחק בהצלחה!!");
        },
      });
    },
  },
];

const UsersList = ({ users = [] }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: "",
    content: () => <Fragment />,
    onConfirm: () => {},
  });

  return (
    <>
      <MyDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogDetails.title}
        noDescription
        content={dialogDetails.content}
        onConfirm={dialogDetails.onConfirm}
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
                        "text-sm text-slate-400 max-md:truncate text-left direction-ltr max-md:max-w-40",
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
                  items={actions({ user, setOpenDialog, setDialogDetails })}
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
