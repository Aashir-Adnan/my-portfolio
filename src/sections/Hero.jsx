import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words, words2 } from "../constants";
import hero_img from "/images/hero-bg.svg";
import blackhole from "/videos/blackhole.webm";

const HeroContent = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden z-10">
      {/* Remove bg.png OR make it semi-transparent if you still want it */}
      {/* <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div> */}

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Bringing
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Solutions and Projects</h1>
              <h1>
                that
                <span className="slide">
                  <span className="wrapper">
                    {words2.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I’m Aashir, a Full-stack developer driven by a passion <br />
              to overcome challenges and create innovative solutions. <br />
              With a focus on delivering results, I transform concepts into
              reality, <br />
              ensuring your vision is brought to life with precision and
              creativity.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        {/* <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure> */}
        <div className="relative w-[1000px] h-[650px]">
          <img
            src={hero_img}
            alt="work icons"
            draggable="false"
            className="select-none"
          />
        </div>


      </div>

      <AnimatedCounter />
    </section>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute rotate-180 scale-60 top-[-590px] left-0 w-full h-full object-cover z-0"
      >
        <source src={blackhole} type="video/webm" />
      </video>

      {/* Hero Content */}
      <HeroContent />
    </div>
  );
};

export default Hero;
