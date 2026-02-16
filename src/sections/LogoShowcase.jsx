import { useState, useEffect, useRef } from "react";
import { logoIconsList } from "../constants";
import sinkhole from "/videos/skills-bg.webm";

const LogoIcon = ({ icon }) => (
  <div className="flex-none flex-center marquee-item">
    <img src={icon.imgPath} alt={icon.name} loading="lazy" />
  </div>
);

const LogoShowcaseContent = () => (
  <div className="md:my-20 my-10 relative">
    <div className="gradient-edge" />
    <div className="gradient-edge" />
    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export const LogoShowcase = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "100px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative flex flex-col h-full w-full brightness-110">
      {inView && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute opacity-20 bg-cover left-0 w-full h-full object-cover z-0"
        >
          <source src={sinkhole} type="video/webm" />
        </video>
      )}
      <LogoShowcaseContent />
    </div>
  );
};
export default LogoShowcase;
