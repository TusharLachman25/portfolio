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
  /** Portrait phone captures need the full column width to stay legible; two of
   * them side by side in a half-width cell are a pair of unreadable slivers. */
  portraitShots?: boolean;
  /** A word from whoever actually uses the thing. Only ever their real words —
   * an unfilled testimonial renders nothing rather than something invented. */
  testimonial?: { quote: string; attribution: string };
  repo?: string;
  repoNote?: string;
  /** Copy for the dashed "more to add" slot at the foot of the sheet. Only for
   * a gap worth naming outright — a project whose captures do not exist yet
   * reads better saying so than leaving a reader to wonder where they went. */
  moreToAdd?: string;
}

/** The first real screenshot of a project: a walked-through step where there is
 * one, then a loose shot, then — only as a last resort — the trailer's poster.
 * The poster is a designed title card with a play triangle on it, so using it
 * as a thumbnail makes a project card read as a video rather than as software. */
export function heroShot(p: Project): string | undefined {
  return p.flows?.[0]?.steps[0]?.src ?? p.shots[0]?.src ?? p.trailerPoster;
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
      '73 Deno edge functions — the only privileged write path',
      'PostgreSQL on Supabase · 39 migrations · RLS on every table',
      'Claude assistant with 38 tools, behind approval',
      'WhatsApp Business via Twilio',
      'Google Drive + Calendar (service account and OAuth)',
      'Firebase Cloud Messaging push · in-app bell',
      'Nightly database backup to Drive · 30 copies kept',
      '637 unit tests across 39 files',
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
      { value: '73', label: 'edge functions' },
      { value: '39', label: 'migrations' },
      { value: '637', label: 'unit tests' },
      { value: '38', label: 'assistant tools' },
    ],
    blurb:
      'I spent three years as a medical assistant digitising patient records by hand. This is the software that replaced that job. It started as something I built for myself to use, and the practice now licenses it on a paid monthly subscription — patients, appointments, billing, insurance claims, clinical documents and messaging in one place, on the web and on Android.',
    highlights: [
      'A TypeScript monorepo on npm workspaces: a React dashboard, a second Android app, a shared package holding the document templates, and a standalone ingestion tool — around 51,000 lines across 356 files, with 73 serverless Deno edge functions and 39 PostgreSQL migrations behind them, covered by 637 unit tests.',
      'The browser only ever holds the read-only anon key. Every write goes through an edge function, so the privileged path is a list of 73 named operations rather than a database the client can reach — a stolen key from a laptop in a consulting room reads nothing it should not and writes nothing at all.',
      'That was the design, and for a while it was not what was actually running. A migration had converted every “allow read for all” policy to an authenticated-only one, but on the live database row-level security was switched off — and a policy on a table with RLS off is inert. Measured with nothing but the public anon key, no login and no session, eleven tables still answered: patients, medical records, history events, billing, files, generated documents, WhatsApp messages and four more. One of those rows was a real patient’s name, and that key ships inside the client bundle. The fix re-asserts the same expression the working tables already use, every step idempotent so it converges from any starting point, and turns RLS back on first — which was the step doing the real work.',
      'An insurance claims module that fills insurers’ own reimbursement forms rather than producing a lookalike: PDFs with real form fields are filled by name, and scanned or photographed ones by a percentage-based coordinate map that survives a re-scan at any size.',
      'Nothing is signed until she has read it — the signature and stamp go on only at the moment of approval, so a signed claim she has not seen cannot exist.',
      'Documents carry a server-assigned sequential number issued from an atomic counter, so paperwork cannot be forged or duplicated.',
      'The document templates live in one shared package because they used to be a copy each. The dashboard learned to take the signature and stamp from Settings and the phone app did not, so the same prescription carried a different seal depending on which one produced it. Sharing the code was the fix; the bug is the reason the package exists.',
      'A second Android app, the practice’s own “Documents”, that writes one document and shares it and can do nothing else — installed alongside the dashboard, with its own icon and session, for the times she needs a prescription on a phone and nothing more.',
      'WhatsApp Business through Twilio for bilingual invoices, prescriptions, reminders, appointment booking and claim intake, in English and Bahasa Indonesia.',
      'Notifications land where they can actually be seen: an in-app bell on the laptop, because the dashboard is already open and a popup would interrupt a consult, and Android push through Firebase for the phone, which is usually closed. Every kind can be switched off per channel.',
      'She sees patients in person at a partner hospital from four to six, and online by video from four to nine — twenty minutes for an in-person visit, thirty for an online one. None of that could be said: there was one `weekly_hours` column and every booking path wrote a hardcoded thirty minutes. So every online patient who asked for anything after six was told the practice was closed, which it is not — a booking simply lost, and lost by the WhatsApp assistant unattended, at a time of day she would never see it happen. In the other direction each in-person visit reserved half an hour of a two-hour afternoon, holding ten minutes nobody could be booked into, six times over.',
      'What splits is the open hours and the appointment length, and nothing else. She is still one person, so the diary stays shared: everything on the calendar is busy time for both, and a 4:20 in-person visit blocks the 4:00 online slot that would have run over it. Refusals name the kind, because “that’s outside her working hours” was true of one schedule and false of the other — “outside her in-person hours, she may still be free online then” is a sentence the assistant can act on. And setting a weekly schedule now requires naming which one: picking silently would write the change to a week she never mentioned and leave the other, quite possibly the one she meant, wrong.',
      'Claude now runs the practice with her rather than beside it: 38 tools instead of the original eight, organised by area — the diary (book, move, cancel, block time, change one day’s hours or the standing week, set leave), a patient’s record and her own consultation notes, WhatsApp in both directions including taking a conversation off the bot and handing it back, invoices and insurance claims, and the practice’s own details. It got there because two answers on one afternoon were both true and both useless: asked to invoice a patient she had just seen, it said it could not read the consultation notes; asked to check whether he wanted an appointment, it said its only outbound channel was sending a document. That is a search box with manners, not an assistant.',
      'What it deliberately cannot do is the more interesting half. No shell, no SQL, no HTTP — every tool is a named operation with a schema, so it cannot reach outside this practice’s data. It cannot message a number off the WhatsApp allowlist, and that applies to her too. It cannot delete a patient, a record or a history event; those stay on the pages that ask twice. It cannot skip a scheduling guard. Booking, moving and cancelling tell the patient by default, and every tool reports what actually went out, so “no number on file” can never read as “sent”.',
      'A turn no longer runs on the request that started it. Twenty rounds of Opus at maximum effort against a Supabase function timeout meant a turn that ran long left her message with no answer while the tools had already fired — real WhatsApp messages to real patients, a real invoice, a signed claim, and a chat showing none of it. The likeliest next thing she does is say it again, which does all of it twice.',
      'The assistant page was one endless thread: every instruction she had ever given in one list, with the last thirty turns replayed to the model regardless of subject, so this morning’s diary question was answered with last week’s invoicing sitting in front of it. It is a titled, searchable list of chats now, opening on a new one each time, named from her opening words by the smallest model there is.',
      'Every write blocks the whole app while it runs, and that rule had to be inverted to be worth anything. Saving a consultation is a render, a Drive upload and three database writes; a tap landing halfway through can file a visit with no document or a document with no visit. The overlay existed and covered six call sites out of about sixty, which is the wrong shape for a safety rule — it depends on whoever adds the next write remembering to opt in. Now every mutation blocks unless it says so, with 350ms of grace so nothing flashes, and the Android back button — the reflex when a screen seems stuck, and a short step from the system reclaiming the process mid-write — refuses to respond for exactly as long.',
      'Failures used to be green. The toast hardcoded a tick and timed out after 2.6 seconds, so “Could not send via WhatsApp” looked exactly like “Sent”, and the patient never got their prescription. Fifty-five error call sites converted, plus seven more that were reporting failure through the success path; failures are red and stay until dismissed. She also saw raw machinery — FunctionsHttpError, Postgres constraint names, Failed to fetch — so one module lets a sentence written for her through and replaces everything else, keeping the original for the log. Offline was unhandled entirely; every write goes through one wrapper, so no connection means no attempt and a standing bar across the top, because an empty patient list looks identical to a lost one.',
      'The field that exists to say what went wrong said nothing. `String(err)` on a plain object produces “[object Object]”, and twenty-five places called it on whatever they had just caught before writing it to the error log — but Supabase errors are plain objects carrying a message, a code, details and a hint, not Errors. That is how the appointment-reminder sweep failed every fifteen minutes for three weeks, 4,402 times, while System health showed her 4,402 rows each reading “Sweep failed” and “[object Object]”. A single describer now spells out Errors, Supabase errors and fetch-shaped failures, and a test holds it to never returning that string again.',
      'Deleting a patient was final. Drive’s trash covered the files, but the extracted record — every visit, allergy and billing line — was gone the instant the confirm was dismissed, and on a phone OK sits under her thumb. The delete now snapshots those rows first and a restore replays them, with Settings → Recently deleted as the way back for 30 days, matching Drive’s own window. It still asks her to type the patient’s name.',
      'Deleting a patient left their unpaid invoice behind, and the invoice went on chasing them. The delete archived seven tables and cascaded an eighth; `payments` was in neither list, has no foreign key to the patient, and is the only table the payment-reminder sweep reads — so a deleted patient stayed billable and kept being chased for money on the agreed schedule, by the name and number stored on the payment row, while the dialog she had to type a name into to confirm told her billing had been removed. The two table lists were duplicated, each carrying a comment warning that a new table “belongs in this list”; `payments` was added to the schema and put in neither, which is exactly the failure those comments were written to prevent. They are one list now.',
      'The nightly backup runs on the server, not on my laptop. It started as a Windows scheduled task, which only works if that specific machine is on at 3am, in the timezone it was registered in, with its credentials still in place — and fails silently the week anyone travels. It now writes the whole database to Drive as one gzipped file at 03:00 Jakarta, thirty copies kept, older ones moved to Drive’s trash rather than destroyed so even the pruning is reversible. Pruning happens only after the upload succeeds, because the other order throws away a good backup to make room for one that never arrived. Uploaded with her OAuth token rather than the service account, which has no Drive storage of its own.',
      'It is built for a doctor in her sixties who does not much like computers and uses it mostly on her phone between patients, and that is a set of rules rather than a preference. Nothing smaller than 13px, on a six-step scale — it used to run from 9.5px, with 429 of 657 sized elements under the floor. The phone’s own font-size setting is passed through to the WebView and honoured up to 160%. Targets are 44px on a phone and 48px where a mistake costs something. No icon without a word, because on a phone there is no hover to reveal a tooltip. Below 760px every table becomes a list of cards, so nothing is ever reached by dragging a table sideways. And the app asks its own questions rather than using the system dialog, which in an installed app is a grey box with an internal address on it that she has been trained to dismiss unread.',
      'Both apps pulled their typeface and their icon font from Google with a stylesheet link, and neither APK bundled anything. A link is fetched once at page load and never retried, so on a Pixel 6 cold-launched in airplane mode there were zero font faces and every icon rendered the ligature name it was written as: the tab bar read “space_dashboardHome groupsPatients calendar_monthCalendar”, came to 644px inside a 412px screen, and put the AI tab 238px past the edge with no way to reach it. It recovers on the next launch once the WebView has cached the files — so this was a first-run failure only, which is the one launch that has to work. Both are vendored now, 147KB for the lot, the icon font subset to the 116 icons the apps actually use. An icon outside that subset renders as its own name in the middle of the interface, so a test scans both apps and fails if any name is missing from the list.',
      'Three greys were below WCAG AA and one badly: #94a3b8 measured 2.39:1 against the app background and carried 188 pieces of real text — hints, timestamps, day names, and the four unselected labels in the bottom tab bar, which is most of how she knows where she is. Contrast sensitivity falls with age; that is not a shade of grey, it is an absence. The ramp sits at 5.84, 5.10 and 4.62 now, the three closer together than before because that is what AA on a near-white background leaves room for.',
      'The bugs that mattered most were the ones only a real phone and real data could produce, found by driving the installed APK on a Pixel 6 against the live backend rather than demo rows. A patient name needs to be long enough to overflow: “Aisha Khan” painted straight through the badge beside it, and on a 360px screen the row’s fixed parts came to 411px and left the name a column exactly 0px wide. A document library needs real documents: its title column got 39px, so every row read “Inv…” or “Co…”. The patient header came to 436px of a 412px screen with the More button — holding a third of what you can do to a patient — entirely off the right edge, behind a sideways scroll the layout’s own rules say does not exist. And the leave switch was a button inside a label that also wrapped its explanation, so reading the explanation with a finger put the practice on leave.',
      'Every free-text field on the consultation form has a microphone beside it — seven of them, and by far the most typing the app asks for, on the device where typing is worst. The transcript appends to whatever the field already holds rather than replacing it, so stopping and starting again adds a second sentence instead of wiping the first. Where speech recognition is unavailable, including Capacitor’s Android WebView, the button is absent rather than broken and the form says to use the keyboard’s own microphone instead.',
      'Patient files are never committed and never cached locally. Google Drive is the authoritative store through a service account; Supabase holds only the structured data extracted alongside it. Both Android apps set FLAG_SECURE, so there are no screenshots and no patient record showing in the recent-apps thumbnail, and an optional PIN locks the screen after two minutes away.',
      'The tests are pure logic by design — scheduling, date maths across the Jakarta timezone, claim assembly, document rendering — plus a patient simulator that drives the real WhatsApp flow one message at a time and then looks at what happened to the calendar and the database. Linting is deliberately kept out of the build, because a lint error should never be the reason a document cannot be issued.',
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
      'All captured from the real app running in its demo mode, which starts with no database credentials at all: it skips the login and physically cannot reach the practice’s data. Every patient, message, invoice, claim and document here is invented — the eight demo patients the app ships with, plus stand-in rows written for the screens that normally read from the live backend, so they could be photographed without touching anything real. The insurance form is likewise a mock-up, drawn for the demo from an insurer that does not exist. The doctor’s own details are blurred wherever they appear: her name, the hospital she practises at, her registration and licence numbers, phone, bank accounts, email and signature seal. Beyond that nothing has been retouched — every layout, control and state is the software as it ran. One thing has moved since: these are the dashboard at laptop width, taken before the pass that rebuilt the app around the phone she actually holds it on. The features are the same and the desktop layouts are largely unchanged, but the phone is now a different shape — tables are cards, the consultation form has the whole screen, and the assistant’s modes are sentences rather than three lowercase words. Those screens are not photographed here yet.',
    // A word from the doctor who runs on this every day. Deliberately left unset
    // until she has supplied and approved her own words — the sheet renders
    // nothing at all rather than a placeholder that reads as a real quote.
    // To turn it on, fill both fields:
    //   testimonial: {
    //     quote: '…her sentence, verbatim…',
    //     attribution: 'The doctor · family practice, Jakarta',
    //   },
    repoNote: 'Private repository — it holds real clinical data. Walkthrough available on request.',
  },
  {
    slug: 'fitscroll',
    name: 'FitScroll',
    short: 'FitScroll',
    tagline: 'One push-up buys one minute of Instagram. Run out and it locks.',
    period: 'August 2026',
    kind: 'NATIVE ANDROID APP',
    status: 'Shipped — sideloaded APK',
    role: 'Solo — design, build, ship',
    accent: '#fb7185',
    logo: '/logos/fitscroll.svg',
    layers: [
      'Kotlin · Jetpack Compose (Material 3)',
      'CameraX preview → ML Kit pose detection, on-device',
      'Push-up counter behind a 1–5 form strictness dial',
      'Minute bank · rolling 24h expiry, oldest spent first',
      'Accessibility service reading the foreground package only',
      'Drain meter charging measured time, not tick counts',
      'Lock screen drawn as an accessibility overlay',
      'Release gate — a published version floor that fails open',
      '125 unit tests · JUnit + Robolectric, no device required',
    ],
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'CameraX',
      'ML Kit Pose Detection',
      'Accessibility Services',
      'Coroutines',
      'JUnit',
      'Robolectric',
      'Gradle',
    ],
    metrics: [
      { value: '125', label: 'unit tests' },
      { value: '1:1', label: 'push-up to minute' },
      { value: '24h', label: 'before a minute expires' },
      { value: '0', label: 'frames leaving the phone' },
    ],
    blurb:
      'I did not want another app telling me how long I had been on Instagram. I wanted one that made me pay for it. FitScroll counts your push-ups through the phone’s camera, banks each clean rep as one minute of screen time, and enforces that budget on whichever apps you pick — and every minute expires 24 hours after you earn it, so you cannot grind once on Sunday and coast all week. Everything that counts a rep or spends a minute runs on-device: no account, no sync, no analytics, and no camera frame ever leaves the phone.',
    highlights: [
      'The rules are pure functions taking an explicit `now` — the bank, the rep counter, the blocking decision, the drain reconciler, the per-second meter. That is what makes 125 tests possible with no device and no 24-hour wait: expiry boundaries, oldest-first spending, cap overflow and every anti-cheat gate are pinned down as arithmetic. The parts that genuinely need Android get Robolectric — the stored ledger, its reload, the day rollover, and the corrupt-ledger path that has to fail into an empty bank rather than a crash loop, because a crash loop leaves the accessibility service holding the block with no way to reach the camera.',
      'The gate that makes a rep a push-up is not an angle. Stand up, hold the phone in front of you and curl your arms, and every angle check passes — elbow locked out at the top, bent at the bottom, a dead-straight body line throughout. Only the fact that your body never moved gives it away. So a rep also requires your shoulders to drop by a fraction of your own shoulder-to-hip length, measured as a ratio so it holds at any distance from the lens, and set low enough that anyone actually on the floor clears it without thinking about it.',
      'Strictness tightens five things at once, and deliberately not a sixth. It used to raise the required landmark confidence as well — which meant level 5 was quietly asking for a better view of you rather than a better push-up. Looking down at the floor is enough to drop the pose model’s confidence across every landmark, so reps stopped counting entirely at level 5 while the identical rep counted at level 1. There is one visibility floor for all five levels now; strictness governs form only.',
      'The body-line thresholds look lenient on paper and are not. This is a 2D estimate from a single camera: unless the lens sits exactly perpendicular to you, perspective foreshortens your torso and a genuinely straight back measures well under 180°. Thresholds that are correct in geometry reject real push-ups at real phone placements.',
      'A rep is not judged frame by frame, because the pose model jitters by a few degrees on a motionless subject and a single noisy sample was throwing away clean reps. Each level instead carries a sag allowance — how long within one rep you may be outside tolerance before it is voided. Real sag lasts; noise does not. And if your legs are out of frame the model *guesses* your knee position, so the app declines to judge your back at all rather than failing you on a guess, and says “back not checked” on screen so a refusal reads as feedback rather than as a broken app.',
      'The lock lands on top of the blocked app, mid-scroll, rather than only at the moment you open it. It is drawn as an accessibility overlay, which the service is granted directly — so “Display over other apps” stays genuinely optional, and where it is missing the one button that needs it says so instead of appearing to do nothing.',
      'Knowing which app is in front takes two kinds of event, not one. A window-state change says a window just took the screen, which is the only signal that an app switch happened at all — but it describes transitions only. Pull the notification shade down over Instagram and the app underneath never goes away, so nothing announces its return when the shade closes. A scroll event says a package is on screen right now, which closes that gap. The service is declared `canRetrieveWindowContent="false"` and reads nothing off either event but the package name and the window class.',
      'The meter charges measured time rather than counting ticks, because a timer that is throttled, coalesced or briefly starved silently under-bills — and the failure looks exactly like the app working. Below an hour the balance counts in seconds for the same reason: a number that only moves once a minute looks identical whether the drain is running or stuck, which made every real bug in it hard to tell from an imagined one.',
      'Android reports app switches, not a live answer to “what is on screen”, so sometimes the meter has to guess — a service killed mid-scroll, or a phone unlocked back into whatever it was showing. It resumes on the remembered package, because the alternative is free scrolling every time the process is recycled, but a guessed *drain* expires after 30 seconds unless something confirms it, so the most a wrong one can cost you is half a minute. A guessed *lock* is not put on the same clock, because the failures are not comparable: a drain that guessed wrong spends a bank silently, while a lock that guessed wrong is a screen in front of you with a button on it.',
      'Copies handed out by hand have no update channel, so every sideloaded build checks one published file and withdraws itself if told to. It is a version floor rather than a switch — one number retires everything older at once, and a notice can never retire a build that did not exist when it was written. It fails open on purpose: no answer, for any reason, leaves the last one standing, and the first answer is “supported”, because bricking someone’s app because their plane has no wifi would be a worse bug than a build living too long. When a build does retire it stops blocking first, and the banked minutes stay on disk for whatever installs over the top. The Play build compiles the URL to an empty string and never touches the network.',
      'Android identifies an app by package name *and* signing certificate, so the key you hand builds out with is a commitment: a build signed with a different key cannot update one already installed — it has to be uninstalled first, which deletes the user’s banked minutes. Release builds fall back to the debug key when there is no keystore, so a fresh clone still produces something installable, and the README says plainly that anything given to another person must be built with the real one.',
      'ML Kit ships native inference for four ABIs and two of them only ever run on emulators, which made the universal APK 82MB — more than half of it code no phone can execute. Filtering at the source rather than only in the split brings the safe-for-anything build to 44MB and the arm64 one to 29MB. The APKs are also named after the app and its version rather than after the build system, because handed over in a chat the filename is the only label they have.',
      'It is a commitment device, not a jail, and the README says so first rather than last: on Android you can disable the accessibility service or uninstall the app in under a minute. It works by adding friction at the moment of the impulse. Expiry rides the wall clock and you own the wall clock — winding it back cannot mint minutes, since a credit stamped in the future is pulled back to now, so the worst it buys is one ordinary day — but nothing here pretends to be tamper-proof.',
    ],
    shots: [],
    // No captures yet, and the reason is structural rather than an oversight:
    // every other sheet on this site was photographed by driving a web build in
    // headless Chrome, which is not a thing a native Android app has.
    moreToAdd:
      'Screenshots and a walkthrough. Every other project here was captured by driving its web build in headless Chrome against invented data — FitScroll is a native Android app with a camera in the middle of it, so the same trick does not apply and the captures need a real phone, a real set and screen recording off the device. Until that exists this sheet is deliberately words only rather than mock-ups of screens that were never photographed.',
    repo: 'https://github.com/TusharLachman25/FitScroll',
  },
  {
    slug: 'jarvis',
    name: 'Jarvis — Personal Life OS',
    short: 'Jarvis',
    tagline: 'One screen for tasks, calendar, health and money as an international student.',
    period: 'June 2026',
    kind: 'PERSONAL DASHBOARD',
    status: 'In daily use — mine',
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
    portraitShots: true,
    repo: 'https://github.com/TusharLachman25/Locked-In',
  },
  {
    slug: 'ai-meal',
    name: 'Kitchen OS',
    short: 'Kitchen OS',
    tagline: 'Know what is in your pantry, what you can cook, and what it does to your macros.',
    period: 'February — March 2026',
    kind: 'DATA + AI TOOL',
    status: 'Runs locally, used weekly',
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
    // The trailer is built motion, not screen capture — the one sheet on this
    // site whose trailer is. The walkthrough underneath is the real app driven
    // through CDP against an in-process stand-in for Supabase, Gemini and the
    // food database, so its state changes are real writes to invented rows
    // rather than staged screens. Neither has been near the live project.
    trailer: '/media/kitchenos-trailer.mp4',
    trailerPoster: '/media/kitchenos-trailer-poster.jpg',
    trailerNote:
      'Twenty-four seconds on the one idea the schema exists for: a quantity that went down because something was cooked, not because anyone typed. Built as motion rather than screen-captured — every number in it is one the walkthrough underneath shows the app actually producing.',
    video: '/media/kitchenos-demo.mp4',
    poster: '/media/kitchenos-demo-poster.jpg',
    videoNote:
      'The app driven end to end, uncut and at real speed: read the day, walk the shelf, search the global food database, tick something off the shopping list and watch it land in the pantry, open a recipe, ask the chef what tonight could be out of what is in stock, say you cooked it, correct the amounts it assumed — and then watch the pantry and the day’s total both settle up.',
    shots: [],
    flows: [
      {
        title: 'The kitchen, at a glance',
        caption:
          'What the app is for, in three screens: what has been eaten today, what is on the shelf, and what this kitchen knows how to cook.',
        steps: [
          {
            src: '/media/kitchenos-home.png',
            title: 'Open it',
            caption:
              'Calories left against a target worked out from body metrics rather than typed in, protein still to find, and how many things are in the pantry — then the quick actions and the last three meals.',
          },
          {
            src: '/media/kitchenos-pantry.png',
            title: 'The shelf',
            caption:
              'Everything in the kitchen with its quantity and unit, editable in place. Cooking a recipe subtracts from this list on its own, converting between grams, millilitres and pieces where it has to.',
          },
          {
            src: '/media/kitchenos-cookbook.png',
            title: 'What it knows how to cook',
            caption:
              'Recipes written by hand and recipes the assistant saved, marked apart. The collection is the assistant’s source material as much as the cook’s — it is told to suggest from here before inventing anything.',
          },
        ],
      },
      {
        title: 'The list and the shelf are the same data',
        caption:
          'A shopping list that ends in the pantry, rather than a second list to reconcile against it by hand.',
        steps: [
          {
            src: '/media/kitchenos-shopping.png',
            title: 'What needs buying',
            caption:
              'Quantity and unit per line, editable, with an optional thumbnail per row. Nothing here is a free-text note — every line is a real ingredient the rest of the app can do arithmetic with.',
          },
          {
            src: '/media/kitchenos-picker.png',
            title: 'Add something',
            caption:
              'The ingredient library, three to a row, each with its quantity and unit chosen before it is added. The tiles are drawn stand-ins; the app normally pulls ingredient photographs from an open food database.',
          },
          {
            src: '/media/kitchenos-search.png',
            title: 'Or search the world’s',
            caption:
              'Three letters and it queries a global food database for anything the local library has never heard of, and offers the result with the same quantity and unit controls as everything else.',
          },
          {
            src: '/media/kitchenos-restock.png',
            title: 'Tick it off, and it is on the shelf',
            caption:
              'Marking six eggs bought took them off the list and added them to the ten already in the pantry — 16 in the same row, not a second entry. Buying something the kitchen has never had inserts a new one instead.',
          },
        ],
      },
      {
        title: 'A chef that has read the pantry',
        caption:
          'Chat sessions that persist, and answers assembled from the quantities actually in stock rather than from a generic recipe index.',
        steps: [
          {
            src: '/media/kitchenos-chat-history.png',
            title: 'Chats that survive the session',
            caption:
              'Created, renamed, reopened and deleted, each keeping its own history — rather than one flat log that grows until it is useless.',
          },
          {
            src: '/media/kitchenos-chat.png',
            title: 'Ask it what to cook',
            caption:
              'The reply is built from real state: 1,375 of 2,669 kcal eaten, 128 g of protein still to find, and the exact amounts on the shelf. It names the halloumi because 225 g of it is the thing with the shortest life in the fridge.',
          },
          {
            src: '/media/kitchenos-chat-recipe.png',
            title: 'Pick one and it commits',
            caption:
              'Ingredients with what is in stock beside what the recipe needs, the method, and a rough macro total for the pot. It deliberately will not offer to log anything until you say you have cooked it.',
          },
          {
            src: '/media/kitchenos-chat-rename.png',
            title: 'Housekeeping',
            caption:
              'Rename or delete a session from its own row, without leaving the conversation you are in.',
          },
        ],
      },
      {
        title: 'Cook it, and the shelf pays for it',
        caption:
          'The feature the schema exists for: cooking a recipe works out what it used and takes it back out of the pantry.',
        steps: [
          {
            src: '/media/kitchenos-recipe.png',
            title: 'The recipe as saved',
            caption:
              'Ingredients and method side by side. Start Cooking hands it to the assistant rather than to a timer.',
          },
          {
            src: '/media/kitchenos-cooking.png',
            title: 'Say you cooked it',
            caption:
              'The assistant returns the ingredient list as an editable table, because what actually went in the pan is never quite what the recipe said. Rows can be corrected, added or dropped before anything is committed.',
          },
          {
            src: '/media/kitchenos-macros.png',
            title: 'What that came to',
            caption:
              'Calories and macros calculated from the amounts as edited, not from the recipe as written.',
          },
          {
            src: '/media/kitchenos-review.png',
            title: 'Logged, and the pantry updated',
            caption:
              'One button writes the meal into today’s total and deducts every ingredient from the shelf — the toast top right is that write landing. The rating that follows builds a taste profile the assistant reads back on later suggestions.',
          },
          {
            src: '/media/kitchenos-pantry-after.png',
            title: 'The shelf afterwards',
            caption:
              'Coconut milk 800 → 400 ml, red lentils 500 → 300 g, spinach 200 → 100 g. Nothing was typed on this screen; the deduction is what the cooking flow wrote, unit conversion included.',
          },
        ],
      },
      {
        title: 'Logging it, and the targets it is measured against',
        caption:
          'Four ways into the food diary, and the body metrics the day’s numbers are actually calculated from.',
        steps: [
          {
            src: '/media/kitchenos-tracker.png',
            title: 'The day',
            caption:
              'Calories against target, the macro split, a seven-day trend and every meal in order. The 1,085 kcal dinner arrived from the cooking flow rather than being typed in here.',
          },
          {
            src: '/media/kitchenos-quickadd.png',
            title: 'Log a one-off',
            caption:
              'Four routes behind one button. Quick Add is for the thing eaten once and never again — logged without being saved as a food. Micronutrients sit behind an expander so the common case stays four fields.',
          },
          {
            src: '/media/kitchenos-scan.png',
            title: 'Or photograph it',
            caption:
              'Gemini vision returns a dish name, a portion estimate and the whole macro and micronutrient set, every field editable before it is logged. The photograph is drawn for this capture and says so on its face.',
          },
          {
            src: '/media/kitchenos-myfood.png',
            title: 'The things eaten every week',
            caption:
              'Saved foods are one tap instead of four fields, and meal bundles log several at once — the breakfast that is always the same three items.',
          },
          {
            src: '/media/kitchenos-history.png',
            title: 'The whole diary',
            caption:
              'Grouped by day with the day’s total on the header, every entry editable and deletable, and the lot exportable as CSV.',
          },
          {
            src: '/media/kitchenos-settings.png',
            title: 'Where the targets come from',
            caption:
              'Height, weight, age and activity level go through Mifflin-St Jeor to a daily calorie figure and a 30/35/35 macro split — 2,669 kcal here — which can then be overridden by hand. Dietary requirements and a free-text note are handed to the assistant on every message.',
          },
        ],
      },
    ],
    note:
      'The trailer at the top is a built motion piece rather than app footage — designed scenes, not screen capture — though every figure in it is one the walkthrough and the screenshots below show the app itself producing. Everything from the walkthrough down is the real app, and everything in it is invented: the cook, their body metrics, the groceries, the recipes, every meal and macro, and both halves of every conversation. Kitchen OS is Streamlit, so unlike the browser-rendered projects on this site there is no fetch to replace — Python runs the whole app server-side and only rendered deltas ever reach the browser. The harness stands in for the external services inside the Python process instead, before app.py, backend.py and ai_chef.py build their clients at import time. Supabase is replaced by an in-process implementation of the queries the app actually makes, and its rows persist across reruns, so ticking an item off the list or cooking a recipe is a real state change photographed before and after rather than two staged screens. Gemini is not called: its replies are scripted, though the chef quotes quantities read back out of the pantry context the app itself assembled. The food-database lookup returns invented results in the real response shape, and ingredient images are drawn rather than fetched. The app runs on synthetic credentials, and any connection to a host that is not the local server is refused and counted — a run that let one through would say so, and this one blocked none. Nothing was read from the real database and nothing was written to it, and the repository is not modified at all. Beyond the invented data nothing is retouched: the only thing hidden is Streamlit’s own local dev toolbar, and the decimal commas in the profile fields are the capture machine’s regional format rather than anything the app chose.',
    repo: 'https://github.com/TusharLachman25/kitchen-os',
  },
  {
    slug: 'bets',
    name: 'Bets — The Vault',
    short: 'Bets',
    tagline: 'The ledger for the handshake bets a friend group never writes down.',
    period: 'February 2026',
    kind: 'SHARED LEDGER APP',
    status: 'Shipped to the group',
    role: 'Solo — design and build',
    accent: '#a78bfa',
    logo: '/logos/bets.svg',
    layers: [
      'React Native on Expo SDK 54',
      'Supabase Postgres as the shared ledger',
      'One table, five queries, no auth',
      'EAS Build → Android APK',
      'react-native-web build from the same source',
    ],
    stack: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'react-native-web', 'EAS Build'],
    metrics: [
      { value: '2', label: 'bet types' },
      { value: '1', label: 'shared ledger' },
      { value: '0', label: 'accounts to create' },
    ],
    blurb:
      'My friends and I bet on things constantly and then argue about who owes what. The Vault is the ledger: a wager is written down with its terms, both sides and the stake at the moment it is made, and it stays open until somebody settles it. The record exists before the argument does.',
    highlights: [
      'Two kinds of wager, and they behave differently. A One-Off resolves exactly once — you tap whoever won and it locks with the winner recorded against the bet. An Ongoing wager never resolves; it keeps a running tally per player that either side can add to, which is what a season-long argument actually looks like.',
      'A bet is only valid if it is complete: description, both players and the stake are all required before it can be locked in, so the vague ones never make it into the ledger. That guard used to be one early return in addBet, which meant it failed silently — the button simply did nothing. The bet with a missing term is precisely the one that gets argued about later, so an unexplained refusal loses the record it was trying to protect. It now names the field and marks it, and the mark clears as you type into it. Fields are trimmed before being checked and before being stored, because a stake of a single space is the same vague bet wearing a disguise.',
      'The ledger is shared rather than per-device — every wager lives in Supabase, so both sides see the same open bets and the same settled ones.',
      'There are no accounts at all. No sign-in, no user table, and the players are just names typed into a field rather than users who exist somewhere. It was built for one group of friends and handed to them directly, so the app never had to answer “who are you” — everyone holding it sees the same single ledger. The Supabase client is configured with AsyncStorage for session persistence, which is dead configuration: nothing in the app ever signs anyone in.',
      'One React Native codebase produces both the Android APK, built through EAS and sent round the group, and a web build through react-native-web.',
      'Building the same source for the web is where the abstraction leaks, and it leaks in one identifiable place. react-native-web renders a TextInput as an <input>, which carries a min-content width Yoga does not, so the paired name fields refused to shrink and overflowed the card below about 700px — every phone. Native was never affected. One minWidth fixes it, but only after knowing which of the two layout engines you are actually arguing with.',
    ],
    // The trailer is built motion, not screen capture — the second sheet on
    // this site whose trailer is, for the same reason as Kitchen OS: the app is
    // a static, light-themed single screen and a recording of it reads as dead.
    // The walkthrough underneath is where the real footage lives.
    trailer: '/media/bets-trailer.mp4',
    trailerPoster: '/media/bets-trailer-poster.jpg',
    trailerNote:
      'Twenty-three seconds on the reason the thing exists: a bet made out loud is an argument scheduled for later, and this is the record that gets there first. Built as motion rather than screen-captured, but not invented — the cards are redrawn from the app’s own colours, radii and type, and both wagers in it are the same invented ones the screenshots below use.',
    video: '/media/bets-demo.mp4',
    poster: '/media/bets-demo-poster.jpg',
    videoNote:
      'The app driven end to end on a phone, uncut and at real speed: read the ledger as it stands, try to lock a bet in with the stake still missing and watch it say so, add the stake and watch it land at the top, settle a one-off onto a winner, open the other kind of wager and start its tally at nothing, add a point to a season that never resolves, then delete a settled bet and take the deletion back before it reaches the database. Every change on screen is a real write — the same five queries the app always issues, answered with invented rows.',
    shots: [],
    flows: [
      {
        title: 'Writing one down',
        caption:
          'The whole app is one screen: a form pinned above the ledger it writes to. A bet gets recorded at the moment both sides agree, which is the only moment anyone is honest about the terms.',
        steps: [
          {
            src: '/media/bets-write.png',
            title: 'The form, and what it refuses',
            caption:
              'Empty on the left. On the right, three of the four required fields filled and “Lock It In” already pressed — description, both players, no stake — and the app says which one is missing rather than doing nothing: the stakes field marked, “Still missing the stakes.” underneath it, and the ledger behind it unchanged because nothing was written. That refusal used to be silent, which made a rejected bet and a saved one look identical.',
          },
          {
            src: '/media/bets-locked-in.png',
            title: 'The fourth field, and the write',
            caption:
              'The stake typed in, and the same button now doing something. The row goes to Postgres and comes back carrying the id it was given, which the app puts at the head of the list rather than refetching — the ledger is ordered by created_at descending, so the newest wager is always the top of the page.',
          },
        ],
      },
      {
        title: 'Settling a one-off',
        caption:
          'A One-Off resolves exactly once. Both names are buttons, and whichever gets pressed is the winner written against the row.',
        steps: [
          {
            src: '/media/bets-settle.png',
            title: 'Two buttons, one of them true',
            caption:
              'Active on the left with a button per side; Completed on the right, the winner written into the row and the badge turned green. The buttons are gone because the card renders them only while the status is Active — resolving has no undo in the UI, which is rather the point of having written the bet down.',
          },
        ],
      },
      {
        title: 'The wager that never ends',
        caption:
          'The other kind. An Ongoing bet never resolves; it keeps a running tally per player that either side can add to, which is what a season-long argument actually looks like.',
        steps: [
          {
            src: '/media/bets-ongoing.png',
            title: 'Made as Ongoing',
            caption:
              'The type switcher decides what the card will be rather than how it looks: picking Ongoing stores type as Ongoing, and the card then renders a tally block instead of a pair of win buttons. It opens at 0–0 from a column default, not from anything the form sends.',
          },
          {
            src: '/media/bets-tally.png',
            title: 'Adding to it',
            caption:
              'Mira’s +1 pressed — 6 becomes 7, Theo stays on 4. Each side has its own column, its own button and its own counter, and no combination of presses ever moves the bet to Completed.',
          },
        ],
      },
      {
        title: 'The ledger',
        caption:
          'One shared table, newest first, holding both kinds at once. There is no filter and no archive, so settling and deleting are the only two ways a wager leaves the page — which makes delete the one control that can lose a record.',
        steps: [
          {
            src: '/media/bets-ledger.png',
            title: 'A settled bet, and five seconds to change your mind',
            caption:
              'The completed wager at the bottom of the ledger, and the list immediately after Delete was pressed. Delete sits directly beneath the button that resolves the bet and used to take effect on the first press. A confirm dialog is the obvious fix and the wrong one — it taxes every delete to guard the rare misfire — so the card leaves the screen at once and the DELETE is held for five seconds behind this toast. Nothing is written during that window, which means Undo has nothing to restore: it cancels a write that had not happened yet, and the card returns to its own place in the ledger rather than to the top.',
          },
        ],
      },
    ],
    note:
      'The trailer at the top is built motion rather than app footage, and says so; everything below it is the real thing running. Every bet in either is invented, and it has to be: the real table is a ledger of wagers between me and my friends, so every name, stake and tally in it is theirs, and none of them agreed to appear on a public portfolio. So the wagers here are made up and so are the people — the same invented cast the Locked In captures use, on the same reasoning. My own name is the one real thing left, and only because it is already the title of this site. Nothing came out of the real project and nothing went into it: the build under capture is a copy of the app made outside its repository and compiled with synthetic Supabase credentials, the harness replaces fetch before any application code runs so the app issues exactly the five queries it always does and gets invented rows back, and every request to a Supabase host is intercepted and counted at two layers — the page and the network — with the run reporting the count and failing if it is not zero. The state changes are real writes rather than staged screens: the tally really goes from 6 to 7, and the one-off really resolves. The delete shot is taken deliberately inside the five-second undo window, so the row is still in the table at the moment it is photographed — the harness asserts exactly that, and then asserts the row is gone once the window has closed, because a screenshot of a toast otherwise proves only that a toast rendered. Three things changed in the app itself while this sheet was being made, and all three are worth naming. Capturing it at phone width surfaced a react-native-web layout bug that put the second name field over the edge of the card, so the fix — a single minWidth — went into the real source before these were shot, rather than the screenshots being framed to hide it. The other two were gaps this page originally described as open: a form that refused a bet without saying why, and a delete with no confirmation and no way back. Both are now fixed rather than merely admitted, and these captures are of the fixed app. Beyond that nothing is retouched; every screen, control and state is the app exactly as it runs.',
    repo: 'https://github.com/TusharLachman25/bets-the-vault',
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
  /** Figures the work itself produced — plots and charts written by the code,
   * not screenshots of a product. Only the two units that generated genuine
   * artefacts carry them; the rest stay text, because a unit with nothing to
   * show should look like a unit with nothing to show. */
  shots?: Shot[];
}

/** Coursework, kept deliberately below the projects above: every graduate
 * from the same degree has some of it, so it supports the personal work
 * rather than competing with it. */
export const ACADEMIC: AcademicItem[] = [
  {
    slug: 'histopathology',
    name: 'Colon Cancer Cell Classifier — CNN on Tissue Images',
    short: 'Cancer Cell CNN',
    course: 'Machine Learning',
    unit: 'RMIT · individual',
    role: 'Solo — modelling, evaluation and write-up',
    term: '2026',
    kind: 'DEEP LEARNING ON IMAGES',
    tagline: 'The evaluation was the hard part, and getting it right cost me the score.',
    stack: ['Python', 'PyTorch', 'scikit-learn', 'CNNs', 'PCA', 't-SNE', 'Jupyter'],
    blurb:
      'Two classification tasks over 20,280 27×27 patches of H&E-stained colon tissue from 98 patients: is this cell cancerous, and which of four types is it. A CNN against logistic regression, a random forest and an RBF-SVM — all of it split by patient rather than by image, which is the decision the whole project turns on.',
    points: [
      'Every split is a patient split, not an image split. Patches from one patient share staining, scanner and morphology, so testing on a patient you trained on measures memory rather than generalisation.',
      'Enforced with StratifiedGroupKFold, and the code asserts the three patient sets are pairwise disjoint — a leak raises rather than passing quietly.',
      'That choice cost the headline. The CNN scores 0.920 macro-F1 on validation and 0.852 on unseen test patients; the SVM falls 0.885 to 0.810. The brief wanted 0.90, so the binary task is recorded as not met. A per-image split would almost certainly have cleared it, by testing on near-identical patches of patients the model had already memorised.',
      'Before modelling, unsupervised analysis to check the problem was real: two principal components explain 25.84% of pixel variance, and K-Means at k=4 recovers the cell types with an Adjusted Rand Index of 0.041 — chance. Raw-pixel similarity is not the axis the labels sit on, which is the argument for learning a representation rather than hand-crafting features.',
      'A structural finding that reframed both tasks: cross-tabulating the labels, isCancerous = 1 exactly when the cell is epithelial, with no exceptions in 9,896 rows. Detecting cancer on this data is operationally detecting epithelial cells — useful for reading the results, and explicitly flagged in the report as an artefact of this dataset rather than a clinical law.',
      'Learning rate swept over five values on the harder task and selected on validation, never test. The response is non-monotonic — 0.690 at 1e-4, 0.760 at 1e-3, a dip to 0.737 at 3e-3, then 0.766 at 1e-2 — so the tuned rate sits where convergence is fast but still stable.',
      'Augmentation closed the overfitting gap on cell-type but lost on test (0.603 against the baseline CNN’s 0.635), and the report says so rather than quoting the better number. Because selection has to happen on validation, where augmentation won, the augmented model is the legitimate pick and the higher score is one I am not entitled to claim.',
      'The failure mode is named rather than averaged away: “others” is a heterogeneous catch-all with 282 test patches, of which 204 are predicted as fibroblast and 39 are right — an F1 of 0.164 that drags the macro-average down on its own. On the binary task, cancerous recall of 0.821 means roughly 18% of cancerous cells are missed, which is the clinically costly direction and is discussed as such.',
    ],
    shots: [
      {
        src: '/media/histo-patches.png',
        title: 'What the model actually sees',
        caption:
          'Eight example patches per class. At 27×27 pixels there is almost no context beyond the nucleus itself, and three of the four classes look broadly alike — epithelial is the one a human can pick out, which is exactly the pattern the results end up showing.',
      },
      {
        src: '/media/histo-kmeans.png',
        title: 'Raw pixels do not know the classes',
        caption:
          'K-Means at k=4 on the PCA features, cross-tabulated against the true cell types. Adjusted Rand Index 0.041 — the clusters are essentially unrelated to the labels. This is the evidence that the biology is not the dominant axis of pixel variation, and that a representation has to be learned rather than assumed.',
      },
      {
        src: '/media/histo-overfit.png',
        title: 'Textbook overfitting, left to be visible',
        caption:
          'Baseline CNN on the four-class task. Training macro-F1 climbs past 0.93 while validation stalls around 0.72, and the validation loss spikes hard at epoch 14. The spikiness is what motivated the learning-rate sweep; the widening gap is what motivated augmentation.',
      },
      {
        src: '/media/histo-augment.png',
        title: 'The gap closes',
        caption:
          'The same task, baseline against augmented. The train and validation curves now track each other in the 0.73–0.76 band instead of diverging. One honest caveat, stated in the report: the augmented run also uses the tuned learning rate, so the single headline number conflates two changes — the shape of the curves is the cleaner read.',
      },
      {
        src: '/media/histo-results.png',
        title: 'Test macro-F1 against the targets',
        caption:
          'Every model scored once on held-out patients, with the 0.90 and 0.60 target lines drawn in. Cell-type clears its bar; isCancerous misses. The Dummy classifier is on the chart deliberately — it takes 0.656 accuracy on the binary task and 0.396 macro-F1, which is the whole argument for not reporting accuracy under imbalance.',
      },
      {
        src: '/media/histo-confusion.png',
        title: 'Where it is wrong',
        caption:
          'The final binary model over 3,939 test patches: 289 non-cancerous cells called cancerous, and 243 cancerous cells called non-cancerous. The second number is the one that matters clinically, and it is the reason the report argues an honest 0.852 is worth more than an inflated 0.90.',
      },
    ],
  },
  {
    slug: 'os-primitives',
    name: 'Multithreaded File Copier & Custom Memory Allocator',
    short: 'Threads & Allocator',
    course: 'Operating Systems Principles',
    unit: 'RMIT · individual',
    role: 'Solo — both projects',
    term: '2025',
    kind: 'SYSTEMS PROGRAMMING',
    tagline: 'Two things you normally just call, implemented instead: a bounded work queue and a heap.',
    stack: ['C', 'C++', 'pthreads', 'mutexes & condition variables', 'sbrk', 'valgrind', 'make'],
    blurb:
      'Two projects in the same unit, both about implementing what a program normally takes for granted. First a multithreaded file copier — one thread per file, then a reader/writer team sharing a bounded queue. Then a heap allocator built directly on sbrk, with first-fit and best-fit as interchangeable strategies.',
    points: [
      'The single-file copier is a real producer–consumer: a team of reader threads pulls lines from the input, a team of writer threads drains them to the output, and a shared queue capped at 20 lines sits between them.',
      'Three mutexes with distinct jobs — one guarding the queue, one serialising reads of the input file, one serialising writes to the output — rather than one lock over everything, so readers and writers only contend where they genuinely share state.',
      'No busy-waiting anywhere. Two condition variables carry the handoff: readers wait on `not_full` when the queue is at capacity, writers wait on `not_empty` when it is drained, and main broadcasts on `not_empty` once reading is finished so no writer can block forever on a queue that will never fill again.',
      'Termination is the part that is easy to get subtly wrong: a writer exits only when the queue is empty *and* the reading-done flag is set, checked while holding the lock, so a writer can never mistake a momentary lull for the end of input. Verified under valgrind with no leaks and no errors.',
      'The allocator asks the kernel for memory itself via `sbrk` and keeps two intrusive linked lists — allocated and free — instead of leaning on the C library it is replacing. Requests are rounded up to size classes of 32, 64, 128, 256 and 512 bytes.',
      'First-fit and best-fit sit behind one function pointer, and `main` picks between them by inspecting `argv[0]` — so a single source file compiles to two binaries, `firstfit` and `bestfit`, that differ only in the strategy and can be run head-to-head on the same trace file.',
      'What it deliberately does not do is coalesce: a freed chunk goes back on the tail of the free list at its original size class, so adjacent free blocks are never merged. That is the honest limitation of the design, and the reason the two strategies diverge on a long allocation trace at all.',
    ],
  },
  {
    slug: 'cloud-music',
    name: 'Cloud Music — AWS Web App, Deployed to EC2 and ECS',
    short: 'Cloud Music (AWS)',
    course: 'Cloud Computing',
    unit: 'RMIT · team',
    role: 'Team of four',
    term: '2026',
    kind: 'CLOUD DEPLOYMENT',
    tagline: 'One backend, two deployment models, so the trade-off could be measured rather than argued.',
    stack: ['Python', 'Flask', 'boto3', 'Docker', 'AWS EC2', 'ECS Fargate', 'ECR', 'Lambda', 'API Gateway', 'DynamoDB', 'S3'],
    blurb:
      'A login-and-subscriptions music application on AWS, built by a team of four. Three DynamoDB tables behind a Flask backend, artist images in S3, a serverless path through Lambda and API Gateway, and a static frontend — with the same backend deployed twice, once onto an EC2 instance and once as a container on ECS Fargate.',
    points: [
      'The same Flask backend deployed twice — onto an EC2 instance and as a container on ECS Fargate — so the operational difference between a VM you patch and a task the platform replaces could be measured rather than argued about.',
      'Three DynamoDB tables — login, music and subscriptions — with the music table carrying a local secondary index and two global secondary indexes so it can be queried by year, by artist and by album rather than only by its primary key.',
      'The EC2 deployment runs Flask under gunicorn as a systemd service, so it survives a reboot rather than living in a terminal. An Elastic IP keeps the public URL stable across stop/start, and an instance profile grants DynamoDB and S3 access through the role instead of through keys baked into the image.',
      'Provisioning is scripted in two halves that do different jobs — one script for first-time install, one for redeploying after a pull — because conflating them is how a deploy script quietly reinstalls the world every time.',
      'The container path is the same application through ECR and ECS Fargate: a slim Python image with gunicorn on port 80, a task definition at 0.25 vCPU and 0.5 GB, and a service that holds a desired count of one and replaces the task when it dies. An Application Load Balancer sits in front with a health check on `/health`.',
      'A parallel serverless path — four Lambda functions behind an API Gateway REST API with CORS on every method — so the same operations exist as containers, as a long-lived VM process and as functions, and the three can be compared rather than argued about.',
      'Two S3 buckets serve the static frontend, one pointed at the EC2 backend and one at the ECS backend, identical but for a single `API_BASE` constant. It makes the decoupling literal: the same frontend, unchanged, in front of two completely different backend deployments.',
      'One constraint worth naming, because it shaped the design: CloudFront was evaluated as the CDN in front of S3 and abandoned — the AWS Academy lab role has no permission to create a distribution. The bucket policy enforces HTTPS via `aws:SecureTransport` instead.',
    ],
  },
  {
    slug: 'exam-solver',
    name: 'Exam Timetable Solver in Answer Set Programming',
    short: 'Exam Timetabler',
    course: 'Intelligent Decision Making',
    unit: 'RMIT · team',
    role: 'Team of three',
    term: '2026',
    kind: 'CONSTRAINT SOLVING',
    tagline: 'No search algorithm was written. The constraints were written, and Clingo did the rest.',
    stack: ['Answer Set Programming', 'Clingo', 'Python', 'Prolog', 'pytest', 'matplotlib'],
    blurb:
      'A university exam timetabler built in Answer Set Programming: real benchmark instances in the Examination Timetable Format, hard constraints that a calendar must satisfy and weak constraints it is scored against, solved with Clingo and then measured across time budgets, thread counts, constraint sets and weightings.',
    points: [
      'The problem is declared rather than searched. Exams, rooms, timeslots, student clashes, room capacities and durations are stated as rules and constraints in ASP, and Clingo finds and optimises the calendar — there is no hand-written search anywhere in the system.',
      'Hard and weak constraints are genuinely separated: a hard constraint eliminates an answer set outright, a weak one adds cost. That distinction is what lets the same encoding express “this must never happen” and “avoid this where you can” without collapsing them into one weighted mush.',
      'YAML instances are parsed into ASP facts by a Python front end, and solved calendars come back as TSV. An independent Prolog validator checks the output against the specification, so a calendar is verified by something other than the code that produced it.',
      'A pytest suite of purpose-built instances covers the constraints one at a time — each with an instance designed to be satisfiable, unsatisfiable, or to carry a specific cost — so a regression in one rule fails a named test rather than silently shifting a total.',
      'Experiments were scripted rather than run by hand: a harness sweeps time limits, thread counts, per-constraint configurations and weight settings, writes results to CSV with metadata, and a second script turns those CSVs into the charts below. Any number in the report can be regenerated from the raw run.',
      'Two of the experiments returned nothing, and that is a result too. With a fixed time budget, wall-clock time is pinned to the budget regardless of thread count — 324.7s against 324.8s across one to twelve threads — so parallelism has to be judged on solution quality, not on time, which is what the threads-versus-cost chart measures instead.',
    ],
    shots: [
      {
        src: '/media/asp-convergence.png',
        title: 'What another minute of solving buys',
        caption:
          'Best cost found against time limit on a log scale, five repeats per point, with the min–max band shaded. Cost falls from roughly 9,800 to 7,200 as the budget goes from 30 seconds to half an hour — steadily, with no plateau in the measured range, which says the solver was still improving when the budget ran out.',
      },
      {
        src: '/media/asp-threads.png',
        title: 'Parallelism, and the point where it stops paying',
        caption:
          'Threads against best cost at a fixed 300s budget. The curve is not monotonic: two threads is markedly worse than one, four recovers, eight is the best of the set and twelve is slightly behind it. Portfolio-based parallel search does not simply divide the work, and the chart shows where the returns actually stop.',
      },
      {
        src: '/media/asp-constraints.png',
        title: 'Which constraints cost what',
        caption:
          'Best cost within 600s with each room constraint enabled in turn against the baseline. Enforcing and differentiating rooms lowers total cost; exclusive and unavailable rooms raise it. Measuring them one at a time is the only way to attribute a cost change to a specific rule rather than to the encoding as a whole.',
      },
      {
        src: '/media/asp-hard-soft.png',
        title: 'The same rule as a hard constraint and as a preference',
        caption:
          'One constraint expressed four ways — off, soft at weight 5, soft at weight 50, and hard — with base cost and penalty stacked. The hard version reaches the lowest total, and soft50 is barely better than disabling the rule: past a point, a penalty large enough to matter just gets paid.',
      },
    ],
  },
  {
    slug: 'flight-routing',
    name: 'Flight Routing & Trip Planner in Prolog',
    short: 'Prolog Flight Planner',
    course: 'Intelligent Decision Making',
    unit: 'RMIT · individual',
    role: 'Solo — implementation',
    term: '2026',
    kind: 'LOGIC PROGRAMMING',
    tagline: 'Finding the cheapest trip without being allowed to collect the alternatives and sort them.',
    stack: ['SWI-Prolog', 'Declarative programming', 'Recursion', 'Negation as failure'],
    blurb:
      'A flight network reasoner in pure Prolog: a route database, path validity and non-redundancy, the cost and duration of a trip, then trips bounded by a budget and finally the best trip under a chosen criterion — written under language restrictions that remove almost every shortcut.',
    points: [
      'The restrictions are the assignment. No `findall`, `setof`, `aggregate`, `forall`, `assert`, `retract` or `fail` — which rules out the obvious approach of gathering every candidate route into a list and picking the minimum. Everything has to be expressed as relations and recursion.',
      'So superlatives become negations. “The cheapest flight out of Toronto” is written as a flight for which no cheaper flight exists; “the most expensive airport tax” the same way. Negation as failure replaces the aggregate, and it only works because the search space is finite and ground — which is the point the exercise is making.',
      'Trip pricing carries state through the recursion rather than post-processing it: an airport tax applies on the first leg and again only when the airline changes, so the accumulator has to remember which carrier the previous leg used. Staying on one airline through a connection is genuinely cheaper, and the predicate has to model that.',
      'Bounded trips prune during the search instead of after it — the running cost is checked against the limit at every leg, so a path that has already blown the budget is abandoned rather than completed and then discarded.',
      'Best trip is built from bounded trip by iterative tightening: find any trip, use its cost as a ceiling, ask for something strictly cheaper, repeat until nothing cheaper exists, then re-solve at that bound. It is branch-and-bound written in a language that will not let you hold the candidates in a list.',
      'The route database stores each connection once and a bridging rule makes flights bidirectional, so the network cannot drift out of sync with itself — and a visited-city list threaded through the recursion is what stops the whole thing looping forever on a cyclic graph.',
    ],
  },
  {
    slug: 'goat-debate',
    name: 'The GOAT Debate — YouTube Comment Network Analysis',
    short: 'GOAT Debate Analysis',
    course: 'Social Media & Network Analytics',
    unit: 'RMIT · team',
    role: 'Team project',
    term: '2026',
    kind: 'NLP + NETWORK ANALYSIS',
    tagline: 'Who bridges football’s greatest-of-all-time argument, and who only ever talks to their own side.',
    stack: ['Python', 'NetworkX', 'transformers', 'BERTopic', 'gensim', 'NLTK', 'YouTube Data API'],
    blurb:
      'A six-stage pipeline over YouTube comment data on football’s greatest-of-all-time argument: collection, exploratory analysis, sentiment, topic modelling, a comment network, and finally homophily and influence over that network.',
    points: [
      'Six stages as six separate notebooks, each writing its outputs to disk and each runnable on its own, so a change to the topic model does not mean re-scraping the data.',
      'Sentiment scored twice — with VADER and with RoBERTa — so a lexicon method and a transformer can be compared on identical comments rather than one being trusted by default.',
      'Topics extracted with both LDA and BERTopic, for the same reason: two models that disagree about what an argument is about is information, and a single model’s topic list looks authoritative whether or not it deserves to.',
      'The comment graph analysed for betweenness centrality to find the accounts bridging the two camps, Louvain communities to find the camps in the first place, and assortativity to measure how much each side only ever replies to itself.',
      'Influence modelled as cascades over the network, with a sensitivity sweep rather than one run — a cascade result from a single parameter setting says more about the parameter than about the network.',
      'An earlier solo assignment in the same unit built the collection half of it: YouTube Data API scripts targeting the 2026 Australian Grand Prix across six query sets, and a text pipeline where the interesting problem turned out to be stopwords — the standard NLTK list left “f1”, “race” and “car” dominating every frequency count, so the domain-specific list had to be built by hand before the topics underneath were visible.',
    ],
  },
  {
    slug: 'kali-security',
    name: 'GPG File Exchange & iptables Firewall Lab',
    short: 'GPG & iptables',
    course: 'Introduction to Cyber Security',
    unit: 'RMIT · individual',
    role: 'Solo — implementation and write-up',
    term: '2025',
    kind: 'APPLIED SECURITY',
    tagline: 'Both built by hand at the command line, until neither one is an abstraction any more.',
    stack: ['GPG', 'RSA', 'iptables', 'Kali Linux', 'Bash', 'Linux user administration'],
    blurb:
      'Two hands-on labs in Kali Linux. First a three-party encrypted exchange built from real Linux accounts and real RSA keys. Then a firewall built rule by rule with iptables — default-deny policies, per-host and per-range exceptions, and the difference between dropping a packet and refusing it demonstrated rather than described.',
    points: [
      'Three separate Linux users, created and administered, so the exchange happens between actual accounts with actual permissions rather than three directories pretending to be people.',
      'An RSA key pair per user, public keys exported armoured and imported by the others, then messages encrypted so that only the intended recipient can open them — including deleting a secret key and confirming exactly what that does and does not make unreadable.',
      'Digital signatures in both forms, embedded and detached, each transmitted and then verified from the receiving account — which is the half that proves who sent a file, as opposed to who is able to read it.',
      'The firewall starts from default-deny: INPUT and FORWARD policies set to DROP and OUTPUT to ACCEPT, so every allowance afterwards is explicit and the failure mode of a missing rule is a blocked packet rather than an open one.',
      'Rules written at the granularity the scenario actually needs — multiport matching for HTTP and HTTPS together, `iprange` to admit one team’s address block to a single port, and FORWARD rules to control traffic passing through the host rather than landing on it.',
      'DROP against REJECT tested rather than asserted: the same `scp` attempted under each policy, timing out under one and being refused immediately under the other. Both labs are evidenced step by step, so the attempts that failed are on the page next to the ones that worked.',
    ],
  },
  {
    slug: 'minecraft-maze',
    name: 'Maze Generation & Pathfinding in Minecraft',
    short: 'Minecraft Mazes',
    course: 'Programming Studio 2',
    unit: 'RMIT · team of three',
    role: 'Team of three — shared implementation',
    term: '2024',
    kind: 'ALGORITHMS IN C++',
    tagline: 'A maze you can walk through, which is a stricter problem than one you can print.',
    stack: ['C++', 'mcpp', 'Minecraft', 'LC-3 assembly', 'GCC', 'Git'],
    blurb:
      'A C++ program that builds mazes inside a running Minecraft world through the mcpp API and then helps a player find the way out again. The two halves are chosen to fit each other: Recursive Division carves the maze, and Wall Follower solves it. The same unit carried a separate LC-3 assembly component underneath.',
    points: [
      'Recursive Division generates a perfect maze — the term of art for one with no loops, and exactly one path between any two cells — by repeatedly splitting the region with a wall and knocking a single gap in it.',
      'Wall Follower solves it, and the pairing is the point rather than a coincidence: keeping one hand on the wall is guaranteed to reach the exit only when the maze is simply connected, which is exactly what Recursive Division produces. Add one loop to the maze and the same solver can circle inside it forever.',
      'The maze is built in a real world rather than an empty grid, so the terrain is flattened first — the ground Minecraft supplies is not level, and a wall placed on a slope stops being a wall.',
      'Construction is dynamic and three-dimensional through the mcpp API: the maze is placed into the live world as blocks, and a player walks the same structure the algorithm just generated.',
      'Real-time pathfinding assistance for a player navigating the generated maze, rather than a solution printed once and left on screen.',
      'The unit also required the same primitives written a level down, in LC-3 assembly — loops, branches, subroutines and memory operations built by hand, on a machine with no abstractions to borrow.',
      'Built by three of us on GitHub. It is the earliest work on this site, and it is here because the algorithm choice is the kind of decision the later projects are made of.',
    ],
  },
  {
    slug: 'food-loss',
    name: 'Global Food Loss Awareness — Data-Driven Web Application',
    short: 'Food Loss',
    course: 'Programming Studio 1',
    unit: 'RMIT · pair',
    role: 'Pair programming — shared implementation',
    term: '2024',
    kind: 'FULL-STACK WEB',
    tagline: 'The first thing I built with a database behind it.',
    stack: ['Java', 'Javalin', 'JDBC', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Git'],
    blurb:
      'A full-stack web application about global food loss, built to present the data and let a reader draw their own conclusion rather than argue a case at them. A plain HTML, CSS and JavaScript front end over a Java back end on Javalin, talking to SQLite through JDBC.',
    points: [
      'The back end is Java on Javalin with JDBC to a SQLite database — a real server and a real query layer rather than a page with the numbers typed into it.',
      'The front end is plain HTML, CSS and JavaScript, written before any framework was on the syllabus, which is the reason the later React work has something to compare against.',
      'The subject is a social one, and the brief was to present the data without editorialising — so the design problem was making a genuinely unpleasant dataset readable without deciding for the reader what to feel about it.',
      'Taken to real users for usability testing and then changed on what they said, rather than being demonstrated once and marked. Several of the changes were to things we had been certain about.',
      'Built as a pair, coordinated over MS Teams with GitHub for version control — the first project where merging someone else’s work was a thing I had to be good at.',
    ],
  },
];
