import { useState } from "react";

import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import StarsCanvas from "./components/models/stars/stars";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <StarsCanvas />
      <Navbar user={user} />
      <Hero />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <ShowcaseSection />
      <Testimonials user={user} />
      <Contact user={user} />
      <Footer />
    </>
  );
};

export default App;
