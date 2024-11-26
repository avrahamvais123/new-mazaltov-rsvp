"use client";

import { errorToast, successToast } from "@/app/ui/toasts";
import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

const Passowrd = () => {
  const getAccess = async () => {
    try {
      const res = await axios.post("/api/users/send-access-link");
      console.log("res: ", res);

      /* הודעת אישור שליחה */
      successToast({ text: "הקישור נשלח בהצלחה" });
    } catch (error) {
      errorToast({ text: `הקישור לא נשלח בגלל: ${error}` });
      console.error("error: ", error);
    }
  };

  return (
    <Button variant="contained" onClick={getAccess}>
      שלח קישור
    </Button>
  );
};

export default Passowrd;
