"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import { SessionProvider } from "next-auth/react";
import localforage from "localforage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Script from "next/script";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Create a client
const queryClient = new QueryClient();

const Main = ({ children }) => {
  // הפעלת localForage רק בצד הלקוח
  useEffect(() => {
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

  useEffect(() => {
    console.log("start fetch");

    let startTime;
    let ip = "";

    // קבלת ה-IP באמצעות שירות חיצוני (ipify)
    const fetchIP = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        ip = res.data.ip;
        startTime = Date.now(); // זמן התחלת הביקור
        console.log("res: ", res);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    // קריאה לפונקציה שמבצעת מעקב
    fetchIP();

    return () => {
      // בעת יציאה מהעמוד, מדוד זמן שהייה ושלח את המידע
      if (startTime && ip) {
        console.log("startTime, ip: ", startTime, ip);
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - startTime) / 1000); // זמן בשניות
        const referrer = document.referrer || "Direct"; // מקור הכניסה (referrer)
        const page = window.location.pathname; // העמוד הנוכחי
        console.log("Preparing to send data:", {
          ip,
          page,
          referrer,
          timeSpent,
          timestamp,
        });

        // שלח את המידע ל-API Route
        axios
          .post("/api/track/visit", {
            ip,
            page,
            referrer,
            timeSpent,
            timestamp: Date.now(),
          })
          .then((response) => {
            console.log("Response from server:", response.data);
          })
          .catch((error) => {
            console.error(
              "Error in POST request:",
              error.response ? error.response.data : error.message
            );
          });
      }
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </QueryClientProvider>

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default Main;

{
  /* <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CB51VN5VVC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CB51VN5VVC');
</script> */
}

/* import LogRocket from "logrocket";

LogRocket.init("uznzme/mazaltov-rsvp");

// This is an example script - don't forget to change it!
LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
  name: "James Morrison",
  email: "jamesmorrison@example.com",

  // Add your own custom user variables here, ie:
  subscriptionType: "pro",
}); */
