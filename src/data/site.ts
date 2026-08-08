export const EMAIL = 'tusharbudhrani@gmail.com';
export const GITHUB = 'https://github.com/TusharLachman25';
export const LINKEDIN = 'https://www.linkedin.com/in/tusharlachman-505264345';
export const RESUME = '/Tushar-Lachman-Resume.pdf';

export const NAME = 'Tushar Lachman';
export const LOCATION = 'Melbourne, Australia';

/** Two separate windows, and the site has to say both: the Australian summer
 * internship period, and the graduate role that starts after graduation. */
export const SUMMER_INTERNSHIP = 'November 2026 — February 2027';
export const GRAD_FROM = 'July 2027';

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
  { key: 'FOCUS', value: 'Full-stack · AI & ML' },
  { key: 'LOCATION', value: 'Melbourne, Australia' },
  { key: 'AVAILABLE', value: 'Summer internship Nov 2026 — Feb 2027 · graduate role from July 2027' },
];

/** Four numbers that survive being checked. 104 is 66 edge functions plus 38
 * REST endpoints; 269 is what `vitest run` prints on the medical repo. */
export const HERO_STATS: { value: string; label: string }[] = [
  { value: '5', label: 'PRODUCTS BUILT' },
  { value: '1', label: 'PAYING CUSTOMER' },
  { value: '104', label: 'API + EDGE FUNCTIONS' },
  { value: '269', label: 'UNIT TESTS' },
];

export const SKILLS: { label: string; items: string }[] = [
  { label: 'LANGUAGES', items: 'Python · TypeScript · JavaScript · Java · C · C++ · SQL · Prolog' },
  {
    label: 'FRAMEWORKS',
    items: 'React · React Native (Expo) · Next.js · Node.js · Flask · Streamlit · Tailwind CSS',
  },
  {
    label: 'CLOUD & DEVOPS',
    items: 'AWS (EC2, ECS, S3, DynamoDB) · Docker · Vercel · EAS Build · Firebase Cloud Messaging · Git',
  },
  {
    label: 'BACKEND & DATA',
    items:
      'PostgreSQL · Supabase · REST API design · serverless functions · OAuth 2.0 · row-level security · schema design & migrations',
  },
  {
    label: 'AI & DATA SCIENCE',
    items: 'Claude API · Google Gemini (text & vision) · scikit-learn · pandas · NLTK · transformers · NetworkX',
  },
  {
    label: 'PRACTICE',
    items: 'Unit testing (Vitest, pytest) · monorepos · CI to Vercel and EAS · technical writing & onboarding docs',
  },
];

export interface EducationYear {
  label: string;
  year: string;
  courses: string[];
}

/** The degree, laid out the way a transcript is. Recruiters screening for an
 * internship want to know what has actually been covered, not just the title. */
export const EDUCATION = {
  degree: 'Bachelor of Computer Science',
  minor: 'Minor in Artificial Intelligence & Machine Learning',
  institution: 'RMIT University, Melbourne',
  period: '2024 — July 2027',
  years: [
    {
      label: 'YEAR ONE',
      year: '2024',
      courses: ['Programming Studio 1', 'Programming Studio 2'],
    },
    {
      label: 'YEAR TWO',
      year: '2025',
      courses: [
        'Algorithms and Analysis',
        'Foundations of Artificial Intelligence',
        'Software Engineering Fundamentals',
        'Introduction to Cyber Security',
        'Operating Systems Principles',
        'Managing Semi-Structured and Unstructured Data',
        'Mathematics for Computing',
      ],
    },
    {
      label: 'YEAR THREE',
      year: '2026',
      courses: [
        'Machine Learning',
        'Cloud Computing',
        'Intelligent Decision Making',
        'Social Media and Network Analytics',
        'Artificial Intelligence',
      ],
    },
  ] satisfies EducationYear[],
};
