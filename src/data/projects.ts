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

/** One of "the hard parts": a decision or a bug worth asking about in an
 * interview. `head` is its point in a line, so the list can be skimmed;
 * `body` makes the case; `more`, where a story runs long, is the rest of it,
 * folded under the body. */
export interface Note {
  head: string;
  body: string;
  more?: string;
}

/** A topic's worth of further notes, folded shut under the ones shown in full. */
export interface NoteGroup {
  title: string;
  /** One line on what the group covers, readable while it is still closed. */
  caption: string;
  notes: Note[];
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
  /** The image that stands for the project: its home-page card, the panel at
   * the top of its sheet and its link preview. Defaults to the first
   * screenshot; set where that one isn't the strongest. */
  hero?: string;
  /** The architecture, top to bottom. Rendered as a labelled spine (L00, L01…). */
  layers: string[];
  stack: string[];
  metrics: Metric[];
  blurb: string;
  /** "The hard parts" — the decisions worth asking about in an interview. */
  highlights: Note[];
  /** More of them, folded by topic under the ones above: for a sheet with more
   * decisions worth naming than anyone reads in one sitting. */
  moreHighlights?: NoteGroup[];
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
  /** The note in two sentences, shown on its own with the full note behind a
   * "How these were captured" expander — for notes long enough to bury the
   * screenshots they describe. */
  noteSummary?: string;
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

/** The image a project leads with: its chosen `hero`, else the first real
 * screenshot — a walked-through step where there is one, then a loose shot —
 * and only as a last resort the trailer's poster. The poster is a designed
 * title card with a play triangle on it, so using it as a thumbnail makes a
 * project card read as a video rather than as software. */
export function heroShot(p: Project): string | undefined {
  return p.hero ?? p.flows?.[0]?.steps[0]?.src ?? p.shots[0]?.src ?? p.trailerPoster;
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
      'Two Android apps wrapped with Capacitor — the main one loads the live site and updates itself',
      '89 Deno edge functions — the only privileged write path',
      'PostgreSQL on Supabase · 54 migrations · RLS on every table',
      'Claude Opus 5 assistant with 40 tools, behind approval, on de-identified records',
      'Claude Sonnet 5 WhatsApp agent with 15 tools, held to rules enforced in code',
      'WhatsApp Business via Twilio · Meta-approved templates in English and Bahasa',
      'Google Drive, Calendar and Meet (service account and OAuth)',
      'Firebase Cloud Messaging push · in-app bell',
      'Nightly AES-256-GCM encrypted backup to Drive · 30 copies kept',
      '1,975 unit tests across 99 files · 48 conversations against the real model',
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
      'Google APIs',
      'Firebase Cloud Messaging',
      'pdf.js',
      'Tailwind CSS',
      'Vitest',
    ],
    metrics: [
      { value: '89', label: 'edge functions' },
      { value: '54', label: 'migrations' },
      { value: '1,975', label: 'unit tests' },
      { value: '40', label: 'assistant tools' },
    ],
    blurb:
      'I spent three years as a medical assistant digitising patient records by hand. This is the software that replaced that job. It started as something I built for myself to use, and the practice now licenses it on a paid monthly subscription: patients, appointments, billing, insurance claims, clinical documents and messaging in one place, on the web and on Android. Patients now book, move and pay through a WhatsApp assistant that holds the conversation itself, inside rules the code enforces.',
    highlights: [
      {
        head: 'The browser only ever holds a read-only key',
        body:
          'Every write goes through an edge function, so the privileged path is a list of 89 named functions, not a database the client can reach. A stolen key from a laptop in a consulting room reads nothing it should not and writes nothing at all.',
      },
      {
        head: 'Eleven tables answered the public key',
        body:
          'That was the design, and for a while it was not what was running. A migration had converted every “allow read for all” policy to an authenticated-only one, but on the live database row-level security was switched off, and a policy on a table with RLS off is inert. Measured with nothing but the public anon key, no login and no session, eleven tables still answered: patients, medical records, history events, billing, files, generated documents, WhatsApp messages and four more. One of those rows was a real patient’s name, and that key ships inside the client bundle. The fix re-asserts the same expression the working tables already use, every step idempotent so it converges from any starting point, and turns RLS back on first, which was the step doing the real work.',
      },
      {
        head: 'A stranger could have pointed the backups at their own Drive',
        body:
          '`google-oauth-callback` is public by necessity (Google redirects a browser to it, and that carries no session), and what it did with that request was exchange any code it was handed and write the resulting refresh token in as the practice’s own, unconditionally. The client id and redirect URI both ship in the client bundle because OAuth requires them to, so anyone could build the consent URL, approve it with their own Google account, and let Google redirect them here; from that moment the nightly backup — every table, every patient, one gzipped file — and every generated report and signed claim would upload to a stranger’s Drive, with nobody at the practice doing anything or seeing anything.',
        more:
          'The missing piece was `state`, and it cannot live in the browser: the callback is a top-level redirect, not a fetch from the app, so it cannot read sessionStorage. It is minted server-side behind a real dashboard session, stored, and consumed exactly once, constant-time, within fifteen minutes. Building the URL server-side had a second effect worth having: the client id and redirect URI no longer ship in the client bundle at all.',
      },
      {
        head: 'The model gets patient numbers, not names',
        body:
          'There is no BAA and no zero-retention arrangement (both were looked at, and ruled out as impractical to obtain from Indonesia), so the lever left is to send less. Every patient carries a number now, and the number is what goes out: names are scrubbed on the way to the API and restored on the way back, including in the arguments the model hands a tool, without which it passes P-0042 as the name to search for or print on a document.',
        more:
          'Values are walked, not serialised, because a name containing a quote appears escaped in JSON, so a scrub misses it and a rehydrate leaves a string that no longer parses: both failures silent, both on real names. `patient_number` is NOT NULL with its allocation as the column default, which matters more than it looks: the scrubber is a no-op given an empty number, so a nullable column would turn “we forgot to set it on this path” into “this patient’s real name went to the API”, silently, with every test still green. Chat titles used to come off Claude Fable 5, a Covered Model carrying 30-day retention, which made one sidebar label the practice’s entire retained footprint at Anthropic — and its own prompt asked for a patient name. Titles come from her own words, locally, now.',
      },
      {
        head: 'The model runs the chat; the code holds the rules',
        body:
          'The WhatsApp assistant used to feel like a chatbot because it was one: a state machine walking a patient through fields, with the model asked only narrow questions along the way — which intent is this, extract the name from this reply. So when it asked for a full name and the patient asked something else, the something else became their name, and no prompt fixes that shape, because the form had decided what a message was before anything had read it. Claude Sonnet 5 runs the conversation now, and what must never go wrong is still enforced in code rather than left to the model.',
        more:
          'It reads the whole chat, answers what was asked, and acts through fifteen tools — check the diary, propose a booking, a move, a switch between in person and online or a cancellation, file documents, start a claim, send a receipt, hand over to the team. Nothing changes the diary on its say-so: it proposes, the proposal is shown to the patient, and only a yes that arrives after that message went out lets the booking through. A slot is re-checked against the calendar at the proposal and again at the yes. It never sees a known patient’s name or anyone else’s appointments. And a number gets one turn at a time, so three quick bubbles are read together as one message, a screenshot waits for the words sent after it, and a turn that dies is taken over before it can wedge the chat.',
      },
      {
        head: 'One screenshot could settle two bills',
        body:
          'A payment screenshot used to settle any open invoice for the same amount, and nearly every invoice is the one standard fee, so the same screenshot sent twice settled two. Nobody had to be dishonest: a parent with two children’s bills on one phone, re-sending because the first seemed slow, was enough. Every screenshot counted against an invoice now leaves a fingerprint (the image’s SHA-256, the bank reference read off it, and its amount, date and time), and one that matches an earlier fingerprint can’t count again.',
        more:
          'The reference is what survives WhatsApp recompressing a photo re-attached from the gallery, and amount plus date is only trusted alongside a legible time, since the same fee on the same day is two children’s consults, not one transfer. A repeat leaves the bill open and still on reminders, tells the patient the screenshot has already been used (never whose it was) and raises a notification; a transfer that plainly went to someone else’s account goes to review. What a screenshot came to is decided by the code and answered by the code: handed “Thanks, payment received!” to pass on, the model once asked the patient whether it was for their upcoming appointment.',
      },
      {
        head: 'Offered times pack her day without gaps',
        body:
          'She hates gaps in her day, and the times offered used to be an opening-time grid, which got an empty day right and little else: after a 30-minute call at 4:00, the 20-minute in-person grid offered 4:40 and left ten minutes dead. Which free times are offered is now decided by how well each one packs against what is already booked: filling a hole before extending either end of the day, a perfect fit before a partial one, with both sides of every booking as candidates, which is what lets a 20-minute visit follow a 30-minute call.',
        more:
          'In person fills from the start of clinic; online starts whenever the first call does. Patients are only offered back-to-back times, and a time she types that would leave a gap gets one tap to the time that wouldn’t. A day can hold more than one block (a morning clinic, a break, the afternoon), and each is packed on its own. And two people confirming the same slot within seconds both used to get it, because every path checked the diary at the start of the request and then waited on a model call before writing; each path now looks again straight after writing, and the later booking gives way and is offered what is still open that day.',
      },
      {
        head: 'Built for a doctor in her sixties, on her phone',
        body:
          'She does not much like computers and uses it mostly between patients, so the design is a set of rules rather than a preference. Nothing smaller than 13px, on a six-step scale; it used to run from 9.5px, with 429 of 657 sized elements under the floor. The phone’s own font-size setting is passed through to the WebView and honoured up to 160%. Targets are 44px on a phone and 48px where a mistake costs something. No icon without a word, because on a phone there is no hover to reveal a tooltip. Below 760px every table becomes a list of cards, so nothing is ever reached by dragging a table sideways. And the app asks its own questions and never uses the system dialog, which in an installed app is a grey box with an internal address on it that she has been trained to dismiss unread.',
      },
    ],
    moreHighlights: [
      {
        title: 'Keeping the records safe',
        caption: 'What the model is never shown, who can sign in, and getting back a deleted patient or the whole database.',
        notes: [
          {
            head: 'Dates of birth, phones and addresses came out too',
            body:
              'Taking names out was only a first pass, because a name is not the only thing that says who somebody is: the record tools still returned date of birth, gender, phone and address beside it, and the assistant was observed reciting all three straight back. They are gone from what the model sees, and nothing needed them there: the tools that genuinely act on a phone number look it up server-side from the patient id and never hand it over, and every WhatsApp number a patient writes from is redacted on the way out. Insurance forms were the hard case, because the model lays the identity fields itself onto a page that must print them. They used to go out as masks of the same shape (“Xxxxx Xxxxxxxxx”, “00 Xxxxx 0000”) to be swapped back afterwards, which held for a box that took the whole value and nowhere else: real forms split a name into first and family names and a date of birth into day, month and year boxes, the model split the mask the same way, and on every real form tried that split either value the placeholder itself would have printed on the signed claim. They go out as named pieces now (first name, day of birth, month) that the model places wherever the form wants them and the code fills in afterwards. The visit’s own dates go the same way although they are not private, because a date the model has to reformat is a date it can get wrong: on one insurer’s form it wrote “3” in the day box for the 30th. A token can only be copied. What still goes, and none of it is fixable here: the scans an extraction call exists to read, where the name is pixels; the first words of somebody not yet on file, before there is a number to swap in; and partner-hospital bookings, which name the patient to the hospital by design.',
          },
          {
            head: 'No screenshots, no local copies, no debuggable APK',
            body:
              'Patient files are never committed and never cached locally. Google Drive is the authoritative store through a service account; Supabase holds only the structured data extracted alongside it. Both Android apps set FLAG_SECURE, so there are no screenshots and no patient record showing in the recent-apps thumbnail, and an optional PIN locks the screen after two minutes away. The APK she carries is signed with a real release key, not the universal Android debug key that any app can also sign with: the build script produced a debug APK, and a debug APK is debuggable. Plug the phone into a laptop, open chrome://inspect, and whatever record is on screen is readable, which is precisely what FLAG_SECURE was added to prevent. Where the keystore file is absent, on a fresh clone or for anyone who only builds debug, no signing config is created at all and the release build comes out unsigned, which is the honest outcome; silently falling back to the debug key would look like it had worked.',
          },
          {
            head: 'Two-step sign-in, on her terms',
            body:
              'Two-step sign-in sits in Settings beside the screen lock and, like the lock, stays off until she turns it on: a second step nobody chose is one that gets worked around. The password stays shared between her and the nurse, which is a decision about how the practice runs; what changes is that a shared password is no longer the only thing in front of every patient record. The gate asks for the code on every pass, not only after the password screen, because a session restored from storage arrives at aal1 and would otherwise walk straight past it. The SQL that requires aal2 to read is deliberately not a migration: `db push` runs migrations, and a file that can lock the practice out of its own records should never run because somebody deployed.',
          },
          {
            head: 'A deleted patient can come back for 30 days',
            body:
              'Deleting a patient was final. Drive’s trash covered the files, but the extracted record (every visit, allergy and billing line) was gone the instant the confirm was dismissed, and on a phone OK sits under her thumb. The delete now snapshots those rows first and a restore replays them, with Settings → Recently deleted as the way back for 30 days, matching Drive’s own window. It still asks her to type the patient’s name.',
          },
          {
            head: 'A deleted patient kept getting payment reminders',
            body:
              'Deleting a patient left their unpaid invoice behind, and the invoice went on chasing them. The delete archived seven tables and cascaded an eighth; `payments` was in neither list, has no foreign key to the patient, and is the only table the payment-reminder sweep reads. So a deleted patient stayed billable and kept being chased for money on the agreed schedule, by the name and number stored on the payment row, while the dialog she had to type a name into to confirm told her billing had been removed. The two table lists were duplicated, each carrying a comment warning that a new table “belongs in this list”; `payments` was added to the schema and put in neither, which is the very failure those comments were written to prevent. They are one list now.',
          },
          {
            head: 'The nightly backup moved off my laptop',
            body:
              'It started as a Windows scheduled task, which only works if that specific machine is on at 3am, in the timezone it was registered in, with its credentials still in place, and fails silently the week anyone travels. It now writes the whole database to Drive as one gzipped file at 03:00 Jakarta, thirty copies kept, older ones moved to Drive’s trash, not destroyed, so even the pruning is reversible. Pruning happens only after the upload succeeds, because the other order throws away a good backup to make room for one that never arrived. Uploaded with her OAuth token, because the service account has no Drive storage of its own.',
          },
          {
            head: 'The backup is encrypted with a key Google doesn’t hold',
            body:
              'That one file is the entire patient database, and Drive encrypts it already — with Google’s keys, so it decrypts transparently for anyone who can authenticate as her Google account, which the OAuth hole above had just finished demonstrating was not necessarily only her. AES-256-GCM now, a fresh IV every night, gzip first and encrypt second because ciphertext does not compress and the other order multiplies her Drive usage by the compression ratio, which on base64 signature images and stored document HTML is large. Honestly not end-to-end: the key is an Edge Function secret, so a compromise of Supabase yields both it and the database. Accepted on purpose, because it still splits one point of failure into two and the one it removes is the one this practice has been exposed through. A key living only on her phone would be stronger, and would also mean a lost phone loses every backup permanently. The key is required, not optional: with it unset the run fails loudly onto System health, because a backup quietly written in the clear on a night somebody believed it was protected is the worse outcome. The restore tool is Node and the writer is Deno, so they cannot share a module and the container format is spelled out in both: the arrangement that rots quietly, where the consequence of rotting is finding out the only backup cannot be opened on the day it is needed. A round-trip test encrypts with the real writer and decrypts with the real reader on every run, and old plaintext backups still age out on the same 30-day rotation, so none of them outlives the encrypted ones.',
          },
        ],
      },
      {
        title: 'Her assistant',
        caption: 'Claude Opus 5 with 40 tools: what it can do, what it deliberately can’t, and what it all costs.',
        notes: [
          {
            head: 'Her assistant went from 8 tools to 40',
            body:
              'Claude Opus 5 runs the practice with her rather than beside it: 40 tools instead of the original eight, organised by area — the diary (book, move, cancel, switch between in person and online, block time, change one day’s hours or the standing week, set leave), a patient’s record, numbers and her own consultation notes, WhatsApp in both directions including taking a conversation off the assistant and handing it back, invoices and insurance claims, and the practice’s own details. It got there because two answers on one afternoon were both true and both useless: asked to invoice a patient she had just seen, it said it could not read the consultation notes; asked to check whether he wanted an appointment, it said its only outbound channel was sending a document. That is a search box with manners, not an assistant. She can reach it from her own phone, too: a message from her number to the practice’s WhatsApp goes to her assistant, never to the patient agent, and five minutes before every appointment it messages her the patient, the reason for the visit and, when it is online, the Meet link.',
          },
          {
            head: 'What her assistant deliberately can’t do',
            body:
              'What it deliberately cannot do is the more interesting half. No shell, no SQL, no HTTP: every tool is a named operation with a schema, so it cannot reach outside this practice’s data. It cannot delete a patient, a record or a history event; those stay on the pages that ask twice. It cannot skip a scheduling guard; the check that asks her before stranding a patient asks it too. Booking, moving and cancelling tell the patient by default, and every tool reports what went out, so “no number on file” can never read as “sent”. Who WhatsApp may reach at all is one gate with three states, where there used to be thirteen copies of a comma-split: unset means silence, because a misconfigured deployment must fail closed; a list means the list; and only the exact value “*” opens it to everyone. That is a value someone has to type, because opening it is a decision about patient safety, not the consequence of clearing a secret.',
          },
          {
            head: 'Long turns run in the background',
            body:
              'A turn no longer runs on the request that started it. Twenty rounds of Opus at maximum effort against a Supabase function timeout meant a turn that ran long left her message with no answer while the tools had already fired — real WhatsApp messages to real patients, a real invoice, a signed claim, and a chat showing none of it. The likeliest next thing she does is say it again, which does all of it twice.',
          },
          {
            head: 'One endless thread became searchable chats',
            body:
              'The assistant page was one endless thread: every instruction she had ever given in one list, with the last thirty turns replayed to the model regardless of subject, so this morning’s diary question was answered with last week’s invoicing sitting in front of it. It is a titled, searchable list of chats now, opening on a new one each time, named from her opening words by the smallest model there is.',
          },
          {
            head: 'The AI cost card counted one call site in eight',
            body:
              'The usage card in Settings said “AI assistant usage” and counted one path out of eight: the assistant she talks to on the AI page. Everything else went to the function logs and nowhere else: the WhatsApp assistant making three or four calls for every patient message, reading a new patient’s Drive folder a document at a time on the most capable model, every consultation report, medical certificate, insurance form and payment screenshot. So the one number she had was reliably the small half of the bill, under a heading that reads as the whole of it. All eight call sites record through one module now, best-effort by construction: it never throws and skips silently where there is no service key, because a failure to record what something cost must never be the reason the thing itself failed. The migration that turns it on drops the rows already there, so one corner of August’s spend is never added to the whole of the rest of it in the same figure, and stamps the date so the card can say “since 30 August”. Dollars lead and rupiah sits underneath, because only one of the two is a fact: Anthropic bills USD and that is what is stored, converting on the way in would freeze one day’s guess into the row forever, and the 3% an Indonesian card adds is an assumption the card labels as one.',
          },
          {
            head: 'WhatsApp’s bill, read from Twilio’s own ledger',
            body:
              'Beside it sits what WhatsApp costs: the other bill, and the one with a fixed floor. It is read from Twilio’s own billing ledger, not priced locally, because Twilio doesn’t know what a message cost until hours after it is billed, and a local price table would drift every time Meta changes its rates. The catch is that usage categories are a hierarchy returned flat (the total contains phone numbers and channels, channels contain messaging, messaging contains inbound and outbound), so adding up the rows gives $14.13 for a $4.11 bill and looks entirely reasonable. The total comes from the total row, the breakdown from named leaves only, and the remainder by subtraction, so a category Twilio adds later makes the remainder bigger rather than the total wrong; the test fixtures are real rows from the account. And the credit runway refuses to answer until there is a week of spend to divide, because two days extrapolated to a year is not information.',
          },
        ],
      },
      {
        title: 'WhatsApp',
        caption: 'Buttons instead of typing, a form for a new patient’s details, and two ways messages went missing without anyone noticing.',
        notes: [
          {
            head: 'Patients tap buttons instead of typing',
            body:
              'The model can offer up to three buttons or a list of ten (in person or online with each fee, the days and times the diary has, which person, yes or no), made per message through Twilio’s Content API, which needs no Meta approval inside the 24-hour window, and deleted when the next one replaces them; if Twilio refuses, the same options go as a numbered list. Buttons can only answer one question, so a message asks one thing, always: measured against the real model, two in five first replies to “Appointment please” asked two things at once and offered nothing to tap, and after the change eight of eight asked one. One phone is often a whole family’s, so who an appointment is for is the first question, with a button per person on file, and the booking tool refuses a person on file unless the patient said who, because the failure it prevents is a parent tapping Yes on their own phone and booking their child’s appointment in their own name.',
          },
          {
            head: 'New patients fill in a form, not a chat',
            body:
              'A new patient’s details never come from the chat, where a typo goes straight onto the record. They fill in a Google Form in the practice’s own account, linked from the chat with a reference that ties the answers back to it; the form’s Apps Script posts them to the webhook with a secret only it and the app know, and an answer that can’t be matched is never guessed: it waits in the form’s responses and she is told. A patient writing from a number the practice doesn’t know is asked, in her words, whether they are the person on file with the same name and date of birth — without ever naming who that is. When someone says no and was wrong after all, the patient page merges the two records: the Drive folder moves first, because that is the part that can fail halfway and a retry finishes it; then one transaction moves visits, bills, documents, payment proofs, claims, numbers and chat state across; and Settings can separate them again for thirty days.',
          },
          {
            head: 'Messages outside the 24-hour window used to vanish',
            body:
              'WhatsApp only delivers a freely worded message within 24 hours of the patient last writing in, and Twilio doesn’t refuse the send: the API call succeeds, the message is logged, the Messages page shows it in the thread, and error 63016 lands on a webhook seconds later with nobody reading it. The patient never gets the message and nobody finds out. The window is now checked before sending, not learned from the failure: the usual wording while it is open, a template Meta approved word for word once it has closed, in English or Bahasa, and an honest refusal while a template is still in review. A document for someone outside the window is held rather than refused: they are sent a template asking them to reply, and everything held for them goes the moment they do, oldest first, the prescription still ahead of the bill. Every message the practice sends now shows WhatsApp’s ticks, and “Not delivered” with the reason when one never arrived, which used to look just like one that had.',
          },
          {
            head: 'The Messages page showed 26 of 50 chats',
            body:
              'On 10 October the Messages page listed 26 of the practice’s 50 WhatsApp chats. Nothing had been deleted; every message was in the database. The list was built from the newest 500 messages, whoever sent them, so anyone who hadn’t written since the 7th had dropped off it, and every new message pushed someone else off. The same flaw sat in three more places: her assistant’s “who needs me?”, which missed the people who had been waiting longest; the stop-the-assistant switch, which read through PostgREST’s 1,000-row cap without an error and would have stopped the assistant in 43 of the 50 chats while it went on answering the seven newest; and threads, which stopped at their oldest 500 messages, so a long chat would have lost its newest. A view now gives one row per chat, read under the same row-level rule as the messages themselves, and everything else reads in pages; the tests rebuild that day’s table and fail on the old code.',
          },
        ],
      },
      {
        title: 'Her hours',
        caption: 'Two kinds of appointment on one diary, and what happens to the people already booked when her hours change or she runs late.',
        notes: [
          {
            head: 'In person and online keep different hours',
            body:
              'She sees patients in person at a partner hospital from four to six, and online by video from four to nine: twenty minutes for an in-person visit, thirty for an online one. None of that could be said: there was one `weekly_hours` column and every booking path wrote a hardcoded thirty minutes. So every online patient who asked for anything after six was told the practice was closed, which it is not — a booking simply lost, and lost by the WhatsApp assistant unattended, at a time of day she would never see it happen. In the other direction each in-person visit reserved half an hour of a two-hour afternoon, holding ten minutes nobody could be booked into, six times over.',
          },
          {
            head: 'Two schedules, one diary',
            body:
              'What splits is the open hours and the appointment length, and nothing else. She is still one person, so the diary stays shared: everything on the calendar is busy time for both, and a 4:20 in-person visit blocks the 4:00 online slot that would have run over it. Refusals name the kind, because “that’s outside her working hours” was true of one schedule and false of the other, while “outside her in-person hours, she may still be free online then” is a sentence the assistant can act on. And setting a weekly schedule now requires naming which one: picking silently would write the change to a week she never mentioned and leave the other, quite possibly the one she meant, wrong.',
          },
          {
            head: 'Changing her hours asks before stranding anyone',
            body:
              'Closing a day, changing one day’s hours, taking a special opening away, changing the weekly hours, taking leave and blocking time all stop new bookings and touch nobody already booked, and every one of them saved without a word, so a patient booked on a day she had closed stayed booked, wasn’t told, and would have come. All of them now ask first. The dashboard answers with each stranded patient, soonest first, with Open to cancel or switch them right there, then “… anyway” or “Never mind”; her assistant names them and asks whether to cancel, move or go ahead. With Google unreachable the change is still saved, because her hours are hers to change, and she is told nobody could be looked for.',
          },
          {
            head: 'Running late tells everyone still waiting',
            body:
              'Running late used to message one person: whoever was next. It now reaches everyone still waiting (the one in the room, the rest of the afternoon, someone added by name or number), each with their own name and time. A reason she types goes to the model and comes back as one calm sentence in English and Bahasa, written for several people reading at once, so “mrs tan consult ran over” becomes “An earlier appointment has taken longer than expected”, with nobody’s name and no clinical detail. The draft dims while it is being reworded and Send waits for it, so nothing goes out in a wording she hasn’t read. And the delay carries on after the message: the assistant tells anyone who asks the time they are now expected, not the time they booked, and their reminder waits for it.',
          },
        ],
      },
      {
        title: 'Documents and claims',
        caption: 'Insurers’ own forms, a signature that only goes on after she has read the page, and documents that arrive in order.',
        notes: [
          {
            head: 'Claims go on the insurer’s own form',
            body:
              'An insurance claims module that fills in insurers’ own reimbursement forms, not lookalikes, tried end to end on sixteen real insurers’ forms (English, Bahasa and bilingual, a phone photo among them) with invented patients and the real model. PDFs with real form fields are filled by name, with each field’s type and size given to the model, because a real form silently refused answers it couldn’t take while the review screen went on showing them. Flat forms are read with pdf.js: answers go one character per cell where the form prints cells, ticks onto their own boxes, nothing across the form’s own lines. And a caption printed on a line belongs to the row above it, which had put every answer on one insurer’s form a line low. Each form is read once, in the background, after the patient replies; it used to be read twice inside the reply, where a long form could outrun the function and lose the claim. And a form she would rather fill in by hand can be printed, photographed and filed as the signed claim.',
          },
          {
            head: 'Nothing is signed until she has read it',
            body:
              'The mark goes on only at the moment of approval, so a signed claim she has not seen cannot exist. And it is one mark: her stamp carries her signature across it, so every document is stamped alone, and a claim form gets the stamp wherever it has room and her signature only where the stamp won’t fit — never in the patient’s section.',
          },
          {
            head: 'Document numbers come from the server',
            body:
              'Documents carry a server-assigned sequential number issued from an atomic counter, so paperwork cannot be forged or duplicated.',
          },
          {
            head: 'One set of templates, not one per app',
            body:
              'The document templates live in one shared package because they used to be a copy each. The dashboard learned to take the signature and stamp from Settings and the phone app did not, so the same prescription carried a different seal depending on which one produced it. Sharing the code was the fix; the bug is the reason the package exists.',
          },
          {
            head: 'A second app that only writes documents',
            body:
              'A second Android app, the practice’s own “Documents”, that writes one document and shares it and can do nothing else, installed alongside the dashboard with its own icon and session, for the times she needs a prescription on a phone and nothing more.',
          },
          {
            head: 'One write-up sends every document, in order',
            body:
              'The consult page writes the visit up, then sends the prescription, a medical certificate and a referral letter — and the bill only after them. WhatsApp fetches each file from Drive before sending it, so a bill sent straight after a prescription could arrive first; each send now waits until WhatsApp has the document before the next starts, and when that can’t be confirmed the bill is held back and she is told what to send. A child’s bill can go to the parent paying it while the prescription still goes to the child’s chat, and an in-person visit isn’t billed by default, because the partner hospital bills those. Every message also says who wrote it: her tag and the nurse’s only on words one of them typed, and [AI] on everything the app worded itself, documents included, even when she pressed the button.',
          },
        ],
      },
      {
        title: 'On her phone',
        caption: 'Fonts that load in airplane mode, the phone turned sideways, text at 160%, dictation, and updates without reinstalling.',
        notes: [
          {
            head: 'In airplane mode the icons turned into words',
            body:
              'Both apps pulled their typeface and their icon font from Google with a stylesheet link, and neither APK bundled anything. A link is fetched once at page load and never retried, so on a Pixel 6 cold-launched in airplane mode there were zero font faces and every icon rendered the ligature name it was written as: the tab bar read “space_dashboardHome groupsPatients calendar_monthCalendar”, came to 644px inside a 412px screen, and put the AI tab 238px past the edge with no way to reach it. It recovers on the next launch once the WebView has cached the files, so this was a first-run failure only, which is the one launch that has to work. Both are vendored now, the icon font subset to the 125 icons the apps use. An icon outside that subset renders as its own name in the middle of the interface, so a test scans both apps and fails if any name is missing from the list. When that test turned out to skip icon names kept in a lookup table, two of a new card’s five icons were about to render as the words “sms” and “inbox” in the middle of Settings.',
          },
          {
            head: 'The greys pass WCAG AA now',
            body:
              'Three greys were below WCAG AA and one badly: #94a3b8 measured 2.39:1 against the app background and carried 188 pieces of real text — hints, timestamps, day names, and the four unselected labels in the bottom tab bar, which is most of how she knows where she is. Contrast sensitivity falls with age; that is not a shade of grey, it is an absence. The ramp sits at 5.84, 5.10 and 4.62 now, the three closer together than before because that is what AA on a near-white background leaves room for.',
          },
          {
            head: 'Bugs only a real phone and real names could find',
            body:
              'The bugs that mattered most were the ones only a real phone and real data could produce, found by driving the installed APK on a Pixel 6 against the live backend, not demo rows. A patient name needs to be long enough to overflow: “Aisha Khan” painted straight through the badge beside it, and on a 360px screen the row’s fixed parts came to 411px and left the name a column 0px wide. A document library needs real documents: its title column got 39px, so every row read “Inv…” or “Co…”. The patient header came to 436px of a 412px screen, with the More button (a third of what you can do to a patient) entirely off the right edge, behind a sideways scroll the layout’s own rules say does not exist. And the leave switch was a button inside a label that also wrapped its explanation, so reading the explanation with a finger put the practice on leave.',
          },
          {
            head: 'A phone turned sideways got the laptop layout',
            body:
              'Turned sideways her phone is 916×412, wider than the 760px that decides what a phone is, so landscape brought the entire laptop layout back: the sidebar, the desktop top bar, and every control down to its 36px mouse size on a touchscreen, with the bottom of the sidebar, Settings included, sitting below a 412px-tall screen and no way to scroll to it. A viewport under 500px tall counts as a phone now too, in the CSS variant and in the hook alike, with a test holding the two identical. The same pass found nine flex items rendering wider than the space they were given, because a flex item will not shrink below its own content unless told to: one chat titled with a whole sentence made the AI page’s 200px list 684px wide. Four pages between 768 and 1023px had run out of room without saying so: a patient record 102px wide cutting its own filenames in half, a send button outside the screen, a week column 43px too narrow to print a name in. And a button is not exempt from the phone’s font-size setting, which goes to 160%: at that size “Stop the assistant replying” ended 25px past the right edge. Found by driving 11 routes across 9 viewports, 25 modals and sheets across 3, and the installed APK in four configurations: portrait and landscape, at 100% and 160% font.',
          },
          {
            head: 'Dictation on every consultation field',
            body:
              'Every free-text field on the consultation form has a microphone beside it: seven of them, and by far the most typing the app asks for, on the device where typing is worst. The transcript appends to whatever the field already holds, so stopping and starting again adds a second sentence instead of wiping the first. Where speech recognition is unavailable, including Capacitor’s Android WebView, the button is absent, not broken, and the form says to use the keyboard’s own microphone instead.',
          },
          {
            head: 'A bell on the laptop, push on the phone',
            body:
              'Notifications land where they will be seen: an in-app bell on the laptop, because the dashboard is already open and a popup would interrupt a consult, and Android push through Firebase for the phone, which is usually closed. Every kind can be switched off per channel.',
          },
          {
            head: 'The phone app updates itself from the live site',
            body:
              'The phone app used to carry its own copy of the screens, so every change meant building and sending her a new APK, and her uninstalling and reinstalling it. The release build now opens the same site the laptop does, which Vercel rebuilds on every push, so a change reaches her phone the next time she opens the app; with no connection it shows a bundled page that keeps trying instead of a blank screen. It offers “Update now” only when the screens themselves changed: the build publishes the name of its main script (which Vite derives from the script’s content), not the commit, because most pushes change only the edge functions and would have offered her an update that changed nothing she could see. Android’s automatic backup is off, so the WebView’s stored sign-in is never copied into a Google backup.',
          },
        ],
      },
      {
        title: 'Failing loudly',
        caption: 'The codebase, a write that can’t be cut off halfway, failures that look like failures, and the tests.',
        notes: [
          {
            head: '91,000 lines, 89 functions, 54 migrations, 1,975 tests',
            body:
              'A TypeScript monorepo on npm workspaces: a React dashboard, a second Android app, a shared package holding the document templates, and standalone tools for ingestion, backup and restore, and submitting WhatsApp templates to Meta — around 91,000 lines across 513 files, with 89 serverless Deno edge functions and 54 PostgreSQL migrations behind them, covered by 1,975 unit tests.',
          },
          {
            head: 'A write can’t be interrupted halfway',
            body:
              'Every write blocks the whole app while it runs, and that rule had to be inverted to be worth anything. Saving a consultation is a render, a Drive upload and three database writes; a tap landing halfway through can file a visit with no document or a document with no visit. The overlay existed and covered six call sites out of about sixty, which is the wrong shape for a safety rule, since it depends on whoever adds the next write remembering to opt in. Now every mutation blocks unless it says so, with 350ms of grace so nothing flashes, and the Android back button (the reflex when a screen seems stuck, and a short step from the system reclaiming the process mid-write) refuses to respond for just as long.',
          },
          {
            head: 'Failures look like failures now',
            body:
              'The toast hardcoded a tick and timed out after 2.6 seconds, so “Could not send via WhatsApp” looked identical to “Sent”, and the patient never got their prescription. Fifty-five error call sites converted, plus seven more that were reporting failure through the success path; failures are red and stay until dismissed. She also saw raw machinery (FunctionsHttpError, Postgres constraint names, Failed to fetch), so one module lets a sentence written for her through and replaces everything else, keeping the original for the log. Offline was unhandled entirely; every write goes through one wrapper, so no connection means no attempt and a standing bar across the top, because an empty patient list looks identical to a lost one.',
          },
          {
            head: '4,402 errors that all read “[object Object]”',
            body:
              'The field that exists to say what went wrong said nothing. `String(err)` on a plain object produces “[object Object]”, and twenty-five places called it on whatever they had just caught before writing it to the error log. But Supabase errors are plain objects carrying a message, a code, details and a hint, not Errors. That is how the appointment-reminder sweep failed every fifteen minutes for three weeks, 4,402 times, while System health showed her 4,402 rows each reading “Sweep failed” and “[object Object]”. A single describer now spells out Errors, Supabase errors and fetch-shaped failures, and a test holds it to never returning that string again. The same 4,402 rows are also why the list can be emptied in one press: the sweeps that write them iterate every contact, so one broken thing writes a row an hour, and since the card only ever shows the twenty most recent, dismissing them one small x at a time just uncovered the next twenty. Clearing asks first, and says plainly that it clears everything on file, not only what she can see, and that anything still broken will write a fresh line the next time it fails.',
          },
          {
            head: 'Pure-logic tests, and a simulated patient on the real model',
            body:
              'The tests are pure logic by design (scheduling, date maths across the Jakarta timezone, claim assembly, document rendering), plus a patient simulator that drives the real WhatsApp webhook and agent one message at a time and then looks at what happened to the calendar and the database. It runs in two tiers: against a scripted model on every run, and against the real model on request — 48 conversations, at about a cent and a half per patient message, several of them reproducing chats that went wrong on the live practice. Linting is deliberately kept out of the build, because a lint error should never be the reason a document cannot be issued.',
          },
        ],
      },
    ],
    // Captured from the real build against a stand-in for its backend, set on
    // one invented afternoon (capture-tools/med-capture.mjs) — every patient,
    // message, bill and claim made up. The doctor's own details are blurred
    // wherever the app shows them.
    trailer: '/media/medical-trailer.mp4',
    trailerPoster: '/media/medical-trailer-poster.jpg',
    trailerNote:
      'What the platform does now, in a minute, cut on the beat: the afternoon at a glance, a patient booking on WhatsApp by tapping instead of typing, the assistant asking who an appointment is for and booking only on a yes, running late reaching everyone still waiting, times offered back to back, one write-up sending every document in order, the insurer’s own form filled in its own boxes, what the model is allowed to know about a patient, a screenshot that settles one bill once, hours that ask before stranding anyone, the assistant’s 40 tools, what it all costs, and what is locked down. Drawn as motion graphics in the app’s own design, not screen-recorded; the walkthrough below is the real thing.',
    video: '/media/medical-demo.mp4',
    poster: '/media/medical-demo-poster.jpg',
    videoNote:
      'A working afternoon, uncut and at real speed: warn everyone still waiting that she is running fifteen minutes late, look at the week and then the day, open the patient who is due, write the consult up with a prescription and a certificate and send them in order, read four WhatsApp chats the assistant ran (a booking, a family’s phone, a new patient’s identity check, a payment screenshot), see why a reused screenshot can’t settle a bill, open the insurer’s form waiting on her stamp, check her hours, and finish on the assistant moving two patients off a day she closed. Nothing is sped up and nothing is cut.',
    shots: [],
    flows: [
      {
        title: 'An afternoon at the practice',
        caption:
          'What she sees when she sits down between patients, and the two things she does most with the diary: book someone in, and tell everyone when she is behind.',
        steps: [
          {
            src: '/media/medical-overview.png',
            title: 'Open the dashboard',
            caption:
              'Who is booked today and how each one is going (done, now, next), what is waiting for her approval, unread WhatsApp, and what the assistant has flagged. Every appointment says whether it is in person or online.',
          },
          {
            src: '/media/medical-appointments.png',
            title: 'Look at the week',
            caption:
              'In-person visits and video calls in one diary, because she is one person and anything booked is busy time for both. Shaded where she is open, the current time drawn across today, and time she has blocked out shown as hers rather than as a patient.',
          },
          {
            src: '/media/medical-day.png',
            title: 'Then one day of it',
            caption:
              'The same day as a list, every appointment marked done, now, next or booked, with the Meet link to hand for each video call.',
          },
          {
            src: '/media/medical-booking.png',
            title: 'Book someone in',
            caption:
              'Pick the patient by name and their number fills itself. 5:40 would leave ten minutes dead after the last visit, so the server says so before booking anything and offers the back-to-back time in one tap — or “Book anyway”, because it is her diary.',
          },
          {
            src: '/media/medical-running-late.png',
            title: 'Tell everyone she is running late',
            caption:
              'Everyone still waiting, with the patient in the room and the next one ticked. Her reason comes back as one calm sentence in English and Bahasa with nobody’s name and no clinical detail, and the draft says who gets the pre-approved template because they haven’t written in for a day, and who gets it in Bahasa.',
          },
        ],
      },
      {
        title: 'Seeing a patient',
        caption:
          'From the patient list to a written-up consultation, with every document it produces sent in order — the path this software exists to shorten.',
        steps: [
          {
            src: '/media/medical-patients-list.png',
            title: 'Find the patient',
            caption:
              'Everyone on the books, searchable, and filterable to who is due a review; on a laptop the first record opens beside the list.',
          },
          {
            src: '/media/medical-patients.png',
            title: 'Read the record',
            caption:
              'The allergy in red before anything else, the problem list, files synced from the practice’s Drive, and every WhatsApp number they write from. This patient has started using a second phone and confirmed it was theirs on WhatsApp; anything about an appointment goes to the number it was booked from.',
          },
          {
            src: '/media/medical-history.png',
            title: 'Check the history',
            caption:
              'Visits, labs, documents and bills in date order, so a recurring complaint is visible rather than remembered.',
          },
          {
            src: '/media/medical-files.png',
            title: 'Open their documents',
            caption:
              'Everything issued to this patient. Each one can be opened, sent again over WhatsApp, edited or renamed.',
          },
          {
            src: '/media/medical-consult.png',
            title: 'Write the consult up',
            caption:
              'The record stays open on the left. Below the notes, everything she adds goes to the patient in order once the visit is saved: a prescription (clarithromycin, with the penicillin allergy on screen above it), a certificate, a referral, and the bill last. For an in-person visit the bill starts off, because the partner hospital bills those.',
          },
          {
            src: '/media/medical-consult-cert.png',
            title: 'A sick note that keeps the diagnosis private',
            caption:
              'A certificate goes to an employer or a school, so the diagnosis has its own switch, off by default — and off means off, whatever the field still holds. The wording is drafted from today’s notes and never invents a rest period the notes don’t give.',
          },
          {
            src: '/media/medical-merge.png',
            title: 'Two records, one person',
            caption:
              'A new patient told WhatsApp they weren’t the person on file with the same name and date of birth — and were, with their own name typed a letter out. Merging sets the two side by side, keeps the one with more history unless she picks the other, moves everything across in one transaction, and can be undone from Settings for thirty days.',
          },
        ],
      },
      {
        title: 'Issuing a document',
        caption: 'Five kinds of document on one shared set of templates, and a preview that is the file that gets sent.',
        steps: [
          {
            src: '/media/medical-documents.png',
            title: 'What is waiting',
            caption:
              'What WhatsApp asked for, what is due, and what is being held: a certificate for a patient who hasn’t written in for a day, which WhatsApp won’t take until they do. They have been asked to reply, and it goes to them the moment they do.',
          },
          {
            src: '/media/medical-doc-editor.png',
            title: 'Find the patient by typing',
            caption:
              'A search box in place of a dropdown of every patient, which was fine for twenty and hopeless for a practice. Every word typed has to appear in the name and accents don’t matter. A new document starts with nobody chosen; it used to start on the first name in the list, and file itself in their folder.',
          },
          {
            src: '/media/medical-doc-invoice.png',
            title: 'The invoice that comes out',
            caption:
              'Bilingual (INVOICE and TAGIHAN), on the practice letterhead, with bank transfer and e-wallets side by side and the e-wallet fee spelled out. Registration numbers, bank accounts and the seal are blurred; everything else is what a patient receives.',
          },
        ],
      },
      {
        title: 'WhatsApp, run by the assistant',
        caption:
          'Patients book, move, switch, pay and send claim forms on WhatsApp. The model holds the conversation; the code decides what it is allowed to do.',
        steps: [
          {
            src: '/media/medical-messages.png',
            title: 'A booking, by tapping',
            caption:
              'In person or online with each fee, then only back-to-back times, then a yes before anything is booked. The options a patient was offered are logged under each message, with WhatsApp’s ticks beside them.',
          },
          {
            src: '/media/medical-family.png',
            title: 'One phone, a whole family',
            caption:
              'Who the appointment is for comes first, with a button per person on file — in Bahasa, because that is how this father writes.',
          },
          {
            src: '/media/medical-new-patient.png',
            title: 'A new patient, or a familiar one',
            caption:
              'A new patient’s details come from a form, never typed into the chat. A match with someone already on file is asked about without naming them; this one said no, and the merge above is what happens when that turns out to be wrong.',
          },
          {
            src: '/media/medical-transfer.png',
            title: 'A payment screenshot, opened',
            caption:
              'Files patients send open inside the app: photos, PDFs, voice notes. What a transfer screenshot came to is decided by the code, not the model; this one matched its invoice.',
          },
          {
            src: '/media/medical-thread.png',
            title: 'She answers this one herself',
            caption:
              'Switched to “You reply”, the assistant stays out of the chat entirely. The prescription and the invoice from today’s consult arrived in that order, and “Mark as read” clears a thank-you that needs no answer.',
          },
          {
            src: '/media/medical-ai.png',
            title: 'Check first',
            caption:
              'In the middle setting the assistant writes a reply and waits; nothing goes until she presses Send, edits it, or dismisses it.',
          },
        ],
      },
      {
        title: 'Getting paid, and getting reimbursed',
        caption: 'Two different problems: chasing what patients owe, and filling in what insurers demand before they pay.',
        steps: [
          {
            src: '/media/medical-payments.png',
            title: 'Every invoice and where it stands',
            caption:
              'What was billed, what is outstanding, when the next reminder goes, and which ones need a human look before anyone is told they have paid.',
          },
          {
            src: '/media/medical-payment-proof.png',
            title: 'A screenshot that was already used',
            caption:
              'What was read off the screenshot (amount, time, the bank’s reference, who it went to) and why it can’t count: the same transfer already settled the bill from 2 October. This week’s stays open and stays on reminders.',
          },
          {
            src: '/media/medical-claims.png',
            title: 'Claims, from reading to sent',
            caption:
              'Each claim’s stage (being read in the background, waiting for her stamp, signed, sent), including one she filled in by hand and filed from photos.',
          },
          {
            src: '/media/medical-claim.png',
            title: 'The insurer’s own form, in its own boxes',
            caption:
              'The answers on the left, the form on the right: the name one letter per cell, the dates split into the boxes the form prints, the tick on its own box, the captions read in both languages. Nothing is signed until she presses Sign & stamp. The form is drawn for the capture from an insurer that does not exist; her details are blurred.',
          },
        ],
      },
      {
        title: 'Her hours',
        caption: 'When she is open, for which kind of appointment — and what happens to the people already booked when that changes.',
        steps: [
          {
            src: '/media/medical-availability.png',
            title: 'More than one block a day',
            caption:
              'In person and online are separate weeks with separate lengths, and a day can hold a morning block and an evening one, each packed on its own.',
          },
          {
            src: '/media/medical-stranded.png',
            title: 'Taking leave over booked patients',
            caption:
              'Leave doesn’t cancel or move anyone, so they would still come. It now lists who is booked, soonest first, each with Open to cancel or switch them right there, before “Save anyway”.',
          },
          {
            src: '/media/medical-switch.png',
            title: 'From the hospital to a video call',
            caption:
              'Switching is a move, not a cancellation: the same appointment, with a Meet made for it and the hospital told. A video call runs thirty minutes, not twenty, so this one would run into the next patient, and it says so first.',
          },
        ],
      },
      {
        title: 'The assistant',
        caption: 'Claude Opus 5 with 40 named tools and no others — and a record of each step it took, beside what it says it did.',
        steps: [
          {
            src: '/media/medical-assistant.png',
            title: 'Asked to close a day, it asks first',
            caption:
              'Closing the Friday would strand two patients, so the tool refuses and says who. It asks whether to cancel, move or go ahead, and only after “move them both to Thursday” does it move them, tell them, and close the day. The red cross is the tool’s own refusal, not the model’s account of it.',
          },
        ],
      },
      {
        title: 'The parts nobody demos',
        caption: 'Who a typed message goes out as, what the assistant may tell patients, and what the whole thing costs to run.',
        steps: [
          {
            src: '/media/medical-settings.png',
            title: 'Settings',
            caption:
              'Whether a message she types goes out as the doctor or the nurse, what the assistant may tell patients, when the practice is open, and notifications per kind and per channel. The blurred lines are her name, the hospital and her email.',
          },
          {
            src: '/media/medical-technical.png',
            title: 'What the AI and WhatsApp cost',
            caption:
              'Behind a group that starts closed, because it is for whoever set the dashboard up. Every Claude call site is counted, and WhatsApp is read from Twilio’s own billing, with how long the credit will last. The figures on these two cards are invented for the capture.',
          },
        ],
      },
      {
        title: 'The same app, on the phone she reaches for',
        caption:
          'She sees patients at a partner hospital and online, and reaches for the phone between them. Below 760px every table becomes a list of cards, the consultation form takes the whole screen, and nothing smaller than 13px or narrower than a 44px thumb target survives.',
        steps: [
          {
            src: '/media/medical-phone-overview.png',
            title: 'The afternoon, in a thumb',
            caption:
              'The same overview, re-laid rather than shrunk. Every tab in the bottom bar carries a word as well as an icon, because on a phone there is no hover to reveal what an icon means.',
          },
          {
            src: '/media/medical-phone-patients.png',
            title: 'A table that stopped being a table',
            caption:
              'The patient list as cards. The desktop table would have needed dragging sideways to read, which is how a name ends up half-visible under a badge on a 360px screen.',
          },
          {
            src: '/media/medical-phone-record.png',
            title: 'The record, one panel at a time',
            caption:
              'Below the split breakpoint the list and the record stop competing for width, and New consult comes first, because it is why she opened the patient.',
          },
          {
            src: '/media/medical-phone-consult.png',
            title: 'The consultation form gets the whole screen',
            caption:
              'The reason they booked and their allergy at the top, then the form, with a microphone beside every free-text field, because this is the most typing the app asks for, on the device where typing is worst.',
          },
          {
            src: '/media/medical-phone-messages.png',
            title: 'WhatsApp, triaged',
            caption:
              'The chats that need a person above the ones the assistant is handling, each with its ticks, and unread dots that clear only when she says so.',
          },
          {
            src: '/media/medical-phone-thread.png',
            title: 'A family’s chat, in Bahasa',
            caption:
              'Who it is for, then in person or online, then the time: each a tap, and each logged under its message so she can see what the patient was offered.',
          },
          {
            src: '/media/medical-phone-running-late.png',
            title: 'Running late, from the hospital corridor',
            caption: 'How late, why, and who, with the draft shown before anything is sent.',
          },
          {
            src: '/media/medical-phone-settings.png',
            title: 'Settings, in her words',
            caption:
              'Who she is replying as, and the practice details the assistant quotes from, with the hospital’s name blurred.',
          },
        ],
      },
    ],
    noteSummary:
      'Every screen is the real, unmodified app, driven against a stand-in for its backend so the practice’s real database was out of reach, and every patient, message, appointment, bill and claim is invented. The doctor’s own details are blurred wherever the app shows them: her name, the hospital, her registration and licence numbers, phone, bank accounts, email and seal.',
    note:
      'Every screen is the real application (the current build, unmodified), driven by Playwright against a stand-in for its backend: every database read, edge function and WhatsApp file is answered inside the browser from an invented practice, and the build points at a local address, so the practice’s real database was not merely unused but unreachable, and a run that tried to reach any other host failed. Every patient, conversation, appointment, invoice, payment, claim and document is invented, all on one afternoon in Jakarta. The documents are rendered by the app’s own templates, and the insurer’s claim form was drawn for the capture from an insurer that does not exist. The doctor’s own details are blurred wherever the app shows them (her name, the hospital she practises at, her registration and licence numbers, phone, bank accounts, email and signature seal) and checked in every frame before a file was written; in the walkthrough the blur is held while the app re-renders. The figures on the AI and WhatsApp cost cards are invented for the same reason; every other number on this page is countable in the repository. The phone screens are the same build at 412×916, the size the mobile pass was measured against. Dates in the form fields read in US order because the capture machine’s regional settings decide how a browser date field renders.',
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
    slug: 'poker-tracker',
    name: 'Poker Tracker',
    short: 'Poker Tracker',
    tagline: 'The home game’s ledger: who’s up, who’s down, and who owes who — to the cent.',
    period: 'September 2026',
    kind: 'OFFLINE-FIRST LEDGER APP',
    status: 'Live — web app and Android APK',
    role: 'Solo — design, build, ship',
    accent: '#e3b341',
    // The app's own shipped icon, copied from its public/icons.
    logo: '/logos/poker-tracker.svg',
    layers: [
      'React 19 · TypeScript · Vite — a hand-written design system, no UI kit',
      'Zustand store, saved to the phone on every change',
      'Every amount in integer cents, converted only for display',
      'Settle-up: the largest zero-sum split — provably fewest payments',
      'One commit path, one append-only activity log',
      'Sync: pull → last-write-wins merge with tombstones → push',
      'Supabase Postgres — RLS on with no policies, three password-checked functions',
      'Installable PWA for iPhone · Capacitor APK for Android, from one build',
      '63 unit tests (Vitest) · a Puppeteer smoke test through the real UI',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Supabase', 'PostgreSQL', 'Capacitor', 'PWA', 'Vitest', 'Puppeteer'],
    metrics: [
      { value: '63', label: 'unit tests' },
      { value: '14', label: 'players settled exactly' },
      { value: '0', label: 'credentials in the bundle' },
      { value: '1', label: 'build — web app and APK' },
    ],
    blurb:
      'Built for the home game my friends and I play: a $10 buy-in at five- and ten-cent blinds, where the money is small and the arguments about it are not. Poker Tracker is the ledger: log a night in the time it takes to type the cash-outs, keep everyone’s running total to the cent, and settle up in the fewest payments that clear the table. It works offline on each phone, and with sharing on, the whole group reads and writes one ledger.',
    highlights: [
      {
        head: 'Money is integer cents',
        body:
          'Every amount is stored as integer cents and only turned into dollars on the way to the screen. Poker maths is a night of sums and differences, and floating point drifts (0.1 + 0.2 is not 0.3), so a float ledger at ten-cent blinds can finish a night a cent out. Display has its own rule: whole amounts show bare and anything with cents shows both digits, never one, which is what letting the formatter drop a trailing zero produces — “$13.5”, which reads as broken.',
      },
      {
        head: 'A night has to add up before it counts',
        body:
          'A new night opens with everyone at the standard buy-in and a one-tap + buy-in on each row, so a normal session only needs the cash-outs typed. The editor adds the table up as you go and holds its verdict until a cash-out exists, because with buy-ins pre-filled a fresh session would otherwise open showing a loss on every row and a warning that isn’t true yet. When the totals disagree it says by how much, and why that matters: chips can’t appear or vanish, so the difference is a typo, not a result. It still lets you save, and the leaderboard flags any night that doesn’t balance instead of quietly folding it in.',
      },
      {
        head: 'Settling up in the provably fewest payments',
        body:
          'Balances are netted first, so nobody both pays and gets paid. Then everyone is split into as many groups as possible whose balances sum to zero, because a group of k people always needs exactly k−1 payments, so the minimum is n minus the number of groups. Paying the biggest debtor into the biggest creditor, the obvious approach, only guarantees n−1 and misses tables where a subset cancels out: on the night in the captures below it takes four payments where this takes three. Finding the best split is exponential, 3ⁿ, so it runs exactly for up to 14 people with a balance (about five million steps, held under 250ms by a performance test) and falls back to the greedy pass above that, which a home game never reaches. A property test replays 200 random tables and checks every player lands exactly on their net.',
      },
      {
        head: 'Payments are records, not inferred from winnings',
        body:
          'Sessions say who won; they don’t say who has since handed money over. Payments are records of their own (from, to, amount, date), and what anyone still owes is their session nets plus what they’ve paid minus what they’ve been paid. The settle-up plan is built from that, not from raw winnings, so a debt already paid stops being suggested, part payments work, and overpaying flips who is owed instead of breaking anything. Each suggested transfer has a button that records it with the amount pre-filled.',
      },
      {
        head: 'Works offline, and syncs by last write wins',
        body:
          'Each phone keeps its own copy, saved on every change, and works with no signal at all; sharing is optional. With it on, a sync pulls the group’s ledger, merges it with the phone’s and pushes the result back. Every record carries a timestamp and the newer copy wins, so two people logging different nights on different phones both keep their work; only edits to the same record conflict. Deletes are tombstones with their own timestamp, so an older copy on another phone can’t bring a deleted session back. Edits are ordered by each phone’s own clock: a fair bet for one group of friends, and the limit of last-write-wins.',
      },
      {
        head: 'A settings change undid itself 2.5 seconds later',
        body:
          'Settings were the one record that didn’t merge that way, and that was a bug. The merge took the server’s whole settings record whenever it had a group name (which, once sharing is on, is always), so changing the currency appeared to save, reverted two and a half seconds later just as the sync fired, and was pushed back to everyone. Settings now carry their own timestamp and merge like every other record, and untouched defaults are stamped zero so a phone joining a group still adopts the group’s currency, buy-in and stakes. Regression tests cover the reported case, the reverse direction, a first join and a repeated sync; the smoke test changes the currency and checks it is still there four seconds later.',
      },
      {
        head: 'An idle phone was syncing every 2.5 seconds',
        body:
          'Capturing this page turned up one more sync bug, in the live app. Every sync changes the ledger (the merge commits a fresh copy of it), and the engine pushed a couple of seconds after any change to the ledger, so each sync scheduled the next: an open phone pulled and pushed the entire ledger every 2.5 seconds for as long as the app stayed open, twelve round trips in thirty idle seconds. The store now counts edits made on the phone and the engine schedules on that count; a merge from the group isn’t an edit, because the sync that brought it in has already pushed it back. Taking the loop out exposed what it had been covering for: a sync asked for while another was running was dropped, so an edit made mid-sync waited for the minute timer. That now queues one more run. The same idle phone now makes none.',
      },
      {
        head: 'The key is public, so the table is locked',
        body:
          'The Supabase anon key is designed to ship to clients, so the table is locked rather than the key. Row-level security is on with no policies, which leaves the anonymous role unable to touch the table at all, and every read and write goes through one of three SECURITY DEFINER functions that each require the group’s password; without it you can’t read, write or even confirm a group exists. Group names are forgiving on purpose (“friday felt” finds “Friday Felt”, accents and punctuation aside), so the password is what protects a group, with an eight-character floor enforced in the client and again in the SQL. It is compared as typed, not hashed (whoever created the Supabase project can read the group’s numbers anyway), which is why the setup guide says not to reuse a password you care about.',
      },
      {
        head: 'Credentials in the build lasted ten minutes',
        body:
          'The first version baked the group’s Supabase project and join code into the build, so friends needed no setup at all. It lasted about ten minutes: the site is public on GitHub Pages, and anything in its JavaScript is readable by anyone who finds the URL. Nothing is baked in now: the project URL, key, group name and password travel together in one invite a phone’s Settings composes. For this page both the live site’s scripts and the released APK were checked, and neither contains a Supabase address or a key.',
      },
      {
        head: 'Every change leaves a trace',
        body:
          'Every session, payment and roster change is written through one path that appends to an activity log, so nothing can change the numbers without leaving a trace. An edit records the nets on both sides (“Nadia: +$6.20 → -$6.10”), because a quietly rewritten bad night is the thing worth catching, and the log has an Edits & deletions filter for just that. The author is whoever the phone is set to in Settings, saved by name at the time so a later rename can’t rewrite history, and the screen says plainly that it is an honour-system record: it answers “who changed my numbers?”, not much more. Entries are never edited, so on a merge the log is a union rather than a contest, capped at the newest 300.',
      },
      {
        head: 'One build: a web app for iPhone, an APK for Android',
        body:
          'iPhones can’t sideload, so they get the installable web app (its own icon, no browser chrome, works offline), and Android gets a real APK from the same build through Capacitor. The service worker is registered by hand so the native build can skip it: inside Capacitor the files are already on the phone, and a worker’s precache there would keep serving the previous version’s screens after an update until someone cleared the app’s data. The Supabase client, about 350 kB, is only loaded once sharing is switched on.',
      },
      {
        head: '63 unit tests and a smoke test through the real UI',
        body:
          '63 unit tests pin down the money, the stats, the settle-up, the merge and the activity diffs, and a Puppeteer smoke test drives the real interface the way a person would: adds players, logs a night with a rebuy, checks the leaderboard and the settle-up agree with what was typed, records a payment, changes the currency and checks it stays changed, edits a session and reads the edit back out of the log. It compares money by sign and digits only, so it passes whatever the currency and whatever the machine’s locale.',
      },
    ],
    trailer: '/media/poker-trailer.mp4',
    trailerPoster: '/media/poker-trailer-poster.jpg',
    trailerNote:
      'Twenty-five seconds on the argument every home game has (everyone at the table is up overall, and the table is zero-sum) and the three things that end it: a night that has to balance, the fewest payments that settle it, and one set of numbers on every phone. Built as motion, not screen-captured, but drawn from the app itself: its felt and gold, its cards, its own words where it has them (“Cash-outs are $2.70 less than buy-ins.”, “3 payments clears everyone.”), and the same invented night the screenshots below use.',
    video: '/media/poker-demo.mp4',
    poster: '/media/poker-demo-poster.jpg',
    videoNote:
      'Two phones on one group, side by side, uncut and at real speed: Tushar logs tonight (Marcus sitting out, two rebuys, a cash-out typed as 21.40 that the editor flags as $2.70 short until it is corrected), checks the night’s settle-up and saves; Mira taps sync and her standings change to match; Mira records the $17.05 Theo sent her, and it lands on Tushar’s phone; and the take ends on the group’s activity log, her payment at the top and Jonah’s correction from 3 October under Edits & deletions. Every change is a real write through the app’s own code, and the phones reach each other through its own pull, merge and push.',
    shots: [],
    flows: [
      {
        title: 'The standings',
        caption:
          'The home screen is the argument settled: everyone ranked by profit across every night, to the cent.',
        steps: [
          {
            src: '/media/poker-standings.png',
            title: 'Who’s up, and by how much',
            caption:
              'Left, the leaderboard after six nights: a running-profit line per player, then everyone ranked with their sessions, wins and losses, streak and ROI. Right, Mira’s page — +$49.50 across six sessions, her line on its own, and the form tiles: win rate, average and best and worst night, money staked, ROI, and an hourly rate from the nights that recorded how long they ran. Filters narrow the leaderboard to 30 days, 90, or this year.',
          },
        ],
      },
      {
        title: 'Logging a night',
        caption:
          'Built for eleven at night: everyone starts at the standard buy-in, a rebuy is one tap, and the table has to add up before its numbers count.',
        steps: [
          {
            src: '/media/poker-night.png',
            title: 'Rebuys in a tap, and a typo caught',
            caption:
              'Left, tonight before anyone has cashed out: Marcus switched off because he sat it out, Theo three buy-ins deep and Leo two, both from the + buy-in button. Right, the cash-outs typed — and Tushar’s 24.10 entered as 21.40. The totals read $90 in and $87.30 out, and the editor says so: chips can’t appear or vanish, so the difference is a typo, not a result. It still lets you save; the totals are just marked as off.',
          },
          {
            src: '/media/poker-balanced.png',
            title: 'Balanced, then settled',
            caption:
              'The cash-out corrected and the table balancing to the cent. Right, Settle this night: three payments clear it. On these nets (+25.15, +14.10, −14.10, −17.05, −8.10), paying the biggest debtor into the biggest creditor first would take four; Leo’s −14.10 cancels Tushar’s +14.10 exactly, Theo’s and Nadia’s together cancel Mira’s, and the app finds both.',
          },
        ],
      },
      {
        title: 'Settling up',
        caption:
          'Winnings say who won; payments say who has since paid. What anyone owes is both, and the plan is built from it.',
        steps: [
          {
            src: '/media/poker-owed.png',
            title: 'Who owes who, and recording it',
            caption:
              'Left, the Payments page after tonight: the same three transfers, each with a button to record it, and everyone’s standing with what they have already paid and been paid. Right, Record this payment on Theo → Mira: the sheet pre-filled with both names and $17.05, a note added. Part payments are fine; recording one takes it off the totals.',
          },
          {
            src: '/media/poker-paid.png',
            title: 'Two left, and the history',
            caption:
              'Saved, the plan is down to two payments and Theo is off the list. Right, the payment history: tonight’s at the top and the two earlier settle-ups below it (what the app suggested on 27 September and 11 October, recorded through the same button), with the total settled across eight payments.',
          },
        ],
      },
      {
        title: 'Two phones, one ledger',
        caption:
          'Each phone keeps its own copy and works offline. Turn sharing on and the group reads and writes one ledger.',
        steps: [
          {
            src: '/media/poker-share.png',
            title: 'The invite, and joining with it',
            caption:
              'Left, Tushar’s phone: everyone in Friday Felt sees the same numbers, and one button copies an invite with everything a friend needs. Right, Marcus’s new phone joining: the group name typed in lower case, because “friday felt” and “Friday Felt” reach the same group, while the password has to be exact. The project URL and key are a stand-in, explained in the note below.',
          },
          {
            src: '/media/poker-joined.png',
            title: 'Everything, on the first sync',
            caption:
              'Marcus’s phone straight after joining: the standings and every night the group has played, pulled down and merged with what was on the phone (here, nothing), and the group’s name with them.',
          },
        ],
      },
      {
        title: 'The paper trail',
        caption: 'Every session, payment and roster change goes into one log, with who made it.',
        steps: [
          {
            src: '/media/poker-activity.png',
            title: 'Who changed what',
            caption:
              'Left, everything, newest first: Tushar recording Theo’s payment and logging tonight, then the earlier settle-ups, nights and players, each under the name of whoever the phone belonged to. Right, Edits & deletions: the one edit in the group’s history, Jonah putting his and Nadia’s cash-outs back in their own rows on 3 October, with both nets before and after. It is an honour-system record, and the screen says so.',
          },
        ],
      },
    ],
    noteSummary:
      'The trailer is built motion; everything under it is the live app, byte for byte, with an invented group whose every session and payment was typed in through the app’s own screens. The real ledger, my friends’ results on their phones and in their own Supabase project, was never opened, and sharing ran against an in-browser stand-in that could reach no real server.',
    note:
      'The trailer at the top is built motion, not app footage, and says so; everything below it is the real app running: the same build that is live on GitHub Pages, byte for byte. Every name and number is invented, and has to be: the real ledger is my friends’ winnings and losses, kept on their phones and in their own Supabase project, none of which was opened or touched. The cast is the same invented one the Locked In and Bets captures use, with my own name the one real thing left, since it is already the title of this site. The history was not written into storage. A script typed the five earlier nights, Jonah’s correction, Marcus being added and two settle-ups into the app’s own screens on a clock wound back to each one, switching “Who’s using this phone” to stand in for each friend; tonight, and Marcus’s phone joining the group, are typed live by the captures. So every session, payment and log entry was made by the app’s own code, and the payment amounts are what the app suggested at the time. Sharing runs against a stand-in for Supabase: the three Postgres functions are answered inside the browser with the same rules the real SQL enforces, at a project URL, demo-project.supabase.co, that cannot belong to anyone, because a real project’s address is twenty lowercase letters; any request to another host is refused and fails the run. Two bugs surfaced while capturing, and both were fixed in the app and deployed before these were shot, not framed around: an open phone with sharing on synced every 2.5 seconds for as long as it stayed open, and the Sessions list drew its cards in the browser’s default link blue. Dates in form fields read in US order because browser-drawn date controls follow the capture machine’s regional settings, not the app.',
    repo: 'https://github.com/TusharLachman25/poker-tracker',
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
    // The strictness dial beside the home screen, on the same dark field as
    // the other phone apps' pairs. The home screen alone, cropped to a card,
    // was a red "Blocking is not active" warning over an empty bank.
    hero: '/media/fitscroll-hero.png',
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
      'I did not want another app telling me how long I had been on Instagram. I wanted one that made me pay for it. FitScroll counts your push-ups through the phone’s camera, banks each clean rep as one minute of screen time, and enforces that budget on whichever apps you pick. Every minute expires 24 hours after you earn it, so you cannot grind once on Sunday and coast all week. Everything that counts a rep or spends a minute runs on-device: no account, no sync, no analytics, and no camera frame ever leaves the phone.',
    highlights: [
      {
        head: '125 tests without a phone or a 24-hour wait',
        body:
          'The rules are pure functions taking an explicit `now`: the bank, the rep counter, the blocking decision, the drain reconciler, the per-second meter. That is what makes 125 tests possible with no device and no 24-hour wait: expiry boundaries, oldest-first spending, cap overflow and every anti-cheat gate are pinned down as arithmetic. The parts that genuinely need Android get Robolectric: the stored ledger, its reload, the day rollover, and the corrupt-ledger path that has to fail into an empty bank, not a crash loop, because a crash loop leaves the accessibility service holding the block with no way to reach the camera.',
      },
      {
        head: 'A push-up is a body moving, not an angle',
        body:
          'Stand up, hold the phone in front of you and curl your arms, and every angle check passes: elbow locked out at the top, bent at the bottom, a dead-straight body line throughout. Only the fact that your body never moved gives it away. So a rep also requires your shoulders to drop by a fraction of your own shoulder-to-hip length, measured as a ratio so it holds at any distance from the lens, and set low enough that anyone on the floor clears it without thinking about it.',
      },
      {
        head: 'Strictness judges form, not how well you’re seen',
        body:
          'Strictness tightens five things at once, and deliberately not a sixth. It used to raise the required landmark confidence as well, which meant level 5 was quietly asking for a better view of you, not a better push-up. Looking down at the floor is enough to drop the pose model’s confidence across every landmark, so reps stopped counting entirely at level 5 while the identical rep counted at level 1. There is one visibility floor for all five levels now; strictness governs form only.',
      },
      {
        head: 'Thresholds bent for a camera that sees in 2D',
        body:
          'The body-line thresholds look lenient on paper and are not. This is a 2D estimate from a single camera: unless the lens sits exactly perpendicular to you, perspective foreshortens your torso and a genuinely straight back measures well under 180°. Thresholds that are correct in geometry reject real push-ups at real phone placements.',
      },
      {
        head: 'A rep isn’t judged on one noisy frame',
        body:
          'A rep is not judged frame by frame, because the pose model jitters by a few degrees on a motionless subject and a single noisy sample was throwing away clean reps. Each level instead carries a sag allowance: how long within one rep you may be outside tolerance before it is voided. Real sag lasts; noise does not. And if your legs are out of frame the model *guesses* your knee position, so the app declines to judge your back at all instead of failing you on a guess, and says “back not checked” on screen so a refusal reads as feedback, not as a broken app.',
      },
      {
        head: 'The lock lands mid-scroll',
        body:
          'The lock lands on top of the blocked app mid-scroll, not only at the moment you open it. It is drawn as an accessibility overlay, which the service is granted directly, so “Display over other apps” stays genuinely optional, and where it is missing the one button that needs it says so instead of appearing to do nothing.',
      },
      {
        head: 'Two kinds of event to know which app is in front',
        body:
          'A window-state change says a window just took the screen, which is the only signal that an app switch happened at all, but it describes transitions only. Pull the notification shade down over Instagram and the app underneath never goes away, so nothing announces its return when the shade closes. A scroll event says a package is on screen right now, which closes that gap. The service is declared `canRetrieveWindowContent="false"` and reads nothing off either event but the package name and the window class.',
      },
      {
        head: 'The meter charges measured time',
        body:
          'The meter charges measured time, not a count of ticks, because a timer that is throttled, coalesced or briefly starved silently under-bills, and the failure looks just like the app working. Below an hour the balance counts in seconds for the same reason: a number that only moves once a minute looks identical whether the drain is running or stuck, which made every real bug in it hard to tell from an imagined one.',
      },
      {
        head: 'Guessing what’s on screen, and what a wrong guess costs',
        body:
          'Android reports app switches, not a live answer to “what is on screen”, so sometimes the meter has to guess: a service killed mid-scroll, or a phone unlocked back into whatever it was showing. It resumes on the remembered package, because the alternative is free scrolling every time the process is recycled, but a guessed *drain* expires after 30 seconds unless something confirms it, so the most a wrong one can cost you is half a minute. A guessed *lock* is not put on the same clock, because the failures are not comparable: a drain that guessed wrong spends a bank silently, while a lock that guessed wrong is a screen in front of you with a button on it.',
      },
      {
        head: 'A version floor that fails open',
        body:
          'Copies handed out by hand have no update channel, so every sideloaded build checks one published file and withdraws itself if told to. It is a version floor, not a switch: one number retires everything older at once, and a notice can never retire a build that did not exist when it was written. It fails open on purpose: no answer, for any reason, leaves the last one standing, and the first answer is “supported”, because bricking someone’s app because their plane has no wifi would be a worse bug than a build living too long. When a build does retire it stops blocking first, and the banked minutes stay on disk for whatever installs over the top. The Play build compiles the URL to an empty string and never touches the network.',
      },
      {
        head: 'The signing key is a promise',
        body:
          'Android identifies an app by package name *and* signing certificate, so the key you hand builds out with is a commitment: a build signed with a different key cannot update one already installed; it has to be uninstalled first, which deletes the user’s banked minutes. Release builds fall back to the debug key when there is no keystore, so a fresh clone still produces something installable, and the README says plainly that anything given to another person must be built with the real one.',
      },
      {
        head: 'From 82MB down to 29MB',
        body:
          'ML Kit ships native inference for four ABIs and two of them only ever run on emulators, which made the universal APK 82MB — more than half of it code no phone can execute. Filtering at the source, not only in the split, brings the safe-for-anything build to 44MB and the arm64 one to 29MB. The APKs are also named after the app and its version instead of the build system, because handed over in a chat the filename is the only label they have.',
      },
      {
        head: 'A commitment device, not a jail',
        body:
          'The README says so first, not last: on Android you can disable the accessibility service or uninstall the app in under a minute. It works by adding friction at the moment of the impulse. Expiry rides the wall clock and you own the wall clock. Winding it back cannot mint minutes, since a credit stamped in the future is pulled back to now, so the worst it buys is one ordinary day. Nothing here pretends to be tamper-proof.',
      },
    ],
    trailer: '/media/fitscroll-trailer.mp4',
    trailerPoster: '/media/fitscroll-trailer-poster.jpg',
    trailerNote:
      'Half a minute on the mechanism, not the screens: an arm travelling through the angles a rep has to clear, the four gates lighting as it does, a bank filling on reps and draining in real time while you scroll, and the lock landing on a feed mid-scroll. Designed, not captured; the walkthrough underneath is the real app.',
    video: '/media/fitscroll-demo.mp4',
    poster: '/media/fitscroll-demo-poster.jpg',
    videoNote:
      'The installed release APK driven on a phone-sized screen, uncut: the bank at zero and the warning that blocking is not yet on, the strictness dial with its angles spelled out, the 24-hour bank limit, and the app picker. The camera screen is not in this take — see below.',
    shots: [],
    // Driven on an Android 15 emulator through Appium — the real 0.4.0 release
    // APK, not a web build, so these are the app as it actually installs.
    flows: [
      {
        title: 'Earn it, then spend it',
        caption:
          'The whole loop, in the order you meet it: what an empty bank means, what the app will accept as a rep, and which apps it holds hostage until you do one.',
        steps: [
          {
            src: '/media/fitscroll-home.png',
            title: 'An empty bank locks everything',
            caption:
              'Nothing banked, so the blocked apps are locked, and it says so outright instead of showing a zero for you to work out. The warning underneath is the honest one: minutes can be earned right now, but nothing is locked until the accessibility service is on, and Android only lets you grant that by hand.',
          },
          {
            src: '/media/fitscroll-settings.png',
            title: 'What counts as a rep is a dial, not an opinion',
            caption:
              'Five settings, each spelled out in degrees rather than left to vibes: Standard wants a bend past 92°, a lock-out past 152°, a body straighter than 128°, and at least 0.6s per rep. Underneath, the 24-hour bank limit: reps past it stop counting, so one huge session cannot buy a whole week.',
          },
          {
            src: '/media/fitscroll-picker.png',
            title: 'Choosing what to lock',
            caption:
              'Every installed app, with the locked ones counted at the top. They share one bank, because splitting it would just move the scrolling to whichever app still had a balance.',
          },
        ],
      },
    ],
    note:
      'Captured on an Android 15 emulator by driving the real 0.4.0 release APK through Appium, so this is the shipped app, not a web build or a mock-up. The bank reads empty because it is a fresh install and the only thing that fills it is push-ups in front of the camera, which an emulator cannot supply. The app list is the emulator’s own. The walkthrough is the same session screen-recorded off the device and centred in a 16:9 frame, since the app is portrait.',
    moreToAdd:
      'The workout screen. Everything above is reachable by driving the UI; the rep counter is not. It is fed by CameraX and ML Kit pose detection on live frames with no debug or simulated-rep path anywhere in the view model — by design, since a counter that can be told a rep happened is not a counter. So the one screen that shows the app doing its actual job needs a real phone, a real camera and a real set, recorded off the device. That footage is being shot; until it lands this sheet shows the screens that could be photographed honestly rather than a mock-up of the one that could not.',
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
      {
        head: '38 REST endpoints and 10 migrations',
        body:
          'Behind a Next.js App Router front end, grouped by the thing they serve: auth, calendar, tasks, health, finance, fx, profile.',
      },
      {
        head: 'Calendar, Tasks and Gmail on one screen',
        body:
          'One Google OAuth flow, with token refresh, syncs all three into the dashboard.',
      },
      {
        head: 'Two watches that don’t talk, reconciled into one day',
        body:
          'I wear a Fitbit and a Samsung Galaxy Watch 8 Classic, and the two ecosystems do not talk to each other: the Fitbit reports into Google Health, the Galaxy Watch into Samsung Health. Jarvis reconciles both into a single day: Google Health read live from its API, Samsung Health’s file export parsed by Claude into structured activities and meals.',
      },
      {
        head: 'Re-importing can’t double-count',
        body:
          'Every activity carries the source file’s own record id, so an overlapping second import is a no-op, not a double-counted run.',
      },
      {
        head: 'Statements and receipts become transactions',
        body:
          'Claude also reads uploaded bank statements and Gmail receipts and returns structured transactions, turning unstructured documents into queryable records.',
      },
      {
        head: 'Two currencies, kept apart',
        body:
          'The money side tracks both currencies separately and honestly: AUD statements and transactions, IDR statements from home, tuition instalments, and email-synced receipts, each with their own ingestion path.',
      },
      {
        head: 'When to send money home',
        body:
          'An AUD-to-IDR remittance tracker that compares the live rate against a 30-day average and flags good windows to transfer money home, with a log of what was sent and what arrived.',
      },
      {
        head: 'Health beyond a step count',
        body:
          'A day view, a weekly roll-up, resting and latest heart rate, body measurements over time, and nutrition synced from the same export.',
      },
    ],
    // Cut from the walkthrough below, with two built scenes: the opening, and
    // the two-wearable story that no single screen shows well.
    trailer: '/media/jarvis-trailer.mp4',
    trailerPoster: '/media/jarvis-trailer-poster.jpg',
    trailerNote:
      'The whole product in under forty seconds: the day on one grid, the two-watch reconciliation, the live transfer rate against its 30-day average, and Claude turning a bank statement PDF into transactions waiting for approval.',
    video: '/media/jarvis-demo.mp4',
    poster: '/media/jarvis-demo-poster.jpg',
    videoNote:
      'The app driven end to end, uncut and at real speed: read the day, look ahead a week and a month, book something in, check both wearables, then the money — the tuition goal, a transfer logged, a statement uploaded for Claude to read, and the Indonesian side of the accounts.',
    shots: [],
    flows: [
      {
        title: 'One screen for the whole day',
        caption:
          'What I open in the morning: what has to be done, what is booked, how I slept and what the money is doing, without opening six apps to find out.',
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
              'The same calendar at seven days, with the current time drawn across today and dated tasks carried up into the all-day row, so a deadline sits next to the hours it has to fit into.',
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
              'The operator card is editable in place: the name, the course and the city that the greeting and the timezone line are built from.',
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
              'Tuition is tracked as its own goal, not as another outgoing: an amount, a due date, and how much of it the current balance already covers.',
          },
          {
            src: '/media/jarvis-transfer.png',
            title: 'Log what was actually sent',
            caption:
              'A remittance is two numbers, rupiah out and dollars in, and the rate is whatever fell out of them. Recording both is what makes the transfer log honest about the rate received, not the rate advertised.',
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
              'Upload the PDF the bank sent. The dialog says up front what happens next, including that nothing is written until it has been reviewed. The bank on this one does not exist.',
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
          'The Indonesian side is a different problem: a different bank, a different currency, and receipts that arrive by email, not in a statement.',
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
    noteSummary:
      'Every task, event, figure, transaction and health reading is invented: the capture replaces the browser’s fetch before the app loads, so the dashboard asks for its data as it always does and gets made-up JSON back. No real account was reachable and the repository wasn’t modified; my name and course are the only real things on screen.',
    note:
      'Every task, event, figure, transaction and health reading in these captures is invented. Jarvis is wired to my own bank, inbox and health accounts, so instead of seeding a database or editing the app to make it presentable, the capture harness replaces the browser’s own fetch before any application code runs: the dashboard asks for /api/… as it always does and gets made-up JSON back. The dev server is started with synthetic credentials as well, so no real account is reachable even in principle, and the repository itself is not modified at all. The bank on the uploaded statement does not exist either. My own name and course are the one real thing left on screen, and only because they are already the title of this site. Beyond the invented data nothing is retouched: every layout, control and state is the app as it runs.',
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
      {
        head: '5,000 lines across twelve modules',
        body:
          'Feed, profile, posting, search, inbox, chat, notifications and auth, on Supabase Auth, Storage, Realtime subscriptions and row-level security.',
      },
      {
        head: 'A screenshot instead of a form',
        body:
          'Gemini vision reads a workout screenshot straight from your smartwatch app and auto-fills activity, distance, duration, pace and calories. No manual entry, because manual entry is where a fitness app dies.',
      },
      {
        head: 'The database sends the notifications',
        body:
          'A Postgres trigger calls the Expo Push Service through pg_net, so a like or a comment notifies whether or not anyone has the app open.',
      },
      {
        head: 'No web push, on purpose',
        body:
          'It is fragile enough on iOS Safari that shipping it would have meant supporting something that quietly fails for half the squad.',
      },
      {
        head: 'Schema changes only ever add',
        body:
          'Old APKs are already on people’s phones and will ignore a new column, but a rename or a drop breaks them, so nothing gets renamed once it has shipped.',
      },
      {
        head: 'Realtime is opt-in per table',
        body:
          'A new table joins the supabase_realtime publication deliberately, so nothing starts broadcasting on its own.',
      },
      {
        head: 'An APK for the squad, a web build on every push',
        body:
          'The Android APK is built through EAS, and the web version deploys to Vercel on every push to main.',
      },
      {
        head: 'Docs so friends could contribute',
        body:
          'Onboarding docs cover environment setup, release builds and schema-migration practice, so nobody needs me in the room.',
      },
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
              'Squad stories along the top (a gradient ring for one you have not watched, grey for one you have) and the week ranked underneath. The same week by points on the left and by duration on the right: Marcus trains the longest hours of anyone and is still fourth, because points reward the effort a minute costs.',
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
          'A session posts as a story that expires. It is the part people open, so it carries the likes, the comments and, if it is yours, the list of who has seen it.',
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
              'Upload the summary screen from Strava, Apple Fitness or Samsung Health. Gemini reads the image and returns activity, distance, duration, pace and calories as structured fields: the image posts as it is, and the stats land in the database behind it.',
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
              'The card is composed live (background, activity, the SQUAD badge and your note burnt in), and the date and time can be overridden, for the session you are logging the morning after.',
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
              'Notifications are aggregated (“and 3 others liked your workout” is one row, not four) and sent by a Postgres trigger, not the app, so they arrive whether or not anyone has it open. On the right: what the squad sees when you post nothing all week.',
          },
        ],
      },
    ],
    noteSummary:
      'Every person, workout, comment and message is invented, because the squad’s real data is my friends’ and none of them agreed to appear here. The app is the real web build, compiled with synthetic credentials and answered with invented rows, so nothing reached the real project.',
    note:
      'Every person in these captures is invented. Locked In is a social app, so its database is mostly other people (my friends’ names, their photographs and their real sessions), and none of them agreed to appear on a public portfolio. So the squad here is made up, and so is everything attached to them: the workouts, durations, calories, points, leaderboard positions, comments, chat messages and notifications. The avatars are generated from each invented name’s initials, not sourced from anywhere, and the images on the sessions are drawn from that session’s own numbers, not photographs of anyone. The uploaded watch screenshot is generated too, and says so on its face. Nothing came out of the real project: the web build under capture is compiled with synthetic Supabase credentials, the harness replaces fetch before any application code runs so the app issues the same queries it always does and gets invented rows back, and every request to a real Supabase host is intercepted and counted; a run that let one through would say so. Gemini is not called either; the extraction you see running is the app’s real code path against a stubbed reply. My own name is the one real thing left, and only because it is already the title of this site. The repository is not modified at all, and beyond the invented data nothing is retouched: every screen, control and state is the app as it runs.',
    portraitShots: true,
    repo: 'https://github.com/TusharLachman25/Locked-In',
  },
  {
    slug: 'kitchen-os',
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
      { value: '3.4k', label: 'lines of python' },
      { value: '66', label: 'backend functions' },
      { value: '3', label: 'unit systems reconciled' },
    ],
    blurb:
      'A pantry, recipe and nutrition tracker built in Python on a relational schema I designed from an entity-relationship diagram. Cook a recipe and it works out what you used and takes it out of your pantry, converting between grams, millilitres and pieces where it has to.',
    highlights: [
      {
        head: 'Cooking takes it out of the pantry',
        body:
          'Unit normalisation across weight, volume and count means a recipe asking for 200 ml of milk can be paid for out of a 1 kg entry, and a recipe asking for two eggs cannot.',
      },
      {
        head: 'One data layer, 66 functions',
        body:
          'The whole app is a Streamlit front end over a 66-function data layer, so every read and write goes through one module instead of being scattered through the pages.',
      },
      {
        head: 'Chats that persist',
        body:
          'A conversational recipe assistant on Gemini with real chat sessions (created, renamed, reopened and deleted) instead of one flat history that grows until it is useless.',
      },
      {
        head: 'Log a meal from a photo',
        body:
          'Gemini vision estimates the macros and logs it against the day.',
      },
      {
        head: 'Targets from body metrics',
        body:
          'Personalised calorie and macronutrient targets calculated from body metrics and activity level, with a daily dashboard and full history charted in Altair.',
      },
      {
        head: 'The usual breakfast is one tap',
        body:
          'Custom foods and reusable meal bundles, so the things you eat every week are one tap rather than four entries.',
      },
      {
        head: 'Ratings teach the assistant your taste',
        body:
          'Cooking a recipe writes a log you can rate and review afterwards, and those ratings build a taste profile the assistant can use.',
      },
      {
        head: 'Bought items land on the shelf',
        body:
          'Shopping list that flows back into the pantry when items are marked as bought, closing the loop instead of leaving two lists to reconcile by hand.',
      },
    ],
    // The trailer is built motion, not screen capture — the one sheet on this
    // site whose trailer is. The walkthrough underneath is the real app driven
    // through CDP against an in-process stand-in for Supabase, Gemini and the
    // food database, so its state changes are real writes to invented rows
    // rather than staged screens. Neither has been near the live project.
    trailer: '/media/kitchenos-trailer.mp4',
    trailerPoster: '/media/kitchenos-trailer-poster.jpg',
    trailerNote:
      'Twenty-four seconds on the one idea the schema exists for: a quantity that went down because something was cooked, not because anyone typed. Built as motion, not screen-captured, and every number in it is one the walkthrough underneath shows the app producing.',
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
              'Calories left against a target worked out from body metrics (not typed in), protein still to find, and how many things are in the pantry; then the quick actions and the last three meals.',
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
              'Recipes written by hand and recipes the assistant saved, marked apart. The collection is the assistant’s source material as much as the cook’s: it is told to suggest from here before inventing anything.',
          },
        ],
      },
      {
        title: 'The list and the shelf are the same data',
        caption:
          'A shopping list that ends in the pantry, so there is no second list to reconcile against it by hand.',
        steps: [
          {
            src: '/media/kitchenos-shopping.png',
            title: 'What needs buying',
            caption:
              'Quantity and unit per line, editable, with an optional thumbnail per row. Nothing here is a free-text note: every line is a real ingredient the rest of the app can do arithmetic with.',
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
          'Chat sessions that persist, and answers assembled from the quantities in stock, not from a generic recipe index.',
        steps: [
          {
            src: '/media/kitchenos-chat-history.png',
            title: 'Chats that survive the session',
            caption:
              'Created, renamed, reopened and deleted, each keeping its own history instead of one flat log that grows until it is useless.',
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
              'One button writes the meal into today’s total and deducts every ingredient from the shelf; the toast top right is that write landing. The rating that follows builds a taste profile the assistant reads back on later suggestions.',
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
          'Four ways into the food diary, and the body metrics the day’s numbers are calculated from.',
        steps: [
          {
            src: '/media/kitchenos-tracker.png',
            title: 'The day',
            caption:
              'Calories against target, the macro split, a seven-day trend and every meal in order. The 1,085 kcal dinner arrived from the cooking flow; nobody typed it in here.',
          },
          {
            src: '/media/kitchenos-quickadd.png',
            title: 'Log a one-off',
            caption:
              'Four routes behind one button. Quick Add is for the thing eaten once and never again, logged without being saved as a food. Micronutrients sit behind an expander so the common case stays four fields.',
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
              'Height, weight, age and activity level go through Mifflin-St Jeor to a daily calorie figure and a 30/35/35 macro split (2,669 kcal here), which can then be overridden by hand. Dietary requirements and a free-text note are handed to the assistant on every message.',
          },
        ],
      },
    ],
    noteSummary:
      'The trailer is built motion; from the walkthrough down it is the real app, with every food, recipe, meal and conversation invented. Supabase, Gemini and the food database were stood in for inside the Python process, so cooking a recipe is a real state change, and nothing was read from or written to the real database.',
    note:
      'The trailer at the top is a built motion piece made of designed scenes, not screen capture, though every figure in it is one the walkthrough and the screenshots below show the app itself producing. Everything from the walkthrough down is the real app, and everything in it is invented: the cook, their body metrics, the groceries, the recipes, every meal and macro, and both halves of every conversation. Kitchen OS is Streamlit, so unlike the browser-rendered projects on this site there is no fetch to replace: Python runs the whole app server-side and only rendered deltas ever reach the browser. The harness stands in for the external services inside the Python process instead, before app.py, backend.py and ai_chef.py build their clients at import time. Supabase is replaced by an in-process implementation of the queries the app makes, and its rows persist across reruns, so ticking an item off the list or cooking a recipe is a real state change photographed before and after, not two staged screens. Gemini is not called: its replies are scripted, though the chef quotes quantities read back out of the pantry context the app itself assembled. The food-database lookup returns invented results in the real response shape, and ingredient images are drawn rather than fetched. The app runs on synthetic credentials, and any connection to a host that is not the local server is refused and counted; a run that let one through would say so, and this one blocked none. Nothing was read from the real database and nothing was written to it, and the repository is not modified at all. Beyond the invented data nothing is retouched: the only thing hidden is Streamlit’s own local dev toolbar, and the decimal commas in the profile fields are the capture machine’s regional format, not anything the app chose.',
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
      {
        head: 'Two kinds of wager',
        body:
          'A One-Off resolves exactly once: you tap whoever won and it locks with the winner recorded against the bet. An Ongoing wager never resolves; it keeps a running tally per player that either side can add to, which is what a season-long argument looks like.',
      },
      {
        head: 'An incomplete bet is refused, out loud',
        body:
          'A bet is only valid if it is complete: description, both players and the stake are all required before it can be locked in, so the vague ones never make it into the ledger. That guard used to be one early return in addBet, which meant it failed silently: the button simply did nothing. The bet with a missing term is precisely the one that gets argued about later, so an unexplained refusal loses the record it was trying to protect. It now names the field and marks it, and the mark clears as you type into it. Fields are trimmed before being checked and before being stored, because a stake of a single space is the same vague bet wearing a disguise.',
      },
      {
        head: 'One shared ledger',
        body:
          'Every wager lives in Supabase, so both sides see the same open bets and the same settled ones.',
      },
      {
        head: 'No accounts at all',
        body:
          'No sign-in, no user table, and the players are just names typed into a field, not users who exist somewhere. It was built for one group of friends and handed to them directly, so the app never had to answer “who are you”: everyone holding it sees the same single ledger. The Supabase client is configured with AsyncStorage for session persistence, which is dead configuration: nothing in the app ever signs anyone in.',
      },
      {
        head: 'One codebase, an APK and a web build',
        body:
          'One React Native codebase produces both the Android APK, built through EAS and sent round the group, and a web build through react-native-web.',
      },
      {
        head: 'Where react-native-web leaks',
        body:
          'Building the same source for the web is where the abstraction leaks, and it leaks in one identifiable place. react-native-web renders a TextInput as an <input>, which carries a min-content width Yoga does not, so the paired name fields refused to shrink and overflowed the card below about 700px — every phone. Native was never affected. One minWidth fixes it, but only after knowing which of the two layout engines you are actually arguing with.',
      },
    ],
    // The trailer is built motion, not screen capture — the second sheet on
    // this site whose trailer is, for the same reason as Kitchen OS: the app is
    // a static, light-themed single screen and a recording of it reads as dead.
    // The walkthrough underneath is where the real footage lives.
    trailer: '/media/bets-trailer.mp4',
    trailerPoster: '/media/bets-trailer-poster.jpg',
    trailerNote:
      'Twenty-three seconds on the reason the thing exists: a bet made out loud is an argument scheduled for later, and this is the record that gets there first. Built as motion, not screen-captured, but not invented either: the cards are redrawn from the app’s own colours, radii and type, and both wagers in it are the same invented ones the screenshots below use.',
    video: '/media/bets-demo.mp4',
    poster: '/media/bets-demo-poster.jpg',
    videoNote:
      'The app driven end to end on a phone, uncut and at real speed: read the ledger as it stands, try to lock a bet in with the stake still missing and watch it say so, add the stake and watch it land at the top, settle a one-off onto a winner, open the other kind of wager and start its tally at nothing, add a point to a season that never resolves, then delete a settled bet and take the deletion back before it reaches the database. Every change on screen is a real write: the same five queries the app always issues, answered with invented rows.',
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
              'Empty on the left. On the right, three of the four required fields filled (description, both players, no stake) and “Lock It In” already pressed, and the app says which one is missing instead of doing nothing: the stakes field marked, “Still missing the stakes.” underneath it, and the ledger behind it unchanged because nothing was written. That refusal used to be silent, which made a rejected bet and a saved one look identical.',
          },
          {
            src: '/media/bets-locked-in.png',
            title: 'The fourth field, and the write',
            caption:
              'The stake typed in, and the same button now doing something. The row goes to Postgres and comes back carrying the id it was given, which the app puts at the head of the list instead of refetching; the ledger is ordered by created_at descending, so the newest wager is always the top of the page.',
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
              'Active on the left with a button per side; Completed on the right, the winner written into the row and the badge turned green. The buttons are gone because the card renders them only while the status is Active. Resolving has no undo in the UI, which is rather the point of having written the bet down.',
          },
        ],
      },
      {
        title: 'The wager that never ends',
        caption:
          'The other kind. An Ongoing bet never resolves; it keeps a running tally per player that either side can add to, which is what a season-long argument looks like.',
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
              'Mira’s +1 pressed: 6 becomes 7, Theo stays on 4. Each side has its own column, its own button and its own counter, and no combination of presses ever moves the bet to Completed.',
          },
        ],
      },
      {
        title: 'The ledger',
        caption:
          'One shared table, newest first, holding both kinds at once. There is no filter and no archive, so settling and deleting are the only two ways a wager leaves the page, which makes delete the one control that can lose a record.',
        steps: [
          {
            src: '/media/bets-ledger.png',
            title: 'A settled bet, and five seconds to change your mind',
            caption:
              'The completed wager at the bottom of the ledger, and the list immediately after Delete was pressed. Delete sits directly beneath the button that resolves the bet and used to take effect on the first press. A confirm dialog is the obvious fix and the wrong one, since it taxes every delete to guard the rare misfire. So the card leaves the screen at once and the DELETE is held for five seconds behind this toast. Nothing is written during that window, which means Undo has nothing to restore: it cancels a write that had not happened yet, and the card returns to its own place in the ledger, not to the top.',
          },
        ],
      },
    ],
    noteSummary:
      'The trailer is built motion; everything under it is the real app, with every bet and every person invented, because the real ledger is my friends’ wagers. It ran on synthetic credentials against invented rows, so every change on screen is a real write that never reached the real database.',
    note:
      'The trailer at the top is built motion, not app footage, and says so; everything below it is the real thing running. Every bet in either is invented, and it has to be: the real table is a ledger of wagers between me and my friends, so every name, stake and tally in it is theirs, and none of them agreed to appear on a public portfolio. So the wagers here are made up and so are the people: the same invented cast the Locked In captures use, on the same reasoning. My own name is the one real thing left, and only because it is already the title of this site. Nothing came out of the real project and nothing went into it: the build under capture is a copy of the app made outside its repository and compiled with synthetic Supabase credentials, the harness replaces fetch before any application code runs so the app issues the same five queries it always does and gets invented rows back, and every request to a Supabase host is intercepted and counted at two layers, the page and the network, with the run reporting the count and failing if it is not zero. The state changes are real writes, not staged screens: the tally really goes from 6 to 7, and the one-off really resolves. The delete shot is taken deliberately inside the five-second undo window, so the row is still in the table at the moment it is photographed. The harness asserts just that, and then asserts the row is gone once the window has closed, because a screenshot of a toast otherwise proves only that a toast rendered. Three things changed in the app itself while this sheet was being made, and all three are worth naming. Capturing it at phone width surfaced a react-native-web layout bug that put the second name field over the edge of the card, so the fix, a single minWidth, went into the real source before these were shot; the screenshots were not framed to hide it. The other two were gaps this page originally described as open: a form that refused a bet without saying why, and a delete with no confirmation and no way back. Both are now fixed rather than merely admitted, and these captures are of the fixed app. Beyond that nothing is retouched; every screen, control and state is the app as it runs.',
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
      'Two classification tasks over 20,280 27×27 patches of H&E-stained colon tissue from 98 patients: is this cell cancerous, and which of four types is it. A CNN against logistic regression, a random forest and an RBF-SVM, all of it split by patient and not by image, which is the decision the whole project turns on.',
    points: [
      'Every split is a patient split, not an image split. Patches from one patient share staining, scanner and morphology, so testing on a patient you trained on measures memory rather than generalisation.',
      'Enforced with StratifiedGroupKFold, and the code asserts the three patient sets are pairwise disjoint, so a leak raises an error instead of passing quietly.',
      'That choice cost the headline. The CNN scores 0.920 macro-F1 on validation and 0.852 on unseen test patients; the SVM falls 0.885 to 0.810. The brief wanted 0.90, so the binary task is recorded as not met. A per-image split would almost certainly have cleared it, by testing on near-identical patches of patients the model had already memorised.',
      'Before modelling, unsupervised analysis to check the problem was real: two principal components explain 25.84% of pixel variance, and K-Means at k=4 recovers the cell types with an Adjusted Rand Index of 0.041 — chance. Raw-pixel similarity is not the axis the labels sit on, which is the argument for learning a representation instead of hand-crafting features.',
      'A structural finding that reframed both tasks: cross-tabulating the labels, isCancerous = 1 exactly when the cell is epithelial, with no exceptions in 9,896 rows. Detecting cancer on this data is operationally detecting epithelial cells: useful for reading the results, and flagged in the report as an artefact of this dataset, not a clinical law.',
      'Learning rate swept over five values on the harder task and selected on validation, never test. The response is non-monotonic (0.690 at 1e-4, 0.760 at 1e-3, a dip to 0.737 at 3e-3, then 0.766 at 1e-2), so the tuned rate sits where convergence is fast but still stable.',
      'Augmentation closed the overfitting gap on cell-type but lost on test (0.603 against the baseline CNN’s 0.635), and the report says so instead of quoting the better number. Because selection has to happen on validation, where augmentation won, the augmented model is the legitimate pick and the higher score is one I am not entitled to claim.',
      'The failure mode is named rather than averaged away: “others” is a heterogeneous catch-all with 282 test patches, of which 204 are predicted as fibroblast and 39 are right, an F1 of 0.164 that drags the macro-average down on its own. On the binary task, cancerous recall of 0.821 means roughly 18% of cancerous cells are missed, which is the clinically costly direction and is discussed as such.',
    ],
    shots: [
      {
        src: '/media/histo-patches.png',
        title: 'What the model actually sees',
        caption:
          'Eight example patches per class. At 27×27 pixels there is almost no context beyond the nucleus itself, and three of the four classes look broadly alike; epithelial is the one a human can pick out, which is the pattern the results end up showing.',
      },
      {
        src: '/media/histo-kmeans.png',
        title: 'Raw pixels do not know the classes',
        caption:
          'K-Means at k=4 on the PCA features, cross-tabulated against the true cell types. Adjusted Rand Index 0.041: the clusters are essentially unrelated to the labels. This is the evidence that the biology is not the dominant axis of pixel variation, and that a representation has to be learned rather than assumed.',
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
          'The same task, baseline against augmented. The train and validation curves now track each other in the 0.73–0.76 band instead of diverging. One honest caveat, stated in the report: the augmented run also uses the tuned learning rate, so the single headline number conflates two changes, and the shape of the curves is the cleaner read.',
      },
      {
        src: '/media/histo-results.png',
        title: 'Test macro-F1 against the targets',
        caption:
          'Every model scored once on held-out patients, with the 0.90 and 0.60 target lines drawn in. Cell-type clears its bar; isCancerous misses. The Dummy classifier is on the chart deliberately: it takes 0.656 accuracy on the binary task and 0.396 macro-F1, which is the whole argument for not reporting accuracy under imbalance.',
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
      'Two projects in the same unit, both about implementing what a program normally takes for granted. First a multithreaded file copier: one thread per file, then a reader/writer team sharing a bounded queue. Then a heap allocator built directly on sbrk, with first-fit and best-fit as interchangeable strategies.',
    points: [
      'The single-file copier is a real producer–consumer: a team of reader threads pulls lines from the input, a team of writer threads drains them to the output, and a shared queue capped at 20 lines sits between them.',
      'Three mutexes with distinct jobs (one guarding the queue, one serialising reads of the input file, one serialising writes to the output) in place of one lock over everything, so readers and writers only contend where they genuinely share state.',
      'No busy-waiting anywhere. Two condition variables carry the handoff: readers wait on `not_full` when the queue is at capacity, writers wait on `not_empty` when it is drained, and main broadcasts on `not_empty` once reading is finished so no writer can block forever on a queue that will never fill again.',
      'Termination is the part that is easy to get subtly wrong: a writer exits only when the queue is empty *and* the reading-done flag is set, checked while holding the lock, so a writer can never mistake a momentary lull for the end of input. Verified under valgrind with no leaks and no errors.',
      'The allocator asks the kernel for memory itself via `sbrk` and keeps two intrusive linked lists, allocated and free, instead of leaning on the C library it is replacing. Requests are rounded up to size classes of 32, 64, 128, 256 and 512 bytes.',
      'First-fit and best-fit sit behind one function pointer, and `main` picks between them by inspecting `argv[0]`, so a single source file compiles to two binaries, `firstfit` and `bestfit`, that differ only in the strategy and can be run head-to-head on the same trace file.',
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
    tagline: 'One app run three ways on AWS (a VM, a container and a set of functions) so the trade-offs sit side by side.',
    stack: ['Python', 'Flask', 'boto3', 'Docker', 'AWS EC2', 'ECS Fargate', 'ECR', 'Lambda', 'API Gateway', 'DynamoDB', 'S3'],
    blurb:
      'A login-and-subscriptions music application on AWS, built by a team of four. Three DynamoDB tables behind a Flask backend, artist images in S3, a serverless path through Lambda and API Gateway, and a static frontend, with the same backend deployed twice: once onto an EC2 instance and once as a container on ECS Fargate.',
    points: [
      'The same Flask backend deployed twice, onto an EC2 instance and as a container on ECS Fargate, which puts a VM you patch yourself beside a task the platform replaces when it dies.',
      'Three DynamoDB tables (login, music and subscriptions), with the music table carrying a local secondary index and two global secondary indexes so it can be queried by year, by artist and by album, not only by its primary key.',
      'The EC2 deployment runs Flask under gunicorn as a systemd service, so it survives a reboot instead of living in a terminal. An Elastic IP keeps the public URL stable across stop/start, and an instance profile grants DynamoDB and S3 access through the role instead of through keys baked into the image.',
      'Provisioning is scripted in two halves that do different jobs (one script for first-time install, one for redeploying after a pull), because conflating them is how a deploy script quietly reinstalls the world every time.',
      'The container path is the same application through ECR and ECS Fargate: a slim Python image with gunicorn on port 80, a task definition at 0.25 vCPU and 0.5 GB, and a service that holds a desired count of one and replaces the task when it dies. An Application Load Balancer sits in front with a health check on `/health`.',
      'A parallel serverless path, four Lambda functions behind an API Gateway REST API with CORS on every method, so the same operations also exist as functions: the third way of running them, beside the container and the long-lived VM process.',
      'Two S3 buckets serve the static frontend, one pointed at the EC2 backend and one at the ECS backend, identical but for a single `API_BASE` constant. It makes the decoupling literal: the same frontend, unchanged, in front of two completely different backend deployments.',
      'One constraint worth naming, because it shaped the design: CloudFront was evaluated as the CDN in front of S3 and abandoned, since the AWS Academy lab role has no permission to create a distribution. The bucket policy enforces HTTPS via `aws:SecureTransport` instead.',
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
      'The problem is declared rather than searched. Exams, rooms, timeslots, student clashes, room capacities and durations are stated as rules and constraints in ASP, and Clingo finds and optimises the calendar; there is no hand-written search anywhere in the system.',
      'Hard and weak constraints are genuinely separated: a hard constraint eliminates an answer set outright, a weak one adds cost. That distinction is what lets the same encoding express “this must never happen” and “avoid this where you can” without collapsing them into one weighted mush.',
      'YAML instances are parsed into ASP facts by a Python front end, and solved calendars come back as TSV. An independent Prolog validator checks the output against the specification, so a calendar is verified by something other than the code that produced it.',
      'A pytest suite of purpose-built instances covers the constraints one at a time, each with an instance designed to be satisfiable, unsatisfiable, or to carry a specific cost, so a regression in one rule fails a named test instead of silently shifting a total.',
      'Experiments were scripted, not run by hand: a harness sweeps time limits, thread counts, per-constraint configurations and weight settings, writes results to CSV with metadata, and a second script turns those CSVs into the charts below. Any number in the report can be regenerated from the raw run.',
      'Two of the experiments returned nothing, and that is a result too. With a fixed time budget, wall-clock time is pinned to the budget regardless of thread count (324.7s against 324.8s across one to twelve threads), so parallelism has to be judged on solution quality, not on time, which is what the threads-versus-cost chart measures instead.',
    ],
    shots: [
      {
        src: '/media/asp-convergence.png',
        title: 'What another minute of solving buys',
        caption:
          'Best cost found against time limit on a log scale, five repeats per point, with the min–max band shaded. Cost falls from roughly 9,800 to 7,200 as the budget goes from 30 seconds to half an hour, steadily, with no plateau in the measured range, which says the solver was still improving when the budget ran out.',
      },
      {
        src: '/media/asp-threads.png',
        title: 'Parallelism, and the point where it stops paying',
        caption:
          'Threads against best cost at a fixed 300s budget. The curve is not monotonic: two threads is markedly worse than one, four recovers, eight is the best of the set and twelve is slightly behind it. Portfolio-based parallel search does not simply divide the work, and the chart shows where the returns stop.',
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
          'One constraint expressed four ways (off, soft at weight 5, soft at weight 50, and hard), with base cost and penalty stacked. The hard version reaches the lowest total, and soft50 is barely better than disabling the rule: past a point, a penalty large enough to matter just gets paid.',
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
      'A flight network reasoner in pure Prolog: a route database, path validity and non-redundancy, the cost and duration of a trip, then trips bounded by a budget and finally the best trip under a chosen criterion, all written under language restrictions that remove almost every shortcut.',
    points: [
      'The restrictions are the assignment. No `findall`, `setof`, `aggregate`, `forall`, `assert`, `retract` or `fail`, which rules out the obvious approach of gathering every candidate route into a list and picking the minimum. Everything has to be expressed as relations and recursion.',
      'So superlatives become negations. “The cheapest flight out of Toronto” is written as a flight for which no cheaper flight exists; “the most expensive airport tax” the same way. Negation as failure replaces the aggregate, and it only works because the search space is finite and ground, which is the point the exercise is making.',
      'Trip pricing carries state through the recursion instead of post-processing it: an airport tax applies on the first leg and again only when the airline changes, so the accumulator has to remember which carrier the previous leg used. Staying on one airline through a connection is genuinely cheaper, and the predicate has to model that.',
      'Bounded trips prune during the search, not after it: the running cost is checked against the limit at every leg, so a path that has already blown the budget is abandoned, not completed and then discarded.',
      'Best trip is built from bounded trip by iterative tightening: find any trip, use its cost as a ceiling, ask for something strictly cheaper, repeat until nothing cheaper exists, then re-solve at that bound. It is branch-and-bound written in a language that will not let you hold the candidates in a list.',
      'The route database stores each connection once and a bridging rule makes flights bidirectional, so the network cannot drift out of sync with itself, and a visited-city list threaded through the recursion is what stops the whole thing looping forever on a cyclic graph.',
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
      'Sentiment scored twice, with VADER and with RoBERTa, so a lexicon method and a transformer can be compared on identical comments instead of one being trusted by default.',
      'Topics extracted with both LDA and BERTopic, for the same reason: two models that disagree about what an argument is about is information, and a single model’s topic list looks authoritative whether or not it deserves to.',
      'The comment graph analysed for betweenness centrality to find the accounts bridging the two camps, Louvain communities to find the camps in the first place, and assortativity to measure how much each side only ever replies to itself.',
      'Influence modelled as cascades over the network, with a sensitivity sweep instead of one run, because a cascade result from a single parameter setting says more about the parameter than about the network.',
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
      'Two hands-on labs in Kali Linux. First a three-party encrypted exchange built from real Linux accounts and real RSA keys. Then a firewall built rule by rule with iptables: default-deny policies, per-host and per-range exceptions, and the difference between dropping a packet and refusing it demonstrated, not described.',
    points: [
      'Three separate Linux users, created and administered, so the exchange happens between real accounts with real permissions, not three directories pretending to be people.',
      'An RSA key pair per user, public keys exported armoured and imported by the others, then messages encrypted so that only the intended recipient can open them, including deleting a secret key and confirming what that does and does not make unreadable.',
      'Digital signatures in both forms, embedded and detached, each transmitted and then verified from the receiving account: the half that proves who sent a file, as opposed to who is able to read it.',
      'The firewall starts from default-deny: INPUT and FORWARD policies set to DROP and OUTPUT to ACCEPT, so every allowance afterwards is explicit and the failure mode of a missing rule is a blocked packet rather than an open one.',
      'Rules written at the granularity the scenario needs: multiport matching for HTTP and HTTPS together, `iprange` to admit one team’s address block to a single port, and FORWARD rules to control traffic passing through the host instead of landing on it.',
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
      'Recursive Division generates a perfect maze (the term of art for one with no loops, and exactly one path between any two cells) by repeatedly splitting the region with a wall and knocking a single gap in it.',
      'Wall Follower solves it, and the pairing is the point, not a coincidence: keeping one hand on the wall is guaranteed to reach the exit only when the maze is simply connected, which is what Recursive Division produces. Add one loop to the maze and the same solver can circle inside it forever.',
      'The maze is built in a real world, not an empty grid, so the terrain is flattened first: the ground Minecraft supplies is not level, and a wall placed on a slope stops being a wall.',
      'Construction is dynamic and three-dimensional through the mcpp API: the maze is placed into the live world as blocks, and a player walks the same structure the algorithm just generated.',
      'Real-time pathfinding assistance for a player navigating the generated maze, instead of a solution printed once and left on screen.',
      'The unit also required the same primitives written a level down, in LC-3 assembly: loops, branches, subroutines and memory operations built by hand, on a machine with no abstractions to borrow.',
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
      'The back end is Java on Javalin with JDBC to a SQLite database: a real server and a real query layer, not a page with the numbers typed into it.',
      'The front end is plain HTML, CSS and JavaScript, written before any framework was on the syllabus, which is the reason the later React work has something to compare against.',
      'The subject is a social one, and the brief was to present the data without editorialising, so the design problem was making a genuinely unpleasant dataset readable without deciding for the reader what to feel about it.',
      'Taken to real users for usability testing and then changed on what they said, not demonstrated once and marked. Several of the changes were to things we had been certain about.',
      'Built as a pair, coordinated over MS Teams with GitHub for version control — the first project where merging someone else’s work was a thing I had to be good at.',
    ],
  },
];
