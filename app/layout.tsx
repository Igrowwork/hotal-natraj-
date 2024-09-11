import type { Metadata } from "next";
import "./globals.css";
import { roboto, robotoFlex } from "./fonts";
import { Toaster } from "@/components/ui/toaster";

import Script from "next/script";

export const metadata: Metadata = {
  title: "Hotel Nataraj",
  description: "Beast Hotel in Pachmari",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
