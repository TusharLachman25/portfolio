/** One screenshot slot. The file lives under /public/media with this exact name.
 * `title` names the screen in a few words and `caption` explains what is in it —
 * both sit above the image, so you know what you are looking at before you
 * look at it. */
export interface Shot {
  src: string;
  title: string;
  caption: string;
}

/** One feature, walked through end to end. A single screenshot proves a screen
 * exists; a sequence proves the thing actually works — which is the question a
 * recruiter is really asking. */
export interface Flow {
  title: string;
  /** One line on what the sequence below is doing, and why it matters. */
  caption: string;
  steps: Shot[];
}

/** A numbered stat shown in the metrics band on a project sheet, and in
 * miniature on the home-page card. Every value here is countable in the
 * repository it describes — nothing is rounded up for effect. */
export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  /** Full title, used as the page heading. */
  name: string;
  /** Sidebar and command-palette label — the full name is too long for a 262px rail. */
  short: string;
  tagline: string;
  period: string;
  /** Discipline label above the title: what kind of thing this is. */
  kind: string;
  /** Short status chip — the strongest true thing that can be said about it. */
  status: string;
  role: string;
  accent: string;
  /** Square app mark under /public/logos. Medical and Locked In are the real
   * shipped app icons; the rest are drawn to match, because those projects
   * never had one. */
  logo: string;
  /** The architecture, top to bottom. Rendered as a labelled spine (L00, L01…). */
  layers: string[];
  stack: string[];
  metrics: Metric[];
  blurb: string;
  /** "The hard parts" — the decisions worth asking about in an interview. */
  highlights: string[];
  /** A trailer, shown above the walkthrough where both exist: the trailer
   * earns the attention, the recording proves the thing is real. */
  trailer?: string;
  trailerPoster?: string;
  /** What the trailer actually shows. Without this every trailer gets the same
   * generic caption and the viewer has to guess what they are watching. */
  trailerNote?: string;
  /** Optional 60-90s screen recording under /public/media. */
  video?: string;
  /** Idle frame for the video. Without one the browser shows frame 0,
   * which on a screen recording is the app mid-load — a blank white
   * rectangle sitting in the middle of the page. */
  poster?: string;
  /** Overrides the default caption under the recording, for the cases where
   * "full walkthrough" would overstate what the take actually shows. */
  videoNote?: string;
  /** Loose screenshots, for projects not yet walked through feature by feature. */
  shots: Shot[];
  /** Step-by-step sequences, grouped by feature. Where a project has these they
   * replace the flat list above. */
  flows?: Flow[];
  /** What is and isn't real in the captures. Kept deliberately — a recruiter
   * who spots invented data in a screenshot stops believing the rest of it. */
  note?: string;
  repo?: string;
  repoNote?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'medical',
    name: 'Medical Practice Management Platform',
    short: 'Medical Platform',
    tagline: 'The system a Jakarta family practice runs on every day.',
    period: 'June 2026 — Present',
    kind: 'CLINICAL SAAS',
    status: 'Sold · paid subscription',
    role: 'Solo — design, build, ship, support',
    accent: '#38bdf8',
    logo: '/logos/medical.svg',
    layers: [
      'React + Vite dashboard (TypeScript)',
      'Two Android apps wrapped with Capacitor',
      '66 Deno edge functions — the only privileged write path',
      'PostgreSQL on Supabase · 31 migrations',
      'Claude assistant with eight tools, behind approval',
      'WhatsApp Business via Twilio',
      'Google Drive + Calendar (service account and OAuth)',
      'Firebase Cloud Messaging push · in-app bell',
      '269 unit tests across 17 files',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'Deno',
      'Capacitor',
      'Claude API',
      'Twilio',
      'Firebase Cloud Messaging',
      'Tailwind CSS',
      'Vitest',
    ],
    metrics: [
      { value: '66', label: 'edge functions' },
      { value: '31', label: 'migrations' },
      { value: '269', label: 'unit tests' },
      { value: '2', label: 'android apps' },
    ],
    blurb:
      'I spent three years as a medical assistant digitising patient records by hand. This is the software that replaced that job. It started as something I built for myself to use, and the practice now licenses it on a paid monthly subscription — patients, appointments, billing, insurance claims, clinical documents and messaging in one place, on the web and on Android.',
    highlights: [
      'A TypeScript monorepo on npm workspaces: a React dashboard, a second Android app, a shared package holding the document templates, and a standalone ingestion tool — 66 serverless Deno edge functions and 31 PostgreSQL migrations behind them, covered by 269 unit tests.',
      'The browser only ever holds the read-only anon key. Every write goes through an edge function, so the privileged path is a list of 66 named operations rather than a database the client can reach — a stolen key from a laptop in a consulting room reads nothing it should not and writes nothing at all.',
      'An insurance claims module that fills insurers’ own reimbursement forms rather than producing a lookalike: PDFs with real form fields are filled by name, and scanned or photographed ones by a percentage-based coordinate map that survives a re-scan at any size.',
      'Nothing is signed until she has read it — the signature and stamp go on only at the moment of approval, so a signed claim she has not seen cannot exist.',
      'Documents carry a server-assigned sequential number issued from an atomic counter, so paperwork cannot be forged or duplicated.',
      'The document templates live in one shared package because they used to be a copy each. The dashboard learned to take the signature and stamp from Settings and the phone app did not, so the same prescription carried a different seal depending on which one produced it. Sharing the code was the fix; the bug is the reason the package exists.',
      'A second Android app, “Varkha Documents”, that writes one document and shares it and can do nothing else — installed alongside the dashboard, with its own icon and session, for the times she needs a prescription on a phone and nothing more.',
      'WhatsApp Business through Twilio for bilingual invoices, prescriptions, reminders, appointment booking and claim intake, in English and Bahasa Indonesia.',
      'Notifications land where they can actually be seen: an in-app bell on the laptop, because the dashboard is already open and a popup would interrupt a consult, and Android push through Firebase for the phone, which is usually closed. Every kind can be switched off per channel.',
      'Claude runs as an eight-tool assistant that books appointments, produces documents and drafts consultation reports and medical certificates — always proposing, never committing, until she approves.',
      'Patient files are never committed and never cached locally. Google Drive is the authoritative store through a service account; Supabase holds only the structured data extracted alongside it.',
      'The tests are pure logic by design — scheduling, date maths across the Jakarta timezone, document rendering — and linting is deliberately kept out of the build, because a lint error should never be the reason a document cannot be issued.',
    ],
    // Captured from the real app running in demo mode, where it falls back
    // to invented patients — so these are genuine screenshots of the
    // product with no clinical data in them. Deliberately no document
    // screenshot: the letterhead carries the doctor's registration numbers,
    // signature seal and bank details.
    trailer: '/media/medical-trailer.mp4',
    trailerPoster: '/media/medical-trailer-poster.jpg',
    trailerNote:
      'A tour of the whole product in about a minute — the daily dashboard, a patient record, booking an appointment, producing a document, an insurance claim, and the assistant proposing work for approval.',
    video: '/media/medical-demo.mp4',
    poster: '/media/medical-demo-poster.jpg',
    videoNote:
      'A working morning, uncut and at real speed, through every part of the app: check the day, look at the week, open the patient who is due, read her record and history, write the consultation up, answer WhatsApp, see what the practice can issue, chase what is unpaid, review the insurance claim waiting for a signature, and hand the follow-up booking to the assistant.',
    shots: [],
    flows: [
      {
        title: 'A day at the practice',
        caption:
          'What the doctor sees when she sits down, and how she gets from the day, to the week, to a new booking.',
        steps: [
          {
            src: '/media/medical-overview.png',
            title: 'Open the dashboard',
            caption:
              'Who is booked today, what is waiting for approval, unread WhatsApp, and the day’s schedule with each appointment marked done, running, or still to come.',
          },
          {
            src: '/media/medical-appointments.png',
            title: 'Look at the week',
            caption:
              'Available hours shaded, the current time drawn across today, video consults flagged. Bookings made here sync to the doctor’s own Google Calendar.',
          },
          {
            src: '/media/medical-day.png',
            title: 'Zoom into one day',
            caption:
              'The same calendar at a single day’s resolution, for when the week view is too coarse to see the gaps.',
          },
          {
            src: '/media/medical-booking.png',
            title: 'Book someone in',
            caption:
              'Pick or create the patient, choose in person or online, and decide whether they get told. Left ticked, they get a WhatsApp confirmation now, a reminder ten minutes before, and the ability to move or cancel by replying.',
          },
        ],
      },
      {
        title: 'Seeing a patient',
        caption:
          'From the patient list to a written-up consultation — the path this software exists to shorten.',
        steps: [
          {
            src: '/media/medical-patients-list.png',
            title: 'Find the patient',
            caption:
              'Everyone on the books, filterable by active or review-due, with the last time each was seen.',
          },
          {
            src: '/media/medical-patients.png',
            title: 'Read the record',
            caption:
              'Vitals, allergies, problem list, current medications and the last clinical note — the things you want before you say hello. Every patient shown is invented.',
          },
          {
            src: '/media/medical-history.png',
            title: 'Check the history',
            caption:
              'Past visits and events in order, so a recurring complaint is visible rather than remembered.',
          },
          {
            src: '/media/medical-files.png',
            title: 'Open their documents',
            caption:
              'Everything issued for this patient, plus any files synced from the practice’s Drive. Demo patients have none, and the app says so rather than pretending otherwise.',
          },
          {
            src: '/media/medical-consult.png',
            title: 'Write the consult up',
            caption:
              'The record stays open on the left while the note is written on the right, and the allergy alert follows you down the page. The note attaches to the appointment it belongs to.',
          },
        ],
      },
      {
        title: 'Issuing a document, start to finish',
        caption:
          'Five document types, one shared template package, and a preview that is literally the file that gets sent.',
        steps: [
          {
            src: '/media/medical-documents.png',
            title: 'Pick the type',
            caption:
              'Invoice, receipt, prescription, medical certificate or referral letter — each with a note on when it is the right one to send. Everything already issued sits in the library underneath, newest first.',
          },
          {
            src: '/media/medical-doc-editor.png',
            title: 'Fill in the four things it needs',
            caption:
              'Patient, description, amount, date — and the document re-renders beside you as you type, so what is being edited and what will be sent cannot drift apart. The blurred lines are the doctor’s registration numbers and phone.',
          },
          {
            src: '/media/medical-doc-invoice.png',
            title: 'The document that comes out',
            caption:
              'Bilingual by design — INVOICE and TAGIHAN — on the practice letterhead, itemised, totalled, with payment details and the signature block. On approval it takes a server-assigned sequential number from an atomic counter, so two documents can never share one. Registration numbers, bank accounts and the signature seal are blurred; everything else is exactly what a patient receives.',
          },
          {
            src: '/media/medical-thread.png',
            title: 'It arrives on their phone',
            caption:
              'Sent into the patient’s WhatsApp thread and attached to it, so the message and the invoice it refers to stay together instead of the thread saying “here’s your invoice” with no invoice anywhere near it.',
          },
        ],
      },
      {
        title: 'WhatsApp, and how much the assistant may do',
        caption:
          'Patients message the practice on WhatsApp. Every contact has its own leash, and the assistant hands over anything it should not be answering.',
        steps: [
          {
            src: '/media/medical-messages.png',
            title: 'The inbox, triaged',
            caption:
              'Conversations needing a human are grouped above the ones the assistant is handling alone, so the list reads as a work queue rather than a wall of chats.',
          },
          {
            src: '/media/medical-manual.png',
            title: 'Manual — the assistant stands down',
            caption:
              'A contact switched to Manual gets no automated replies at all. The banner says so outright, because a doctor needs to know whether a patient is being answered without her.',
          },
          {
            src: '/media/medical-ai.png',
            title: 'Suggest — drafts held for approval',
            caption:
              'Auto replies straight away, Suggest writes and waits, Manual steps back entirely. Anything clinical the assistant cannot answer from the practice’s own details gets handed to a person and surfaces here.',
          },
        ],
      },
      {
        title: 'Getting paid, and getting reimbursed',
        caption:
          'Two different problems: chasing what patients owe, and filling in what insurers demand before they pay.',
        steps: [
          {
            src: '/media/medical-payments.png',
            title: 'Every invoice and where it stands',
            caption:
              'What was billed, what is outstanding, when the next reminder goes out. A transfer receipt sent over WhatsApp moves a bill to “needs review” rather than marking it paid — a photo of a transfer is a claim, not a confirmation.',
          },
          {
            src: '/media/medical-unpaid.png',
            title: 'Chase what is unpaid',
            caption:
              'Filter to the ones still owing and send a reminder now instead of waiting for the nightly sweep. The server refuses to chase a bill that is already settled, or one with no number on it.',
          },
          {
            src: '/media/medical-claims.png',
            title: 'Claims waiting on her',
            caption:
              'A patient sends their insurer’s own form over WhatsApp and it comes back here, already filled in from the visit and the consultation note.',
          },
          {
            src: '/media/medical-claim.png',
            title: 'Nothing is signed until she has read it',
            caption:
              'The answers on the left, the insurer’s own form filled in on the right — and the signature and stamp boxes still empty, because they go on only when she presses Sign & stamp. A signed claim she has not seen cannot exist. The form here is a stand-in drawn for the demo, from an insurer that does not exist; the real ones are scans the practice receives from patients.',
          },
        ],
      },
      {
        title: 'The parts nobody demos',
        caption:
          'What the assistant is allowed to tell patients, when the practice is open, and where each kind of notification lands.',
        steps: [
          {
            src: '/media/medical-settings.png',
            title: 'Settings',
            caption:
              'Who the practice replies as, what the WhatsApp assistant may tell patients, when the doors are open, and notifications per kind and per channel — the bell on the laptop, push on the phone. “The assistant replied on its own” is bell-only by default: it happens often enough that push would become noise. The blurred line is her email address.',
          },
        ],
      },
    ],
    note:
      'All captured from the real app running in its demo mode, which starts with no database credentials at all: it skips the login and physically cannot reach the practice’s data. Every patient, message, invoice, claim and document here is invented — the eight demo patients the app ships with, plus stand-in rows written for the screens that normally read from the live backend, so they could be photographed without touching anything real. The insurance form is likewise a mock-up, drawn for the demo from an insurer that does not exist. The doctor’s own details are blurred wherever they appear: her name, the hospital she practises at, her registration and licence numbers, phone, bank accounts, email and signature seal. Beyond that nothing has been retouched — every layout, control and state is the software as it ships.',
    repoNote: 'Private repository — it holds real clinical data. Walkthrough available on request.',
  },
  {
    slug: 'jarvis',
    name: 'Jarvis — Personal Life OS',
    short: 'Jarvis',
    tagline: 'One screen for tasks, calendar, health and money as an international student.',
    period: 'June 2026',
    kind: 'PERSONAL DASHBOARD',
    status: '38 API endpoints',
    role: 'Solo — design, build, ship',
    accent: '#22d3ee',
    logo: '/logos/jarvis.svg',
    layers: [
      'Next.js App Router front end',
      '38 REST endpoints',
      'PostgreSQL on Supabase · 10 migrations',
      'Google OAuth — Calendar, Tasks, Gmail',
      'Google Health, read live from its API',
      'Samsung Health, parsed from a file export',
      'Claude document parsing for statements and receipts',
      'AUD↔IDR rate tracker with a 30-day baseline',
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Claude API',
      'Google Health API',
      'Samsung Health',
      'Google APIs',
      'SWR',
    ],
    metrics: [
      { value: '38', label: 'rest endpoints' },
      { value: '10', label: 'migrations' },
      { value: '2', label: 'wearable ecosystems' },
      { value: '2', label: 'currencies' },
    ],
    blurb:
      'Moving from Jakarta to Melbourne meant my life was split across two countries and about six apps. Jarvis pulls it into a single dark HUD-style command centre: what I have to do today, what is in my calendar, how I have been sleeping and eating, and what my money is doing in two currencies at once.',
    highlights: [
      '38 REST endpoints and 10 PostgreSQL migrations behind a Next.js App Router front end, grouped by the thing they serve — auth, calendar, tasks, health, finance, fx, profile.',
      'A Google OAuth flow with token refresh, syncing Calendar, Tasks and Gmail into one dashboard.',
      'I wear a Fitbit and a Samsung Galaxy Watch 8 Classic, and the two ecosystems do not talk to each other — the Fitbit reports into Google Health, the Galaxy Watch into Samsung Health. Jarvis reconciles both into a single day: Google Health read live from its API, Samsung Health’s file export parsed by Claude into structured activities and meals.',
      'Re-importing an export can’t duplicate anything: every activity carries the source file’s own record id, so an overlapping second import is a no-op rather than a double-counted run.',
      'Claude also reads uploaded bank statements and Gmail receipts and returns structured transactions — unstructured documents become queryable records.',
      'The money side tracks both currencies separately and honestly: AUD statements and transactions, IDR statements from home, tuition instalments, and email-synced receipts, each with their own ingestion path.',
      'An AUD-to-IDR remittance tracker that compares the live rate against a 30-day average and flags good windows to transfer money home, with a log of what was actually sent and what arrived.',
      'The health surface is more than a step count: a day view, a weekly roll-up, resting and latest heart rate, body measurements over time, and nutrition synced from the same export.',
    ],
    // Cut from the walkthrough below, with two built scenes: the opening, and
    // the two-wearable story that no single screen shows well.
    trailer: '/media/jarvis-trailer.mp4',
    trailerPoster: '/media/jarvis-trailer-poster.jpg',
    trailerNote:
      'The whole product in under forty seconds — the day on one grid, the two-watch reconciliation, the live transfer rate against its 30-day average, and Claude turning a bank statement PDF into transactions waiting for approval.',
    video: '/media/jarvis-demo.mp4',
    poster: '/media/jarvis-demo-poster.jpg',
    videoNote:
      'The app driven end to end, uncut and at real speed: read the day, look ahead a week and a month, book something in, check both wearables, then the money — the tuition goal, a transfer logged, a statement uploaded for Claude to read, and the Indonesian side of the accounts.',
    shots: [],
    flows: [
      {
        title: 'One screen for the whole day',
        caption:
          'What I actually open in the morning: what has to be done, what is booked, how I slept and what the money is doing — without opening six apps to find out.',
        steps: [
          {
            src: '/media/jarvis-day.png',
            title: 'Open it',
            caption:
              'Tasks on the left, today’s calendar in the middle, health and net balance on the right, and the AUD/IDR rate along the top. The one thing worth doing today is pulled out of the task list and put in the middle of the screen.',
          },
          {
            src: '/media/jarvis-week.png',
            title: 'Look ahead a week',
            caption:
              'The same calendar at seven days, with the current time drawn across today and dated tasks carried up into the all-day row — so a deadline sits next to the hours it has to fit into.',
          },
          {
            src: '/media/jarvis-month.png',
            title: 'And a month',
            caption:
              'For the things that are further out than a week: the month grid, with each day’s events stacked and overflow collapsed to a count.',
          },
          {
            src: '/media/jarvis-calendars.png',
            title: 'Three calendars, one grid',
            caption:
              'Personal, RMIT and Fitness are separate Google calendars with their own colours. Which ones are drawn is a preference the server remembers, so the grid opens the way it was left.',
          },
          {
            src: '/media/jarvis-event.png',
            title: 'Book something in',
            caption:
              'Title, which calendar it belongs to, date and time. It is written straight to Google Calendar through the OAuth token, so it exists on the phone before the dialog has closed.',
          },
          {
            src: '/media/jarvis-profile.png',
            title: 'Who it thinks you are',
            caption:
              'The operator card is editable in place — the name, the course and the city that the greeting and the timezone line are built from.',
          },
        ],
      },
      {
        title: 'Both watches, one day',
        caption:
          'I wear a Fitbit and a Galaxy Watch 8 Classic. They report into two ecosystems that do not talk to each other, and this is the screen that makes them agree.',
        steps: [
          {
            src: '/media/jarvis-health.png',
            title: 'The day, measured',
            caption:
              'Nine panels on one page: rings, the activity breakdown, heart, sleep staged deep to awake, body composition, nutrition, a seven-day step history, the day’s workouts and the weekly active-zone total. Google Health arrives live from its API; Samsung Health arrives as a file export Claude has parsed.',
          },
          {
            src: '/media/jarvis-heart.png',
            title: 'Heart, in detail',
            caption:
              'Every card opens. Resting rate, HRV and VO₂ max over the full day’s trace — and a line underneath saying what the number means against the seven-day average, because 54 bpm on its own is not information.',
          },
          {
            src: '/media/jarvis-body.png',
            title: 'Body, over five weeks',
            caption:
              'Weight, body fat and BMI logged fortnightly and charted, with the movement across the whole set summarised in one line at the bottom.',
          },
        ],
      },
      {
        title: 'Money in Australian dollars',
        caption:
          'Half of my money is here and half is at home, and they need to be looked at differently. This is the Australian half: what is in the accounts, what is owed to the university, and what left this month.',
        steps: [
          {
            src: '/media/jarvis-aud.png',
            title: 'Where the money is',
            caption:
              'The live AUD→IDR rate against its own 30-day average, the transfers already sent, and the four numbers that matter: tuition due, spent this month, runway, and the average monthly burn.',
          },
          {
            src: '/media/jarvis-accounts.png',
            title: 'Accounts, and what left them',
            caption:
              'Everyday and savings totalled together, the transactions parsed out of uploaded statements, and a per-period history of what each account opened and closed at.',
          },
          {
            src: '/media/jarvis-tuition.png',
            title: 'The bill that matters',
            caption:
              'Tuition is tracked as its own goal rather than as another outgoing: an amount, a due date, and how much of it the current balance already covers.',
          },
          {
            src: '/media/jarvis-transfer.png',
            title: 'Log what was actually sent',
            caption:
              'A remittance is two numbers — rupiah out, dollars in — and the rate is whatever fell out of them. Recording both is what makes the transfer log honest about the rate actually received, rather than the rate advertised.',
          },
        ],
      },
      {
        title: 'Where the numbers come from',
        caption:
          'Banks send PDFs, not APIs. Claude reads the PDF; a person still approves what it found.',
        steps: [
          {
            src: '/media/jarvis-upload.png',
            title: 'Hand it the statement',
            caption:
              'Upload the PDF the bank actually sent. The dialog says up front what happens next, including that nothing is written until it has been reviewed. The bank on this one does not exist.',
          },
          {
            src: '/media/jarvis-review.png',
            title: 'Check it before it is saved',
            caption:
              'Account, period, opening and closing balance, and six transactions with dates, descriptions, direction and amounts — all extracted, all editable, none of it saved. An extraction is a proposal, not a fact.',
          },
        ],
      },
      {
        title: 'The other half, at home in rupiah',
        caption:
          'The Indonesian side is a different problem: a different bank, a different currency, and receipts that arrive by email rather than in a statement.',
        steps: [
          {
            src: '/media/jarvis-idr.png',
            title: 'Switch countries',
            caption:
              'The same page in rupiah, with its own spend and runway. The remittance card stays put at the top, because it is the one thing that belongs to both sides at once.',
          },
          {
            src: '/media/jarvis-idr-accounts.png',
            title: 'Statements and synced email together',
            caption:
              'Transactions from uploaded statements and from Gmail receipts land in the same list, marked as coming from either, with the same per-period history underneath.',
          },
        ],
      },
    ],
    note:
      'Every task, event, figure, transaction and health reading in these captures is invented. Jarvis is wired to my own bank, inbox and health accounts, so rather than seed a database or edit the app to make it presentable, the capture harness replaces the browser’s own fetch before any application code runs: the dashboard asks for /api/… exactly as it always does and gets made-up JSON back. The dev server is started with synthetic credentials as well, so no real account is reachable even in principle, and the repository itself is not modified at all. The bank on the uploaded statement does not exist either. My own name and course are the one real thing left on screen, and only because they are already the title of this site. Beyond the invented data nothing is retouched — every layout, control and state is the app exactly as it runs.',
    repo: 'https://github.com/TusharLachman25/jarvis-life-os',
  },
  {
    slug: 'locked-in',
    name: 'Locked In — Social Fitness App',
    short: 'Locked In',
    tagline: 'A squad-based workout tracker my friends actually installed.',
    period: 'April — May 2026',
    kind: 'SOCIAL MOBILE APP',
    status: 'Shipped Android APK',
    role: 'Solo — design, build, ship',
    accent: '#4ade80',
    logo: '/logos/locked-in.png',
    layers: [
      'React Native on Expo SDK 54',
      'Supabase Auth · Storage · Realtime',
      'Row-level security on every table',
      'Postgres triggers → Expo Push via pg_net',
      'Gemini vision extraction from a screenshot',
      'EAS Build → Android APK',
      'Vercel web build on push to main',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Gemini API', 'EAS Build', 'Vercel'],
    metrics: [
      { value: '5k', label: 'lines of typescript' },
      { value: '2', label: 'platforms — apk + web' },
      { value: '1', label: 'screenshot to log a session' },
    ],
    blurb:
      'Training alone is easy to skip, so I built the accountability in. Locked In is part workout log, part social feed: you post a session, your squad sees it, and the leaderboard keeps everyone honest. Shipped as a real Android APK through EAS with a web build on Vercel.',
    highlights: [
      'Around 5,000 lines of TypeScript across twelve modules — feed, profile, posting, search, inbox, chat, notifications, auth — on Supabase Auth, Storage, Realtime subscriptions and row-level security.',
      'Gemini vision reads a workout screenshot straight from your smartwatch app and auto-fills activity, distance, duration, pace and calories. No manual entry, because manual entry is where a fitness app dies.',
      'Push notifications are sent by the database, not the app: a Postgres trigger calls the Expo Push Service through pg_net, so a like or a comment notifies whether or not anyone has the app open.',
      'Web push is deliberately not implemented. It is fragile enough on iOS Safari that shipping it would have meant supporting something that quietly fails for half the squad.',
      'Schema changes are additive on purpose. Old APKs are already on people’s phones and will ignore a new column, but a rename or a drop breaks them — so nothing gets renamed once it has shipped.',
      'Realtime is opt-in per table through the supabase_realtime publication, so a new table has to be added deliberately rather than silently broadcasting.',
      'Distributed as an Android APK via EAS Build, with the web version auto-deploying to Vercel on push to main.',
      'Written up with developer onboarding docs covering environment setup, release builds and schema-migration practice, so friends could contribute without me in the room.',
    ],
    // Shot at phone width and paired on a dark field: it's a portrait
    // mobile app, and a single tall screenshot dropped into a landscape
    // slot is a thin strip stranded in empty space.
    trailer: '/media/lockedin-trailer.mp4',
    trailerPoster: '/media/lockedin-trailer-poster.jpg',
    trailerNote:
      'Twenty-five seconds of the thing that makes it work: the weekly leaderboard re-ranking the squad, a session posted and commented on, a watch screenshot turned into stats, and the roast waiting for whoever trained nothing.',
    video: '/media/lockedin-demo.mp4',
    poster: '/media/lockedin-demo-poster.jpg',
    videoNote:
      'The app driven end to end on a phone, uncut and at real speed: sort the week by points, duration and calories, open a row into its session log, read a story and its comments, see who watched yours, log a session from a watch screenshot and then build one by hand, find someone outside the squad, and finish in the group chat and the notifications.',
    shots: [],
    flows: [
      {
        title: 'The week, and who won it',
        caption:
          'The whole point of the app is the table at the bottom of the feed. Training alone is easy to skip; being seventh is not.',
        steps: [
          {
            src: '/media/lockedin-feed.png',
            title: 'Open it',
            caption:
              'Squad stories along the top — a gradient ring for one you have not watched, grey for one you have — and the week ranked underneath. The same week by points on the left and by duration on the right: Marcus trains the longest hours of anyone and is still fourth, because points reward the effort a minute actually costs.',
          },
          {
            src: '/media/lockedin-rankings.png',
            title: 'Where a number came from',
            caption:
              'A row opens into that person’s week, session by session, with what each one was worth. The rules behind those numbers are on the right, including the thing that has to be said out loud in a squad spread across four time zones: the leaderboard resets at 00:00 UTC, which is Monday 10am in Melbourne and Sunday 8pm in Toronto.',
          },
        ],
      },
      {
        title: 'Stories, and who watched them',
        caption:
          'A session posts as a story that expires. It is the part people actually open, so it carries the likes, the comments and — if it is yours — the list of who has seen it.',
        steps: [
          {
            src: '/media/lockedin-stories.png',
            title: 'Someone else’s session',
            caption:
              'Tap a ring and the session plays with a progress bar per story, the activity and its numbers on the card. The comment thread opens underneath without leaving the story.',
          },
          {
            src: '/media/lockedin-story-mine.png',
            title: 'And your own',
            caption:
              'Your own story gets a viewer count instead of a comment box. Tap it and you get the list, most recent first — the read receipt that makes skipping a week uncomfortable.',
          },
        ],
      },
      {
        title: 'Two ways to log a session',
        caption:
          'Manual entry is where a fitness app dies. The first path is a screenshot and nothing else; the second is for the sessions no watch recorded.',
        steps: [
          {
            src: '/media/lockedin-upload.png',
            title: 'Screenshot your watch',
            caption:
              'Upload the summary screen from Strava, Apple Fitness or Samsung Health. Gemini reads the image and returns activity, distance, duration, pace and calories as structured fields — the image posts as it is, and the stats land in the database behind it.',
          },
          {
            src: '/media/lockedin-custom.png',
            title: 'Or build it by hand',
            caption:
              'Twelve activities, each with its own form: a run asks for distance and pace, a gym session asks for duration and a focus. Picking the activity changes which fields are required, because a swim measured in minutes is not a swim.',
          },
          {
            src: '/media/lockedin-custom-post.png',
            title: 'Then see it before it posts',
            caption:
              'The card is composed live — background, activity, the SQUAD badge and your note burnt in — and the date and time can be overridden, for the session you are logging the morning after.',
          },
        ],
      },
      {
        title: 'The squad',
        caption:
          'A closed group rather than a network: you see the people you follow, and nobody else sees you.',
        steps: [
          {
            src: '/media/lockedin-search.png',
            title: 'Find someone',
            caption:
              'Search by name or username across everyone, with the follow state resolved per row. Following someone puts them in your feed and on your leaderboard from that week onward.',
          },
          {
            src: '/media/lockedin-profile.png',
            title: 'Your own page, and what it may nag you about',
            caption:
              'Every session you have posted as a grid. Settings is the honest part: dark mode, and a switch for each notification the database is allowed to send you — including the 9am roast.',
          },
        ],
      },
      {
        title: 'Talking about it, and being told off',
        caption:
          'The two things that bring people back: the group chat, and the app noticing when you have done nothing.',
        steps: [
          {
            src: '/media/lockedin-chat.png',
            title: 'The group chat',
            caption:
              'Direct messages and a squad room in the same inbox, with unread state per participant. Sessions can be shared straight into a thread, so a post and the argument about it stay in one place.',
          },
          {
            src: '/media/lockedin-nudges.png',
            title: 'The nudge, and the roast',
            caption:
              'Notifications are aggregated — “and 3 others liked your workout” is one row, not four — and sent by a Postgres trigger rather than the app, so they arrive whether or not anyone has it open. On the right: what the squad sees when you post nothing all week.',
          },
        ],
      },
    ],
    note:
      'Every person in these captures is invented. Locked In is a social app, so its database is mostly other people — my friends’ names, their photographs and their actual sessions — and none of them agreed to appear on a public portfolio. So the squad here is made up, and so is everything attached to them: the workouts, durations, calories, points, leaderboard positions, comments, chat messages and notifications. The avatars are generated from each invented name’s initials rather than sourced from anywhere, and the images on the sessions are drawn from that session’s own numbers rather than being photographs of anyone. The uploaded watch screenshot is generated too, and says so on its face. Nothing came out of the real project: the web build under capture is compiled with synthetic Supabase credentials, the harness replaces fetch before any application code runs so the app issues exactly the queries it always does and gets invented rows back, and every request to a real Supabase host is intercepted and counted — a run that let one through would say so. Gemini is not called either; the extraction you see running is the app’s real code path against a stubbed reply. My own name is the one real thing left, and only because it is already the title of this site. The repository is not modified at all, and beyond the invented data nothing is retouched — every screen, control and state is the app exactly as it runs.',
    repo: 'https://github.com/TusharLachman25/workout-tracker',
  },
  {
    slug: 'ai-meal',
    name: 'Kitchen OS',
    short: 'Kitchen OS',
    tagline: 'Know what is in your pantry, what you can cook, and what it does to your macros.',
    period: 'February — March 2026',
    kind: 'DATA + AI TOOL',
    status: '~3,500 lines of Python',
    role: 'Solo — schema, build, ship',
    accent: '#fbbf24',
    logo: '/logos/kitchen-os.svg',
    layers: [
      'Streamlit UI, ~1,800 lines',
      'A 66-function data layer over Supabase',
      'PostgreSQL schema designed from an ERD',
      'Gemini chat with persistent sessions',
      'Gemini vision for meal photographs',
      'Unit normalisation across weight, volume and count',
      'pandas + Altair for history charts',
    ],
    stack: ['Python', 'Streamlit', 'Supabase', 'PostgreSQL', 'Google Gemini', 'pandas', 'Altair'],
    metrics: [
      { value: '3.5k', label: 'lines of python' },
      { value: '66', label: 'backend functions' },
      { value: '3', label: 'unit systems reconciled' },
    ],
    blurb:
      'A pantry, recipe and nutrition tracker built in Python on a relational schema I designed from an entity-relationship diagram. Cook a recipe and it works out what you used and takes it out of your pantry — including converting between grams, millilitres and pieces.',
    highlights: [
      'Automatic pantry deduction when a recipe is cooked, with unit normalisation across weight, volume and count — a recipe asking for 200 ml of milk can be paid for out of a 1 kg entry, and a recipe asking for two eggs cannot.',
      'The whole app is a Streamlit front end over a 66-function data layer, so every read and write goes through one module instead of being scattered through the pages.',
      'A conversational recipe assistant on Gemini with real chat sessions — created, renamed, reopened and deleted — rather than one flat history that grows until it is useless.',
      'Photograph a meal and Gemini vision estimates the macros and logs it against the day.',
      'Personalised calorie and macronutrient targets calculated from body metrics and activity level, with a daily dashboard and full history charted in Altair.',
      'Custom foods and reusable meal bundles, so the things you eat every week are one tap rather than four entries.',
      'Cooking a recipe writes a log you can rate and review afterwards, and those ratings build a taste profile the assistant can use.',
      'Shopping list that flows back into the pantry when items are marked as bought, closing the loop instead of leaving two lists to reconcile by hand.',
    ],
    // Seeded with a demo pantry through the app's own functions rather
    // than written straight into the tables, so ingredient lookup, image
    // fetching and the pantry write all ran exactly as they do in use.
    trailer: '/media/kitchenos-trailer.mp4',
    trailerPoster: '/media/kitchenos-trailer-poster.jpg',
    trailerNote:
      'The pantry, the recipe collection, the AI chef and the nutrition tracker, cut from one recording of the app running.',
    video: '/media/kitchenos-demo.mp4',
    poster: '/media/kitchenos-demo-poster.jpg',
    videoNote: 'The same session uncut, minus the login screen — that part of the take caught a real account.',
    shots: [
      {
        src: '/media/kitchenos-pantry.png',
        title: 'Pantry stock',
        caption:
          'Everything currently in the kitchen, with quantities you can edit in place. Cooking a recipe subtracts from this list automatically, converting units where it has to.',
      },
      {
        src: '/media/kitchenos-shopping.png',
        title: 'The shopping list',
        caption:
          'Mark something as bought and it moves straight into the pantry above, so there is never a second list to reconcile by hand.',
      },
    ],
    note:
      'A demo pantry seeded through the app’s own functions rather than written straight into the tables, so ingredient lookup and the pantry write ran exactly as they do in use. The groceries are invented; the app is not.',
    repo: 'https://github.com/TusharLachman25/AI-Meal-Suggestion',
  },
  {
    slug: 'bets',
    name: 'Bets — The Vault',
    short: 'Bets',
    tagline: 'The ledger for the handshake bets a friend group never writes down.',
    period: '2026',
    kind: 'SOCIAL MOBILE APP',
    status: 'Two kinds of wager',
    role: 'Solo — design and build',
    accent: '#a78bfa',
    logo: '/logos/bets.svg',
    layers: [
      'React Native on Expo SDK 54',
      'Supabase Postgres as the shared ledger',
      'Sessions persisted through AsyncStorage',
      'One codebase, Android and web',
    ],
    stack: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'react-native-web', 'EAS Build'],
    metrics: [
      { value: '2', label: 'bet types' },
      { value: '1', label: 'shared ledger' },
    ],
    blurb:
      'My friends and I bet on things constantly and then argue about who owes what. The Vault is the ledger: a wager is written down with its terms, both sides and the stake at the moment it is made, and it stays open until somebody settles it. The record exists before the argument does.',
    highlights: [
      'Two kinds of wager, and they behave differently. A One-Off resolves exactly once — you tap whoever won and it locks with the winner recorded against the bet. An Ongoing wager never resolves; it keeps a running tally per player that either side can add to, which is what a season-long argument actually looks like.',
      'A bet is only valid if it is complete: description, both players and the stake are all required before it can be locked in, so the vague ones never make it into the ledger.',
      'The ledger is shared rather than per-device — every wager lives in Supabase, so both sides see the same open bets and the same settled ones.',
      'Sessions persist through AsyncStorage, so the app opens where you left it instead of asking who you are every time.',
      'One React Native codebase produces both the Android build and a web build through react-native-web, which is how the people who would not install anything still ended up using it.',
    ],
    shots: [],
    repoNote: 'Private for now — it is wired to a shared Supabase project.',
  },
];

export interface AcademicItem {
  slug: string;
  name: string;
  short: string;
  course: string;
  /** RMIT · individual, or RMIT · team. */
  unit: string;
  role: string;
  /** Calendar year the unit ran. */
  term: string;
  kind: string;
  tagline: string;
  stack: string[];
  blurb: string;
  points: string[];
}

/** Coursework, kept deliberately below the projects above: every graduate
 * from the same degree has some of it, so it supports the personal work
 * rather than competing with it. */
export const ACADEMIC: AcademicItem[] = [
  {
    slug: 'cloud-music',
    name: 'Cloud Music Web App',
    short: 'Cloud Music',
    course: 'Cloud Computing',
    unit: 'RMIT · individual',
    role: 'Solo — build and deploy',
    term: '2026',
    kind: 'CLOUD DEPLOYMENT',
    tagline: 'The same app shipped two ways, so the trade-off could be measured instead of assumed.',
    stack: ['Python', 'Flask', 'boto3', 'Docker', 'AWS EC2', 'ECS', 'S3', 'DynamoDB'],
    blurb:
      'A Flask REST API backed by DynamoDB and S3, deployed two ways so the trade-off could actually be compared: straight onto an EC2 instance with provisioning scripts, and containerised with Docker and gunicorn on ECS.',
    points: [
      'REST API in Flask, with boto3 talking to DynamoDB for records and S3 for media.',
      'Deployment one — an EC2 instance provisioned by script, so the setup is reproducible rather than clicked together.',
      'Deployment two — the same app containerised with Docker and gunicorn, running on ECS.',
      'Building both let me compare operational cost and effort directly instead of taking the lecture’s word for it.',
    ],
  },
  {
    slug: 'goat-debate',
    name: 'The GOAT Debate — social media analytics',
    short: 'The GOAT Debate',
    course: 'Social Media & Network Analytics',
    unit: 'RMIT · team',
    role: 'Team project — pipeline and network analysis',
    term: '2026',
    kind: 'NLP + NETWORK ANALYSIS',
    tagline: 'What football’s greatest-of-all-time argument looks like as a network.',
    stack: ['Python', 'NetworkX', 'transformers', 'BERTopic', 'gensim', 'NLTK'],
    blurb:
      'A six-stage pipeline over YouTube comment data on football’s greatest-of-all-time argument: sentiment with VADER and RoBERTa, topic modelling with LDA and BERTopic, then a comment network analysed for betweenness centrality, Louvain communities and homophily.',
    points: [
      'Six discrete stages, from collection and cleaning through to network measures — each one reproducible on its own.',
      'Sentiment scored twice, with VADER and with RoBERTa, so a lexicon method and a transformer could be compared on the same comments.',
      'Topics extracted with both LDA and BERTopic rather than trusting a single model’s idea of what the argument is about.',
      'The comment graph analysed for betweenness centrality, Louvain communities and homophily — who bridges the argument, and who only ever talks to their own side.',
    ],
  },
  {
    slug: 'exam-solver',
    name: 'Exam timetabling solver',
    short: 'Exam Solver',
    course: 'Intelligent Decision Making',
    unit: 'RMIT · individual',
    role: 'Solo — modelling and benchmarking',
    term: '2026',
    kind: 'CONSTRAINT SOLVING',
    tagline: 'Stating the timetable as constraints and letting a solver do the searching.',
    stack: ['Answer Set Programming', 'Clingo', 'Python', 'pytest'],
    blurb:
      'Allocating exams to rooms and timeslots under capacity limits, clashes and per-slot costs — expressed declaratively in ASP and solved with Clingo, then measured against a benchmark suite rather than a single happy case.',
    points: [
      'The problem stated as constraints in Answer Set Programming rather than as a hand-written search.',
      'Room capacity, student clashes and per-timeslot cost all modelled together.',
      'Solved with Clingo, then optimised for total cost.',
      'Measured against a benchmark suite in pytest, so performance claims came from a range of instances rather than one lucky input.',
    ],
  },
  {
    slug: 'ml-studies',
    name: 'Price regression & wildfire classification',
    short: 'ML Studies',
    course: 'Machine Learning',
    unit: 'RMIT · individual',
    role: 'Solo — analysis and write-up',
    term: '2026',
    kind: 'SUPERVISED LEARNING',
    tagline: 'Two supervised-learning problems, each run against several models rather than one.',
    stack: ['Python', 'scikit-learn', 'pandas', 'Jupyter'],
    blurb:
      'Two supervised-learning studies: predicting listing prices across ~8,600 rows with linear, Ridge and Lasso regression, and a multi-class wildfire problem comparing decision trees, an MLP and an SVM.',
    points: [
      'Regression on roughly 8,600 listings, comparing plain linear regression against Ridge and Lasso.',
      'Regularisation compared on the same split, so the effect of the penalty was visible rather than assumed.',
      'A separate multi-class wildfire problem run through decision trees, an MLP and an SVM.',
      'Feature preparation and evaluation done in pandas and scikit-learn, written up in Jupyter.',
    ],
  },
  {
    slug: 'maze-of-many',
    name: 'The Maze of Many — spanning-tree strategies',
    short: 'Maze of Many',
    course: 'Algorithms & Analysis',
    unit: 'RMIT · individual',
    role: 'Solo — implementation and complexity analysis',
    term: '2025',
    kind: 'ALGORITHMS + COMPLEXITY',
    tagline: 'Four ways to build the same spanning tree, and the arithmetic on why they differ.',
    stack: ['Python', 'Graph algorithms', 'Dynamic programming', 'Complexity analysis'],
    blurb:
      'Generating and solving mazes as graph problems: a Reverse-Delete minimum spanning tree written from the definition, then all four combinations of Prim’s and Kruskal’s against adjacency-matrix and adjacency-list representations, analysed for where each one actually wins.',
    points: [
      'Reverse-Delete implemented from the definition — start with the whole graph, strip the heaviest edge that is not load-bearing, keep going — and shown to run in O(E·(V+E)) because each removal needs a fresh connectivity check.',
      'Contrasted with Kruskal’s, which gets a union-find structure to answer the same question in near-constant time, and can stop as soon as it has V−1 edges instead of grinding through every edge.',
      'All four representation-and-algorithm pairings worked through: adjacency lists win on sparse graphs (O(V log V) against O(V²)) and converge with matrices as density rises.',
      'The empirical comparison designed rather than assumed — execution time, maze size and edge density measured; edge-weight distribution, maze geometry and Prim’s starting vertex argued out as variables that provably cannot change the result.',
      'An earlier assignment in the same unit built the knapsack side of it: a recursive solution replaced with a dynamic-programming table, then a backtrack through that table to recover which treasures were actually chosen, not just the optimal value.',
    ],
  },
  {
    slug: 'information-retrieval',
    name: 'Information retrieval — from noisy HTML to ranked features',
    short: 'Information Retrieval',
    course: 'Managing Semi-Structured & Unstructured Data',
    unit: 'RMIT · individual',
    role: 'Solo — pipeline implementation',
    term: '2025',
    kind: 'SEARCH + NLP',
    tagline: 'The unglamorous half of search: cleaning the documents nobody wants to clean.',
    stack: ['Python', 'NLTK', 'BeautifulSoup', 'NumPy', 'scikit-learn'],
    blurb:
      'The feature-engineering layer underneath a search engine: a pre-processing pipeline that takes deliberately corrupted HTML and returns clean tokens, then the n-gram, TF-IDF and embedding machinery that indexing and ranking are built on.',
    points: [
      'A pre-processing pipeline over raw HTML that has to detect and repair several kinds of corruption without being told which kind it is looking at — malformed markup, encoding damage, formatting artefacts — and hand back coherent tokenised English.',
      'Word-level and character-level n-grams plus token position maps, which is what lets a search engine answer phrase and proximity queries rather than just bag-of-words ones.',
      'Term frequency implemented past the naive count: log-scaled TF and a BM25-style saturating variant, so a term appearing fifty times stops being treated as fifty times more important.',
      'Document vectors built by aggregating token embeddings with TF-IDF weighting and mean-max pooling instead of a flat average, keeping the strong signals a mean would flatten out.',
      'Written against an automated evaluation harness with fixed function signatures, so the code had to be modular and testable rather than a notebook that happens to run.',
    ],
  },
  {
    slug: 'secure-file-sharing',
    name: 'Secure file sharing with GPG',
    short: 'Secure File Sharing',
    course: 'Introduction to Cyber Security',
    unit: 'RMIT · individual',
    role: 'Solo — implementation and write-up',
    term: '2025',
    kind: 'APPLIED CRYPTOGRAPHY',
    tagline: 'Public-key cryptography done at the command line, by hand, until it makes sense.',
    stack: ['GPG', 'Kali Linux', 'RSA', 'Bash', 'Linux user administration'],
    blurb:
      'A three-party secure file exchange built from scratch in Kali Linux: separate Linux users, RSA key pairs generated and exported for each, then messages encrypted, signed, transmitted, verified and revoked between them.',
    points: [
      'Three separate Linux users created and administered, so the exchange happens between real accounts rather than three directories pretending to be people.',
      'RSA key pairs generated per user and public keys exported in armoured form, imported by the others, and used to encrypt messages only the intended recipient could open.',
      'Both symmetric and asymmetric paths worked through — passphrase-based encryption and key-based encryption — including deleting a secret key and confirming what that does and does not make unreadable.',
      'Digital signatures in both forms: embedded and detached, each sent and then verified from the receiving account, which is the part that proves who sent a file rather than only who can read it.',
      'The whole exchange evidenced step by step, so the failure cases are visible rather than only the happy path.',
    ],
  },
];
