import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/Shell";
import { THEME_COLOR, THEME_META_ID } from "@/components/theme";
import { OG_IMAGE, SITE_URL } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

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
  "Computer Science student at RMIT University, minoring in AI & Machine Learning, open to any tech role. Seven products built end to end — including a medical practice platform sold on a paid monthly subscription and in daily clinical use in Jakarta.";

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

/** A phone's browser bar follows the site's theme, not the phone's. The site
 * is dark unless a visitor chooses otherwise, so keying the bar to
 * prefers-color-scheme, as this used to, put a light bar over a dark page on
 * every phone set to light mode. A visitor who switches the site to light gets
 * a light bar from the boot script below and from setTheme(). */
export const viewport: Viewport = {
  themeColor: THEME_COLOR.dark,
};

/** Runs before the first paint: restores the saved theme and sidebar state,
 * notes whether this is Apple hardware (⌘K or Ctrl K), and marks the document
 * as scripted so the scroll-reveal styles can safely hide elements. Without
 * this the page paints dark, then flips — and a visitor who chose the icon rail
 * gets the full sidebar for a frame on every navigation. */
const BOOT = `(function(){var r=document.documentElement;r.classList.add('js');
try{var p=(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.platform||'';r.dataset.os=/mac|iphone|ipad|ipod/i.test(p)?'mac':'other';}catch(e){}
var t='dark';try{if(localStorage.getItem('tl-theme')==='light')t='light';if(localStorage.getItem('tl-rail')==='1')r.dataset.rail='1';}catch(e){}
r.dataset.theme=t;
if(t==='light'){var m=document.createElement('meta');m.id='${THEME_META_ID}';m.name='theme-color';m.content='${THEME_COLOR.light}';document.head.prepend(m);}})();`;

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
        {/* Page views, referrers and countries — no cookies, so no banner, and
            nothing that identifies a visitor. Only counts on the deployed site;
            `next dev` sends nothing. */}
        <Analytics />
      </body>
    </html>
  );
}
