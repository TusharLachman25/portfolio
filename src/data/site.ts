export const EMAIL = 'tusharbudhrani@gmail.com';
export const GITHUB = 'https://github.com/TusharLachman25';
export const LINKEDIN = 'https://www.linkedin.com/in/tusharlachman';
/** The one-page cut, not the two-page one. Everything this link is reached
 * from — the hero, the sidebar, the ⌘K palette — is someone deciding in a few
 * seconds whether to keep reading, and plenty of graduate and internship
 * postings ask for one page outright. The long version is still built and
 * still deployed at /Tushar-Lachman-Resume.pdf for anyone sent it directly. */
export const RESUME = '/Tushar-Lachman-Resume-1-page.pdf';

/** Canonical origin. Everything that needs an absolute URL — metadata, the
 * sitemap, robots.txt — reads it from here so the three can never disagree. */
export const SITE_URL = 'https://tusharlachman.dev';

export const NAME = 'Tushar Lachman';
export const LOCATION = 'Melbourne, Australia';

/** The discipline line. Deliberately three fields rather than one job title:
 * the work spans full-stack, mobile, data and AI, and a single title narrows
 * the search to less than the work actually supports. */
export const DISCIPLINE = 'Software · Data · AI/ML';

/** Two separate windows, and the site has to say both: the Australian summer
 * internship period, and the graduate role that starts after graduation. */
export const SUMMER_INTERNSHIP = 'November 2026 — February 2027';
export const GRAD_FROM = 'July 2027';

/** Work rights, stated outright. For an international student applying in
 * Australia this is the first thing a recruiter screens on, and leaving it to
 * be guessed loses the application before anyone reads the work. */
export const WORK_RIGHTS =
  'Indonesian citizen on an Australian student visa — unrestricted work hours over the November 2026 — February 2027 summer break, then a graduate visa from August 2027.';

/** The brand accent, used for anything that belongs to the site itself rather
 * than to one project. Every project carries its own accent alongside it. */
export const BRAND = '#0ea5e9';

/** The summary card in the top right of the home page — the facts a recruiter
 * screens on, in the order they screen for them. */
export const TITLE_BLOCK: { key: string; value: string }[] = [
  { key: 'NAME', value: 'Tushar Lachman' },
  {
    key: 'EDUCATION',
    value: 'Bachelor of Computer Science with a minor in Artificial Intelligence & Machine Learning',
  },
  { key: 'INSTITUTION', value: 'RMIT University, Melbourne' },
  { key: 'FOCUS', value: 'Full-stack · mobile · data · AI & ML' },
  { key: 'OPEN TO', value: 'Any tech role — software, data, ML, platform, QA or product' },
  { key: 'LOCATION', value: 'Melbourne, Australia' },
  { key: 'AVAILABLE', value: 'Summer internship Nov 2026 — Feb 2027 · graduate role from July 2027' },
  {
    key: 'WORK RIGHTS',
    value:
      'Student visa, unrestricted hours over the summer break · graduate visa from Aug 2027',
  },
];

/** Four numbers that survive being checked. 111 is 73 edge functions plus 38
 * REST endpoints; 762 is what `vitest run` prints on the medical repo (637)
 * plus what `gradlew testDebugUnitTest` prints on FitScroll (125). */
export const HERO_STATS: { value: string; label: string }[] = [
  { value: '6', label: 'PRODUCTS BUILT' },
  { value: '1', label: 'PAYING CUSTOMER' },
  { value: '111', label: 'API + EDGE FUNCTIONS' },
  { value: '762', label: 'UNIT TESTS' },
];

export const SKILLS: { label: string; items: string }[] = [
  { label: 'LANGUAGES', items: 'Python · TypeScript · JavaScript · Kotlin · Java · C · C++ · SQL · Prolog' },
  {
    label: 'FRAMEWORKS',
    items: 'React · React Native (Expo) · Next.js · Node.js · Flask · Streamlit · Tailwind CSS',
  },
  {
    label: 'MOBILE',
    items:
      'Native Android (Kotlin, Jetpack Compose) · CameraX · ML Kit on-device pose detection · accessibility services · Capacitor · Expo / EAS Build',
  },
  {
    label: 'CLOUD & DEVOPS',
    items: 'AWS (EC2, ECS, S3, DynamoDB) · Docker · Vercel · EAS Build · Gradle · Firebase Cloud Messaging · Git',
  },
  {
    label: 'BACKEND & DATA',
    items:
      'PostgreSQL · Supabase · REST API design · serverless functions · OAuth 2.0 · row-level security · schema design & migrations',
  },
  {
    label: 'AI & DATA SCIENCE',
    items: 'Claude API (tool use) · Google Gemini (text & vision) · scikit-learn · pandas · NLTK · transformers · NetworkX',
  },
  {
    label: 'PRACTICE',
    items:
      'Unit testing (Vitest, pytest, JUnit, Robolectric) · monorepos · CI to Vercel, EAS and GitHub Actions · technical writing & onboarding docs',
  },
];

export interface Unit {
  /** RMIT unit code. Included because it makes the list checkable — a code is
   * something a recruiter can look up, a unit name is something anyone can type. */
  code: string;
  name: string;
  /** Marked on units awarded a High Distinction. Only HDs are marked, the way a
   * CV names its best results: an unmarked unit asserts nothing about its grade
   * in either direction, so nothing here can be read as a claim that isn't true. */
  hd?: boolean;
}

/** The degree, laid out the way a transcript is, but as one list rather than
 * split by year: what has been covered matters, which year it happened in
 * doesn't. Units in progress are kept separate — the site should never imply a
 * unit is finished while the semester is still running. */
export const EDUCATION = {
  degree: 'Bachelor of Computer Science',
  minor: 'Minor in Artificial Intelligence & Machine Learning',
  institution: 'RMIT University, Melbourne',
  period: '2024 — July 2027',
  completed: [
    { code: 'COSC2801', name: 'Programming Bootcamp 1' },
    { code: 'COSC2803', name: 'Programming Studio 1', hd: true },
    { code: 'MATH2466', name: 'Introduction to Maths for Computing' },
    { code: 'COSC2802', name: 'Programming Bootcamp 2' },
    { code: 'COSC2804', name: 'Programming Studio 2' },
    { code: 'MATH2411', name: 'Mathematics for Computing 1' },
    { code: 'INTE2625', name: 'Introduction to Cyber Security', hd: true },
    { code: 'ISYS1118', name: 'Software Engineering Fundamentals' },
    { code: 'COSC2960', name: 'Foundations of AI for STEM', hd: true },
    { code: 'COSC1114', name: 'Operating Systems Principles' },
    { code: 'COSC2123', name: 'Algorithms and Analysis' },
    { code: 'COSC2626', name: 'Cloud Computing', hd: true },
    { code: 'COSC2673', name: 'Machine Learning', hd: true },
    { code: 'COSC2973', name: 'Intelligent Decision Making' },
    { code: 'COSC3047', name: 'Social Media and Network Analytics' },
  ] satisfies Unit[],
  /** Semester 2 2026 — running right now. */
  current: [
    { code: 'COSC1127', name: 'Artificial Intelligence' },
    { code: 'COSC2299', name: 'Software Engineering: Process and Tools' },
    { code: 'COSC2972', name: 'Deep Learning' },
    { code: 'COSC3045', name: 'Essentials of Computing' },
  ] satisfies Unit[],
};
