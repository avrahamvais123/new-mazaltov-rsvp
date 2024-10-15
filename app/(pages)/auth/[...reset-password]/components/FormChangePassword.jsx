"use client";

import InputPassword from "@/app/mui/InputPassword";
import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import React from "react";
import { useForm } from "react-hook-form";

const FormChangePassword = ({ token }) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  console.log("token: ", token);
  
  const onSubmit = async (data) => {
    console.log('data: ', data);

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "size-full max-w-96 p-4",
        "flex-col-center justify-start items-start gap-6",
        "text-slate-400 border-slate-100"
      )}
    >
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
  );
};

export default FormChangePassword;
