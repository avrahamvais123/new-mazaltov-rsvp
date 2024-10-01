"use client";

import Form from "@/app/ui/MyForm";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const form = useForm();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data: ", data);

    try {
      const results = await signIn("credentials", {
        ...data,
        isSignup: true,
        redirect: false,
      });
      console.log("results: ", results);

      if (results?.code) {
        setError(results?.code);
      } else {
        router.push("/rsvp");
      }
    } catch (error) {
      if (error?.response) {
        // הבעיה מהשרת
        console.error(
          "error?.response?.data?.message: ",
          error?.response?.data?.message
        );
        setError(error?.response?.data?.message);
      } else {
        // בעיה כללית יותר
        console.error("An error occurred. Please try again.");
        setError("An error occurred. Please try again.");
      }
    }
  };

  const fields = [
    {
      name: "name",
      label: "שם",
      type: "name",
      placeholder: "שם",
      required: true,
      span: 12,
    },
    {
      name: "email",
      label: "אימייל",
      type: "email",
      placeholder: "אימייל",
      required: true,
      span: 12,
    },
    {
      name: "password",
      label: "סיסמה",
      type: "password",
      placeholder: "סיסמה",
      required: true,
      span: 12,
    },
  ];

  return (
    <div className="size-full flex-col-center bg-slate-50">
      <div
        className={cn(
          "size-full flex-col-center gap-2",
          "md:h-fit md:max-w-96",
          "bg-white rounded-sm p-4"
        )}
      >
        <h2 className="text-2xl text-center text-slate-400 font-bold">הרשמה</h2>
        {/* <span className="text-xs text-center text-slate-400">
          משתמש שנרשם דרך גוגל יש להיכנס רק דרך גוגל ומי שנרשם ידנית עם מייל
          וסיסמה צריך להיכנס גם כן רק בדרך זו
        </span> */}

        <Form
          title="כניסה"
          form={form}
          fields={fields}
          onSubmit={onSubmit}
          submitName="הרשמה"
          formClassName="p-0"
          fieldsClassName="rounded-sm"
          submitClassName="rounded-sm"
          success={success}
          error={error}
          customSubmit={
            <button
              type="submit"
              className="w-full p-2 mt-5 text-lg bg-indigo-600 text-indigo-50 rounded-sm"
            >
              כניסה
            </button>
          }
        />

        {/* לכניסה */}
        <span className="text-xs text-center text-slate-400">
          כבר רשומים לחצו
          <button
            type="button"
            className="mr-1 text-indigo-600"
            onClick={signIn}
          >
            כאן
          </button>
        </span>
      </div>
    </div>
  );
}
