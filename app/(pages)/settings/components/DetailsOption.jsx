"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import AvatarUpload from "./AvatarUpload";
import { useForm } from "react-hook-form";
import axios from "axios";
import EditableText from "@/app/ui/EditableText";
import Button from "@mui/material/Button";
import InputPassword from "@/app/mui/InputPassword";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import colors from "tailwindcss/colors";
import Loader from "@/app/ui/Loader";
import { toast } from "sonner";
import MyForm from "@/app/ui/MyForm";
import { errorToast, successToast } from "@/app/ui/toasts";

const fields = (watch) => {
  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  return [
    {
      name: "currentPassword",
      label: "סיסמה נוכחית",
      type: "password",
      required: newPassword ? true : false,
    },
    {
      name: "newPassword",
      label: "סיסמה חדשה",
      type: "password",
      required: currentPassword ? true : false,
    },
  ];
};

const DetailsOption = () => {
  const form = useForm();
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [fileImage, setFileImage] = useState(null);

  // הפונקציה הזאת בספוה קוראת לפונקציה updateUser
  const uploadImageToCloudinary = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();
        formData.append("file", fileImage);
        formData.append("public_id", `${session?.user?.id}-avatar`);
        formData.append("folder", "avatars");

        const res = await axios.post("/api/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("res from cloudinary: ", res);

        if (res.status === 200) {
          return res?.data?.data?.secure_url;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ image, currentPassword, newPassword }) => {
      try {
        const res = await axios.patch("/api/users", {
          currentPassword,
          newPassword,
          name: name || session?.user?.name,
          image: image || session?.user?.image,
          email: session?.user?.email,
        });

        console.log("res: ", res);
        const results = await update({
          user: {
            ...session.user,
            name: name || session?.user?.name,
            image: image || session?.user?.image,
          },
        });
        console.log("results: ", results);
        form.reset();
        successToast({ text: "הפרטים עודכנו בהצלחה" });
      } catch (error) {
        console.error("error: ", error);
        errorToast({ text: `אירעה שגיאה: ${error?.response?.data?.message}` });
      }
    },
  });

  const onSubmit = async ({ currentPassword, newPassword }) => {
    const image = fileImage
      ? await uploadImageToCloudinary.mutateAsync()
      : null;
    await updateUser.mutateAsync({ image, currentPassword, newPassword });
  };

  return (
    <div className="size-full flex-col-center justify-start items-start gap-2 flex-grow overflow-auto">
      {/* loader */}
      <Loader
        text="מעדכן נתונים ..."
        color={colors.indigo[600]}
        isLoading={uploadImageToCloudinary.isPending || updateUser.isPending}
      />

      {/* details */}
      <div className="flex-center gap-4">
        <AvatarUpload
          getFile={(file) => setFileImage(file)}
          avatarClasses={{ wrapper: "size-20 rounded-full" }}
        />

        {/* name */}
        <span className="flex-col-center items-start">
          <EditableText
            initialText={session?.user?.name}
            text={name}
            setText={setName}
            classNames={{
              text: cn(
                "-mt-1 truncate",
                "font-bold text-xl text-slate-400",
                "hover:text-clip"
              ),
              input: cn("font-bold text-xl text-slate-400", "hover:text-clip"),
            }}
          />
          <h4 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
            {session?.user?.email}
          </h4>
        </span>
      </div>

      <MyForm
        form={form}
        onSubmit={onSubmit}
        fields={fields(form.watch)}
        submitName="שמור"
        classNames={{
          form: cn(
            "w-full text-slate-400",
            "flex-col-center justify-start items-start gap-2"
          ),
        }}
      />
    </div>
  );
};

export default DetailsOption;

/* 
<form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "size-full max-w-96 p-4",
          "flex-col-center justify-start items-start gap-6",
          "text-slate-400 border-slate-100"
        )}
      >
<div className="w-full flex-col-center gap-4">
        <InputPassword
          fullWidth
          name="currentPassword"
          label="סיסמה נוכחית"
          control={control}
          variant="outlined"
          rules={{}}
          error={!!errors?.currentPassword}
          helperText={
            errors?.currentPassword
              ? errors?.currentPassword?.message
              : "הכנס סיסמה נוכחית"
          }
        />

        <InputPassword
          fullWidth
          name="newPassword"
          label="סיסמה חדשה"
          control={control}
          variant="outlined"
          rules={{}}
          error={!!errors?.newPassword}
          helperText={
            errors?.newPassword
              ? errors?.newPassword?.message
              : "הכנס סיסמה חדשה"
          }
        />
      </div>

      <Button type="submit" variant="contained" className="self-end">
        שמור
      </Button> */
