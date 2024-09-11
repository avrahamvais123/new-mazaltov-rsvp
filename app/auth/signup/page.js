"use client";

import Form from "@/app/ui/Form";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userAtom, eventAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [user, setUser] = useAtom(userAtom);
  const [event, setEvent] = useAtom(eventAtom);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data: ", data);
    const { name, email, password } = data;

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("response: ", response);
      signIn();
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
        <span className="text-xs text-center text-slate-400">
          משתמש שנרשם דרך גוגל יש להיכנס רק דרך גוגל ומי שנרשם ידנית עם מייל
          וסיסמה צריך להיכנס גם כן רק בדרך זו
        </span>

        <Form
          title="כניסה"
          fields={fields}
          onSubmit={onSubmit}
          submitName="הרשמה"
          formClassName="p-0"
          fieldsClassName="rounded-sm"
          submitClassName="rounded-sm"
          error={error}
          success={success}
        >
          <div className="relative h- w-full h-[1px] my-4 bg-slate-200">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              או
            </span>
          </div>

          {/* google button */}
          <button
            type="button"
            className="w-full rounded-sm px-4 py-2 border text-slate-400 flex justify-center items-center gap-2"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/auth/signin",
              })
            }
          >
            <img
              src="/icons/google-icon.png"
              alt="Google Icon"
              width={20}
              height={20}
            />
            הרשמה עם גוגל
          </button>
        </Form>

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
