import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);
  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const labelElement = counter.querySelector(".counter-label");
      const item = counterItems[index];

      // Initial number animation
      gsap.set(numberElement, { innerText: "0" });
      gsap.to(numberElement, {
        innerText: item.value,
        duration: 1.25,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });

      // --- Auto Toggle Timeline ---
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        delay: index * 1, // stagger each card by 1s
        defaults: { duration: 0.4, ease: "power2.out" },
      });

      // Label → Desc
      tl.to(counter, { backgroundColor: "#6B21A8" })
        .to(labelElement, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => (labelElement.textContent = item.desc),
        })
        .to(labelElement, { opacity: 1, y: 0 }, ">-0.1")
        .to({}, { duration: 2 }); // pause

      // Desc → Label
      tl.to(counter, { backgroundColor: "#18181B" })
        .to(labelElement, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => (labelElement.textContent = item.label),
        })
        .to(labelElement, { opacity: 1, y: 0 }, ">-0.1")
        .to({}, { duration: 2 }); // pause

      // --- Hover Overrides ---
      counter.addEventListener("mouseenter", () => {
        tl.pause(); // pause auto toggle
        gsap.to(counter, { backgroundColor: "#6B21A8", duration: 0.3 });
        gsap.to(labelElement, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            labelElement.textContent = item.desc;
            gsap.fromTo(
              labelElement,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          },
        });
      });

      counter.addEventListener("mouseleave", () => {
        tl.play(); // resume auto toggle
        gsap.to(counter, { backgroundColor: "#18181B", duration: 0.3 });
        gsap.to(labelElement, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            labelElement.textContent = item.label;
            gsap.fromTo(
              labelElement,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          },
        });
      });
    });
  }, []);


  return (
    <div id="counter" ref={counterRef} className="padding-x-lg mt-10 xl:mt-0">
      <div
        className="
          mx-auto grid 
          grid-cols-1
          md:grid-cols-4
          gap-6 overflow-visible
        "
      >
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-lg min-w-[160px] p-6 flex flex-col items-center justify-center 
             transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="counter-number text-white-50 text-2xl font-bold mb-2">
              0 {item.suffix}
            </div>

            
            <div className="relative w-full h-10 flex items-center justify-center overflow-hidden">
              <div className="counter-label absolute text-white-50 text-sm text-center px-2">
                {item.label}
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
