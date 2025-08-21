  import { useRef, useState, useEffect } from "react";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { useGSAP } from "@gsap/react";
  import TitleHeader from "../components/TitleHeader";

  gsap.registerPlugin(ScrollTrigger);

  const projects = [
    {
      title: "Cross Management Platform Report Cron-Job",
      img: "/images/report.png",
      desc: "Automated reporting system that aggregates data from multiple platforms and emails stakeholders daily.",
      languages: ["/images/logos/node.png", "images/logos/python.svg", "images/logos/react.png"],
    },
    {
      title: "Letter Bucket Game - Assembly x86",
      img: "/images/game.png",
      desc: "A retro-style educational game built in Assembly x86. 900 lines of code, 100% Assembly, no libraries.",
      languages: ["/images/logos/asm.jpg"],
    },
    {
      title: "University Schedule Web App",
      img: "/images/scheduler.png",
      desc: "A web application that allows students to manage their university schedules, including course registration and timetable visualization.",
      languages: ["/images/logos/react.png"],
    },
    {
      title: "University Cafeteria Menu App",
      // img: "/images/cafeteria.png",
      desc: "An app that displays the daily menu of the university cafeteria, allowing students to view and plan their meals.",
      languages: ["/images/logos/react.png", "/images/logos/node.png", "/images/logos/mysql.png"],
    },
  ];

  const ubsStack = [
    "/images/logos/postgresql.png",
    "/images/logos/node.png",
    "/images/logos/git.png",
    "/images/logos/react.png",
    "/images/logos/mysql.png",
  ];

  const AppShowcase = () => {
    const sectionRef = useRef(null);
    const ubsRef = useRef(null);
    const [showDosbox, setShowDosbox] = useState(false);
    const [dosboxLoaded, setDosboxLoaded] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [closing, setClosing] = useState(false);
    const modalRef = useRef(null);

    const closePopup = () => {
      setClosing(true);
      setTimeout(() => {
        setSelectedProject(null);
        setClosing(false);
      }, 300); // match animation duration
    };

    // GSAP animations
    useGSAP(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
      gsap.fromTo(
        ubsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ubsRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }, []);

    // Load JS-DOS
    useEffect(() => {
      if (!dosboxLoaded) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/js-dos/dosbox@6.22/js-dos.min.js";
        script.async = true;
        script.onload = () => setDosboxLoaded(true);
        document.body.appendChild(script);
      }
    }, [dosboxLoaded]);

    // Run DOS game when DOSBox is visible
    useEffect(() => {
      if (showDosbox && dosboxLoaded && window.Dos) {
        window
          .Dos(document.getElementById("dosbox"), {
            wdosboxUrl: "https://cdn.jsdelivr.net/gh/js-dos/dosbox@6.22/wdosbox.js",
          })
          .then((dosbox) => {
            dosbox.run("/game.com");
          });
      }
    }, [showDosbox, dosboxLoaded]);

    // Track cursor position
    useEffect(() => {
      const moveHandler = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", moveHandler);
      return () => window.removeEventListener("mousemove", moveHandler);
    }, []);


    useEffect(() => {
    if (!modalRef.current) return;

    if (selectedProject && !closing) {
      // Animate in
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, y: 40, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    if (closing) {
      // Animate out
      gsap.to(modalRef.current, {
        autoAlpha: 0,
        y: 40,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setSelectedProject(null);
          setClosing(false);
        },
      });
    }
  }, [selectedProject, closing]);

    return (
      <div id="work" ref={sectionRef} className="app-showcase relative z-2">
        <div className="w-full">
          <TitleHeader title="Some of My Work" sub="Projects & Contributions" />

          <div className="showcaselayout grid gap-10 mt-10 md:grid-cols-2">
            {/* UBS Project */}
            <div ref={ubsRef} className="project-card">
              <div className="image-wrapper bg-black/50 p-6 rounded-xl flex justify-center items-center transform transition-transform duration-300 hover:-translate-y-2">
                <img
                  src="/images/pern.jpeg"
                  alt="UBS Stack Example"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-content mt-4">
                <h2>UBS Framework - Backend</h2>
                <p className="text-white-50 md:text-lg">
                  Cutting down months of development time with a unified backend framework for all GranjurTech projects.
                  <br />
                  State of the art encryption (Tier 2), authentication, and database management.
                  <br />
                  Online and local file storage (AWS S3).
                  <br />
                  Emailing and notification system included.
                  <br />
                </p>
                {/* UBS Stack Logos */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {ubsStack.map((logo, i) => (
                    <img
                      key={i}
                      src={logo}
                      alt="UBS Tech Logo"
                      className="w-10 h-10 object-contain rounded-md bg-white/10 p-2"
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* Project List */}
            <div className="flex flex-col gap-6 text-white justify-center">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-white/20 pb-2 cursor-pointer group relative"
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <span className="text-lg group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </span>
                  <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
                    Read More →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating image on hover */}
        {hoveredProject?.img && (
          <img
            src={hoveredProject.img}
            alt={hoveredProject.title}
            className="fixed w-48 h-auto pointer-events-none rounded-md shadow-lg transition-opacity duration-300"
            style={{
              top: cursorPos.y + 20,
              left: cursorPos.x + 20,
            }}
          />
        )}

        {/* DOSBox Overlay */}
        {showDosbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-[500px] h-[400px] bg-black rounded-lg shadow-xl">
              <button
                className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500 z-50"
                onClick={() => setShowDosbox(false)}
              >
                ✕
              </button>
              <div id="dosbox" className="w-full h-full rounded-lg overflow-hidden"></div>
            </div>
          </div>
        )}

  {/* Project Details Popup */}
  {(selectedProject || closing) && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={closePopup}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[500px] max-w-[90%] bg-gray-900 rounded-lg shadow-xl p-6"
      >
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500"
          onClick={closePopup}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-white mb-4">
          {selectedProject?.title}
        </h2>

        {selectedProject?.img && (
          <img
            src={selectedProject.img}
            alt={selectedProject.title}
            className="w-full h-auto rounded-md mb-4"
          />
        )}

        <p className="text-white-70 mb-4">{selectedProject?.desc}</p>

        {/* Language logos */}
        {selectedProject?.languages && (
          <div className="flex flex-wrap gap-3 mt-4">
            {selectedProject.languages.map((lang, i) => (
              <img
                key={i}
                src={lang}
                alt="Language/Tech Logo"
                className="w-8 h-8 object-contain rounded-md bg-white/10 p-1 scale-150"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )}


      </div>
    );
  };

  export default AppShowcase;
