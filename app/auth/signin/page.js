// app/auth/signin/page.js
"use client";

import MyForm from "@/app/ui/MyForm";
import { cn } from "@/lib/utils";
import { userAtom } from "@/lib/jotai";
import { useSetAtom } from "jotai";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const fields = [
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

export default function SignIn() {
  const form = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("errorCode: ", errorCode);

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const setUser = useSetAtom(userAtom);

  const onSubmit = async (data) => {
    const results = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log("results: ", results);

    if (results?.code) {
      setError(results?.code);
    } else {
      router.push("/rsvp");
    }
  };

  useEffect(() => {
    if (errorCode) {
      setError(errorCode);
    }
  }, [errorCode]);

  useEffect(() => {
    if (session) {
      console.log("session: ", session);
      const { user } = session;
      setUser((prev) => ({ ...prev, ...user }));
    }
  }, [session]);

  return (
    <div className="size-full flex-col-center bg-slate-50">
      <div
        className={cn(
          "size-full flex-col-center gap-2",
          "md:h-fit md:max-w-96",
          "bg-white rounded-sm p-4"
        )}
      >
        <h2 className="text-2xl text-center text-slate-400 font-bold">כניסה</h2>
        <span className="text-xs text-center text-slate-400">
          משתמש שנרשם דרך גוגל יש להיכנס רק דרך גוגל ומי שנרשם ידנית עם מייל
          וסיסמה צריך להיכנס גם כן רק בדרך זו
        </span>

        <MyForm
          title="כניסה"
          form={form}
          fields={fields}
          onSubmit={onSubmit}
          submitName="כניסה"
          classNames={{
            form: "pt-4",
            fields: "rounded-sm",
          }}
          customSubmit={
            <button
              type="submit"
              className="w-full p-2 mt-5 text-lg bg-indigo-600 text-indigo-50 rounded-sm"
            >
              כניסה
            </button>
          }
          success={success}
          error={error}
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
            onClick={async () =>
              signIn("google", {
                callbackUrl: "/rsvp",
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

        {/* להרשמה */}
        <span className="text-xs text-center text-slate-400">
          עדיין לא רשומים לחצו
          <button
            type="button"
            className="mr-1 text-indigo-600"
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            כאן
          </button>
        </span>
      </div>
    </div>
  );
}
