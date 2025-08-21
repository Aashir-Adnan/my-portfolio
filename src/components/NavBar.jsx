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
      className={`fixed top-0 w-full h-[65px] z-50 transition-colors duration-300
        bg-[#04001540] backdrop-blur-md border-b border-white/10 shadow-lg z-100`}
    >
      <div className="w-full h-full flex items-center justify-between px-10">
        {/* Logo */}
        <a href="#hero" className="text-white font-bold text-lg">
          Aashir Adnan
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="bg-[#04001580] backdrop-blur-md rounded-full px-10 py-3">
            <ul className="flex gap-8 text-gray-200">
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

          {/* Contact / Login */}
          {user ? (
            <div className="relative flex items-center gap-2">
              <a
                href="#contact"
                className="bg-purple-600/80 hover:bg-purple-600 text-white px-5 py-2 rounded-full shadow-md transition"
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
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-7 w-36 bg-gray-900 rounded shadow-lg text-white opacity-0 transform -translate-y-2 transition-all duration-300 animate-slideDown"
                    style={{ animation: "slideDown 0.25s forwards" }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-b"
                    >
                      Logout
                    </button>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div
              className="text-white cursor-pointer hover:text-purple-400 transition"
              onClick={() => setShowLoginPrompt(true)}
            >
              Login
            </div>
          )}
        </nav>
      </div>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg z-50 max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-2">Login Required</h3>
            <p className="mb-4">Login to leave feedback and/or contact me!</p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Login with Google
            </button>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Dropdown animation CSS */}
      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default NavBar;
