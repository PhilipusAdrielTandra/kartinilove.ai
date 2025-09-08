import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import Hero from "../assets/hero.svg";
import Star from "../assets/star.png";
import Plus from "../assets/plus.png";
import Logo from "../assets/logo.png"

const translations = {
  EN: {
    hero_title: "Lorem Ipsum Dolor Sit Amet",
    hero_subtitle: "Lorem ipsum dolor sit amet, consuectur adipiscing elit, sed o elusmad tempor incidunt ut labore et dolore magna aliqua.",
    cta_explore: "Explore Now",
    video_title_1: "Get to Know",
    video_title_2: "Us",
    benefit_title_1: "Key Benefit of",
    benefit_title_2: "Our Services",
    benefit_card_title_1: "Lorem Ipsum",
    benefit_card_desc_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed pulvinar leo. Donec in orci iaculis, lacinia nulla at, pretium neque.",
    benefit_card_title_2: "Lorem Ipsum",
    benefit_card_desc_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed pulvinar leo. Donec in orci iaculis, lacinia nulla at, pretium neque.",
    benefit_card_title_3: "Lorem Ipsum",
    benefit_card_desc_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed pulvinar leo. Donec in orci iaculis, lacinia nulla at, pretium neque.",
    how_it_works: "How It Works",
    how_step_title: "Lorem Ipsum Sit Amet",
    how_step_desc: "Lorem ipsum dolor sit amet, consectetur",
    collab_title: "Collaboration & Partnership",
    faq_title: "Frequently Asked Questions",
    faq_q1: "Lore ipsum sit amet consectetur adipiscing elit",
    faq_a1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, leo sit amet viverra ultrices, lorem ante accumsan mi.",
    faq_q2: "Lore ipsum sit amet consectetur adipiscing elit",
    faq_a2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, leo sit amet viverra ultrices, lorem ante accumsan mi.",
    faq_q3: "Lore ipsum sit amet consectetur adipiscing elit",
    faq_a3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, leo sit amet viverra ultrices, lorem ante accumsan mi.",
    faq_q4: "Lore ipsum sit amet consectetur adipiscing elit",
    faq_a4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, leo sit amet viverra ultrices, lorem ante accumsan mi.",
    faq_q5: "Lore ipsum sit amet consectetur adipiscing elit",
    faq_a5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, leo sit amet viverra ultrices, lorem ante accumsan mi.",
  },
  INA: {
    hero_title: "Kartini sebagai AI,  teknologi yang mendengar dan memberdayakan",
    hero_subtitle: "Selamat datang di KartiniLove.ai, sebuah platform revolusioner di mana semangat, kebijaksanaan dan empati Kartini tidak hanya tersimpan dalam lembaran sejarah, tetapi hidup kembali dalam wujud kecerdasan buatan (AI).",
    cta_explore: "Jelajahi",
    video_title_1: "Kenal Lebih",
    video_title_2: "Dekat",
    benefit_title_1: "Manfaat Utama",
    benefit_title_2: "Layanan Kami",
    benefit_card_title_1: "Consulting",
    benefit_card_desc_1: "Layanan konsultasi Agentic AI yang disesuaikan (HR, Finance, Legal). Solusi legal: edukasi hukum, review kontrak, opini, dan compliance check.",
    benefit_card_title_2: "Tools / Technology – KartiniLove.ai",
    benefit_card_desc_2: "Platform Agentic AI untuk perempuan & organisasi. Akses penuh atau modular ke: Mental Health, Womenpreneur, dan Law.",
    benefit_card_title_3: "Education",
    benefit_card_desc_3: "Program pengembangan kepemimpinan perempuan: Sekolah Kepemimpinan Kartini (KALIS) dan Inhouse Training Women Leadership (customised).",
    how_it_works: "Cara Kerja",
    how_step_title: "Lorem Ipsum Sit Amet",
    how_step_desc: "Lorem ipsum dolor sit amet, consectetur",
    collab_title: "Kolaborasi & Kemitraan",
    faq_title: "Pertanyaan yang Sering Diajukan",
    faq_q1: "Mengapa penting membahas perempuan dalam bidang teknologi?",
    faq_a1: "Karena isu ini membantu membuka peluang setara, meningkatkan keragaman perspektif, dan mempercepat inovasi yang inklusif.",
    faq_q2: "Apa tantangan utama yang dihadapi perempuan di sektor teknologi?",
    faq_a2: "Bias gender, stereotip sosial, serta kurangnya role model perempuan di posisi kepemimpinan teknologi.",
    faq_q3: "Bagaimana teknologi dapat memberdayakan perempuan?",
    faq_a3: "Teknologi membantu meningkatkan keterampilan, mendukung kewirausahaan, dan menyediakan ruang aman untuk berinovasi.",
    faq_q4: "Apa peran laki-laki sebagai ally dalam mendukung perempuan di bidang teknologi?",
    faq_a4: "Mendorong inklusivitas, menantang bias gender di tempat kerja, dan mendukung kebijakan yang adil.",
    faq_q5: "Bagaimana cara mendorong lebih banyak perempuan masuk ke dunia teknologi?",
    faq_a5: "Perluasan akses pendidikan STEM, lingkungan kerja yang inklusif, dan menghadirkan role model inspiratif.",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations["EN"]) => translations[language][key];
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // FAQ data structure
  const faqData = [
    {
      id: 1,
      question: t("faq_q1"),
      answer: t("faq_a1")
    },
    {
      id: 2,
      question: t("faq_q2"),
      answer: t("faq_a2")
    },
    {
      id: 3,
      question: t("faq_q3"),
      answer: t("faq_a3")
    },
    {
      id: 4,
      question: t("faq_q4"),
      answer: t("faq_a4")
    },
    {
      id: 5,
      question: t("faq_q5"),
      answer: t("faq_a5")
    }
  ];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="overflow-x-hidden bg-[#FFE7EA]">
      {/* Hero Section with Gradient Background */}
      <div className="relative max-h-screen">
        <div className="absolute inset-0 w-1/2 -translate-y-28 sm:translate-y-0
          lg:bg-[radial-gradient(circle_at_-20%_-10%,_rgba(239,7,83,0.85)_18%,_rgba(239,7,83,0.50)_30%,_transparent_60%)]
          md:bg-[radial-gradient(circle_at_-30%_-10%,_rgba(239,7,83,0.85)_10%,_rgba(239,7,83,0.45)_19%,_transparent_40%)] 
          z-0 bg-[radial-gradient(circle_at_-30%_50%,_rgba(239,7,83,0.70)_13%,_rgba(239,7,83,0.45)_22%,_transparent_40%)]" />
        <div className="absolute inset-0 left-1/2 w-1/2 -translate-y-28 sm:translate-y-0
          lg:bg-[radial-gradient(circle_at_120%_-10%,_rgba(239,7,83,0.85)_18%,_rgba(239,7,83,0.50)_30%,_transparent_60%)]
          md:bg-[radial-gradient(circle_at_130%_-10%,_rgba(239,7,83,0.85)_10%,_rgba(239,7,83,0.45)_19%,_transparent_40%)] 
          z-0 bg-[radial-gradient(circle_at_130%_50%,_rgba(239,7,83,0.70)_13%,_rgba(239,7,83,0.45)_22%,_transparent_40%)]" />
        <img
          src={Hero}
          className=" md:w-6xl absolute right-60 bottom-100 sm:-left-180 top-0 sm:mt-44 md:-left-145 md:mt-20 lg:-left-180 lg:mt-44 z-10"
        />
        <img
          src={Hero}
          className="md:w-7xl w-4xl absolute bottom-50 -right-50 sm:-bottom-50 sm:-right-44 md:bottom-130 md:-right-44 lg:-bottom-34 lg:-right-44  z-10"
          />
        <div className="min-h-screen flex flex-col pt-20 -translate-y-28 sm:translate-y-0 justify-center sm:justify-normal items-center overflow-hidden relative z-20">
          <h1 className="text-2xl  sm:w-auto sm:text-5xl lg:text-7xl mb-2 md:mb-4 w-70 text-center title-font">{t("hero_title")}</h1>
                     <p className="text-sm md:text-md text-gray-600 text-center my-2 w-70 md:w-96 h-auto manrope">
            {t("hero_subtitle")}
          </p>
          <button className="bg-[#EF0753] rounded-full px-6 py-4 md-px-7 md-py-3 my-3 md-my-5">
            <Link to="/chat" className="text-white hover:text-gray-200 manrope">
              {t("cta_explore")}
            </Link>
          </button>
        </div>
      </div>
      
      {/* Video Section */}
       <div className="min-h-screen flex flex-col items-center relative mt-4 sm:mt-0">
                   <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-8 relative z-20 title-font">
          {t("video_title_1")} <a className="text-[#EF0753]">{t("video_title_2")}</a>
        </h2>
         <div className="relative z-30 rounded overflow-hidden mx-4 sm:mx-60">
          <iframe
             className="h-56 md:w-2xl md:h-120 lg:w-5xl lg:h-[600px] rounded-2xl"
            src="https://www.youtube.com/embed/PrttntkPgyg?si=knt9C8EXLj6Wi4SI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Key Benefits Section */}
       <div className="sm:min-h-screen flex flex-col items-center relative text-center mt-0">
         <h2 className="text-3xl sm:text-5xl mt-8 md:mt-0 lg:mt-24 mb-5 sm:mb-10 relative z-20 w-60 sm:w-96 title-font">
          {t("benefit_title_1")} <a className="text-[#EF0753]">{t("benefit_title_2")}</a>
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-2 lg:gap-12 min-w-60">
                <motion.div
          initial={{ opacity: 0, x: window.innerWidth < 640 ? -100 : 0 }}
          whileInView={{ 
            opacity: 1, 
            x: window.innerWidth < 640 ? 0 : -15 // Closer to center on mobile
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          viewport={{ once: true, amount:0.6 }}
          className="bg-white px-8  md:px-8 md:py-3 lg:px-8 lg:py-5 rounded-2xl shadow w-full max-w-[22rem] mx-auto min-h-[18rem]"
        >
          <img src={Star} className="w-25 md:w-18 lg:w-30 text-center mx-auto -mb-4" />
          <h1 className="text-lg md:text-lg lg:text-3xl my-3 md:my-2 lg:my-4 manrope">{t("benefit_card_title_1")}</h1>
          <p className="w-full text-sm md:text-sm lg:text-base mx-auto mb-6 manrope">{t("benefit_card_desc_1")}</p>
        </motion.div>

                <div className="bg-white px-8  md:px-8 md:py-3 lg:px-8 lg:py-5 rounded-2xl shadow w-full max-w-[22rem] mx-auto min-h-[18rem]">
          <img src={Star} className="w-25 md:w-18 lg:w-30 text-center mx-auto -mb-4" />
          <h1 className="text-lg md:text-lg lg:text-3xl my-3 md:my-2 lg:my-4 manrope">{t("benefit_card_title_2")}</h1>
          <p className="w-full text-sm md:text-sm lg:text-base mx-auto mb-6 manrope">{t("benefit_card_desc_2")}</p>
        </div>

                <motion.div
          initial={{ opacity: 0, x: window.innerWidth < 640 ? 100 : 0 }}
          whileInView={{ 
            opacity: 1, 
            x: window.innerWidth < 640 ? 0 : 15 // Closer to center on mobile
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          viewport={{ once: true, amount:0.6 }}
          className="bg-white px-8  md:px-8 md:py-3 lg:px-8 lg:py-5 rounded-2xl shadow w-full max-w-[22rem] mx-auto min-h-[18rem]"
        >
          <img src={Star} className="w-25 md:w-18 lg:w-30 text-center mx-auto -mb-6" />
          <h1 className="text-lg md:text-lg lg:text-3xl my-3 md:my-2 lg:my-4 manrope">{t("benefit_card_title_3")}</h1>
          <p className="w-full text-sm md:text-sm lg:text-base mx-auto mb-6 manrope">{t("benefit_card_desc_3")}</p>
        </motion.div>
       </div>
     </div>


     {/* How It Works Section */}
     <div className="min-h-1/3 sm:min-h-screen flex">
       <div className="flex flex-col md:flex-row w-full max-w-screen">
         {/* Left Side */}
         <div className="w-full md:w-1/2 flex items-start">
           <div className="p-8"></div>
         </div>
         {/* Right Side */}
         <div className="w-full md:w-1/2 mx-auto flex items-center md:items-start">
           <div className="p-8 w-full">
                            <h2 className="sm:text-5xl text-3xl mb-4 text-center md:text-left title-font">
               {t("how_it_works")}
             </h2>
             <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-6">
               <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:mr-8">
                 01
               </div>
               <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                 <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc")}</p>
                 </div>
               </div>
             </div>
             <div className="flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-left mb-6">
               <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:ml-8">
                 02
               </div>
               <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                 <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc")}</p>
                 </div>
               </div>
             </div>
             <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-12">
               <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:mr-8">
                 03
               </div>
               <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                 <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc")}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

      {/* Collaboration Section */}
      <div className="sm:pb-48 flex flex-col items-center text-center px-4">
                 <h1 className="text-2xl sm:text-5xl mb-12 title-font">{t("collab_title")}</h1>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-15 max-w-4xl">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="sm:min-h-screen flex flex-col px-4 py-16">
        <div className="w-full max-w-6xl mx-auto">
                     <h1 className="text-center sm:text-left text-2xl sm:text-5xl mb-12 title-font">{t("faq_title")}</h1>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex flex-col flex-1 gap-6">
              {faqData.slice(0, 3).map((faq) => (
                <div
                  key={faq.id}
                  onClick={() => toggleItem(faq.id)}
                  className={`group rounded-2xl p-6 text-left relative w-full cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#EF07534D] ${
                    expandedItems.includes(faq.id) 
                      ? 'bg-[#FFE7EA] shadow-2xl shadow-[#EF07534D]' 
                      : 'bg-white'
                  }`}
                >
                  <img 
                    src={Plus} 
                    className={`absolute top-4 right-5 sm:top-4 sm:right-4 w-5 h-5 transition-transform duration-300 ${
                      expandedItems.includes(faq.id) ? 'rotate-45 -translate-x-1' : 'rotate-0 translate-x-0'
                    }`} 
                  />
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 text-md rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      expandedItems.includes(faq.id) 
                        ? 'bg-white text-[#EF0753]' 
                        : 'bg-[#EDEEF0] text-[#EF0753]'
                    }`}>
                                             <span className="manrope font-bold">{faq.id < 10 ? `0${faq.id}` : faq.id}</span>
                    </div>
                    <div className="flex-1">
                                             <p className="sm:text-xl text-gray-800 manrope">
                        {faq.question}
                      </p>
                      {expandedItems.includes(faq.id) && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                                                     className="text-gray-800 text-sm mt-2 manrope"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Column */}
            <div className="flex flex-col flex-1 gap-6">
              {faqData.slice(3, 5).map((faq) => (
                <div
                  key={faq.id}
                  onClick={() => toggleItem(faq.id)}
                  className={`group rounded-2xl p-6 text-left relative w-full cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#EF07534D] ${
                    expandedItems.includes(faq.id) 
                      ? 'bg-[#FFE7EA] shadow-2xl shadow-[#EF07534D]' 
                      : 'bg-white'
                  }`}
                >
                  <img 
                    src={Plus} 
                    className={`absolute top-4 right-5 sm:top-4 sm:right-4 w-5 h-5 transition-transform duration-300 ${
                      expandedItems.includes(faq.id) ? 'rotate-45 -translate-x-1' : 'rotate-0 translate-x-0'
                    }`} 
                  />
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 text-md rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      expandedItems.includes(faq.id) 
                        ? 'bg-white text-[#EF0753]' 
                        : 'bg-[#EDEEF0] text-[#EF0753]'
                    }`}>
                                             <span className="manrope font-bold">{faq.id < 10 ? `0${faq.id}` : faq.id}</span>
                    </div>
                    <div className="flex-1">
                                             <p className="sm:text-xl text-gray-800 manrope">
                        {faq.question}
                      </p>
                      {expandedItems.includes(faq.id) && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                                                     className="text-gray-800 text-sm mt-2 manrope"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
     {/* Footer Section */}
     <footer className="bg-white py-4 sm:py-4 md:py-6 lg:py-8 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mb-4 sm:mb-5 md:mb-7 lg:mb-12 rounded-2xl sm:rounded-3xl">
       <div className="max-w mx-auto">
         <div className="flex md:flex-row items-start px-4 sm:px-6 md:px-8 lg:px-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
           <div className="w-full md:w-1/3 mb-2 sm:mb-4 md:mb-6 lg:mb-8">
             <img src={Logo} className="w-32 sm:w-36 md:w-40 lg:w-44 mb-4 sm:mb-6 md:mb-8 lg:mb-10 ml-0 sm:ml-2 md:ml-4 lg:ml-6"/>
             <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xl space-y-2 sm:space-y-3 md:space-y-4">
                                <h3 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 break-words manrope"><span className="font-semibold">Corporate Head Office</span>: 3787 Jerry Dove Drive, Florence, South Carolina, 29501, United States.</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-2 sm:mb-3 md:mb-4 manrope"><span className="font-semibold">Phone</span>: 000-000-000-000</p>
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
         
         <div className="px-4 sm:px-6 md:px-8 lg:px-12 mb-0 mt-10 sm:mt-0 md:mb-2 lg:mb-3 flex flex-row justify-between items-center">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 manrope">©2024 All rights reserved</p>
           {/* Social Media Icons */}
           <div className="flex space-x-4 mr-1 sm:mr-0 sm:space-x-6 md:space-x-8 lg:space-x-10">
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