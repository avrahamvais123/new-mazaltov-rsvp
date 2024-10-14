"use client";

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
      toast.success("הקישור נשלח בהצלחה", {
        action: {
          label: "סגור",
        },
        actionButtonStyle: {
          color: "white",
          backgroundColor: colors.green[700],
        },
      });
    } catch (error) {
      toast.error(`הקישור לא נשלח בגלל: ${error}`, {
        action: {
          label: "סגור",
        },
        actionButtonStyle: {
          color: "white",
          backgroundColor: colors.red[700],
        },
      });
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
