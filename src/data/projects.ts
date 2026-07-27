export interface Shot {
  /** File under /public/media — drop a screenshot here with this exact name. */
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  /** Short status chip — the strongest thing that can be said about the project. */
  status?: string;
  accent: string;
  stack: string[];
  blurb: string;
  highlights: string[];
  /** Optional 60-90s screen recording under /public/media. */
  video?: string;
  shots: Shot[];
  repo?: string;
  repoNote?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'medical',
    name: 'Medical Practice Management Platform',
    tagline: 'The system a Jakarta family practice runs on every day.',
    period: 'June 2026 — Present',
    status: 'Sold · paid monthly subscription',
    accent: '#38bdf8',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'Capacitor', 'Tailwind CSS'],
    blurb:
      'I spent three years as a medical assistant digitising patient records by hand. This is the software that replaced that job. It started as something I built for myself to use, and the practice now licenses it on a paid monthly subscription — patients, appointments, billing, clinical documents and messaging in one place, on the web and on Android.',
    highlights: [
      'Around 40 serverless Deno edge functions on Supabase, covering authenticated CRUD, atomic document numbering and third-party integrations, backed by PostgreSQL.',
      'A TypeScript monorepo spanning a React dashboard, a shared domain library and two separate Android apps packaged with Capacitor.',
      'WhatsApp Business API integration that sends invoices, prescriptions and appointment reminders bilingually in English and Bahasa Indonesia.',
      'Google Calendar and Drive integration for scheduling and per-patient document storage.',
      'Claude drafts consultation reports and triages patient messages behind a propose-then-approve flow — nothing clinical is ever sent without the doctor reviewing it first.',
      'Documents carry a server-assigned sequential number issued from an atomic counter, so paperwork cannot be forged or duplicated.',
    ],
    shots: [
      { src: '/media/medical-dashboard.png', caption: 'Practice dashboard' },
      { src: '/media/medical-document.png', caption: 'Generated prescription' },
    ],
    repoNote: 'Private repository — it holds real clinical data. Walkthrough available on request.',
  },
  {
    slug: 'jarvis',
    name: 'Jarvis — Personal Life OS',
    tagline: 'One screen for tasks, calendar, health and money as an international student.',
    period: 'June 2026',
    status: '38 API endpoints',
    accent: '#22d3ee',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Claude API', 'Google APIs', 'Tailwind CSS'],
    blurb:
      'Moving from Jakarta to Melbourne meant my life was split across two countries and about six apps. Jarvis pulls it into a single dark HUD-style command centre: what I have to do today, what is in my calendar, how I have been sleeping and eating, and what my money is doing in two currencies at once.',
    highlights: [
      '38 REST endpoints and 10 PostgreSQL migrations behind a Next.js App Router front end.',
      'A Google OAuth flow with token refresh, syncing Calendar, Tasks, Gmail and health data into one dashboard.',
      'Claude reads uploaded bank statements and Gmail receipts and returns structured transactions — unstructured documents become queryable records.',
      'An AUD-to-IDR remittance tracker that compares the live rate against a 30-day average and flags good windows to transfer money home.',
      'Health module tracking steps, heart rate, sleep score and nutrition against calculated goals.',
    ],
    shots: [
      { src: '/media/jarvis-home.png', caption: 'Home — the daily command centre' },
      { src: '/media/jarvis-finance.png', caption: 'Finance and remittance tracking' },
    ],
    repoNote: 'Private — the app is wired to my own bank, email and health data.',
  },
  {
    slug: 'locked-in',
    name: 'Locked In — Social Fitness App',
    tagline: 'A squad-based workout tracker my friends actually use.',
    period: 'April — May 2026',
    status: 'Shipped Android APK',
    accent: '#4ade80',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Gemini API', 'EAS Build', 'Vercel'],
    blurb:
      'Training alone is easy to skip, so I built the accountability in. Locked In is part workout log, part social feed: you post a session, your squad sees it, and the leaderboard keeps everyone honest. Shipped as a real Android APK through EAS with a web build on Vercel.',
    highlights: [
      'Stories, leaderboards, a social feed, direct messaging and push notifications, all on Supabase — Auth, Storage, Realtime subscriptions and row-level security.',
      'Gemini vision reads a workout screenshot straight from your smartwatch app and auto-fills activity, distance, duration, pace and calories. No manual entry.',
      'Distributed as an Android APK via EAS Build, with the web version auto-deploying to Vercel on push to main.',
      'Written up with developer onboarding docs covering environment setup, release builds and schema-migration practice, so friends could contribute.',
    ],
    shots: [
      { src: '/media/lockedin-feed.png', caption: 'Feed and leaderboard' },
      { src: '/media/lockedin-post.png', caption: 'Posting a workout' },
      { src: '/media/lockedin-extract.png', caption: 'Gemini reading a workout screenshot' },
    ],
    video: '/media/lockedin-demo.mp4',
    repo: 'https://github.com/TusharLachman25/workout-tracker',
  },
  {
    slug: 'ai-meal',
    name: 'AI Meal Suggestion',
    tagline: 'Know what is in your pantry, what you can cook, and what it does to your macros.',
    period: 'February — March 2026',
    status: '~3,500 lines of Python',
    accent: '#fbbf24',
    stack: ['Python', 'Streamlit', 'Supabase', 'PostgreSQL', 'Google Gemini', 'pandas', 'Altair'],
    blurb:
      'A pantry, recipe and nutrition tracker built in Python on a relational schema I designed from an entity-relationship diagram. Cook a recipe and it works out what you used and takes it out of your pantry — including converting between grams, millilitres and pieces.',
    highlights: [
      'Automatic pantry deduction when a recipe is cooked, with unit normalisation across weight, volume and count.',
      'A conversational recipe assistant on Gemini with persistent, multi-session chat history.',
      'Photograph a meal and Gemini vision estimates the macros and logs it.',
      'Personalised calorie and macronutrient targets calculated from body metrics and activity level, with daily and weekly history.',
      'Shopping list that flows back into the pantry when items are marked as bought.',
    ],
    shots: [
      { src: '/media/meal-pantry.png', caption: 'Pantry and shopping list' },
      { src: '/media/meal-macros.png', caption: 'Macro tracking' },
    ],
    repo: 'https://github.com/TusharLachman25/AI-Meal-Suggestion',
  },
];

/** Small enough not to warrant a full section, real enough to mention. */
export const ALSO_BUILT =
  'Bets — a React Native and Supabase app for logging and settling informal bets in a friend group.';
