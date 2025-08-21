import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

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
        <div className="tech-grid flex flex-row flex-nowrap gap-4 overflow-x-auto">
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
                <div className="padding-x w-full">
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
