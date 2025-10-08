import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import Hero from "../assets/hero.svg";
import Star from "../assets/star.png";
import Plus from "../assets/plus.png";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import PrivasimuLogo from "../assets/privasimu_logo.svg";
import HeylawLogo from "../assets/heylaw_logo.svg";
import BareskrimLogo from "../assets/bareskrim_polri_logo.png";
import UnWomenLogo from "../assets/un_women_logo.png";
import UnescoLogo from "../assets/unesco_logo.png";
import UniversitasIndonesiaLogo from "../assets/universitas_indonesia_logo.webp";

const translations = {
  EN: {
    hero_title: "Kartini as AI, Technology that Listens and Empowers",
    hero_subtitle: "Welcome to KartiniLove.ai, a revolutionary platform where Kartini’s spirit, wisdom, and empathy not only live in history but are brought to life through artificial intelligence (AI).",
    cta_explore: "Explore",
    video_title_1: "Get to Know Us",
    video_title_2: "Better",
    benefit_title_1: "Key Benefits",
    benefit_title_2: "of Our Services",
    benefit_card_title_1: "Consulting",
    benefit_card_desc_1: "Customized Agentic AI consulting services (HR, Finance, Legal). Legal solutions include legal education, contract review, opinion, and compliance check.",
    benefit_card_title_2: "Tools / Technology – KartiniLove.ai",
    benefit_card_desc_2: "An Agentic AI platform for women & organizations. Full or modular access to: Mental Health, Womenpreneur, and Law.",
    benefit_card_title_3: "Education",
    benefit_card_desc_3: "Women’s leadership development programs: Kartini Leadership School (KALIS) and customized In-house Women Leadership Training.",
    how_it_works: "How It Works",
    how_step_title_1: "You can start by trying",
    how_step_desc_1: "by entering a prompt that fits your needs and begin exploring.",
    how_step_title_2: "Our AI will respond",
    how_step_desc_2: "guided by Kartini’s values that uphold women’s equality.",
    how_step_title_3: "You can continue interacting",
    how_step_desc_3: "and learning from our AI about how women can thrive in today’s world.",
    collab_title: "Collaboration & Partnership",
    faq_title: "Frequently Asked Questions",
    faq_q1: "Why is it important to discuss women in technology?",
    faq_a1: "Because it helps open equal opportunities, enrich diverse perspectives, and accelerate inclusive innovation.",
    faq_q2: "What are the main challenges women face in the tech sector?",
    faq_a2: "Gender bias, social stereotypes, and the lack of female role models in tech leadership positions.",
    faq_q3: "How can technology empower women?",
    faq_a3: "Technology helps enhance skills, support entrepreneurship, and provide safe spaces for innovation.",
    faq_q4: "What role can men play as allies in supporting women in technology?",
    faq_a4: "By promoting inclusivity, challenging gender bias in the workplace, and supporting fair policies.",
    faq_q5: "How can we encourage more women to enter the tech world?",
    faq_a5: "Through wider access to STEM education, inclusive work environments, and showcasing inspiring role models.",
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
    how_step_title_1: "Anda dapat mulai mencoba",
    how_step_desc_1: "dengan memasukkan prompt yang sesuai mulai mencoba dengan memasukkan prompt yang sesuai",
    how_step_title_2: "AI kami akan menjawab",
    how_step_desc_2: "sesuai dengan nilai Kartini yang menjunjung tinggi kesetaraan perempuan",
    how_step_title_3: "Anda bisa terus berinteraksi",
    how_step_desc_3: "dan belajar dari AI kami tentang bagaimana perempuan menjadi lebih baik di era sekarang ini",
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
          className="lg:w-6xl absolute right-60 bottom-100 sm:-left-180 top-0 sm:mt-44 md:-left-145 md:-mt-80 lg:-left-180 lg:-mt-40 z-10"
        />
        <img
          src={Hero}
          className="lg:w-7xl w-4xl absolute bottom-50 -right-50 sm:-bottom-50 sm:-right-44 md:bottom-25 md:-right-44 lg:-bottom-34 lg:-right-44  z-10"
          />
        <div className="min-h-screen flex flex-col pt-20 -translate-y-28 sm:translate-y-0 justify-center sm:justify-normal items-center overflow-hidden relative z-20">
          <h1 className="text-2xl  sm:w-auto sm:text-5xl lg:text-5xl mb-2 md:mb-4 w-70 lg:w-3xl text-center title-font">{t("hero_title")}</h1>
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
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title_1")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc_1")}</p>
                 </div>
               </div>
             </div>
             <div className="flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-left mb-6">
               <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:ml-8">
                 02
               </div>
               <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                 <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title_2")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc_2")}</p>
                 </div>
               </div>
             </div>
             <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-12">
               <div className="text-xl md:text-5xl text-[#feb0b9] mb-4 md:mb-0 md:mr-8">
                 03
               </div>
               <div className="relative z-10 gradient-shadow-wrapper w-full md:w-auto">
                 <div className="bg-white px-6 py-4 md:px-15 md:py-4 rounded-2xl shadow-md relative z-20">
                                        <h1 className="text-base md:text-xl text-gray-800 manrope">{t("how_step_title_3")}</h1>
                    <p className="text-sm md:text-base manrope">{t("how_step_desc_3")}</p>
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
        <div className="flex flex-wrap justify-center gap-6 sm:gap-15 max-w-5xl">
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={PrivasimuLogo} alt="Privasimu" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={HeylawLogo} alt="Heylaw" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={BareskrimLogo} alt="Bareskrim POLRI" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={UnWomenLogo} alt="UN Women" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={UnescoLogo} alt="UNESCO" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={UniversitasIndonesiaLogo} alt="Universitas Indonesia" className="w-full h-full object-contain" />
          </div>
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
                                             <p className="sm:text-xl text-gray-800 manrope m-2">
                        {faq.question}
                      </p>
                      {expandedItems.includes(faq.id) && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                                                     className="text-gray-800 text-sm mt-2 manrope m-2"
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
                                             <p className="sm:text-xl text-gray-800 manrope m-2">
                        {faq.question}
                      </p>
                      {expandedItems.includes(faq.id) && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                                                     className="text-gray-800 text-sm mt-2 manrope m-2"
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
      
     <Footer />
   </div>
  );
}