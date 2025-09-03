import Logo from "../assets/logo.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
            {/* About Us Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Side - Title */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xs sm:text-sm font-semibold text-[#EF0753] uppercase tracking-wide">
              About Us
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-gray-900 leading-tight">
              Mendampingi Perempuan 
              <br/>
              Tumbuh Berdaya 
              <br/>
              di Era Digital
            </h1>
          </div>
          
          {/* Right Side - Description */}
          <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed ml-0 sm:ml-8 lg:ml-16 mt-14 mb-16">
            <p className="text-sm sm:text-base lg:text-lg">
              Inovasi perusahaan teknologi, yang memanfaatkan AI untuk menemani perempuan tumbuh menjadi sosok yang berani, cerdas dan berdaya.
            </p>
            <p className="text-sm sm:text-base lg:text-lg">
              Terinspirasi oleh semangat Kartini, kami hadir untuk melangkah bersama dalam menghadapi tantangan edukasi, kesehatan mental, pelindungan hukum, hingga pemberdayaan ekonomi.
              Dipimpin oleh perempuan-perempuan hebat di bidang teknologi, kami berkomitmen mewujudkan perubahan positif dan berkelanjutan di era digital saat ini.
            </p>
          </div>
        </div>
      </div>

            {/* Our Commitment Section - Light Pink Background */}
      <div className="bg-[#ffb4bc] py-20 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-0 items-start">
            {/* Left Side - Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-gray-900 leading-tight">
                Our 
                <br/>
                Commitment
              </h2>
            </div>
            
            {/* Right Side - Commitments List */}
            <div className="relative">
              {/* Continuous vertical line */}
              {/* Center the line to circle centers across breakpoints */}
              <div className="absolute left-4 sm:left-5 lg:left-6 w-1 h-4/5 bg-white top-4"></div>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Commitment 1 */}
                <div className="flex items-start space-x-3 sm:space-x-10">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      Mendorong inklusivitas dan kesetaraan gender di dunia teknologi dan profesional
                    </p>
                  </div>
                </div>

                {/* Commitment 2 */}
                <div className="flex items-start space-x-3 sm:space-x-10">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      Menyediakan akses edukasi untuk perempuan agar lebih berdaya – baik secara intelektual, emosional, maupun hukum
                    </p>
                  </div>
                </div>

                {/* Commitment 3 */}
                <div className="flex items-start space-x-3 sm:space-x-10">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      Menjadi tempat perempuan belajar melindungi diri, mengenal haknya, dan memiliki keberanian untuk melawan kekerasan
                    </p>
                  </div>
                </div>

                {/* Commitment 4 */}
                <div className="flex items-start space-x-3 sm:space-x-10">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      Menyediakan bantuan hukum dan edukasi berbasis data dan empati
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white py-2 sm:py-4 lg:py-8 mx-4 sm:mx-8 lg:mx-12 mt-8 sm:mt-12 lg:mt-16 mb-2 sm:mb-4 lg:mb-6 rounded-2xl sm:rounded-3xl">
        <div className="max-w mx-auto">
          <div className="flex flex-col md:flex-row items-start px-4 sm:px-6">
            <div className="w-full md:w-100 mb-2 sm:mb-1 md:mb-0">
              <img src={Logo} className="w-32 sm:w-36 lg:w-40 mb-6 ml-0 sm:ml-3"/>
              <div className="mb-4 sm:mb-6">
                <h3 className="mb-3 sm:mb-8 text-sm sm:text-base text-gray-800"><span className="font-semibold">Corporate Head Office</span>: 3787 Jerry Dove Drive, Florence, South Carolina, 29501, United States.</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-1"><span className="font-semibold">Phone</span>: 000-000-000-000</p>
                <p className="text-sm sm:text-base text-gray-600"><span className="font-semibold">Email</span>: kartiniloveai.com</p>
              </div>
            </div>
            
            <div className="w-full justify-end ml-auto md:w-2/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-gray-800 text-base sm:text-lg">Quick Links</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-gray-800 text-base sm:text-lg">Others</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">How it works</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Terms and condition</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">About Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-gray-800 text-base sm:text-lg">About us</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Company milestone</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Web mail</a></li>
                  <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-[#EF0753] transition-colors">Board of Directors</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="px-4 sm:px-6 flex flex-col items-stretch">
            {/* Social Media Icons */}
            <div className="flex self-end space-x-6 sm:space-x-8 mt-4 sm:mt-6 lg:mt-10 mr-4 sm:mr-6 lg:mr-14">
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm sm:text-base text-gray-600">©2024 All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
