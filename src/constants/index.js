const navLinks = [
  { name: "About Me", link: "#hero" },
  { name: "Experience", link: "#experience" },
  { name: "Work", link: "#work" },
  { name: "Skills", link: "#skills" },
  { name: "Resume", link: "#resume" },
  { name: "References", link: "#testimonials" },
];

const words = [
  { text: "Creative", imgPath: "/images/ideas.svg" },
  { text: "Robust", imgPath: "/images/concepts.svg" },
  { text: "Efficient", imgPath: "/images/designs.svg" },
  { text: "Lasting", imgPath: "/images/code.svg" },
  { text: "Creative", imgPath: "/images/ideas.svg" },
  { text: "Robust", imgPath: "/images/concepts.svg" },
  { text: "Efficient", imgPath: "/images/designs.svg" },
  { text: "Lasting", imgPath: "/images/code.svg" },
];

const words2 = [
  { text: "Deliver Results" },
  { text: "Embody Visions"},
  { text: "Feel Alive"},
  { text: "Transform Ideas"},
  { text: "Deliver Results" },
  { text: "Embody Visions"},
  { text: "Feel Alive"},
  { text: "Transform Ideas"},

];

const counterItems = [
  { value: 2, suffix: "+", label: "Years Shipping to Production", desc: "Full-stack at GranjurTech since 2024" },
  { value: 4, suffix: "", label: "Client Projects via CSAAS", desc: "Delivered on a platform I built" },
  { value: 1000, suffix: "+", label: "Commits on Work Repos", desc: "UBS framework, HMS, docs portal" },
  { value: 30, suffix: "+", label: "Completed Projects", desc: "From bots to large-scale platforms" },
];

// Tools I use. Company logos (Amazon, Microsoft...) read as clients/employers, so they're out.
const logoIconsList = [
  "react.png", "node.png", "python.svg", "postgresql.png", "mysql.png",
  "docker.png", "three.png", "git.svg", "vercel.png", "asm.jpg",
].map((f) => ({ imgPath: `/images/logos/${f}`, name: f.split(".")[0] }));


const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Tech Stacks",
    desc: "Fluent in React, Node.js, Python, and Three.js for full-stack development.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Database Systems",
    desc: "Experienced with MongoDB, PostgreSQL, and MySQL for robust data management.",
  },
  {
    imgPath: "/images/time.png",
    title: "Scripting & Automation",
    desc: "Proficient in Python and JavaScript for automating tasks and enhancing workflows.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },

  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 4,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.04,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.04,
    rotation: [0, -Math.PI / 4, 0],
  },
    {
    name: "Blender Artist",
    modelPath: "/models/the-fool.glb",
    scale: 1.3,
    rotation: [-0.1, 0, 0],
  },
];

const expCards = [
  {
    imgPath: "/images/granjur_logo.png",
    logoPath: "/images/granjur_logo.png",
    title: "Full-Stack Developer @GranjurTech",
    date: "September 2024 - Present",
    responsibilities: [
      "Developed and maintained the UBS framework @GranjurTech, enhancing its performance, scalability and features.",
      "Created bots and deployed scripts to assist with internal processes, improving efficiency.",
      "Collaborated with cross-functional teams to provide technical support and resolve issues.",
    ],
    link: "https://granjur.com",
  },
  {
    imgPath: "/images/exp2.png",
    logoPath: "/images/granjur_logo.png",
    title: "Back-end Dev Intern @GranjurTech",
    date: "June 2024 - September 2024",
    responsibilities: [
      "Created wireframes, designer requirements, database schemas and API documentation for an HR Management System.",
      "Laid the groundwork for the soon-to-be UBS framework backend",
      "Assisted in file management system development, API integration, and Saas application development.",
    ],
    link: "https://granjur.com",
  },
  {
    imgPath: "/images/exp3.png",
    logoPath: "/images/freelance_logo.png",
    title: "Freelance Developer + Artist",
    date: "September 2020 - Present",
    responsibilities: [
      "Built web apps used by university students, including a timetable planner and a cafeteria menu app.",
      "Motion graphics for personal and freelance projects.",
      "VFX and 3D art for personal projects.",
    ],
    link: "https://www.linkedin.com/in/aashir-adnan-69521b253"
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const projects = [
  {
    title: "IO: Local-First AI Assistant",
    role: "Solo project",
    img: "/images/projects/io.webp",
    tagline: "A desktop AI assistant that runs on your own machine: voice input, tasks, alerts and file actions, with no cloud calls by default.",
    points: [
      "FastAPI service with PostgreSQL + Alembic migrations, running local models through Ollama.",
      "Optional Anthropic backend; any other outbound call is treated as a bug (local-first by design).",
      "Desktop shell with voice input, widgets and a command bar. 240+ commits, all mine.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Ollama", "Docker"],
    github: "https://github.com/Aashir-Adnan/IO",
  },
  {
    title: "Meeting-to-PR Automation",
    role: "GranjurTech",
    img: "/images/projects/workflow.webp",
    tagline: "Records dev meetings, turns decisions into GitHub issues, and has Claude Code open tested pull requests within minutes.",
    points: [
      "Transcribes supervisor/developer meetings and extracts actionable tasks.",
      "Creates GitHub issues automatically; a cron-driven agent picks them up and opens PRs with tests and QA checks.",
      "Review dashboard tracks issues awaiting the bot, awaiting a human, or ready to merge.",
    ],
    stack: ["Node.js", "React", "Whisper", "GitHub API", "Claude Code"],
  },
  {
    title: "CSAAS: App Generator",
    role: "GranjurTech",
    img: "/images/projects/csaas.webp",
    tagline: "A chatbot fills a database template; the platform generates the backend, database and frontend from it.",
    points: [
      "End-to-end generation of API layer, SQL schema and React UI from a single project template.",
      "Deployment-ready security and encryption controls built in.",
      "Used to deliver 4 real client projects.",
    ],
    stack: ["Node.js", "React", "MySQL", "LLM workflows"],
  },
  {
    title: "Hotel Management System",
    role: "Backend Lead · GranjurTech",
    img: "/images/projects/hms.webp",
    tagline: "Hotel operations platform integrated with Opera PMS, deployed on an on-premises network.",
    points: [
      "Led the backend architecture and Opera PMS integration.",
      "Designed a flexible data model that has absorbed new features with zero schema changes.",
      "470+ commits on the main repo.",
    ],
    stack: ["Node.js", "Express", "MySQL", "PostgreSQL", "React"],
  },
  {
    title: "DevHouse Discord Ops Bot",
    role: "GranjurTech · public showcase",
    img: "/images/projects/discord-bot.webp",
    tagline: "Runs a dev team's Discord: email verification, role gating, private ticket channels, meetings and GitHub/ClickUp sync.",
    points: [
      "Every command is a multi-step flow built from embeds, select menus, buttons and modals.",
      "Token-free runnable demo and 14 tests in the public repo, with CI on every push.",
      "Syncs task and project status with GitHub and ClickUp.",
    ],
    stack: ["discord.js", "Node.js", "MySQL", "GitHub Actions"],
    github: "https://github.com/Aashir-Adnan/devhouse-discord-bot",
  },
  {
    title: "Utah Oil Agents Data Platform",
    role: "GranjurTech",
    img: "/images/projects/utah-oil.webp",
    tagline: "Scrapes 40+ public land and well-record sources across Utah, Texas and New Mexico into one searchable dashboard.",
    points: [
      "30+ scraper modules over ArcGIS FeatureServers, APIs, CSV and HTML sources, scheduled with node-cron + PM2.",
      "MySQL store with raw file archiving and structured tables; JWT auth.",
      "React 19 dashboard with Leaflet maps, recharts and a scrape-job monitor.",
    ],
    stack: ["Node.js", "React", "MySQL", "Leaflet", "PM2"],
  },
  {
    title: "UBS Dev Tools Portal",
    role: "GranjurTech",
    img: "/images/projects/ubs-portal.webp",
    tagline: "Internal docs and dev-tools hub for the UBS framework: MDX docs, database tools, GitHub workflow and tenant admin.",
    points: [
      "Single-page app serving framework documentation alongside internal tools.",
      "Google sign-in restricted to the company domain.",
      "190+ commits.",
    ],
    stack: ["React", "Vite", "Tailwind", "MDX"],
  },
  {
    title: "FastBit",
    role: "Personal project",
    img: "/images/projects/fastbit.webp",
    tagline: "Messaging over a Bluetooth mesh with no mobile data or Wi-Fi, end-to-end encrypted across every hop.",
    points: [
      "Phones relay messages for each other in a hive-mind style mesh.",
      "Messages stay end-to-end encrypted while passing through intermediate devices.",
    ],
    stack: ["React Native", "Expo", "Bluetooth LE", "Cryptography"],
  },
  {
    title: "FAST Memories",
    role: "Personal project",
    img: "/images/projects/fast-memories.webp",
    tagline: "Shared photo and video albums for FAST-NUCES student groups, joined with a code.",
    points: [
      "Create or join groups with a code and collect memories in one place.",
      "Design-token driven theming (themes, motion, spacing) from a single JSON file.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Letter Bucket Game (x86 Assembly)",
    role: "University project",
    img: "/images/game.png",
    tagline: "A retro arcade game in ~900 lines of pure x86 Assembly, no libraries. Playable right here.",
    points: [
      "Written entirely in 16-bit x86 Assembly: rendering, input and game loop by hand.",
      "Runs in the browser through a DOSBox emulator.",
    ],
    stack: ["x86 Assembly", "DOS"],
    github: "https://github.com/Aashir-Adnan/Letter-Bucket-Game",
    playable: true,
  },
  {
    title: "University Schedule Extractor",
    role: "Personal project",
    img: "/images/scheduler.png",
    tagline: "Turns the university timetable into a personal weekly schedule so students can spot clashes at a glance.",
    points: ["Parses the published timetable and builds a per-student weekly view."],
    stack: ["React", "JavaScript"],
    github: "https://github.com/Aashir-Adnan/schedule-extractor",
  },
  {
    title: "Server Monitor",
    role: "Personal project",
    img: "/images/report.png",
    tagline: "Hourly OS and MySQL health checks that email a formatted report to administrators.",
    points: ["Collects system and database metrics on a schedule.", "Emails HTML reports so issues surface before users notice."],
    stack: ["Node.js", "MySQL", "Nodemailer"],
    github: "https://github.com/Aashir-Adnan/Monitor_Server",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/ihavethisthingwithsatire"
  },
  {
    name: "github",
    imgPath: "/images/logos/git.webp",
    link: "https://github.com/Aashir-Adnan"
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/aashir-adnan-69521b253"
  }
];

export {
  words,
  words2,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  projects,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
