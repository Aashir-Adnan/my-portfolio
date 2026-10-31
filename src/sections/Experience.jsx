import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    
    
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      
      
      gsap.from(card, {
        
        xPercent: -100,
        
        opacity: 0,
        
        transformOrigin: "left left",
        
        duration: 1,
        
        ease: "power2.inOut",
        
        scrollTrigger: {
          
          trigger: card,
          
          start: "top 80%",
        },
      });
    });

    
    
    
    
    gsap.to(".timeline", {
      
      transformOrigin: "bottom bottom",
      
      ease: "power1.inOut",
      
      
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        
        onUpdate: (self) => {
          
          
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    
    
    gsap.utils.toArray(".expText").forEach((text) => {
      
      
      
      gsap.from(text, {
        
        opacity: 0,
        
        
        xPercent: 0,
        
        duration: 1,
        
        ease: "power2.inOut",
        
        scrollTrigger: {
          
          trigger: text,
          
          start: "top 60%",
        },
      });
    }, "<"); 
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="My Career Overview"
        />
        <div className="md:mt-32 mt-12 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-full">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={card.logoPath}
                            alt={`${card.title} logo`}
                            className="cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl md:text-2xl">{card.title}</h1>
                        <p className="md:my-5 my-2 text-sm md:text-base text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 md:mt-5 mt-3 flex flex-col md:gap-5 gap-3 text-sm md:text-base text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="text-sl">
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
