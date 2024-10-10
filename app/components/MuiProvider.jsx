"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import colors from "tailwindcss/colors";

const MuiProvider = ({ children }) => {
  // יצירת cache מותאם לכיווניות RTL
  const cacheRtl = createCache({
    key: "mui-rtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createTheme({
    direction: "rtl",
    palette: {
      contrastThreshold: 4.5,
    },
    typography: {
      fontFamily: "Noto Sans Hebrew, sans-serif",
    },
    palette: {
      primary: {
        main: colors.indigo[600], // צבע ראשי - ניתן לשנות לפי הצבע שלך
        contrastText: colors.indigo[50], // צבע הטקסט על הרקע הראשי
      },
      secondary: {
        main: colors.amber[600], // צבע משני
      },
      text: {
        primary: colors.slate[600], // צבע טקסט ראשי
        secondary: colors.slate[400], // צבע טקסט משני
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color: colors.indigo[600], // צבע הטקסט כאשר הפוקוס בשדה הקלט
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: colors.indigo[600], // צבע הקו התחתון בעת פוקוס
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.slate[200], // צבע ברירת המחדל של הבורדר
              },
              "&:hover fieldset": {
                borderColor: colors.slate[300], // צבע ההובר של הבורדר
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.indigo[600], // צבע הבורדר כאשר יש פוקוס
              },
            },
          },
        },
      },
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiProvider;
