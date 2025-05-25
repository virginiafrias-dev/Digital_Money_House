import Header from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainSectionWrapper from "@/components/MainSectionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Header />
        {/* <main className="grow bg-brand-black md:bg-brand-green lg:bg-brand-white"> */}
        <MainSectionWrapper>{children}</MainSectionWrapper>
        {/* </main> */}
        <footer className="py-5 bg-brand-gray text-brand-green flex max-md:justify-center">
          <p className="text-[13px] md:pl-5">© 2022 Digital Money House</p>
        </footer>
      </body>
    </html>
  );
}
