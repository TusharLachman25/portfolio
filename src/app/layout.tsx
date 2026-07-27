import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Computer Science student at RMIT University building full-stack software — a medical practice platform in daily clinical use, a personal life dashboard, and a social fitness app shipped to Android.";

export const metadata: Metadata = {
  title: "Tushar Lachman — Software Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Tushar Lachman — Software Engineer",
    description: DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
