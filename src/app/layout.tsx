import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/Shell";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const DESCRIPTION =
  "Computer Science student at RMIT University, minoring in AI & Machine Learning. I build full-stack software end to end — including a medical practice platform sold on a paid monthly subscription and in daily clinical use in Jakarta.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tusharlachman.com"),
  title: {
    default: "Tushar Lachman — Software Engineer",
    template: "%s — Tushar Lachman",
  },
  description: DESCRIPTION,
  keywords: [
    "software engineering internship",
    "graduate software engineer",
    "RMIT",
    "full-stack developer",
    "Melbourne",
    "React",
    "TypeScript",
    "Next.js",
    "Supabase",
  ],
  authors: [{ name: "Tushar Lachman" }],
  openGraph: {
    title: "Tushar Lachman — Software Engineer",
    description: DESCRIPTION,
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Lachman — Software Engineer",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e13" },
    { media: "(prefers-color-scheme: light)", color: "#f1f4f7" },
  ],
};

/** Runs before the first paint: restores the saved theme and sidebar state, and
 * marks the document as scripted so the scroll-reveal styles can safely hide
 * elements. Without this the page paints light, then flips — and a visitor who
 * chose the icon rail gets the full sidebar for a frame on every navigation. */
const BOOT = `(function(){try{var r=document.documentElement;r.classList.add('js');
var t=localStorage.getItem('tl-theme');r.dataset.theme=(t==='light'||t==='dark')?t:'dark';
if(localStorage.getItem('tl-rail')==='1')r.dataset.rail='1';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
