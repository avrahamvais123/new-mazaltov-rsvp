"use client";

import React, { useState } from "react";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    let newOtp = [...otp];

    // אם הוזן טקסט ארוך (הדבקה):
    if (value.length > 1) {
      newOtp = value.slice(0, length).split(""); // מחלקים לתווים
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(""));
      return;
    }

    // שינוי תו יחיד:
    newOtp[index] = value.slice(-1); // לוקחים רק את התו האחרון
    setOtp(newOtp);

    if (value && index < length - 1) {
      document.getElementById(`otp-${index + 1}`).focus(); // עוברים לאינפוט הבא
    }

    if (onChange) onChange(newOtp.join(""));
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = pasteData.split(""); // מפצל את הערכים לפי תווים
    setOtp((prevOtp) =>
      newOtp.map((char, idx) => (idx < length ? char : prevOtp[idx]))
    );
    if (onChange) onChange(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (!otp[index] && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus(); // חוזרים לאינפוט הקודם
      }

      if (onChange) onChange(newOtp.join(""));
    }
  };

  return (
    <div
      className="flex space-x-2"
      onPaste={handlePaste} // מאזין להדבקה
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ))}
    </div>
  );
};

export default OTPInput;
