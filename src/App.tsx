import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Logo from "./assets/logo.png"

export default function App() {
  return (
    <Router>
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" ><img src={Logo} className="w-44 ml-3"></img></Link>
      <div className="space-x-4">
        <Link
          to="/"
          className="relative text-gray-700 hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>
        <Link
          to="/"
          className="relative text-gray-700 hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Blog
        </Link>
        <Link
          to="/"
          className="relative text-gray-700 hover:text-pink-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          About Us
        </Link>
      </div>
      <div className="space-x-4">
          <button className="border-solid border-2 rounded-md px-2 py-1"><Link to="/language" className="text-black hover:text-gray-200">EN</Link></button>
          <button className="bg-pink-600 rounded-full px-4 py-4"><Link to="/chat" className="text-white hover:text-gray-200">Explore Now</Link></button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}
