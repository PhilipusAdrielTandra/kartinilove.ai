import { useState, useEffect, useRef } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; 
import Logo from "../assets/logo.png" 
import Gradient from "../assets/gradient.png" 
import SmallPlus from "../assets/small_plus.png" 
import Folder from "../assets/folder.png" 
import ChatBubble from "../assets/chat.png" 
import More from "../assets/more.png" 
import Icon from "../assets/icon.svg" 
import ChatIcon from "../assets/aiicon.svg" 

interface Message { 
  sender: "user" | "bot"; 
  text: string; 
} 

export default function Chat() { 
  const [messages, setMessages] = useState<Message[]>([]); 
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [activeChat, setActiveChat] = useState<string | null>("1"); 
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 
  
  const chats = [ 
    { id: "1", title: "Lorem Ipsum" }, 
    { id: "2", title: "Lorem Ipsum" }, 
    { id: "3", title: "Lorem Ipsum" }, 
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
      <img className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" src={Gradient}></img> 
      
      {/* Login/Sign Up Button - Added to top right */}
      <div className="absolute top-4 right-4 z-10">
            <button className="bg-[#EF0753] rounded-full px-6 py-4 md-px-7 md-py-3 my-3 md-my-5">
                <Link to="/account" className="text-white hover:text-gray-200">
                  Login / Sign Up
                </Link>
            </button>
      </div>
      
      <aside className="w-64 bg-white text-black flex flex-col m-3 rounded-4xl"> 
        <Link to={"/"}> 
          <img className="w-40 mx-auto mt-4 mb-2" src={Logo} /> 
        </Link> 
        
        {/* Start new chat */} 
        <div className="rounded-3xl px-4 py-4 cursor-pointer flex items-center"> 
          <span>Begin a new chat</span> 
          <img src={SmallPlus} alt="plus" className="ml-auto w-5 h-5" /> 
        </div> 
        
        {/* Search */} 
        <div className="mx-2 rounded-xl px-4 py-3 cursor-pointer bg-gray-200"> 
          Search 
        </div> 
        
        {/* Recent Chats Section */} 
        <div className="mt-4 px-4 py-2">Recent Chats</div> 
        <div className="overflow-y-auto"> 
          {chats.map((chat) => ( 
            <div 
              key={chat.id} 
              onClick={() => { 
                setActiveChat(chat.id); 
                setMessages([]); 
              }} 
              className={`mx-2 rounded-xl px-4 py-3 cursor-pointer hover:white flex items-center gap-2 ${ 
                activeChat === chat.id ? "bg-gray-200" : "" 
              }`} 
            > 
              <img src={ChatBubble} alt="chat" className="w-5 h-5" /> 
              {chat.title} 
              <img src={More} alt="more" className="ml-auto" /> 
            </div> 
          ))} 
        </div> 
        
        {/* Category Section */} 
        <div className="mt-4 px-4 py-2">Category</div> 
        <div className="overflow-y-auto"> 
          {chats.map((category) => ( 
            <div 
              key={category.id} 
              className="mx-2 rounded-xl px-4 py-3 cursor-pointer hover:white flex items-center gap-2" 
            > 
              <img src={Folder} alt="folder" className="w-5 h-5" /> 
              {category.title} 
            </div> 
          ))} 
        </div> 
      </aside> 
      
      <main className="flex-1 flex flex-col"> 
        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col"> 
          {messages.length === 0 ? ( 
            <div className="flex-1 flex flex-col items-center justify-center text-black text-lg space-y-2"> 
              <img className="w-8 h-8" src={ChatIcon} alt="chat icon" /> 
              <span className="text-2xl">Ask our AI anything</span> 
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
              placeholder="Ask me anything..." 
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