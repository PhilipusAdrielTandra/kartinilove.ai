import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Logo from "./assets/logo.png";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <header className="bg-white shadow p-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Company Logo" className="w-40 md:w-44 md:ml-3" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {[
            { to: "/", label: "Home" },
            { to: "/blog", label: "Blog" },
            { to: "/about", label: "About Us" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/language"
            className="border border-black rounded-md px-2 py-1 text-black hover:bg-black hover:text-white transition"
          >
            EN
          </Link>
          <Link
            to="/chat"
            className="bg-[#EF0753] rounded-full px-6 py-3 text-white hover:bg-pink-700 transition"
          >
            Explore Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow p-4 space-y-4">
          {[
            { to: "/", label: "Home" },
            { to: "/blog", label: "Blog" },
            { to: "/about", label: "About Us" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block hover:text-pink-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex space-x-4 pt-2">
            <Link
              to="/language"
              onClick={() => setIsOpen(false)}
              className="border border-black rounded-md px-2 py-1 text-black hover:bg-black hover:text-white transition"
            >
              EN
            </Link>
            <Link
              to="/chat"
              onClick={() => setIsOpen(false)}
              className="bg-[#EF0753] rounded-full px-4 py-2 text-white hover:bg-pink-700 transition"
            >
              Explore Now
            </Link>
          </div>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}
