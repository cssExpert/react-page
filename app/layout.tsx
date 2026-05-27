import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";

const interFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feather Editor — Build Beautiful Websites",
  description:
    "A powerful drag-and-drop visual website builder with Tailwind CSS",
  openGraph: {
    title: "Feather Editor — Build Beautiful Websites",
    description:
      "A powerful drag-and-drop visual website builder with Tailwind CSS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // 1. interFont.variable injects '--font-inter' into the DOM
      // 2. 'font-sans' tells Tailwind to use the 'sans' configuration we just added
      className={cn("h-full", "antialiased", interFont.className)}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
