import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "../assets/hero.png";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 w-1/2 bg-[radial-gradient(circle_at_-20%_-10%,_#EF0753_10%,_#FFE7EA_50%)] z-0" />
        <div className="absolute inset-0 left-1/2 w-1/2 bg-[radial-gradient(circle_at_120%_-10%,_#EF0753_10%,_#FFE7EA_50%)] z-0" />
        <img
          src={Hero}
          className="w-6xl absolute -left-180 -top-44 z-10"
        />
        <img
          src={Hero}
          className="w-7xl absolute -bottom-34 -right-44 z-10"
        />
        <div className="min-h-screen flex flex-col pt-20 items-center overflow-hidden relative z-20">
          <h1 className="text-7xl mb-4 w-2xl text-center">Lorem Ipsum Dolor Sit Amet</h1>
          <p className="text-md text-gray-600 text-center my-2 w-96 h-auto">
            Lorem ipsum dolor sit amet, consuectur adipiscing elit, sed o elusmad tempor incidunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-[#EF0753] rounded-full px-7 my-5 py-3">
            <Link to="/chat" className="text-white hover:text-gray-200">
              Explore Now
            </Link>
          </button>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-[#FFE7EA] relative">
        <h2 className="text-5xl mb-8 relative z-20">
          Get to Know <a className="text-[#EF0753]">Us</a>
        </h2>
        <div className="relative z-30 rounded">
          <iframe
            width="1260"
            height="550"
            className="rounded-2xl"
            src="https://www.youtube.com/embed/LIlZCmETvsY?si=Gg0hA3kbqWMj0MZN"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-[#FFE7EA] relative">
        <h2 className="text-5xl mt-24 relative z-20 w-96 text-center">
          Key Benefit of <a className="text-[#EF0753]">Our Services</a>
        </h2>
        <div className="">

        </div>
      </div>
    </div>
  );
}
