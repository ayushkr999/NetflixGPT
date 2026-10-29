import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { logo, SUPPORTED_LANGUAGES } from "../utils/constant";
import { setAiSearchView } from "../utils/aiSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showAiSearch = useSelector((store) => store.ai?.showAiSearch);
  const [isScrolled, setIsScrolled] = useState(false);

  // Background transparency to solid black on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const handleHomeClick = () => {
    dispatch(setAiSearchView(false));
    if (location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  const handleAiSearchClick = () => {
    dispatch(setAiSearchView(true));
    if (location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-4 md:px-12 py-3.5 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 shadow-xl shadow-black/80 backdrop-blur-md"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      {/* Left side: Logo & Navigation */}
      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={handleHomeClick}
          className="group focus:outline-none flex items-center gap-2 sm:gap-2.5"
          title="NetflixGPT - Powered by Google Gemini"
        >
          {/* Authentic Netflix Logo */}
          <img
            className="w-24 md:w-32 cursor-pointer object-contain"
            src={logo}
            alt="Netflix"
          />

          {/* Premium Google Gemini AI Badge */}
          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner group-hover:border-zinc-500 transition-colors">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z"
                fill="url(#gemini-sparkle-header)"
              />
              <defs>
                <linearGradient
                  id="gemini-sparkle-header"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4E8BF5" />
                  <stop offset="0.5" stopColor="#9B72CF" />
                  <stop offset="1" stopColor="#D96570" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-300 bg-clip-text text-transparent select-none whitespace-nowrap">
              GEMINI AI
            </span>
          </div>
        </button>

        {/* Navigation Links for Authenticated Users */}
        {user && (
          <nav className="flex items-center gap-4 text-sm font-medium">
            <button
              onClick={handleHomeClick}
              className={`transition duration-200 ${
                !showAiSearch
                  ? "text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={handleAiSearchClick}
              className={`flex items-center gap-1.5 transition duration-200 ${
                showAiSearch
                  ? "text-red-500 font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z"
                  fill="url(#gemini-sparkle-nav)"
                />
                <defs>
                  <linearGradient
                    id="gemini-sparkle-nav"
                    x1="2"
                    y1="2"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4E8BF5" />
                    <stop offset="0.5" stopColor="#9B72CF" />
                    <stop offset="1" stopColor="#D96570" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Gemini Search</span>
            </button>
          </nav>
        )}
      </div>

      {/* Right side: Language, Profile, Sign Out */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Language selector for AI queries */}
        {user && showAiSearch && (
          <div className="relative">
            <select
              aria-label="Select Language"
              className="px-2.5 py-1.5 bg-zinc-900/90 text-white text-xs md:text-sm rounded-lg border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-red-600"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* User Profile Pill & Sign Out */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-rose-700 text-white font-bold text-xs flex items-center justify-center border border-red-500/40 shadow select-none">
                {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <span className="text-white text-xs md:text-sm font-semibold max-w-[120px] truncate">
                {user.displayName || user.email?.split("@")[0] || "Member"}
              </span>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none"
            >
              <img
                src="/assets/logout-icon.png"
                alt="Sign Out"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
