import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/Shell";
import { SITE_URL } from "@/data/site";

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

/** What the browser tab says. Kept short because a tab strip truncates hard —
 *  a title carrying the discipline line loses it to an ellipsis anyway. */
const TAB_TITLE = "Tushar Lachman Portfolio";

/** What a pasted link says, which is a different job: the tab is read by
 *  someone already here, the card by someone deciding whether to come. That one
 *  gets the discipline line, since it is the first filter a recruiter applies. */
const TITLE = "Tushar Lachman — Software, Data & AI/ML";

const DESCRIPTION =
  "Computer Science student at RMIT University, minoring in AI & Machine Learning, open to any tech role. Six products built end to end — including a medical practice platform sold on a paid monthly subscription and in daily clinical use in Jakarta.";

/** One 1200×630 card for every page that doesn't set its own. Without it a
 * pasted link renders as a bare grey box in LinkedIn, Slack and mail clients —
 * which is most of the places this link actually gets shared.
 *
 * The card is composed centred rather than left-aligned: WhatsApp shows a link
 * preview as a small centre-cropped square, so a left-aligned name loses its
 * first half. Everything that has to survive sits inside the middle 630×630.
 *
 * The `?v=` is a cache-buster. WhatsApp and LinkedIn key their preview cache on
 * the image URL and hold it for a long time, so a redesign at the same path
 * keeps showing the old card to anyone who has already been sent the link.
 * Bump it whenever the card changes. */
const OG_IMAGE = {
  url: "/og.png?v=5",
  width: 1200,
  height: 630,
  alt: "Tushar Lachman — software, data and AI/ML. Six products built end to end.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TAB_TITLE, template: "%s — Tushar Lachman" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "tech internship",
    "software engineering internship",
    "data internship",
    "machine learning internship",
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
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_AU",
    siteName: "Tushar Lachman",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
