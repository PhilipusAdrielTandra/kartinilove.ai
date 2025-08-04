import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "../assets/hero.png"
export default function Home() {
  return (
    <div className="overflow-x-hidden"> 
      <div className="relative min-h-screen">
        <img
          src={Hero}
          className="w-6xl absolute -left-180 -top-44 z-20"
        />
        <img
          src={Hero}
          className="w-7xl absolute -bottom-34 -right-44 z-20"
        />
        <div className="min-h-screen flex flex-col pt-20 items-center bg-linear-to-b to-[#FFE7EA] from-pink-400 overflow-hidden relative z-10">
          <h1 className="text-6xl mb-4 w-2xl text-center">Lorem Ipsum Dolor Sit Amet</h1>
          <p className="text-md text-gray-600 text-center my-2 w-96 h-auto">
            Lorem ipsum dolor sit amet, consuectur adipiscing elit, sed o elusmad tempor incidunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-pink-600 rounded-full px-5 my-5 py-3">
            <Link to="/chat" className="text-white hover:text-gray-200">
              Explore Now
            </Link>
          </button>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-[#FFE7EA] relative z-0">
        <h2 className="text-4xl mb-4">Get to Know Us</h2>
      </div>
    </div>
  );
}
