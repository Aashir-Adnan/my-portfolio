# Aashir Adnan — 3D Interactive Portfolio

My personal portfolio site, built with **React 19, Three.js (React Three Fiber), GSAP and Tailwind CSS 4**. It's a single long page with an animated hero over a black-hole video, scroll-triggered sections, interactive 3D models, a **playable DOS game in the browser**, an embedded résumé, a **Google-sign-in guestbook** of references, and a contact form stored in **Firebase Firestore**.

---

## Table of contents

- [Highlights](#highlights)
- [Page sections](#page-sections)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Firebase setup](#firebase-setup)
- [Editing content](#editing-content)
- [Project structure](#project-structure)
- [Performance notes](#performance-notes)
- [Deployment](#deployment)

---

## Highlights

- 🌌 **Hero** over a looping black-hole video, with a GSAP "Welcome" intro, rotating words (*Creative / Robust / Efficient / Lasting* → *Deliver Results / Embody Visions / Feel Alive / Transform Ideas*) and **animated counters** (2+ years, 200+ users, 34+ projects, 90% satisfaction).
- 🧊 **3D scenes** with `@react-three/fiber` + `drei`: a desk-and-computer model with orbit controls in the contact section, and floating tech-logo models in the skills section.
- 🕹️ **Playable x86 game.** The [Letter Bucket](https://github.com/Aashir-Adnan/Letter-Bucket-Game) assembly game (`public/game.com`) runs in the page with **js-dos** (DOSBox compiled to WebAssembly).
- 📄 **Résumé section** that embeds `resume.pdf` in an iframe and offers PDF/TXT downloads. The LaTeX source (`resume.tex`) is included.
- 💬 **References / testimonials.** Visitors sign in with Google and leave a comment, saved to the Firestore `comments` collection and listed newest first.
- ✉️ **Contact form** that writes to the Firestore `messages` collection with a server timestamp. EmailJS is also available.
- ⚡ **Lazy-loaded sections** with `React.lazy` + `Suspense` and fixed-height placeholders, so the first paint stays fast.

---

## Page sections

Rendered in this order by `src/App.jsx`:

| # | Section | File | Anchor | Content |
|---|---------|------|--------|---------|
| 1 | Navbar | `components/NavBar.jsx` | — | Links (About Me, Resume, Experience, Skills, Work, References), Google sign-in/out |
| 2 | Hero | `sections/Hero.jsx` | `#hero` | Welcome intro, rotating words, CTA button, counters |
| 3 | Logo showcase | `sections/LogoShowcase.jsx` | — | Infinite marquee of tech/company logos |
| 4 | Feature cards | `sections/FeatureCards.jsx` | — | Abilities: Tech Stacks, Database Systems, Scripting & Automation |
| 5 | Experience | `sections/Experience.jsx` | `#experience` | Timeline cards: **Full-Stack Developer @ GranjurTech**, **Back-end Dev Intern @ GranjurTech**, **Freelance Developer + Artist** |
| 6 | Tech stack | `sections/TechStack.jsx` | `#skills` | React, Python, Backend, Interactive (3D), Project Manager, Blender Artist |
| 7 | Showcase | `sections/ShowcaseSection.jsx` | `#work` | Projects (see below), UBS stack, **Play in DOSBox** modal |
| 8 | Résumé | `sections/Resume.jsx` | `#resume` | PDF viewer and downloads |
| 9 | Testimonials | `sections/Testimonials.jsx` | `#testimonials` | Firestore guestbook (sign-in required to post) |
| 10 | Contact | `sections/Contact.jsx` | `#contact` | Form → Firestore, 3D computer scene |
| 11 | Footer | `sections/Footer.jsx` | — | Social links (Instagram, GitHub, LinkedIn) |

**Showcased projects**

| Project | Stack |
|---------|-------|
| Cross-Management-Platform Report Cron-Job ([employee_report_clickup](https://github.com/Aashir-Adnan/employee_report_clickup)) | Node, Python, React |
| Letter Bucket Game: Assembly x86 ([repo](https://github.com/Aashir-Adnan/Letter-Bucket-Game)), playable in the page | x86 ASM |
| University Schedule Web App ([schedule-extractor](https://github.com/Aashir-Adnan/schedule-extractor)) | React |
| University Cafeteria Menu App ([fastbites](https://github.com/Aashir-Adnan/fastbites)) | React, Node, MySQL |

---

## Tech stack

| Concern | Library |
|---------|---------|
| Framework | React 19, Vite 6 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), custom CSS in `index.css` |
| 3D | `three` 0.174, `@react-three/fiber` 9, `@react-three/drei` 10 |
| Animation | `gsap` 3 + `@gsap/react` (`useGSAP`, `ScrollTrigger`) |
| Carousel | `swiper` 11 |
| Backend-as-a-service | Firebase 12: Auth (Google) and Firestore |
| Email | `@emailjs/browser` |
| Retro | js-dos 6.22 (loaded from a CDN only when needed) |
| Lint | ESLint 9 |

---

## Getting started

```bash
git clone https://github.com/Aashir-Adnan/my-portfolio.git
cd my-portfolio
npm install
cp .env.example .env   # add your Firebase keys (see below)
npm run dev            # http://localhost:5173
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the build |
| `npm run lint` | ESLint |

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `my-portfolio.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Analytics ID (optional) |

`src/firebase.js` exports `auth`, `provider` (`GoogleAuthProvider`) and `db` (Firestore).

---

## Firebase setup

1. Create a Firebase project and a **Web app**.
2. **Authentication → Sign-in method →** enable **Google**, and add your domain under *Authorized domains*.
3. **Firestore →** create a database. Collections are created automatically:

   | Collection | Written by | Fields |
   |------------|------------|--------|
   | `comments` | Testimonials | user name, photo, text, `timestamp` |
   | `messages` | Contact | name, email, message, `serverTimestamp()` |

4. Suggested security rules: anyone can read `comments`; signed-in users can create `comments` and `messages`; nobody can update or delete from the client.

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /comments/{id} { allow read: if true; allow create: if request.auth != null; }
       match /messages/{id} { allow create: if request.auth != null; }
     }
   }
   ```

---

## Editing content

Almost all copy and data lives in **`src/constants/index.js`**:

| Export | Controls |
|--------|----------|
| `navLinks` | Navbar items and anchors |
| `words`, `words2` | Rotating hero words and icons |
| `counterItems` | Hero counters (value, suffix, label, description) |
| `logoIconsList` | Logo marquee |
| `abilities` | Feature cards |
| `techStackImgs`, `techStackIcons` | Skills section (images or 3D models) |
| `expCards`, `expLogos` | Experience timeline |
| `testimonials` | Seed testimonials |
| `socialImgs` | Footer social links |

Other places to edit:

- Showcased projects: the `projects` array at the top of `sections/ShowcaseSection.jsx`.
- Résumé: replace `public/resume.pdf`, `resume.txt` and `resume.tex`.
- DOS game: replace `public/game.com` with any `.COM` program.

---

## Project structure

```
my-portfolio/
├── index.html
├── vite.config.js            # React + Tailwind plugins
├── tailwind.config.js
├── public/
│   ├── game.com              # Letter Bucket (x86) for js-dos
│   ├── resume.pdf / .tex / .txt
│   ├── images/               # SVG icons, logos, project shots
│   └── videos/               # blackhole.webm, skills-bg.webm, encryption-bg.webm
└── src/
    ├── main.jsx / App.jsx    # Lazy section composition
    ├── index.css             # Tailwind + custom styles
    ├── firebase.js           # auth, provider, db
    ├── constants/index.js    # All content data
    ├── components/
    │   ├── NavBar.jsx  Button.jsx  TitleHeader.jsx  GlowCard.jsx
    │   ├── AnimatedCounter.jsx  ExpContent.jsx
    │   └── models/
    │       ├── contact/Computer.jsx, ContactExperience.jsx   # R3F desk scene
    │       ├── tech_logos/TechIconCardExperience.jsx         # Floating 3D logos
    │       └── stars/stars.jsx                               # Starfield (disabled)
    └── sections/
        ├── Hero.jsx  LogoShowcase.jsx  FeatureCards.jsx  Experience.jsx
        ├── TechStack.jsx  ShowcaseSection.jsx  Resume.jsx
        ├── Testimonials.jsx  Contact.jsx  Footer.jsx
```

---

## Performance notes

- Everything below the hero is code-split with `React.lazy`, and placeholders reserve `40vh` to reduce layout shift.
- js-dos (~MBs) is only loaded when the visitor opens the game modal.
- Background videos are `webm`. If you add videos, keep them short and muted.
- The `StarsCanvas` starfield is commented out to save GPU time on mobile.

---

## Deployment

Any static host works (Vercel, Netlify, Firebase Hosting, GitHub Pages):

```bash
npm run build      # outputs dist/
```

Set the `VITE_FIREBASE_*` variables in the host's build environment, and add the production domain to Firebase **Authorized domains**.
