import { useState, useEffect, useRef } from "react"; 
import { Link } from "react-router-dom"; 
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "../assets/logo.png" 
import Gradient from "../assets/gradient.png" 
import SmallPlus from "../assets/small_plus.png" 
import Folder from "../assets/folder.png" 
import ChatBubble from "../assets/chat.png" 
import Icon from "../assets/icon.svg" 
import ChatIcon from "../assets/aiicon.svg" 

interface Message { 
  sender: "user" | "bot"; 
  text: string; 
} 

const translations = {
  EN: {
    begin_new_chat: "Begin a new chat",
    search: "Search",
    recent_chats: "Recent Chats",
    category: "Category",
    ask_anything: "Ask our AI anything",
    login: "Login",
    login_signup: "Login / Sign Up",
    input_placeholder: "Ask me anything...",
  },
  INA: {
    begin_new_chat: "Mulai chat baru",
    search: "Cari",
    recent_chats: "Riwayat Chat",
    category: "Kategori",
    ask_anything: "Tanya apa saja ke AI kami",
    login: "Masuk",
    login_signup: "Masuk / Daftar",
    input_placeholder: "Tanyakan apa saja...",
  },
};

export default function Chat() { 
  const { language } = useLanguage();
  const t = (key: keyof typeof translations["EN"]) => translations[language][key];
  const [messages, setMessages] = useState<Message[]>([]); 
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [activeChat, setActiveChat] = useState<string | null>("1"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 
  
  const chats = [ 
    { id: "1", title: "Women's Rights in Indonesia" }, 
    { id: "2", title: "Starting a Business as a Woman" }, 
    { id: "3", title: "Legal Protection for Women" }, 

  ];

  const categories = [
    { id: "1", title: "Women's Rights & Law" },
    { id: "2", title: "Entrepreneurship" },
    { id: "3", title: "Education & Learning" },

  ]; 

  const sendMessage = async () => { 
    if (!input.trim() || loading) return; 
    const newMessages: Message[] = [...messages, { sender: "user", text: input }]; 
    setMessages(newMessages); 
    setInput(""); 
    setLoading(true); 
    
    try { 
      const response = await fetch("https://api.kartinilove.ai/api/chat", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json" 
        }, 
        body: JSON.stringify({ message: input }), 
      }); 
      
      if (!response.ok) throw new Error(`Backend error: ${response.status}`); 
      const data = await response.json(); 
      const reply = data.reply ?? "⚠️ No response"; 
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]); 
    } catch (err) { 
      console.error(err); 
      setMessages((prev) => [ 
        ...prev, 
        { sender: "bot", text: "Sorry, something went wrong" }, 
      ]); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]); 

  return ( 
    <div className="flex h-screen overflow-hidden bg-[#FFF1F3]"> 
      <img className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0" src={Gradient}></img> 
      
      {/* Mobile Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <span style={{color: '#374151', fontSize: '1.5rem', width: '1.5rem', textAlign: 'center'}}>☰</span>
        </button>
        <Link to={"/"}>
          <img className="w-32" src={Logo} />
        </Link>
        <button className="bg-[#EF0753] rounded-full px-4 py-2">
          <Link to="/account" className="text-white text-sm">
            {t("login")}
          </Link>
        </button>
      </div>
      
      {/* Login/Sign Up Button - Desktop only */}
      <div className="hidden md:hidden absolute top-4 right-4 z-10">
            <button className="bg-[#EF0753] rounded-full px-6 py-4 md-px-7 md-py-3 my-3 md-my-5">
                <Link to="/account" className="text-white hover:text-gray-200">
                  {t("login_signup")}
                </Link>
            </button>
      </div>
      
      <aside className={`w-64 bg-white text-black flex flex-col mt-0 mb-3 ml-5 md:ml-3 rounded-4xl transition-all duration-500 ease-in-out transform overflow-hidden ${
        isSidebarOpen 
          ? 'fixed left-0 top-24 md:top-4 z-20 h-[calc(100vh-11rem)] md:h-[calc(100vh-2rem)] translate-x-0 opacity-100' 
          : 'fixed left-0 top-24 md:top-4 z-20 h-[calc(100vh-11rem)] md:h-[calc(100vh-2rem)] -translate-x-full opacity-0 md:opacity-100 md:translate-x-0 md:relative md:block'
      }`}> 
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-4 md:p-3">
          {/* Desktop Logo - Hidden on mobile */}
          <Link to={"/"} className="hidden md:block"> 
            <img className="w-40 mx-auto mt-4 mb-2" src={Logo} /> 
          </Link>
          
          {/* Start new chat */} 
          <div 
            className="rounded-3xl px-4 py-3 md:px-4 md:py-4 cursor-pointer flex items-center hover:bg-gray-100 min-w-0"
            onClick={() => {
              setMessages([]);
              setActiveChat(null);
              setIsSidebarOpen(false);
            }}
          > 
            <span className="text-base md:text-lg truncate flex-1">{t("begin_new_chat")}</span> 
            <img src={SmallPlus} alt="plus" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> 
          </div> 
          
          {/* Search */} 
          <div className="mx-2 rounded-xl px-4 py-2 md:px-4 md:py-3 cursor-pointer bg-gray-200 mt-2 min-w-0"> 
            <span className="text-base md:text-lg truncate">{t("search")}</span>
          </div> 
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-4 md:px-3 pb-4 md:pb-3">
          {/* Recent Chats Section */} 
          <div className="px-0 py-2 text-base md:text-lg font-medium">{t("recent_chats")}</div> 
          <div className="space-y-1"> 
            {chats.map((chat) => ( 
              <div 
                key={chat.id} 
                onClick={() => { 
                  setActiveChat(chat.id); 
                  setMessages([]); 
                  setIsSidebarOpen(false);
                }} 
                className={`mx-2 rounded-xl px-4 py-2 md:px-4 md:py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2 min-w-0 ${ 
                  activeChat === chat.id ? "bg-gray-200" : "" 
                }`} 
              > 
                <img src={ChatBubble} alt="chat" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> 
                <span className="text-base md:text-lg truncate">{chat.title}</span>
              </div> 
            ))} 
          </div> 
          
          {/* Category Section */} 
          <div className="px-0 py-2 text-base md:text-lg font-medium mt-4">{t("category")}</div> 
          <div className="space-y-1"> 
            {categories.map((category) => ( 
              <div 
                key={category.id} 
                className="mx-2 rounded-xl px-4 py-2 md:px-4 md:py-3 cursor-pointer hover:bg-gray-100 flex items-center gap-2 min-w-0" 
              > 
                <img src={Folder} alt="folder" className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> 
                <span className="text-base md:text-lg truncate">{category.title}</span>
              </div> 
            ))} 
          </div>
        </div> 
      </aside> 
      
      <main className="flex-1 flex flex-col mt-15 md:pt-0 relative z-10"> 
        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col"> 
          {messages.length === 0 ? ( 
            <div className="flex-1 flex flex-col items-center justify-center text-black text-lg space-y-2"> 
              <img className="w-8 h-8" src={ChatIcon} alt="chat icon" /> 
              <span className="text-2xl">{t("ask_anything")}</span> 
            </div> 
          ) : ( 
            messages.map((msg, idx) => ( 
              <div 
                key={idx} 
                className={`flex ${ 
                  msg.sender === "user" ? "justify-end" : "justify-start" 
                }`} 
              > 
                {msg.sender !== "user" && ( 
                  <img src={Icon} alt="bot" className="w-12 h-12 mr-2 self-start" /> 
                )} 
                <div 
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[75%] leading-relaxed shadow-sm animate-fadeInUp ${ 
                    msg.sender === "user" 
                      ? "bg-white text-black" 
                      : "bg-[#ffe7ea] text-gray-900" 
                  }`} 
                > 
                  {msg.text} 
                </div> 
              </div> 
            )) 
          )} 
          <div ref={messagesEndRef} /> 
        </div> 
        
        {/* Input area */} 
        <div className="border-gray-300 p-4"> 
          <div className="relative flex items-center"> 
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={t("input_placeholder")} 
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
              disabled={loading} 
              className="bg-white w-full pr-12 pl-4 py-3 border rounded-3xl shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" 
            /> 
            <button 
              onClick={sendMessage} 
              disabled={loading} 
              className="absolute right-3 text-gray-500 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" 
            > 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                className="w-5 h-5" 
              > 
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /> 
              </svg> 
            </button> 
          </div> 
        </div> 
      </main> 
    </div> 
  ); 
}