import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { SessionProvider } from "next-auth/react"
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BitLinks - Your trusted URL shortener",
  description: "BitLinks helps you by shortning long Urls",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-50`}
        >
          <Navbar />
          {children}
        </body>
      </SessionWrapper>

    </html>
  );
}
