"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";

const Main = ({ children }) => {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
};

export default Main;
