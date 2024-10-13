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

const DetailsOption = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        toast.success("הפרטים עודכנו בהצלחה", {
          action: {
            label: "בסדר",
          },
          actionButtonStyle: {
            backgroundColor: colors.green[700],
            color: colors.white,
          },
        });
      } catch (error) {
        console.error("error: ", error);
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
      {(uploadImageToCloudinary.isPending || updateUser.isPending) && (
        <div className="z-50 fixed inset-0 flex-col-center gap-4 bg-indigo-950/50">
          <Loader
            color={colors.indigo[600]}
            isLoading={
              uploadImageToCloudinary.isPending || updateUser.isPending
            }
          />
          <h2 className="font-bold text-4xl text-indigo-50">מעדכן נתונים...</h2>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "size-full max-w-96 p-4",
          "flex-col-center justify-start items-start gap-6",
          "text-slate-400 border-slate-100"
        )}
      >
        {/* details */}
        <div className="flex-center gap-4">
          <AvatarUpload
            getFile={(file) => setFileImage(file)}
            avatarClasses={{ wrapper: "size-20 rounded-full" }}
            session={session}
          />

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
                input: cn(
                  "font-bold text-xl text-slate-400",
                  "hover:text-clip"
                ),
              }}
            />
            <h2 className="-mt-1 font-medium text-slate-400 truncate max-w-full hover:text-clip">
              {session?.user?.email}
            </h2>
          </span>
        </div>

        {/* password */}
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
        </Button>
      </form>
    </div>
  );
};

export default DetailsOption;

/*const fields = [
  {
    name: "currentPassword",
    label: "סיסמה נוכחית",
    type: "password",
    required: true,
  },
  {
    name: "newPassword",
    label: "סיסמה חדשה",
    type: "password",
    required: true,
  },
];

<MyForm
          form={form}
          onSubmit={onSubmit}
          fields={fields}
          classNames={{
            form: cn(
              "w-full text-slate-400",
              "flex-col-center justify-start items-start gap-2"
            ),
          }}
        /> */
