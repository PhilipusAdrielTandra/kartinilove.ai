import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  EN: {
    about_breadcrumb: "About Us",
    title_line1: "Supporting Women",
    title_line2: "To Grow Empowered In",
    title_line3: "the Digital Era",
    intro_p: "A technology company innovation that leverages AI to accompany women as they grow into courageous, intelligent, and empowered individuals.\n\nInspired by Kartini’s spirit, we are here to walk together through the challenges of education, mental health, legal protection, and economic empowerment. Led by outstanding women in technology, we are committed to creating positive and sustainable change in today’s digital era.",
    commitment_title: "Our Commitment",
    c1: "Promote inclusivity and gender equality in technology and professional fields",
    c2: "Provide access to education so women become more empowered—intellectually, emotionally, and legally",
    c3: "Be a place where women learn to protect themselves, know their rights, and have the courage to stand against violence",
    c4: "Offer legal assistance and education grounded in data and empathy",
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

      <Footer />
    </div>
  );
}
