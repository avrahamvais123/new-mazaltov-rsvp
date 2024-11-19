"use client";

import React from "react";

const EmailTemplate1 = ({ name, code }) => (
  <html>
    <body
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.5",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#4caf50" }}>Welcome, {name}!</h1>
      <p>Your verification code is:</p>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#4caf50",
          padding: "10px",
          border: "1px solid #ddd",
          display: "inline-block",
          borderRadius: "4px",
        }}
      >
        {code}
      </div>
      <p>This code will expire in 10 minutes.</p>
      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
        If you did not request this email, please ignore it.
      </footer>
    </body>
  </html>
);

export default EmailTemplate1;
