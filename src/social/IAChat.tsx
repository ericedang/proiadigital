import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, Sparkles, User, BrainCircuit, Mic } from 'lucide-react';
import { useSocial } from './store';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Bonjour ! Je suis SocialGenius, votre CM virtuel. Je supervise actuellement 3 clients (TechInnovate, GreenEats, LuxeCorp). Comment puis-je vous aider aujourd\'hui ?',
    timestamp: new Date().toISOString()
  }
];

export default function IAChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponseContext = "J'ai bien noté votre demande. Je vais analyser et préparer le contenu demandé.";
      if (userMessage.content.toLowerCase().includes('techinnovate')) {
        aiResponseContext = "Parfait, j'active le mode lancement pour TechInnovate. Je vais créer une campagne teaser sur 14 jours. Voici ce que je propose : J-14 à J-8 : teasing mystère sur LinkedIn, J-7 à J-3 : révélations progressives avec compte à rebours sur Twitter/X, J-2 : behind-the-scenes sur Instagram Stories, J-J : lancement coordonné sur toutes les plateformes. Je vous prépare un calendrier détaillé avec les contenus. Voulez-vous valider cette approche ?";
      } else if (userMessage.content.toLowerCase().includes('greeneats')) {
        aiResponseContext = "Voici mon analyse pour GreenEats : Croissance de 12% des followers Instagram (objectif : 10%), engagement en hausse de 18% grâce aux Reels recettes, mais baisse de 5% sur Facebook. Points d'attention : les posts carrousel performent 3x mieux que les images simples. Recommandation : augmenter la fréquence des Reels à 4/semaine et réduire Facebook à 2 posts/semaine. Le rapport détaillé est dans votre espace. Souhaitez-vous que j'ajuste automatiquement le calendrier ?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseContext,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white/5 border border-white/5 rounded-3xl backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5 animate-pulse">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold flex items-center gap-2">SocialGenius IA <Sparkles className="w-3 h-3 text-amber-400" /></h2>
            <p className="text-xs text-slate-400">En ligne • Mode: Autonome</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-white/5 text-xs text-slate-300">
          <BrainCircuit className="w-4 h-4 text-purple-400" />
          <span>Niveau d'expertise: Expert SEO/CM</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-white/10">
                {message.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-amber-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                message.role === 'user' 
                  ? 'bg-purple-600 text-white rounded-tr-none' 
                  : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
              }`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-white/10">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div className="p-4 rounded-2xl bg-white/10 text-slate-200 rounded-tl-none border border-white/5 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50">
        <div className="flex gap-2">
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 text-slate-400">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Commandez votre CM IA (ex: 'Crée une campagne...', 'Analyse les stats...')"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
