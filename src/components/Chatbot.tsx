import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";
import { getAIResponse } from "../lib/gemini";

interface Message {
  text: string;
  sender: "bot" | "user";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Bonjour 👋 Je suis l'expert IA de AUE Digital. Comment puis-je accompagner votre structure aujourd'hui ?", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setIsTyping(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.sender === "bot" ? "model" : "user",
      parts: [{ text: m.text }]
    }));

    const aiResponse = await getAIResponse(userMsg, history);
    
    setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[600px] bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-primary text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold">Expert AUE Digital</h3>
                <p className="text-xs font-medium opacity-70">IA & Transformation Digitale</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-slate-50">
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: m.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === "user" 
                      ? "bg-accent text-white rounded-tr-none font-medium shadow-md shadow-accent/10" 
                      : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Posez votre question..."
                  className="w-full bg-slate-100 border border-slate-200 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-accent transition-colors text-sm text-slate-900"
                />
                <button 
                  disabled={isTyping}
                  onClick={sendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// MJ Commit
