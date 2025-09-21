import Logo from "../assets/logo.png";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  EN: {
    about_breadcrumb: "About Us",
    title_line1: "Mendampingi Perempuan",
    title_line2: "Tumbuh Berdaya",
    title_line3: "di Era Digital",
    intro_p: "Inovasi perusahaan teknologi, yang memanfaatkan AI untuk menemani perempuan tumbuh menjadi sosok yang berani, cerdas dan berdaya.\n\nTerinspirasi oleh semangat Kartini, kami hadir untuk melangkah bersama dalam menghadapi tantangan edukasi, kesehatan mental, pelindungan hukum, hingga pemberdayaan ekonomi. Dipimpin oleh perempuan-perempuan hebat di bidang teknologi, kami berkomitmen mewujudkan perubahan positif dan berkelanjutan di era digital saat ini.",
    commitment_title: "Our Commitment",
    c1: "Mendorong inklusivitas dan kesetaraan gender di dunia teknologi dan profesional",
    c2: "Menyediakan akses edukasi untuk perempuan agar lebih berdaya – baik secara intelektual, emosional, maupun hukum",
    c3: "Menjadi tempat perempuan belajar melindungi diri, mengenal haknya, dan memiliki keberanian untuk melawan kekerasan",
    c4: "Menyediakan bantuan hukum dan edukasi berbasis data dan empati",
  },
  INA: {
    about_breadcrumb: "About Us",
    title_line1: "Mendampingi Perempuan",
    title_line2: "Tumbuh Berdaya",
    title_line3: "di Era Digital",
    intro_p: "Inovasi perusahaan teknologi, yang memanfaatkan AI untuk menemani perempuan tumbuh menjadi sosok yang berani, cerdas dan berdaya.\n\nTerinspirasi oleh semangat Kartini, kami hadir untuk melangkah bersama dalam menghadapi tantangan edukasi, kesehatan mental, pelindungan hukum, hingga pemberdayaan ekonomi. Dipimpin oleh perempuan-perempuan hebat di bidang teknologi, kami berkomitmen mewujudkan perubahan positif dan berkelanjutan di era digital saat ini.",
    commitment_title: "Komitmen Kami",
    c1: "Mendorong inklusivitas dan kesetaraan gender di dunia teknologi dan profesional",
    c2: "Menyediakan akses edukasi untuk perempuan agar lebih berdaya – baik secara intelektual, emosional, maupun hukum",
    c3: "Menjadi tempat perempuan belajar melindungi diri, mengenal haknya, dan memiliki keberanian untuk melawan kekerasan",
    c4: "Menyediakan bantuan hukum dan edukasi berbasis data dan empati",
  },
};

export default function AboutUs() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations["EN"]) => translations[language][key];
  return (
    <div className="min-h-screen bg-white">
            {/* About Us Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-4 lg:gap-12 items-start">
          {/* Left Side - Title */}
          <div className="space-y-4 sm:space-y-4 sm:ml-2 md:ml-1 lg:ml-8 xl:ml-0">
            <h2 className="text-base font-semibold text-[#EF0753] tracking-wide manrope">{t("about_breadcrumb")}</h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-gray-900 leading-tight mb-2 title-font">
              {t("title_line1")} 
              <br/>
              {t("title_line2")} 
              <br/>
              {t("title_line3")}
            </h1>
          </div>
          
          {/* Right Side - Description */}
          <div className=" text-gray-700 leading-relaxed ml-[clamp(0rem,1.2vw,1rem)] lg:ml-[clamp(0rem,0.8vw,0.5rem)] mt-1 sm:mt-9 md:mt-11 lg:mt-13 mb-11 sm:mb-14 md:mb-10">
            <p className="text-sm sm:text-base lg:text-base xl:text-2xl manrope" dangerouslySetInnerHTML={{ __html: t("intro_p").replace(/\n/g, "<br/>") }} />
          </div>
        </div>
      </div>

            {/* Our Commitment Section - Light Pink Background */}
      <div className="bg-[#ffb4bc] py-18 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-0 items-start">
            {/* Left Side - Title */}
            <div className="sm:ml-2 md:ml-1 lg:ml-8 xl:ml-0">
              <h2 className="max-w-xl sm:max-w-1  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-gray-900 leading-tight title-font">{t("commitment_title")}</h2>
            </div>
            
            {/* Right Side - Commitments List */}
            <div className="relative md:-ml-[clamp(4rem,6vw,4rem)]">
              {/* Continuous vertical line */}
              {/* Center the line to circle centers across breakpoints */}
              <div className="absolute left-4 sm:left-5 lg:left-6 w-1 h-10/12 bg-white top-4"></div>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Commitment 1 */}
                <div className="flex items-start space-x-5 md:space-x-8 lg:space-x-12">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-base xl:text-2xl text-gray-700 leading-relaxed manrope">{t("c1")}</p>
                  </div>
                </div>

                {/* Commitment 2 */}
                <div className="flex items-start space-x-5 md:space-x-8 lg:space-x-12">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-base xl:text-2xl text-gray-700 leading-relaxed manrope">{t("c2")}</p>
                  </div>
                </div>

                {/* Commitment 3 */}
                <div className="flex items-start space-x-5 md:space-x-8 lg:space-x-12">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-base xl:text-2xl text-gray-700 leading-relaxed manrope">{t("c3")}</p>
                  </div>
                </div>

                {/* Commitment 4 */}
                <div className="flex items-start space-x-5 md:space-x-8 lg:space-x-12">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base lg:text-base xl:text-2xl text-gray-700 leading-relaxed manrope">{t("c4")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white py-2 sm:py-4 md:py-6 lg:py-8 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-8 sm:mt-12 lg:mt-16 mb-2 sm:mb-4 md:mb-6 lg:mb-8 rounded-2xl sm:rounded-3xl">
        <div className="max-w mx-auto">
          <div className="flex md:flex-row items-start px-4 sm:px-6 md:px-8 lg:px-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <div className="w-full md:w-1/3 mb-2 sm:mb-4 md:mb-6 lg:mb-8">
              <img src={Logo} className="w-32 sm:w-36 md:w-40 lg:w-44 mb-4 sm:mb-6 md:mb-8 lg:mb-10 ml-0 sm:ml-2 md:ml-4 lg:ml-6"/>
              <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xl space-y-2 sm:space-y-3 md:space-y-4">
                <h3 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 break-words manrope"><span className="font-semibold">Office 1: Corporate Head Office</span><br/> Jl. Duta Boulevard Barat Blok D, No. 37B, Harapn Baru, Bekasi Utara, Bekasi</h3>
                <h3 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 break-words manrope"><span className="font-semibold">Office 2: Documenta Technology</span><br/>Documenta HQ Jl. Yusuf Adiwinata No.34, RT.2/RW.1, Gondangdia, Kota, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-2 sm:mb-3 md:mb-4 manrope"><span className="font-semibold">Phone</span>: +62 812 9550 4364</p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 manrope"><span className="font-semibold">Email</span>: kartiniloveai.com</p>
              </div>
            </div>
            
            <div className="w-full justify-end pl-7 md:pl-0 ml-0 md:ml-4 lg:ml-8 xl:ml-12 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl manrope">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Pricing</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl manrope">Others</h3>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">How it works</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Terms and condition</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">About Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl manrope">About us</h3>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Company milestone</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Web mail</a></li>
                  <li><a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 hover:text-[#EF0753] transition-colors manrope">Board of Directors</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-4 mt-10 sm:mt-0 sm:mb-6 md:mb-8 lg:mb-10 flex flex-row justify-between items-center">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 manrope">©2024 All rights reserved</p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
