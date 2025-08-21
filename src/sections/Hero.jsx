import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words, words2 } from "../constants";
import hero_img from "/images/hero-bg.svg";
import blackhole from "/videos/blackhole.webm";


/* -------------------- Welcome Text -------------------- */
export const WelcomeText = ({ onComplete }) => {
  const welcomeRef = useRef(null);

  useEffect(() => {
    // Animate after 2s
    const tl = gsap.timeline({ delay: 1, onComplete });

    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).to(
      welcomeRef.current,
      { opacity: 0, y: -50, duration: 1, ease: "power2.in", delay: 1 }
    );

  }, [onComplete]);

  return (
    <div
      ref={welcomeRef}
      className="absolute top-100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold z-20 whitespace-nowrap"
    >
      Welcome
    </div>
  );
};


/* -------------------- Hero Video -------------------- */
export const HeroVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute rotate-180 -top-140 left-0 w-full h-full object-cover z-0 brightness-90"
    >
      <source src={blackhole} type="video/webm" />
    </video>
  );
};

/* -------------------- Hero Section -------------------- */

export const HeroSection = ({ show }) => {
  const sectionRef = useRef(null);
  const illoRef = useRef(null);       // right-side illustration image
  const btnWrapRef = useRef(null);    // wrapper around Button

  useEffect(() => {
    if (!show) return;

    const container = sectionRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 1 });

    // Headings
tl.fromTo(
  container.querySelectorAll(".hero-text h1"),
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.5, duration: 1, ease: "power2.inOut" }
)

// Animate paragraph, image, and button **in parallel**
.fromTo(
  container.querySelector(".hero-layout p"),
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
  "+=2" // wait 2s after headings end
)
.fromTo(
  illoRef.current,
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
  "<"   // "<" means align with the previous tween start
)
.fromTo(
  btnWrapRef.current,
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
  "<"   // align start time with paragraph + image
);

  }, [show]);

  return (
    <section ref={sectionRef} id="hero" className="relative z-10">
      <div className="hero-inner-wrapper">
        <div className="hero-layout">
          <header className="flex flex-col justify-start md:w-full w-screen md:px-20 px-5">
            <div className="flex flex-col gap-7 mt-20">
              <div className="hero-text">
                <h1>Bringing
                  <span className="slide">
                    <span className="wrapper">
                      {words.map((word, index) => (
                        <span key={index} className="flex items-center md:gap-3 gap-1 pb-2">
                          <img src={word.imgPath} alt="person" className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50" />
                          <span>{word.text}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>
                <h1>Solutions and Projects</h1>
                <h1>that
                  <span className="slide">
                    <span className="wrapper">
                      {words2.map((word, index) => (
                        <span key={index} className="flex items-center md:gap-3 gap-1 pb-2">
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

              {/* Animate the wrapper, not <Button /> */}
              <div ref={btnWrapRef} className="opacity-0">
                <Button text="See My Work" className="md:w-80 md:h-16 w-60 h-12" id="counter" />
              </div>
            </div>
          </header>

          {/* RIGHT: Hero Image — start hidden so it doesn't flash in early */}
          <div className="relative max-w-[1000px] h-auto mt-20">
            <img
              ref={illoRef}
              src={hero_img}
              alt="work icons"
              draggable="false"
              className="select-none scale-120 opacity-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


/* -------------------- Hero Counters -------------------- */
export const HeroCounters = () => {
  return (
    <section className="relative z-10">
      <AnimatedCounter />
    </section>
  );
};

/* -------------------- Main Hero -------------------- */
export const Hero = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Welcome animation */}
      <div className={`${showContent ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <WelcomeText onComplete={() => setShowContent(true)} />
      </div>
      {/* Rest of hero content */}
      <div
        className={`transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Background Video */}
        <HeroVideo />
      </div>

      <div
        className={`transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"
          }`}
      >
        <HeroSection show={showContent} />
      </div>
      <HeroCounters />
    </div>
  );
};



export default Hero;
