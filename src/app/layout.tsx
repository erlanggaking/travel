import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flamboyan Tour & Travel | OTA Super-App",
  description: "Book flights, hotels, trains, and more with Flamboyan.",
};

import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} min-h-full flex flex-col font-sans bg-background text-foreground`}>
        <SettingsProvider>
          <Header />
          <main className="flex-1 pb-16">{children}</main>
          <WhatsAppFAB />
        </SettingsProvider>
      </body>
    </html>
  );
}
