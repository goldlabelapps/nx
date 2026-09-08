export interface Era {
  id: string;
  name: string;
  years: string;
  description: string;
  technologies: string[];
  color: string;
}

export interface RoleExperience {
  id: string;
  title: string;
  company: string;
  url?: string;
  location: string;
  period: string;
  eraId: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface TagInfo {
  slug: string;
  name: string;
  category: "core" | "ai" | "frontend" | "backend" | "database" | "cloud" | "devops" | "legacy";
  eraId: string;
  description: string;
  image?: string;
  featuredImage?: string;
}

export interface ProfileData {
  founder: {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin?: string;
    tagline: string;
    bio: string;
  };
  eras: Era[];
  tags: TagInfo[];
  roles: RoleExperience[];
}

export const profileData: ProfileData = {
  founder: {
    name: "JavaScript",
    title: "whatever the weather",
    email: "goldlabel.apps@gmail.com",
    phone: "+44 07745763122",
    github: "https://github.com/goldlabelapps",
    linkedin: "https://www.linkedin.com/in/chris-dorward/",
    tagline: "20+ years delivering enterprise JavaScript across the full stack, specialising in React, Next.js, and Node . Working across the UK, Europe, Australia & remote teams worldwide.",
    bio: "Deep expertise in React and TypeScript, specialising in Next.js. 20+ years delivering scalable web applications for startups, enterprises, and remote-first teams across the UK, Europe, Australia & beyond. Experienced in Agentic Coding and AI-assisted software development, including Google Antigravity, alongside Python backend development and AI/LLM prompt engineering.",
  },
  eras: [
    {
      id: "era-1",
      name: "Dotcom & Flash Era",
      years: "1999–2006",
      description: "Interactive web applications, Flash ActionScript, DHTML, and early web platforms.",
      technologies: ["Flash", "ActionScript", "DHTML", "PHP", "MySQL", "Ceros Prototype"],
      color: "#f59e0b",
    },
    {
      id: "era-2",
      name: "Web 2.0 & CMS Era",
      years: "2007–2015",
      description: "WordPress Multisite, responsive HTML5/CSS3, custom plugins, and enterprise SaaS.",
      technologies: ["WordPress", "Drupal", "PHP MVC", "jQuery", "CSS3", "HTML5", "REST APIs"],
      color: "#10b981",
    },
    {
      id: "era-3",
      name: "JS Revolution & React",
      years: "2016–2018",
      description: "Transition to React, Redux, Node.js, isomorphic JS, and Magento PWAs.",
      technologies: ["React", "Redux", "Node.js", "ES6+", "Webpack", "Magento PWA"],
      color: "#3b82f6",
    },
    {
      id: "era-4",
      name: "Modern Frontend & PWAs",
      years: "2018–2021",
      description: "React PWAs, AWS Amplify, GraphQL, Gatsby, CoffeeScript to React migration.",
      technologies: ["React Native", "Gatsby", "AWS Amplify", "GraphQL", "Material UI", "BDD"],
      color: "#8b5cf6",
    },
    {
      id: "era-5",
      name: "Node & Next JS",
      years: "2021–2025",
      description: "Next.js App Router, Firebase/Firestore, modular MUI design systems, Strapi, Contentful.",
      technologies: ["Next.js", "TypeScript", "Firebase", "Firestore", "Contentful", "Strapi", "MUI"],
      color: "#ec4899",
    },
    {
      id: "era-6",
      name: "Agentic AI",
      years: "2025–2026+",
      description: "Google Antigravity, FastAPI, Supabase, Stripe, Ollama/Phi-3, NX monorepos.",
      technologies: ["Agentic Coding", "Google Antigravity", "Python", "FastAPI", "Supabase", "Stripe", "NX Monorepo"],
      color: "#6366f1",
    },
  ],
  tags: [
    { slug: "agentic-ai", name: "Agentic AI", category: "ai", eraId: "era-6", description: "AI-assisted software development, autonomous coding workflows, and Google Antigravity integration." },
    { slug: "nextjs", name: "Next.js", category: "frontend", eraId: "era-5", description: "Production Next.js App Router, SSG, Server Components, and modular platform architectures." },
    { slug: "typescript", name: "TypeScript", category: "core", eraId: "era-5", description: "Strongly typed application development across fullstack web and mobile apps." },
    { slug: "react", name: "React", category: "frontend", eraId: "era-3", description: "10+ years of React development across web, PWAs, and React Native mobile apps." },
    { slug: "python", name: "Python", category: "backend", eraId: "era-6", description: "FastAPI backends, AI prompt engineering, and LLM automation pipelines." },
    { slug: "fastapi", name: "FastAPI", category: "backend", eraId: "era-6", description: "High-performance Python microservices, CSV processing, and API design." },
    { slug: "supabase", name: "Supabase", category: "database", eraId: "era-6", description: "PostgreSQL backends, auth, and real-time database architectures." },
    { slug: "firebase", name: "Firebase", category: "database", eraId: "era-5", description: "Firestore, Firebase Auth, and real-time cloud datastores for enterprise admin portals." },
    { slug: "flash", name: "Flash & ActionScript", category: "legacy", eraId: "era-1", description: "Early career rich internet applications, gaming UIs, and Ceros publishing platform prototype." },
    { slug: "wordpress", name: "WordPress & PHP", category: "legacy", eraId: "era-2", description: "Multisite development, custom PHP plugins, REST API integrations, and CMS architectures." },
    { slug: "nx-monorepo", name: "NX Monorepo", category: "devops", eraId: "era-6", description: "Open-source NX architecture, modular design systems, and rapid app templating." },
  ],
  roles: [
    {
      id: "askleida",
      title: "Principal Engineer",
      company: "askleida.com",
      url: "https://askleida.com",
      location: "Remote",
      period: "May 2026 – Aug 2026",
      eraId: "era-6",
      summary: "End-to-end engineering for Leida MVP, an AI-powered platform helping solo skin therapists generate personalized homecare recommendations in minutes.",
      highlights: [
        "Architected AI-assisted recommendation workflows",
        "Built Supabase-backed data layer and secure server-side APIs",
        "Integrated Stripe checkout and webhook automation",
        "Delivered production performance, reliability, and release quality improvements",
      ],
      skills: ["Next.js", "TypeScript", "AI Workflows", "Supabase", "Stripe", "Python"],
    },
    {
      id: "echopay",
      title: "Fullstack Developer (Next.js & Python)",
      company: "EchoPay",
      location: "Contract",
      period: "Jan 2026 – May 2026",
      eraId: "era-6",
      summary: "Developed a B2B product ordering platform using Python (FastAPI) backend and EchoPay payment integration.",
      highlights: [
        "Built B2B ordering platform supporting CSV product management and real-time order updates",
        "Designed and deployed secure, scalable APIs for orders, customer history, and admin dashboards",
        "Built frontend on custom NX Next.js platform, decoupled from Python backend services",
        "Managed production deployment on Render.com with full authentication and webhook handling",
      ],
      skills: ["Next.js", "Python", "FastAPI", "EchoPay", "NX Monorepo", "Render.com"],
    },
    {
      id: "freelance-rd",
      title: "Independent Software Developer",
      company: "Freelance & R&D",
      location: "Remote",
      period: "May 2025 – Dec 2025",
      eraId: "era-6",
      summary: "R&D and client software development focusing on AI-assisted delivery, local LLMs, and Next.js architecture.",
      highlights: [
        "Evolved Goldlabel open-source Next.js platform as real-world architecture testbed",
        "Researched AI-assisted software development and agentic workflows",
        "Deployed local LLM environments (Ollama, Phi-3) integrated into Next.js pipelines",
        "Accelerated deliverables including infrastructure-heavy Magento plugins",
      ],
      skills: ["Agentic Coding", "Next.js", "Ollama", "Python", "Goldlabel NX"],
    },
    {
      id: "vucity",
      title: "Frontend Developer",
      company: "VU.CITY",
      location: "London / Hybrid",
      period: "Apr 2024 – May 2025",
      eraId: "era-5",
      summary: "Led development of internal tools and Admin Portal using Next.js App Router, Firebase Auth, and Firestore.",
      highlights: [
        "Architected modular frontend platform powering multiple apps with a shared MUI design system",
        "Built event-driven interfaces integrating with AWS and internal APIs",
        "Championed accessibility, performance, and developer experience best practices",
      ],
      skills: ["Next.js", "TypeScript", "Firebase", "Firestore", "Material UI", "AWS"],
    },
    {
      id: "dtrackt",
      title: "Full Stack JavaScript Developer",
      company: "Dtrackt!",
      location: "Malta",
      period: "Jun 2021 – Feb 2024",
      eraId: "era-5",
      summary: "Delivered high-performance static and PWA sites using Gatsby (Node + React) and Headless CMS.",
      highlights: [
        "Integrated Contentful and Strapi Headless CMS platforms",
        "Standardized Material UI Design System across frontends",
        "Served as Scrum Master facilitating agile delivery",
      ],
      skills: ["Gatsby", "React", "Contentful", "Strapi", "Material UI", "Node.js"],
    },
    {
      id: "wanngi",
      title: "Product Lead",
      company: "Wanngi",
      location: "Brisbane, Australia",
      period: "Jun 2020 – Nov 2020",
      eraId: "era-4",
      summary: "Led redevelopment of legacy Angular PWA into a new React + PostgreSQL platform.",
      highlights: [
        "Architected core framework features using custom open-source tooling",
        "Oversaw engineering team and coordinated cross-functional delivery",
      ],
      skills: ["React", "PostgreSQL", "PWA", "TypeScript", "Product Management"],
    },
    {
      id: "codeworx",
      title: "Senior Frontend Developer",
      company: "Codeworx",
      location: "Brisbane, Australia",
      period: "Sep 2019 – Feb 2020",
      eraId: "era-4",
      summary: "Migrated legacy poker app from CoffeeScript/jQuery to modern React-based PWA and React Native.",
      highlights: [
        "Refactored critical UI flows for stability and performance",
        "Delivered React Native mobile app features",
      ],
      skills: ["React", "React Native", "PWA", "CoffeeScript Migration"],
    },
    {
      id: "rexlabs",
      title: "Senior Frontend Developer",
      company: "Rexlabs",
      location: "Brisbane, Australia",
      period: "Mar 2019 – Aug 2019",
      eraId: "era-4",
      summary: "Supported transition from legacy PHP/Knockout stack to React/Redux frontend.",
      highlights: [
        "Modularized UI and improved developer experience",
        "Mentored junior developers during migration sprints",
      ],
      skills: ["React", "Redux", "PHP", "Knockout.js"],
    },
    {
      id: "boral",
      title: "React Developer",
      company: "Boral",
      location: "Sydney, Australia",
      period: "Aug 2018 – Feb 2019",
      eraId: "era-4",
      summary: "Built foundational test architecture and React PWAs with AWS Amplify and GraphQL.",
      highlights: [
        "Implemented BDD test suite with Cucumber and Gherkin",
        "Enabled automated CI/CD deployment pipelines",
      ],
      skills: ["React", "AWS Amplify", "GraphQL", "BDD", "Cucumber"],
    },
    {
      id: "canon",
      title: "Senior Frontend Developer",
      company: "Canon Australia",
      location: "Sydney, Australia",
      period: "Mar 2018 – Aug 2018",
      eraId: "era-4",
      summary: "Led frontend development of a full-featured Progressive Web App from scratch.",
      highlights: [
        "Architected persistent Redux state management",
        "Integrated multiple SaaS APIs with UX enhancements across devices",
      ],
      skills: ["React", "Redux", "PWA", "SaaS APIs"],
    },
    {
      id: "aligent",
      title: "Frontend Engineer",
      company: "Aligent Consulting",
      location: "Adelaide, Australia",
      period: "Apr 2017 – Mar 2018",
      eraId: "era-3",
      summary: "Built commercial React PWAs and Magento e-commerce checkout flows.",
      highlights: [
        "Developed custom ES6 modules for high-traffic stores",
        "Delivered conversion-optimized mobile-first PWAs",
      ],
      skills: ["React", "Magento", "PWA", "JavaScript ES6+"],
    },
    {
      id: "ustwo",
      title: "Fullstack Developer",
      company: "usTwo",
      location: "Sydney, Australia",
      period: "Jan 2017 – Feb 2017",
      eraId: "era-3",
      summary: "Lead developer for Cancer Council NSW Healthy Lunchbox app.",
      highlights: [
        "Built React frontend connected to WordPress via REST API",
        "Developed custom PHP endpoints and WordPress plugins",
      ],
      skills: ["React", "WordPress REST API", "PHP", "Webpack"],
    },
    {
      id: "alcidion",
      title: "Front End Software Engineer",
      company: "Alcidion",
      location: "Adelaide, Australia",
      period: "Aug 2016 – Nov 2016",
      eraId: "era-3",
      summary: "Built real-time hospital bed management interfaces using React and Redux.",
      highlights: [
        "Delivered critical healthcare software in fast-paced SCRUM environment",
      ],
      skills: ["React", "Redux", "Healthcare IT"],
    },
    {
      id: "huawei",
      title: "Contract JavaScript Developer",
      company: "Huawei",
      location: "Shenzhen, China",
      period: "Feb 2016 – May 2016",
      eraId: "era-3",
      summary: "Built isomorphic JavaScript project management app using React and Node.js.",
      highlights: [
        "Contributed to localization for Chinese-language enterprise users",
      ],
      skills: ["React", "Node.js", "Isomorphic JS"],
    },
    {
      id: "changing-workplace",
      title: "Contract JavaScript Developer",
      company: "The Changing Workplace",
      location: "London",
      period: "Sep 2015 – Jan 2016",
      eraId: "era-2",
      summary: "Facilities management SaaS platform for enterprise clients including Microsoft and GE.",
      highlights: [
        "Handled high-volume datasets with RESTful APIs",
      ],
      skills: ["JavaScript", "REST APIs", "SaaS"],
    },
    {
      id: "listingslab",
      title: "Self-Employed Web Developer",
      company: "Listingslab",
      location: "Remote / Global",
      period: "Jul 2007 – Jul 2015",
      eraId: "era-2",
      summary: "Solo consultancy delivering WordPress Multisite solutions, plugins, and responsive HTML5/CSS3 UIs.",
      highlights: [
        "Delivered bespoke full-stack solutions for international clients over 8 years",
      ],
      skills: ["WordPress Multisite", "PHP", "jQuery", "HTML5", "CSS3"],
    },
    {
      id: "velo",
      title: "Senior Developer",
      company: "Velo//",
      location: "London",
      period: "Oct 2010 – Dec 2011",
      eraId: "era-2",
      summary: "WordPress Multisite solutions and Flash PHP/MySQL integrations.",
      highlights: [
        "Delivered multi-client interactive campaign sites",
      ],
      skills: ["WordPress", "Flash", "PHP", "MySQL"],
    },
    {
      id: "fmg-ceros",
      title: "Lead Product Developer",
      company: "FMG",
      location: "London",
      period: "Nov 2005 – Dec 2006",
      eraId: "era-1",
      summary: "Designed and launched Ceros, a Flash-based digital publishing platform.",
      highlights: [
        "Developed product prototype and backend integrations sold commercially since 2006",
      ],
      skills: ["Flash", "ActionScript", "Digital Publishing", "PHP"],
    },
    {
      id: "ig-index",
      title: "Senior Systems Developer",
      company: "IG Index",
      location: "London",
      period: "Oct 2003 – Nov 2005",
      eraId: "era-1",
      summary: "Lead Flash developer in in-house creative team for financial platform.",
      highlights: [
        "Migrated trading frontend systems to third-generation Flash platform",
      ],
      skills: ["Flash", "Trading UIs", "ActionScript", "Finance"],
    },
    {
      id: "early-career",
      title: "Flash & Web Systems Developer",
      company: "Cantor Fitzgerald, Eurobet, Pearson Broadband, KPE, 4MAT",
      location: "London / Sydney",
      period: "1999 – 2004",
      eraId: "era-1",
      summary: "Early web pioneer building rich internet applications, gaming, trading, and media platforms during the dotcom era.",
      highlights: [
        "Cantor Fitzgerald (2002–2003): Trading UIs",
        "Eurobet (2002): Online gaming Flash UIs",
        "Pearson Broadband (2002–2003): Educational media platforms",
        "Kyunet Sydney (2001–2002): Web developer during dotcom boom",
        "KPE London & 4MAT (1999–2001): Casino & recruitment web apps",
      ],
      skills: ["Flash", "DHTML", "HTML3.2", "JavaScript", "ActionScript"],
    },
  ],
};
