"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import OTPInput from "react-otp-input";
import { errorToast, successToast } from "@/app/ui/toasts";
import ManagementUsers from "./ManagementUsers";

const VerificationCode = () => {
  const { data: session } = useSession();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [OTPValue, setOTPValue] = useState("");

  const Verification = () => {
    const sendVerificationCode = async (email) => {
      try {
        const res = await axios.post("/api/verification-code/send-code", {
          email,
        });
        console.log("res: ", res);
        return res.data;
      } catch (error) {
        console.error("error: ", error);
        throw new Error(
          error.response?.data?.error || "Failed to send verification code"
        );
      }
    };
    const verifyCode = async (email, code) => {
      try {
        const res = await axios.post("/api/verification-code/verify-code", {
          email,
          code,
        });
        console.log("res: ", res);
        return res.data;
      } catch (error) {
        console.log("error: ", error);
        throw new Error(error.response?.data?.error || "Failed to verify code");
      }
    };
    const handleSendCode = async () => {
      try {
        await sendVerificationCode(session?.user?.email);
        setIsCodeSent(true);
        successToast({ text: "קוד האימות נשלח לאימייל שלך" });
      } catch (error) {
        errorToast({ text: error.message });
      }
    };
    const handleVerifyCode = async () => {
      try {
        await verifyCode(session?.user?.email, OTPValue);
        successToast({ text: "הקוד אומת בהצלחה!" });
        setIsCodeVerified(true);
      } catch (error) {
        errorToast({ text: error.message });
      }
    };

    return (
      <>
        <h1>אימות משתמש</h1>
        {!isCodeSent ? (
          <button
            className="bg-indigo-600 text-indigo-50 px-3 py-1 rounded-sm"
            onClick={handleSendCode}
          >
            שלח קוד
          </button>
        ) : (
          <div dir="ltr" className="flex-col-center gap-2">
            <OTPInput
              value={OTPValue}
              onChange={setOTPValue}
              numInputs={6}
              renderSeparator={<span className="w-2" />}
              renderInput={({ style, ...rest }) => {
                return (
                  <input
                    {...rest}
                    className="size-12 text-center text-xl border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                );
              }}
            />

            <button
              className="bg-indigo-600 text-indigo-50 px-3 py-1 rounded-sm"
              onClick={handleVerifyCode}
            >
              אמת קוד
            </button>
          </div>
        )}
      </>
    );
  };

  return <>{!isCodeVerified ? <Verification /> : <ManagementUsers />}</>;
};

export default VerificationCode;
