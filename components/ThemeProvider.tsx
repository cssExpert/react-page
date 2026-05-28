"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// import type { ReactNode } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypasses the React 19 script-tag warning safely
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
