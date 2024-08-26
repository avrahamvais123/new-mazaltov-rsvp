// app/auth/signin/page.js
"use client";

import MyForm from "@/app/ui/MyForm";
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

  const inputs = [
    {
      type: "email",
      label: "אימייל",
      required: "זהו שדה חובה",
    },
    {
      type: "password",
      label: "סיסמה",
      required: "זהו שדה חובה",
    },
  ];

  return (
    <div className="size-full flex items-center justify-center">
      <MyForm
        title="כניסה"
        inputs={inputs}
        onSubmit={onSubmit}
        formClassName="max-md:border-0 min-h-96 rounded-none"
      >
        <div className="relative w-full h-[1px] my-4 bg-slate-200">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            או
          </span>
        </div>

        <button // google
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
      </MyForm>
    </div>
  );
}
