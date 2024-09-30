"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";
import localforage from "localforage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const Main = ({ children }) => {
  useEffect(() => {
    // הפעלת localForage רק בצד הלקוח
    if (typeof window !== "undefined") {
      localforage.config({
        driver: localforage.INDEXEDDB, // או localforage.INDEXEDDB או localforage.WEBSQL
        name: "mazaltov-rsvp",
        version: 1.0,
        storeName: "users", // שם ה-store
        description: "נתוני יצירת הזמנה של הלקוח",
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Header />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Main;
