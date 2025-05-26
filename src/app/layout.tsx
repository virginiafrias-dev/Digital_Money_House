import Header from "@/components/Header/Header";
import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Money House",
  description: "Tu billetera virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Header />
        <main className={clsx("grow relative overflow-y-auto")}>
          {children}
        </main>
        <footer className="py-5 bg-brand-gray text-brand-green flex max-md:justify-center">
          <p className="text-[13px] md:pl-5">© 2022 Digital Money House</p>
        </footer>
      </body>
    </html>
  );
}
