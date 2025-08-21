import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full h-[65px] z-50 transition-colors duration-300
          bg-[#04001540] backdrop-blur-md border-b border-white/10 shadow-lg`}
    >
      <div className="w-full h-full flex items-center justify-between px-10">
        {/* Logo */}
        <a href="#hero" className="text-white font-bold text-lg">
          Aashir Adnan
        </a>

        {/* Desktop Nav with singular pill */}
        <nav className="hidden md:flex">
          <div className="bg-[#04001580] backdrop-blur-md rounded-full px-10 py-3">
            <ul className="flex gap-8 text-gray-200">
              {navLinks.map(({ link, name }) => (
                <li key={name} className="group relative">
                  <a href={link} className="hover:text-purple-400 transition">
                    {name}
                  </a>
                  {/* underline animation */}
                  <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
        </nav>


        {/* Contact Button */}
        <a
          href="#contact"
          className="hidden md:block bg-purple-600/80 hover:bg-purple-600 text-white px-5 py-2 rounded-full shadow-md transition"
        >
          Contact me
        </a>
      </div>
    </header>
  );
};

export default NavBar;
