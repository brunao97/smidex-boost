import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import SuppressParamsWarning from "@/components/SuppressParamsWarning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smidex Boost",
  description: "Desperte o poder real do seu PC",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/smidex-boost-logo-1765425227304.png?width=64&height=64&resize=contain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload LCP image for faster rendering */}
        <link
          rel="preload"
          as="image"
          href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/smidex-boost-logo-1765425227304.png?width=8000&height=8000&resize=contain"
          fetchPriority="high"
        />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SuppressParamsWarning />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}