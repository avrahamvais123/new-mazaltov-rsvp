"use client";

import { Cancel02Icon, Tick04Icon } from "@/app/icons/icons";
import InputPassword from "@/app/mui/InputPassword";
import Loader, { PulseLoader } from "@/app/ui/Loader";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

const ResetPassword = ({ email }) => {
  const [showInput, setShowInput] = useState(false);
  const { handleSubmit, control, reset } = useForm();

  const resetPassword = useMutation({
    mutationFn: async (newPassword) => {
      console.log("newPassword from mutation: ", newPassword);
      try {
        const res = await axios.patch("/api/users", {
          currentPassword: ADMIN_PASSWORD,
          newPassword: newPassword,
          email,
        });
        toast.success("הסיסמה שונתה בהצלחה", {
          action: {
            label: "סגור",
          },
          actionButtonStyle: {
            color: "white",
            backgroundColor: colors.green[700],
          },
        });
        reset();
        setShowInput(false);
        console.log("res: ", res);
      } catch (error) {
        console.error("error: ", error);
      }
    },
  });

  const onSubmit = ({ newPassword }) => {
    console.log("newPassword: ", newPassword);
    resetPassword.mutate(newPassword);
  };

  return (
    <>
      {showInput ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-center gap-2">
          <InputPassword size="small" name="newPassword" control={control} />

          {/* confirm button */}
          <IconButton
            size="small"
            type="submit"
            classes={{
              root:
                "!bg-green-600 hover:!bg-green-700 active:!bg-green-800 !rounded-sm",
            }}
          >
            {resetPassword.isPending ? (
              <PulseLoader isLoading color="white" />
            ) : (
              <Tick04Icon className="size-7 text-green-50" />
            )}
          </IconButton>

          {/* cancel button */}
          <IconButton
            size="small"
            type="button"
            onClick={() => setShowInput(false)}
            classes={{
              root:
                "!bg-red-600 hover:!bg-red-700 active:!bg-red-800 !rounded-sm",
            }}
          >
            <Cancel02Icon className="size-7 text-red-50" />
          </IconButton>
        </form>
      ) : (
        <Button
          onClick={() => setShowInput(true)}
          size="small"
          variant="contained"
        >
          שנה סיסמה
        </Button>
      )}
    </>
  );
};

export default ResetPassword;
