import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Logo from "./assets/logo.png";
import Login from "./pages/Login";

function LangToggleButton() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="border border-black rounded-md px-2 py-2 text-black text-sm md:text-base manrope w-12 text-center"
      aria-label="Toggle language"
    >
      {language === "EN" ? "EN" : "INA"}
    </button>
  );
}

function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideNavbarOn = ["/chat", "/account"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <div className="bg-white drop-shadow-xl p-4 flex justify-between items-center sticky top-0 z-50">
          <Link to="/">
            <img src={Logo} className="w-32 md:w-44 ml-3" alt="Logo" />
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`relative text-sm md:text-base lg:text-lg hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full manrope ${
                location.pathname === "/" ? "text-pink-600 after:w-full" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`relative text-sm md:text-base lg:text-lg hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full manrope ${
                location.pathname.startsWith("/blog") ? "text-pink-600 after:w-full" : ""
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`relative text-sm md:text-base lg:text-lg hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full manrope ${
                location.pathname === "/about" ? "text-pink-600 after:w-full" : ""
              }`}
            >
              About Us
            </Link>
      </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            <LangToggleButton />
            <Link
              to="/chat"
              className="bg-[#EF0753] rounded-full px-5 py-2.5 md:px-6 md:py-3 text-white text-sm md:text-base hover:text-gray-200 manrope"
            >
              Explore Now
            </Link>
          </div>

        <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? "✖" : "☰"}
        </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden z-50">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-600 text-lg manrope"
              >
                Home
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={`hover:text-pink-600 text-lg manrope ${
                  location.pathname.startsWith("/blog") ? "text-pink-600" : ""
                }`}
              >
                Blog
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-600 text-lg manrope"
              >
                About Us
              </Link>
              <div className="border border-gray-300 rounded-md px-4 py-2 text-black text-base manrope">
                <LangToggleButton />
      </div>
    </div>
          )}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout />
      </Router>
    </LanguageProvider>
  );
}
