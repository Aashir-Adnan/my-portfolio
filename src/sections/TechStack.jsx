import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const TechStack = () => {
  gsap.fromTo(
    ".tech-card",
    {
      y: 50, // still pixel offset
      opacity: 0,
      position: "relative", // <-- ensures transform doesn’t expand container
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#skills",
        start: "top center",
      },
    }
  );


  return (
    <div id="skills" className="flex-center section-padding overflow-hidden">
      <div className="w-full h-full md:px-10 px-5 z-[1]">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="What I Bring to the Table"
        />

        {/* Mobile: 2x2 grid | Desktop: row scroll */}
        <div className="
      grid grid-cols-2 gap-6 justify-items-center mt-10
      sm:grid-cols-2
      md:flex md:flex-row md:flex-nowrap md:gap-4 md:overflow-x-auto
    "
        >
          {techStackIcons.map((techStackIcon, idx) => (
            <div
              key={techStackIcon.name}
              className={`
          card-border tech-card overflow-hidden group rounded-lg
          w-full max-w-[200px] flex justify-center
          ${idx === techStackIcons.length - 1 && techStackIcons.length % 2 !== 0
                  ? "col-span-2 justify-self-center md:col-span-1"
                  : ""}
        `}
            >
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
                <div className="padding-x w-full text-center">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TechStack;
