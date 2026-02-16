import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

function LazyTechCard({ model, colSpanClass }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "80px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-border tech-card overflow-hidden group rounded-lg bg-black w-full flex justify-center ${colSpanClass}`}
    >
      <div className="tech-card-content">
        <div className="tech-icon-wrapper min-h-[14rem] flex items-center justify-center">
          {inView ? (
            <TechIconCardExperience model={model} />
          ) : (
            <span className="text-white/50 text-sm">{model.name}</span>
          )}
        </div>
        <div className="padding-x w-full text-center">
          <p>{model.name}</p>
        </div>
      </div>
    </div>
  );
}

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0, position: "relative" },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: { trigger: "#skills", start: "top center" },
      }
    );
  }, []);

  return (
    <div id="skills" className="flex-center section-padding overflow-hidden">
      <div className="w-full h-full md:px-10 px-5 z-[1]">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="What I Bring to the Table"
        />
        <div className="grid grid-cols-2 gap-6 justify-items-center mt-10 sm:grid-cols-2 md:flex md:flex-row md:flex-nowrap md:gap-4 md:overflow-x-auto">
          {techStackIcons.map((techStackIcon, idx) => (
            <LazyTechCard
              key={techStackIcon.name}
              model={techStackIcon}
              colSpanClass={
                idx === techStackIcons.length - 1 && techStackIcons.length % 2 !== 0
                  ? "col-span-2 justify-self-center md:col-span-1"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
