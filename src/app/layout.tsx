import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LandingPage from "./page";
import { AuthProvider } from "@/contexts/ContextAuht";
import { CartProvider } from "../contexts/ContextCart";

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

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Tienda Virtual Noah Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Se asegura de que 'children' esté presente
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
          {children}
        {typeof window !== 'undefined' && window.location.pathname === '/' && (
          <LandingPage />
        )}
        </CartProvider>
        </AuthProvider>
        </body>
    </html>
  );
}
