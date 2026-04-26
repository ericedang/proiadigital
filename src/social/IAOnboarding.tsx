import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, User, CheckCircle2, ChevronRight, UploadCloud } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'slider' | 'upload' | 'summary';
}

export default function IAOnboarding() {
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const endRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: 1, title: 'Découverte', time: '5 min' },
    { num: 2, title: 'Audit', time: 'Auto' },
    { num: 3, title: 'Stratégie', time: 'Guidé' },
    { num: 4, title: 'Automatisations', time: 'IA' },
    { num: 5, title: 'Plan d\'action', time: 'Généré' },
  ];

  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Bonjour ! Je suis SocialGenius, votre CM virtuel. Ravi de vous accueillir. Pour configurer votre espace, j'ai besoin d'en savoir plus. Parlez-moi de votre entreprise en quelques mots : Quel est votre secteur d'activité et qu'est-ce qui rend votre offre unique ?",
        inputType: 'text'
      }
    ]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendText = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [...messages, {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue
    }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // AI thinks...
    setTimeout(() => {
      progressConversation(newMessages);
    }, 2000);
  };

  const handleOptionSelect = (opt: string) => {
    const newMessages = [...messages, {
      id: Date.now().toString(),
      role: 'user' as const,
      content: opt
    }];
    setMessages(newMessages);
    setIsTyping(true);
    
    setTimeout(() => {
      progressConversation(newMessages);
    }, 2000);
  };

  const progressConversation = (currentMessages: ChatMessage[]) => {
    setIsTyping(false);
    
    // Simple state machine for demo
    if (step === 1 && currentMessages.length === 2) {
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "C'est très clair. Super offre ! Qui sont vos clients idéaux ? Décrivez-moi votre cible (âge, intérêts, besoins...).",
        inputType: 'text'
      }]);
    } else if (step === 1 && currentMessages.length > 2) {
      // Move to Step 2
      setStep(2);
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Parfait. Je lance mon audit automatique de votre secteur d'activité et de la présence concurrente. Cela ne prendra que quelques secondes...",
      }]);
      
      setIsTyping(true);
      setTimeout(() => {
       setIsTyping(false);
       setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'assistant',
         content: "Audit terminé ! Score de maturité Social Media du secteur : 45/100. Opportunités : Vidéos courtes, Éducation produit. Voulez-vous que je génère les piliers de contenu stratégiques ?",
         options: ["Oui, génère la stratégie", "Je veux m'en charger"]
       }]);
      }, 3000);
    } else if (step === 2) {
      setStep(3);
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "J'ai identifié 3 piliers : 1. Pédagogie (Tutos, Astuces), 2. Social Proof (Avis, Cas clients), 3. Behind the scenes. Quel niveau d'autonomie souhaitez-vous me donner ?",
        options: ["Mode Full Auto (100% IA)", "Mode Supervisé (Je valide)", "Mode Assisté (Je propose)"]
      }]);
    } else if (step === 3) {
      setStep(4);
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "C'est noté. Je prépare les règles de validation et le budget de temps alloué. Vous pouvez aussi m'envoyer votre charte graphique en pièce jointe.",
        inputType: 'upload'
      }]);
    } else if (step === 4) {
      setStep(5);
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Tout est prêt ! J'ai généré votre plan d'action sur 90 jours, y compris un calendrier de 30 jours.",
        inputType: 'summary'
      }]);
    }
  };

  const handleUpload = () => {
    // Simulate upload
    const newMessages = [...messages, {
      id: Date.now().toString(),
      role: 'user' as const,
      content: "Fichier envoyé : charte_graphique.pdf"
    }];
    setMessages(newMessages);
    setIsTyping(true);
    setTimeout(() => {
      progressConversation(newMessages);
    }, 1500);
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex shadow-2xl bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
      {/* Sidebar Progress */}
      <div className="w-64 bg-slate-900/50 border-r border-white/5 p-6 hidden md:block">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 mb-8">Onboarding Client</h2>
        
        <div className="space-y-6">
          {steps.map((s, idx) => {
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <div key={s.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' :
                    'bg-white/5 text-slate-500 border border-white/5'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-0.5 h-10 mt-2 ${isCompleted ? 'bg-emerald-500/30' : 'bg-white/5'}`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`font-medium ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>{s.title}</p>
                  <p className="text-xs text-slate-500">{s.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id} 
                className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === 'assistant' 
                    ? 'bg-gradient-to-tr from-purple-600 to-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'bg-white/10 border border-white/10'
                }`}>
                  {m.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                </div>
                
                <div className={`space-y-3 ${m.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-white/10 text-white border border-white/10 rounded-tr-none' 
                      : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-tl-none shadow-xl'
                  }`}>
                    {m.content}
                  </div>

                  {/* Options render */}
                  {m.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          disabled={isTyping}
                          className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors text-sm disabled:opacity-50"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Upload Render */}
                  {m.inputType === 'upload' && (
                    <button onClick={handleUpload} className="w-full p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-amber-500/50 transition-colors text-slate-400 hover:text-amber-400">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="font-medium">Cliquer pour uploader ou glisser ici</span>
                    </button>
                  )}

                  {/* Summary Render */}
                  {m.inputType === 'summary' && (
                    <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl w-80">
                      <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Plan d'action généré
                      </h4>
                      <ul className="text-sm text-slate-300 space-y-1 mb-4">
                        <li>• Stratégie 90 jours (PDF)</li>
                        <li>• Calendrier 30 jours prêt</li>
                        <li>• 5 KPIs cibles configurés</li>
                      </ul>
                      <button className="w-full py-2 bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-500/30">
                        Ouvrir le Centre de Contrôle
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 rounded-tl-none shadow-xl flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-slate-500 ml-2 font-medium">Analyse en cours...</span>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-slate-900/80 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-2 relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendText()}
              disabled={isTyping}
              placeholder="Écrivez votre réponse ici..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button 
              onClick={handleSendText}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 text-slate-900 rounded-lg disabled:opacity-50 transition-colors shadow-lg shadow-amber-500/20"
            >
              <ChevronRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
