
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClient from "../components/ui/navbar-client";
import React from "react";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });
export const metadata : Metadata = {
  title: "Irsyad Agung Hidayatullah - Portfolio",
  description: "I am a Front-End and Flutter Developer with a passion for creating beautiful and functional user interfaces.",
  keywords: "Irsyad Agungh, Portfolio, Web Developer, Software Engineer",
  authors: [{ name: "Irsyad Agungh", url: "https://irsyadagungh.com" }],
};



export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" className="w-screen h-screen">
      <Analytics />
      <SpeedInsights />
      <body className={`font-generalSans overflow-x-hidden bg-black`}>
        {/* Hanya tampilkan Navbar & Footer jika bukan halaman admin */}
        <NavbarClient>{children}</NavbarClient>
      </body>
    </html>
  );
}
