import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioQuest: Master STEM Concepts Visually with AI + AR",
  description: "BioQuest is an AI-powered STEM learning platform that helps students understand complex science topics with images, videos, interactive quizzes, and AR experiences.",
  icons: {
    icon: "/bio.png", // 👈 logo 图片放在 public/bio.png
  },
  openGraph: {
    title: "BioQuest",
    description: "Visual, AI-guided learning across STEM: biology, physics, chemistry and more.",
    url: "https://yourdomain.com", // 👈 替换成你的实际部署地址
    siteName: "BioQuest",
    images: [
      {
        url: "https://yourdomain.com/bio.png", // 👈 logo 图片公网地址
        width: 800,
        height: 800,
        alt: "BioQuest Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ 用 next/script 注入 GoatCounter */}
        <Script
          data-goatcounter="https://bioquest.goatcounter.com/count"
          strategy="afterInteractive"
          src="//gc.zgo.at/count.js"
        />
        {children}
      </body>
    </html>
  );
}
