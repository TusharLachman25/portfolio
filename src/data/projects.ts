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
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'Capacitor', 'Claude API', 'Firebase Cloud Messaging'],
    blurb:
      'I spent three years as a medical assistant digitising patient records by hand. This is the software that replaced that job. It started as something I built for myself to use, and the practice now licenses it on a paid monthly subscription — patients, appointments, billing, insurance claims, clinical documents and messaging in one place, on the web and on Android.',
    highlights: [
      '66 serverless Deno edge functions and 31 PostgreSQL migrations across a TypeScript monorepo — a React dashboard, a shared document library and two Android apps packaged with Capacitor — covered by 269 unit tests.',
      'An insurance claims module that fills insurers’ own reimbursement forms rather than producing a lookalike: PDFs with real form fields are filled by name, and scanned or photographed ones by a percentage-based coordinate map that survives a re-scan at any size.',
      'Nothing is signed until she has read it — the signature and stamp go on only at the moment of approval, so a signed claim she has not seen cannot exist.',
      'WhatsApp Business API integration for bilingual invoices, prescriptions, reminders, appointment booking and claim intake, in English and Bahasa Indonesia.',
      'Notifications for everything worth knowing about: an in-app bell on the laptop and Android push via Firebase Cloud Messaging, configurable per channel.',
      'Claude (Opus 5) runs as an eight-tool assistant that books appointments and produces documents, and drafts consultation reports and medical certificates — always behind a propose-then-approve flow.',
      'Documents carry a server-assigned sequential number issued from an atomic counter, so paperwork cannot be forged or duplicated.',
    ],
    // Captured from the real app running in demo mode, where it falls back
    // to invented patients — so these are genuine screenshots of the
    // product with no clinical data in them. Deliberately no document
    // screenshot: the letterhead carries the doctor's registration numbers,
    // signature seal and bank details.
    shots: [
      { src: '/media/medical-dashboard.png', caption: 'The daily overview' },
      { src: '/media/medical-patients.png', caption: 'Patient record — demo data' },
      { src: '/media/medical-ai.png', caption: 'The assistant, with real tool access' },
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
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Claude API', 'Google Health API', 'Samsung Health', 'Google APIs'],
    blurb:
      'Moving from Jakarta to Melbourne meant my life was split across two countries and about six apps. Jarvis pulls it into a single dark HUD-style command centre: what I have to do today, what is in my calendar, how I have been sleeping and eating, and what my money is doing in two currencies at once.',
    highlights: [
      '38 REST endpoints and 10 PostgreSQL migrations behind a Next.js App Router front end.',
      'A Google OAuth flow with token refresh, syncing Calendar, Tasks and Gmail into one dashboard.',
      'I wear a Fitbit and a Samsung Galaxy Watch 8 Classic, and the two ecosystems do not talk to each other — the Fitbit reports into Google Health, the Galaxy Watch into Samsung Health. Jarvis reconciles both into a single day. Google Health is read live from its API; Samsung Health only offers a file export, so Claude parses that into structured activities and meals.',
      'Re-importing an export can’t duplicate anything: every activity carries the source file’s own record id, so an overlapping second import is a no-op.',
      'Claude also reads uploaded bank statements and Gmail receipts and returns structured transactions — unstructured documents become queryable records.',
      'An AUD-to-IDR remittance tracker that compares the live rate against a 30-day average and flags good windows to transfer money home.',
    ],
    shots: [
      { src: '/media/jarvis-home.png', caption: 'Home — tasks, calendar and both watches in one view' },
      { src: '/media/jarvis-finance.png', caption: 'Finance and remittance — figures anonymised' },
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
    // Shot at phone width and paired on a dark field: it's a portrait
    // mobile app, and a single tall screenshot dropped into a landscape
    // slot is a thin strip stranded in empty space. The squad stopped
    // using the app, so the leaderboard totals are placeholders written
    // into the rendered page — the names, the ranking and the app itself
    // are real.
    shots: [{ src: '/media/lockedin-feed.png', caption: 'Feed, stories and the weekly leaderboard' }],
    video: '/media/lockedin-demo.mp4',
    repo: 'https://github.com/TusharLachman25/workout-tracker',
  },
  {
    slug: 'ai-meal',
    name: 'Kitchen OS',
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

export interface AcademicItem {
  name: string;
  course: string;
  stack: string[];
  blurb: string;
}

/** Coursework, kept deliberately below the projects above: every graduate
 * from the same degree has some of it, so it supports the personal work
 * rather than competing with it. */
export const ACADEMIC: AcademicItem[] = [
  {
    name: 'Cloud Music Web App',
    course: 'Cloud Computing · RMIT',
    stack: ['Python', 'Flask', 'boto3', 'Docker', 'AWS EC2', 'ECS', 'S3', 'DynamoDB'],
    blurb:
      'A Flask REST API backed by DynamoDB and S3, deployed two ways so the trade-off could actually be compared: straight onto an EC2 instance with provisioning scripts, and containerised with Docker and gunicorn on ECS.',
  },
  {
    name: 'The GOAT Debate — social media analytics',
    course: 'Social Media & Network Analytics · RMIT · team project',
    stack: ['Python', 'NetworkX', 'transformers', 'BERTopic', 'gensim', 'NLTK'],
    blurb:
      'A six-stage pipeline over YouTube comment data on football’s greatest-of-all-time argument: collection and EDA, sentiment with VADER and RoBERTa, topic modelling with LDA and BERTopic, then a comment network analysed for betweenness centrality, Louvain communities and homophily — does agreement cluster, or do people actually argue across camps?',
  },
  {
    name: 'Exam timetabling solver',
    course: 'Intelligent Decision Making · RMIT',
    stack: ['Answer Set Programming', 'Clingo', 'Python', 'pytest'],
    blurb:
      'Allocating exams to rooms and timeslots under capacity limits, clashes and per-slot costs — expressed declaratively in ASP and solved with Clingo, then measured against a benchmark suite rather than a single happy case.',
  },
  {
    name: 'Price regression & wildfire classification',
    course: 'Machine Learning · RMIT',
    stack: ['Python', 'scikit-learn', 'pandas', 'Jupyter'],
    blurb:
      'Two supervised-learning studies: predicting listing prices across ~8,600 rows with linear, Ridge and Lasso regression, and a multi-class wildfire problem comparing decision trees, an MLP and an SVM.',
  },
];
