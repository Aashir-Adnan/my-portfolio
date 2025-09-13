import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setShowLoginPrompt(false);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };
  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-colors duration-300
        bg-[#04001540] backdrop-blur-md border-b border-white/10 shadow-lg z-100
        block sm:block md:block lg:block xl:block

        /* Heights by breakpoint */
        h-[55px]       /* base */
        sm:h-[60px]    /* small screens */
        md:h-[65px]    /* medium screens */
      `}
    >
      <div
        className={`
          w-full h-full flex items-center 
          justify-between

          px-4         /* base padding */
          sm:px-6       /* small screens */
          md:px-10      /* medium screens */
        `}
      >
        
        <a
          href="#hero"
          className={`
            text-white font-bold
            text-base   /* base */
            sm:text-lg  /* small */
            md:text-xl  /* medium */
          `}
        >
          Aashir Adnan's Portfolio
        </a>

        
        <nav className="hidden lg:flex items-center gap-4">
          <div
            className={`
              bg-[#04001580] backdrop-blur-md rounded-full
              px-6 py-2            /* base */
              sm:px-8 sm:py-2.5     /* small */
              lg:px-10 md:py-3      /* medium */
            `}
          >
            <ul
              className={`
                flex text-gray-200
                gap-4 text-sm          /* base */
                sm:gap-6 sm:text-base  /* small */
                lg:gap-8               /* medium */
              `}
            >
              {navLinks.map(({ link, name }) => (
                <li key={name} className="group relative">
                  <a href={link} className="hover:text-purple-400 transition">
                    {name}
                  </a>
                  <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>

          
          {user ? (
            <div className="relative flex items-center gap-2">
              <a
                href="#contact"
                className={`
                  bg-purple-600/80 hover:bg-purple-600 text-white shadow-md transition rounded-full
                  px-3 py-1.5 text-sm        /* base */
                  sm:px-4 sm:py-2 sm:text-base
                  md:px-5
                `}
              >
                Contact me
              </a>

              
              <div
                className="relative cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.photoURL || "/images/person.png"}
                  alt={user.displayName}
                  className={`
                    rounded-full border-2 border-white
                    w-7 h-7    /* base */
                    sm:w-8 sm:h-8
                  `}
                />
                {dropdownOpen && (
                  <div
                    className={`
                      absolute right-0 rounded shadow-lg text-white bg-gray-900
                      w-32 mt-6 opacity-0 transform -translate-y-2 transition-all duration-300
                      sm:w-36 sm:mt-7
                    `}
                    style={{ animation: "slideDown 0.25s forwards" }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-b text-sm sm:text-base"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="text-white cursor-pointer hover:text-purple-400 transition text-sm sm:text-base"
              onClick={() => {
                if (dropdownOpen) {
                  setDropdownOpen(false);
                  return;
                }
                setShowLoginPrompt(!showLoginPrompt);
              }}
            >
              Login
            </div>
          )}
        </nav>
        

        
        <nav className="flex lg:hidden items-center justify-end px-4 py-2">
          {user ? (
            <div
              className="relative cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.photoURL || "/images/person.png"}
                alt={user.displayName}
                className="rounded-full border-2 border-white w-8 h-8"
              />
              {dropdownOpen && (
                <div
                  className={`
                    absolute right-0 rounded shadow-lg text-white bg-gray-900
                    w-32 mt-2 opacity-0 transform translate-y-3 transition-all duration-300
                  `}
                  style={{ animation: "slideDown 0.25s forwards" }}
                >
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-b text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="text-white cursor-pointer hover:text-purple-400 transition text-sm"
              onClick={() => {
                if (dropdownOpen) {
                  setDropdownOpen(false);
                  return;
                }
                setShowLoginPrompt(!showLoginPrompt);
              }}
            >
              Login
            </div>
          )}
        </nav>

      </div>

      
      {showLoginPrompt && (
        <div
          className={`
            absolute rounded-xl shadow-lg text-gray-900 bg-gray-100
            right-4 w-36 mt-6 opacity-0 transform -translate-y-2 transition-all duration-300
            sm:right-6 sm:w-40 sm:mt-7
          `}
          style={{ animation: "slideDown 0.25s forwards" }}
          ref={(el) => {
            if (el) {
              const handleClickOutside = (e) => {
                if (!el.contains(e.target)) {
                  setShowLoginPrompt(false);
                  document.removeEventListener("mousedown", handleClickOutside);
                }
              };
              document.addEventListener("mousedown", handleClickOutside);
            }
          }}
        >
          <button
            onClick={handleLogin}
            className="w-full px-3 py-2 text-left rounded-t-xl hover:bg-purple-100 transition-colors duration-300 text-sm sm:px-4 sm:text-base"
          >
            Login with Google
          </button>
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="w-full px-3 py-2 text-left rounded-b-xl hover:bg-purple-100 transition-colors duration-300 text-sm sm:px-4 sm:text-base"
          >
            Cancel
          </button>
        </div>
      )}

      
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );


};

export default NavBar;
