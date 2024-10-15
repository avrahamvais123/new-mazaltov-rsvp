"use client";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const SendLinkButton = () => {
  const [email, setEmail] = useState();

  const sendLink = async () => {
    try {
      const res = await axios.post("/api/auth/reset-password", { email });
      console.log("res: ", res);
      toast.success("נשלח לך לינק לאיפוס סיסמה");
    } catch (error) {
      console.log("error: ", error);
      toast.error("אימייל לא נמצא במערכת");
    }
  };

  return (
    <div className="border p-4 rounded flex-center items-end gap-2">
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        size="small"
        label="אימייל"
      />
      <Button
        onClick={sendLink}
        variant="contained"
        className="h-full rounded-sm text-blue-50  px-4 py-2"
      >
        שלח
      </Button>
    </div>
  );
};

export default SendLinkButton;
