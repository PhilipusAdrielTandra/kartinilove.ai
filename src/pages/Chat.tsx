import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png"
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

  // Static placeholder chats
  const chats = [
    { id: "1", title: "Placeholder Chat 1" },
    { id: "2", title: "Placeholder Chat 2" },
    { id: "3", title: "Placeholder Chat 3" },
    { id: "4", title: "Placeholder Chat 4" },
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
        headers: { "Content-Type": "application/json" },
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
  <div className="flex h-screen overflow-hidden bg-gray-400"> 
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col m-3 rounded-4xl">
        <Link to={"/"}><img className="w-40 align-middle flex mx-auto my-4" src={Logo}></img></Link>
        <div className="rounded-3xl px-4 py-4 cursor-pointer hover:white">
            Begin a new chat
        </div>
        <div className="mx-2 rounded-xl px-4 py-3 cursor-pointer bg-gray-300">
            Search
        </div>
        <div className="rounded-3xl px-4 py-4 cursor-pointer hover:white">
            Recent Chats
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id);
                setMessages([]); 
              }}
              className={`mx-2 rounded-xl px-4 py-3 cursor-pointer hover:white ${
                activeChat === chat.id ? "bg-gray-300" : ""
              }`}
            >
              {chat.title}
            </div>
          ))}
          <div className="rounded-3xl px-4 py-2 cursor-pointer hover:white">
            Category
          </div>
        </div>
        
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Messages (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-[75%] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar (fixed at bottom of main) */}
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
