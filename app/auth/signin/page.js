// app/auth/signin/page.js
"use client";

import Form from "@/app/ui/Form";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data?.email,
      password: data?.password,
      callbackUrl: "/",
    });

    if (result?.error) {
      // handle error
      console.error(result?.error);
    } else {
      // redirect to callbackUrl
      window.location.href = result?.url;
    }
  };

  /* {
      name: "date",
      label: "תאריך האירוע",
      type: "date",
      placeholder: "תאריך האירוע",
      span: 6,
      required: true,
    }, */

  const fields = [
    {
      name: "email",
      label: "אימייל",
      type: "email",
      placeholder: "אימייל",
      required: true,
    },
    {
      name: "password",
      label: "סיסמה",
      type: "password",
      placeholder: "סיסמה",
      required: true,
    },
  ];

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center text-slate-400">כניסה</h2>

      <Form
        title="כניסה"
        fields={fields}
        onSubmit={onSubmit}
        submitName="כניסה"
        formClassName=""
      >
        <div className="relative w-full h-[1px] my-4 bg-slate-200">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            או
          </span>
        </div>

        {/* google button */}
        <button
          type="button"
          className="w-full px-4 py-2 border flex justify-center items-center gap-2"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        >
          <img
            src="/icons/google-icon.png"
            alt="Google Icon"
            width={20}
            height={20}
          />
          כניסה עם גוגל
        </button>
      </Form>
    </div>
  );
}
