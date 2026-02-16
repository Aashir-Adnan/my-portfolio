import { useState, lazy, Suspense } from "react";

import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import StarsCanvas from "./components/models/stars/stars";

const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const Resume = lazy(() => import("./sections/Resume"));

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <StarsCanvas />
      <Navbar user={user} />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <LogoShowcase />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeatureCards />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ShowcaseSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Resume />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials user={user} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact user={user} />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
