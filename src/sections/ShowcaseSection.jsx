import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ubsStack = ["Node.js", "Express", "PostgreSQL", "MySQL", "AWS S3", "React"];

const Tags = ({ items, className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {items.map((t) => (
      <span key={t} className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white-50">
        {t}
      </span>
    ))}
  </div>
);

const Links = ({ project, onPlay, className = "" }) => (
  <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm ${className}`}>
    {project.github && (
      <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-400 hover:underline">
        GitHub ↗
      </a>
    )}
    {project.playable && (
      <button onClick={(e) => { e.stopPropagation(); onPlay(); }} className="text-blue-400 hover:underline">
        ▶ Play in browser
      </button>
    )}
    {!project.github && !project.playable && <span className="text-white-50">Private / client code</span>}
  </div>
);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [showDosbox, setShowDosbox] = useState(false);
  const [selected, setSelected] = useState(null);
  const modalRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".project-tile").forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top bottom-=60" },
      });
    });
  }, { scope: sectionRef });

  useEffect(() => {
    if (selected && modalRef.current) {
      gsap.fromTo(modalRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
    const onKey = (e) => e.key === "Escape" && (setSelected(null), setShowDosbox(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // js-dos is only fetched when someone actually presses Play.
  useEffect(() => {
    if (!showDosbox) return;
    const run = () =>
      window.Dos(document.getElementById("dosbox"), {
        wdosboxUrl: "https://cdn.jsdelivr.net/gh/js-dos/dosbox@6.22/wdosbox.js",
      }).then((dosbox) => dosbox.run("/game.com"));
    if (window.Dos) return void run();
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/js-dos/dosbox@6.22/js-dos.min.js";
    script.onload = run;
    document.body.appendChild(script);
  }, [showDosbox]);

  return (
    <section id="work" ref={sectionRef} className="relative z-2 w-full px-4 md:px-20 py-10 md:py-20 mt-10">
      <TitleHeader title="Selected Work" sub="Projects & Contributions" />

      {/* Featured */}
      <div className="project-tile card-border rounded-2xl md:mt-12 mt-8 grid md:grid-cols-2 md:gap-8 gap-4 p-4 md:p-10 items-center">
        <div className="bg-black/50 rounded-xl flex justify-center items-center h-40 md:h-80">
          <img src="/images/pern.jpeg" alt="UBS framework stack" loading="lazy" className="h-3/4 object-contain brightness-75" />
        </div>
        <div className="flex flex-col md:gap-4 gap-3">
          <span className="text-blue-400 text-xs md:text-sm uppercase tracking-widest">Flagship · GranjurTech</span>
          <h2 className="text-white text-2xl md:text-4xl font-semibold">UBS Framework</h2>
          <p className="text-white-50 text-sm md:text-lg">
            The shared backend framework behind GranjurTech client products such as HMS.
            Config-driven APIs with auth, permission checks and parameter validation built in, so teams write business logic instead of boilerplate.
          </p>
          <ul className="text-white-50 text-sm md:text-base list-disc pl-5 space-y-1">
            <li>Tier-2 encryption, token auth and role-based permissions</li>
            <li>Local and AWS S3 file storage, email and notifications</li>
            <li>Lead contributor: 220+ commits on the core repo</li>
          </ul>
          <Tags items={ubsStack} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 md:mt-10 mt-6">
        {projects.map((p) => (
          <article
            key={p.title}
            onClick={() => setSelected(p)}
            className="project-tile card-border rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group flex flex-col transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="aspect-video bg-black/60 overflow-hidden">
              {p.img ? (
                <img src={p.img} alt={`${p.title} preview`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex-center text-white-50 text-xl">{p.title}</div>
              )}
            </div>
            <div className="p-3 md:p-5 flex flex-col gap-1.5 md:gap-3 flex-1">
              <span className="text-blue-400 text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest line-clamp-1">{p.role}</span>
              <h3 className="text-white text-sm md:text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="text-white-50 text-xs md:text-base flex-1 line-clamp-3 md:line-clamp-none">{p.tagline}</p>
              {/* Tags and links stay in the modal on phones so cards fit two across */}
              <Tags items={p.stack} className="hidden md:flex" />
              <Links project={p} onPlay={() => setShowDosbox(true)} className="hidden md:flex" />
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[720px] max-w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl shadow-xl"
          >
            <button aria-label="Close" className="absolute top-3 right-4 text-white text-xl font-bold hover:text-red-500" onClick={() => setSelected(null)}>
              ✕
            </button>
            {selected.img && <img src={selected.img} alt={`${selected.title} preview`} className="w-full aspect-video object-cover" />}
            <div className="p-4 md:p-6 flex flex-col gap-4">
              <span className="text-blue-400 text-xs uppercase tracking-widest">{selected.role}</span>
              <h2 className="text-xl md:text-2xl font-semibold text-white pr-6">{selected.title}</h2>
              <ul className="text-white-50 text-sm md:text-base list-disc pl-5 space-y-2">
                {selected.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <Tags items={selected.stack} />
              <Links project={selected} onPlay={() => { setSelected(null); setShowDosbox(true); }} />
            </div>
          </div>
        </div>
      )}

      {showDosbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowDosbox(false)}>
          <div className="relative w-[640px] max-w-[95vw] aspect-[4/3] bg-black rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" className="absolute -top-8 right-0 text-white text-xl font-bold hover:text-red-500" onClick={() => setShowDosbox(false)}>
              ✕
            </button>
            <div id="dosbox" className="w-full h-full rounded-lg overflow-hidden" />
          </div>
        </div>
      )}
    </section>
  );
};

export default AppShowcase;
