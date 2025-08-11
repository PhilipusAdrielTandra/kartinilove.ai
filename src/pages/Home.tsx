  import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
  import Hero from "../assets/hero.png";
  import Star from "../assets/star.png";
  import Plus from "../assets/plus.png"

  export default function Home() {
    return (
      <div className="overflow-x-hidden">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 w-1/2 md:bg-[radial-gradient(circle_at_-20%_-10%,_#EF0753_10%,_#FFE7EA_50%)] z-0 bg-[radial-gradient(circle_at_-90%_40%,_#EF0753_30%,_#FFE7EA_50%)]" />
          <div className="absolute inset-0 left-1/2 w-1/2 md:bg-[radial-gradient(circle_at_120%_-10%,_#EF0753_10%,_#FFE7EA_50%)] z-0 bg-[radial-gradient(circle_at_190%_40%,_#EF0753_30%,_#FFE7EA_50%)]" />
          <img
            src={Hero}
            className=" md:w-6xl absolute right-60 bottom-90 sm:-left-180 md:-top-44 z-10"
          />
          <img
            src={Hero}
            className="md:w-7xl w-4xl absolute bottom-0 -right-40 md:-bottom-34 md:-right-44 z-10"
            />
          <div className="min-h-screen flex flex-col pt-20 justify-center sm:justify-normal items-center overflow-hidden relative z-20">
            <h1 className="text-2xl sm:text-5xl lg:text-7xl mb-2 md:mb-4 w-2xl text-center">Lorem Ipsum Dolor Sit Amet</h1>
            <p className="text-sm md:text-md text-gray-600 text-center my-2 w-70 md:w-96 h-auto">
              Lorem ipsum dolor sit amet, consuectur adipiscing elit, sed o elusmad tempor incidunt ut labore et dolore magna aliqua.
            </p>
            <button className="bg-[#EF0753] rounded-full px-6 py-4 md-px-7 md-py-3 my-3 md-my-5">
              <Link to="/chat" className="text-white hover:text-gray-200">
                Explore Now
              </Link>
            </button>
          </div>
        </div>
        <div className="sm:min-h-screen flex flex-col items-center bg-[#FFE7EA] relative">
          <h2 className="text-3xl md:text-5xl mb-8 relative z-20">
            Get to Know <a className="text-[#EF0753]">Us</a>
          </h2>
        <div className="relative z-30 rounded overflow-hidden mx-60">
          <iframe
            className="h-56 lg:w-5xl lg:h-[600px] rounded-2xl"
            src="https://www.youtube.com/embed/PrttntkPgyg?si=knt9C8EXLj6Wi4SI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>


        </div>
        <div className="sm:min-h-screen flex flex-col items-center bg-[#FFE7EA] relative text-center">
          <h2 className="text-3xl  sm:text-5xl mt-24 mb-5 sm:mb-10 relative z-20 w-60 sm:w-96">
            Key Benefit of <a className="text-[#EF0753]">Our Services</a>
          </h2>
          <div className="bg-white px-6 py-3 sm:px-8 sm:py-5 rounded-2xl shadow">
            <img src={Star} className="w-20 sm:w-30 text-center mx-auto -mb-4"></img>
            <h1 className="text-lg sm:text-3xl my-4">Lorem Ipsum</h1>
            <p className="w-60 sm:w-72 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed pulvinar leo. Donec in orci iaculis, lacinia nulla at, pretium neque.</p>
          </div>
        </div>
        <div className="min-h-1/3 sm:min-h-screen flex bg-[#FFE7EA]">
          <div className="flex flex-col md:flex-row w-full max-w-screen">
            {/* Left Side */}
            <div className="w-full md:w-1/2 flex items-start">
              <div className="p-8">

              </div>
            </div>
            {/* Right Side */}
            <div className="w-full md:w-1/2 mx-auto flex items-center md:items-start">
              <div className="p-8 w-full">
                <h2 className="sm:text-5xl text-3xl mb-4 text-center md:text-left">
                  How It Works
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-6">
                  <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:mr-8">
                    01
                  </div>
                  <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                    <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                      <h1 className="text-base md:text-xl text-gray-800">
                        Lorem Ipsum Sit Amet
                      </h1>
                      <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-left mb-6">
                  <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:ml-8">
                    02
                  </div>
                  <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                    <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                      <h1 className="text-base md:text-xl text-gray-800">
                        Lorem Ipsum Sit Amet
                      </h1>
                      <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-12">
                  <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:mr-8">
                    03
                  </div>
                  <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                    <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                      <h1 className="text-base md:text-xl text-gray-800">
                        Lorem Ipsum Sit Amet
                      </h1>
                      <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pb-48 flex flex-col items-center  bg-[#FFE7EA] text-center px-4">
          <h1 className="text-2xl sm:text-5xl mb-12">Collaboration & Partnership</h1>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-15 max-w-4xl">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-8 h-8  sm:w-10 sm:h-10 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
        <div className="sm:min-h-screen flex flex-col bg-[#FFE7EA] px-4 py-16">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-center sm:text-left text-2xl sm:text-5xl mb-12">
              Frequently Asked Questions
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              <div className="flex flex-col flex-1 gap-6">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="bg-white rounded-2xl shadow p-6 text-left relative w-full"
                  >
                    <img src={Plus} className="absolute top-4 right-5 sm:top-4 sm:right-4 w-5 h-5" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                        {num < 10 ? `0${num}` : num}
                      </div>
                      <p className="sm:text-xl">
                        Lore ipsum sit amet consectetur adipiscing elit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div className="flex flex-col flex-1 gap-6">
                {[4, 5].map((num) => (
                  <div
                    key={num}
                    className="bg-white rounded-2xl shadow p-6 text-left relative w-full"
                  >
                    <img src={Plus} className="absolute top-4 right-5 sm:top-4 sm:right-4 w-5 h-5" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#EDEEF0] text-[#EF0753] text-md rounded-full flex items-center justify-center">
                        {num < 10 ? `0${num}` : num}
                      </div>
                      <p className="sm:text-xl">
                        Lore ipsum sit amet consectetur adipiscing elit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
