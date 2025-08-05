import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "../assets/hero.png";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative min-h-screen">
        {/* Background Split */}
        <div className="absolute inset-0 w-1/2 bg-[radial-gradient(circle_at_top_left,_#f472b6,_#FFE7EA)] z-0" />
        <div className="absolute inset-0 left-1/2 w-1/2 bg-[radial-gradient(circle_at_top_right,_#f472b6,_#FFE7EA)] z-0" />

        {/* Foreground Images */}
        <img
          src={Hero}
          className="w-6xl absolute -left-180 -top-44 z-10"
        />
        <img
          src={Hero}
          className="w-7xl absolute -bottom-34 -right-44 z-10"
        />

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl mb-4 w-2xl text-center">Lorem Ipsum Dolor Sit Amet</h1>
          <p className="text-md text-gray-600 text-center my-2 w-96 h-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-pink-600 rounded-full px-6 my-5 py-3">
            <Link to="/chat" className="text-white hover:text-gray-200">
              Explore Now
            </Link>
          </button>
        </div>
      </div>

      {/* Next Section */}
      <div className="min-h-screen flex flex-col items-center bg-[#FFE7EA] relative z-0">
        <h2 className="text-4xl mb-4">Get to Know Us</h2>
      </div>
    </div>
  );
}
