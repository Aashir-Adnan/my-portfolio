import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const ubsRef = useRef(null);
  const reportRef = useRef(null);
  const letterGameRef = useRef(null);

  const [showDosbox, setShowDosbox] = useState(false);
  const [dosboxLoaded, setDosboxLoaded] = useState(false);

  // GSAP animations
  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    const cards = [ubsRef.current, reportRef.current, letterGameRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
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
      window.Dos(document.getElementById("dosbox"), {
        wdosboxUrl: "https://cdn.jsdelivr.net/gh/js-dos/dosbox@6.22/wdosbox.js",
      }).then((dosbox) => {
        dosbox.run("/game.com"); // Make sure game.com is in public folder
      });
    }
  }, [showDosbox, dosboxLoaded]);

  return (
    <div id="work" ref={sectionRef} className="app-showcase relative z-2">
      <div className="w-full">
        <div className="showcaselayout">
          {/* UBS Project */}
          <div ref={ubsRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/pern.jpeg" alt="UBS Stack Example" />
            </div>
            <div className="text-content">
              <h2>UBS Framework - Backend</h2>
              <p className="text-white-50 md:text-xl">
                Cutting down months of development time with a unified backend framework for all GranjurTech projects.<br />
                State of the art encryption (Tier 2), authentication, and database management.<br />
                Online and local file storage (AWS S3).<br />
                Emailing and notification system included.<br />
              </p>
            </div>
          </div>

          {/* Project List */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={reportRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img src="/images/report.png" alt="Management Platform Report Cron-Job" />
              </div>
              <h2>Daily Cross Management Platform Report Cron-Job</h2>
            </div>

            {/* Letter Bucket Game */}
            <div className="project" ref={letterGameRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/game.png" alt="Letter Bucket Game" />
              </div>
              <h2>Letter Bucket Game - Assembly x86</h2>
              <button
                className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 relative z-50"
                onClick={() => setShowDosbox(true)}
              >
                Try Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DOSBox Overlay */}
      {showDosbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[500px] h-[400px] bg-black rounded-lg shadow-xl">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500 z-50"
              onClick={() => setShowDosbox(false)}
            >
              ✕
            </button>

            {/* DOSBox Container */}
            <div id="dosbox" className="w-full h-full rounded-lg overflow-hidden"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShowcase;
