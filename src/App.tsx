import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Logo from "./assets/logo.png";
import Login from "./pages/Login";

function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideNavbarOn = ["/chat", "/account"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <div className="bg-white shadow p-4 flex justify-between items-center relative">
          <Link to="/">
            <img src={Logo} className="w-32 md:w-44 ml-3" alt="Logo" />
          </Link>

          <div className="hidden md:flex space-x-6">
            {["Home", "Blog", "About Us"].map((item) => (
              <Link
                key={item}
                to="/"
                className="relative hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/language"
              className="border border-black rounded-md px-2 py-2 text-black hover:text-gray-200"
            >
              EN
            </Link>
            <Link
              to="/chat"
              className="bg-[#EF0753] rounded-full px-6 py-3 text-white hover:text-gray-200"
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
              {["Home", "Blog", "About Us"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-pink-600"
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/language"
                onClick={() => setIsOpen(false)}
                className="border border-gray-300 rounded-md px-4 py-2 text-black hover:text-gray-200"
              >
                EN
              </Link>
            </div>
          )}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
