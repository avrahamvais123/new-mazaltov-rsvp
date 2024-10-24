"use client";

import MyForm from "@/app/ui/MyForm";
import { errorToast, successToast } from "@/app/ui/toasts";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const fields = [
  {
    name: "newPassword",
    label: "סיסמה חדשה",
    type: "password",
    placeholder: "סיסמה חדשה",
    required: true,
    span: 12,
  },
  {
    name: "confirmPassword",
    label: "אימות סיסמה",
    type: "password",
    placeholder: "אימות סיסמה",
    required: true,
    span: 12,
  },
];

const ResetPassword = ({ token }) => {
  const form = useForm();
  const router = useRouter();

  const onSubmit = async ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      errorToast({ text: "הסיסמאות אינן תואמות" });
      return;
    }
    try {
      const res = await axios.patch("/api/auth/reset-password", {
        newPassword,
        email: token?.email,
      });
      console.log("res: ", res);

      form.reset();
      successToast({ text: "הסיסמה עודכנה בהצלחה" });
      router.push("/auth/signin");
    } catch (error) {
      console.error("error: ", error);
      errorToast({ text: "שגיאה בעדכון הסיסמה" });
    }
  };

  return (
    <MyForm
      title="שחזור סיסמה"
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      submitName="כניסה"
      classNames={{ form: "pt-4", fields: "rounded-sm" }}
      customSubmit={
        <button
          type="submit"
          className="w-full p-2 mt-5 text-lg bg-indigo-600 text-indigo-50 rounded-sm"
        >
          כניסה
        </button>
      }
    ></MyForm>
  );
};

export default ResetPassword;
