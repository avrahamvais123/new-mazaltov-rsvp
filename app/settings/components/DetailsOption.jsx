"use client";

import { TaskEdit02Icon, Tick04Icon as CheckIcon } from "@/app/icons/icons";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useCopyToClipboard } from "react-use";
import AvatarUpload from "./AvatarUpload";
import { Divider } from "@/app/ui/Divider";
import MyForm from "@/app/ui/MyForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import EditableText from "@/app/ui/EditableText";

const fields = [
  {
    name: "newPassword",
    label: "סיסמה חדשה",
    type: "password",
    placeholder: "הזן סיסמה חדשה",
    required: true,
    styles: {
      gridColumn: `span 6 / span 12`,
    },
  },
  {
    name: "confirmPassword",
    label: "אימות סיסמה",
    type: "password",
    placeholder: "הזן שוב את הסיסמה החדשה",
    required: true,
    styles: {
      gridColumn: `span 6 / span 12`,
    },
  },
];

const DetailsOption = ({ session }) => {
  console.log("session: ");
  const [copy, copyToClipboard] = useCopyToClipboard();
  const [isCopy, setIsCopy] = useState(false);
  const [text, setText] = useState("");
  const form = useForm();

  useEffect(() => {
    if (copy?.value) {
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 2000);
    }
  }, [copy]);

  const onSubmit = async (data) => {
    console.log("data: ", data);

    if (data?.confirmPassword !== data?.newPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    try {
      const res = await axios.patch("/api/users", {
        newPassword: data.newPassword,
        email: session?.user?.email,
      });

      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="w-full h-full flex-col-center justify-start gap-2 flex-grow overflow-auto">
      {/* profile */}
      <section className="size-full flex-col-center items-start text-slate-400 pb-4 px-6 gap-6 border-slate-100">
        <h1 className="font-medium border border-slate-200 text-slate-400 bg-slate-50 rounded-sm px-3 py-1">
          פרופיל
        </h1>

        {/* <Divider /> */}

        {/* user name */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">שם משתמש</p>
          {/* <h2 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.name}
          </h2> */}

          <EditableText
            initialText={session?.user?.name}
            text={text}
            setText={setText}
            classNames={{
              text:
                "-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip",
            }}
          />
        </span>

        <Divider />

        {/* user id */}
        <span className="w-full flex-col-center items-start">
          <span className="text-[0.8rem] flex-center gap-1">
            <p>מזהה לקוח</p>
            <button onClick={() => copyToClipboard(session?.user?.id)}>
              {isCopy ? (
                <CheckIcon className="text-green-600 size-5" />
              ) : (
                <TaskEdit02Icon className="size-5 text-slate-400 hover:text-indigo-600 active:text-indigo-800 transition-all" />
              )}
            </button>
          </span>
          <h2 className="font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.id}
          </h2>
        </span>

        <Divider />

        {/* email */}
        <span className="w-full flex-col-center items-start">
          <p className="text-[0.8rem]">אימייל</p>
          <h2 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.email}
          </h2>
        </span>

        <Divider />

        {/* image */}
        <span className="w-full flex-center justify-start gap-3">
          <AvatarUpload session={session} />
        </span>
      </section>

      {/* password */}
      <section className="w-full h-full flex-col-center items-start text-slate-400 pb-4 px-6 gap-6 border-slate-100">
        <h1 className="font-medium border border-slate-200 text-slate-400 bg-slate-50 rounded-sm px-3 py-1">
          סיסמה
        </h1>

        {/* <Divider /> */}

        <MyForm
          form={form}
          onSubmit={onSubmit}
          fields={fields}
          customSubmit={
            <button
              type="submit"
              className="bg-indigo-600 text-indigo-50 px-4 py-2"
            >
              שלח
            </button>
          }
        />
      </section>
    </div>
  );
};

export default DetailsOption;
