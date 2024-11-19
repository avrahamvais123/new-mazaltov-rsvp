"use client";

import React, { Fragment, useState } from "react";
import UserDetails from "./UserDetails";
import MyDialog from "@/app/ui/MyDialog";
import { actions } from "./usersListActions";
import LIstUsers from "./UsersList";
import { cn } from "@/lib/utils";
import { UserAdd01Icon } from "@/app/icons/icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UsersList = () => {
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      return res.data; // החזר את הנתונים מהבקשה
    } catch (error) {
      console.error("error: ", error);
      throw error; // חשוב לזרוק שגיאה כדי ש-React Query יוכל להתמודד איתה
    }
  };

  const { data: users, isLoading, refetch, status } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/users");
        return res?.data?.users; // החזר את הנתונים מהבקשה
      } catch (error) {
        console.error("error: ", error);
        throw error; // חשוב לזרוק שגיאה כדי ש-React Query יוכל להתמודד איתה
      }
    },
    //enabled: !!session?.user?.email,
    staleTime: 300000, // Cache data for 5 minutes
  });

  const [currentUser, setCurrentUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: "",
    content: () => <Fragment />,
    onConfirm: () => {},
  });

  const onAddUser = async () => {};

  return (
    <div className="size-full overflow-hidden flex-col-center justify-start items-start gap-4 p-4">
      <MyDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogDetails.title}
        content={dialogDetails.content}
        onConfirm={dialogDetails.onConfirm}
        noDescription
      />
      {/* header */}
      <div className="w-full flex-center justify-between gap-4 mb-4">
        <h1 className="text-xl text-slate-400">לוח ניהול משתמשים</h1>
        <button
          onClick={onAddUser}
          className={cn(
            "rounded-md p-2 md:px-4 transition-all",
            "flex-center gap-2",
            "bg-indigo-600 text-white",
            "hover:bg-indigo-700 active:bg-indigo-800"
          )}
        >
          <UserAdd01Icon className="text-white" />
          <p className="max-md:hidden">הוספת לקוח</p>
        </button>
      </div>

      <div className="size-full flex-col-center md:flex-row gap-4 overflow-hidden">
        {/* details */}
        <UserDetails currentUser={currentUser} />

        {/* users list */}
        <LIstUsers
          users={users}
          actions={actions}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setDialogDetails={setDialogDetails}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </div>
  );
};

export default UsersList;
