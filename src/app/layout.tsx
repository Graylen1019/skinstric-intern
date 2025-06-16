import type { Metadata } from "next";
import localFont from "next/font/local";
import AOSProvider from "../modules/AOSProvider"

import "./globals.css";

const roobert = localFont({
  src: [
    {
      path: "./fonts/RoobertTRIAL-300.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/RoobertTRIAL-400.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/RoobertTRIAL-500.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/RoobertTRIAL-600.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/RoobertTRIAL-700.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/RoobertTRIAL-900.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Skinstric",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roobert.className} antialiased`}>
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
