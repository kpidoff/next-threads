"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Bleu plus clair
    },
    secondary: {
      main: "#f50057", // Rose plus vif
    },
    success: {
      main: "#4caf50", // Vert
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export function ThreadProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
