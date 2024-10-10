"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import AvatarUpload from "./AvatarUpload";
import { useForm } from "react-hook-form";
import axios from "axios";
import EditableText from "@/app/ui/EditableText";
import Button from "@mui/material/Button";
import InputPassword from "@/app/mui/InputPassword";

const fields = [
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

const DetailsOption = ({ session }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  console.log('imageUrl: ', imageUrl);

  const onSubmit = async (data) => {
    console.log("data: ", data);

    /* if (data?.confirmPassword !== data?.newPassword) {
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
    } */
  };

  return (
    <div className="size-full flex-col-center justify-start items-start gap-2 flex-grow overflow-auto">
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
            getImageUrl={(url) => setImageUrl(url)}
            avatarClasses={{ wrapper: "size-20" }}
            session={session}
          />

          <span className="flex-col-center items-start">
            <EditableText
              initialText={session?.user?.name}
              text={text}
              setText={setText}
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
            rules={{ required: "זהו שדה חובה" }}
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
            rules={{ required: "זהו שדה חובה" }}
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

/* <MyForm
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
