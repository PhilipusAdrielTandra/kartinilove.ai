import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "../assets/hero.png";
import Star from "../assets/star.png";
import Plus from "../assets/plus.png"

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
          <button className="bg-[#EF0753] rounded-full px-7 py-3  my-5">
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
            src="https://www.youtube.com/embed/PrttntkPgyg?si=knt9C8EXLj6Wi4SI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-[#FFE7EA] relative text-center">
        <h2 className="text-5xl mt-24 mb-10 relative z-20 w-96">
          Key Benefit of <a className="text-[#EF0753]">Our Services</a>
        </h2>
        <div className="bg-white px-8 py-5 rounded-2xl shadow">
          <img src={Star} className="w-30 text-center mx-auto -mb-4"></img>
          <h1 className="text-3xl my-4">Lorem Ipsum</h1>
          <p className="w-72">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed pulvinar leo. Donec in orci iaculis, lacinia nulla at, pretium neque.</p>
        </div>
      </div>
      <div className="min-h-screen flex  bg-[#FFE7EA] text-center">
        <div className="flex w-full max-w-screen">
          {/* Left Side */}
          <div className="w-1/2 flex items-start">
            <div className="p-8">
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2 flex items-start">
            <div className="p-8">
              <h2 className="text-5xl mb-4 text-left">How It Works</h2>
              <div className="flex items-center space-x-4 mb-4 my-12">
                <div className="text-5xl  text-[#feb0b9] mr-8">01</div>
                  <div className="relative z-10 gradient-shadow-wrapper">
                    <div className="bg-white px-15 py-4 rounded-2xl shadow-md relative z-20">
                      <h1 className="text-xl text-left text-gray-800">Lorem Ipsum Sit Amet</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                  </div>
              </div>
              <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse mb-4 my-12">
                <div className="text-5xl text-[#feb0b9] mr-8">02</div>
                <div className="relative z-10 gradient-shadow-wrapper">
                  <div className="bg-white px-15 py-4 rounded-2xl shadow-md relative z-20">
                    <h1 className="text-xl text-left text-gray-800">Lorem Ipsum Sit Amet</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4 my-12">
                <div className="text-5xl  text-[#feb0b9] mr-8">03</div>
                  <div className="relative z-10 gradient-shadow-wrapper">
                    <div className="bg-white px-15 py-4 rounded-2xl shadow-md relative z-20">
                      <h1 className="text-xl text-left text-gray-800">Lorem Ipsum Sit Amet</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-48 flex flex-col items-center  bg-[#FFE7EA] text-center px-4">
        <h1 className="text-5xl mb-12">Collaboration & Partnership</h1>

        <div className="flex flex-wrap justify-center gap-15 max-w-4xl">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
      <div className="min-h-screen flex flex-col bg-[#FFE7EA] text-center px-4 py-16">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-5xl mb-12 text-left">Frequently Asked Questions</h1>
          <div className="flex gap-8 items-start">
            {/* Left Column */}
            <div className="flex flex-col flex-1 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 text-left relative">
                <img src={Plus} className="absolute top-4 right-4 w-5 h-5" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                    01
                  </div>
                  <p className="text-xl max-w-xs">
                    Lore ipsum sit amet consectetur adipiscing elit
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 text-left relative">
                <img src={Plus} className="absolute top-4 right-4 w-5 h-5" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                    02
                  </div>
                  <p className="text-xl max-w-xs">
                    Lore ipsum sit amet consectetur adipiscing elit
                  </p>
                </div>
              </div>              
              <div className="bg-white rounded-2xl shadow p-6 text-left relative">
                <img src={Plus} className="absolute top-4 right-4 w-5 h-5" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                    03
                  </div>
                  <p className="text-xl max-w-xs">
                    Lore ipsum sit amet consectetur adipiscing elit
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col flex-1 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 text-left relative">
                <img src={Plus} className="absolute top-4 right-4 w-5 h-5" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                    04
                  </div>
                  <p className="text-xl max-w-xs">
                    Lore ipsum sit amet consectetur adipiscing elit
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 text-left relative">
                <img src={Plus} className="absolute top-4 right-4 w-5 h-5" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                    05
                  </div>
                  <p className="text-xl max-w-xs">
                    Lore ipsum sit amet consectetur adipiscing elit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
