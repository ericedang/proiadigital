import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, User, CheckCircle2, ChevronRight, UploadCloud, Rocket, Target, Activity, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'slider' | 'upload' | 'summary';
}

export default function IAOnboarding() {
  const [mode, setMode] = useState<'selection' | 'assisted' | 'zeroclick_input' | 'zeroclick_dashboard'>('selection');
  
  // Assisted Mode State
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  // Zero Click Mode State
  const [zcInput, setZcInput] = useState('');
  const [isZCLoading, setIsZCLoading] = useState(false);

  const steps = [
    { num: 1, title: 'Découverte', time: '5 min' },
    { num: 2, title: 'Audit', time: 'Auto' },
    { num: 3, title: 'Stratégie', time: 'Guidé' },
    { num: 4, title: 'Automatisations', time: 'IA' },
    { num: 5, title: 'Plan d\'action', time: 'Généré' },
  ];

  useEffect(() => {
    if (mode === 'assisted') {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Bonjour ! Je suis SocialGenius, votre CM virtuel. Ravi de vous accueillir. Pour configurer votre espace, j'ai besoin d'en savoir plus. Parlez-moi de votre entreprise en quelques mots : Quel est votre secteur d'activité et qu'est-ce qui rend votre offre unique ?",
          inputType: 'text'
        }
      ]);
    }
  }, [mode]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendText = () => {
    if (!inputValue.trim()) return;
    
    const newMessages = [...messages, {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue
    }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

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
    
    if (step === 1 && currentMessages.length === 2) {
      setMessages([...currentMessages, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "C'est très clair. Super offre ! Qui sont vos clients idéaux ? Décrivez-moi votre cible (âge, intérêts, besoins...).",
        inputType: 'text'
      }]);
    } else if (step === 1 && currentMessages.length > 2) {
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

  const handleLaunchZeroClick = () => {
    if (!zcInput) return;
    setIsZCLoading(true);
    setTimeout(() => {
      setIsZCLoading(false);
      setMode('zeroclick_dashboard');
    }, 2500);
  };

  if (mode === 'selection') {
    return (
      <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full my-auto pb-12">
          <div className="text-center mb-8 md:mb-12 mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Comment souhaitez-vous démarrer ?</h1>
            <p className="text-lg md:text-xl text-slate-400">Choisissez le niveau d'implication qui vous convient pour ce nouveau projet.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setMode('zeroclick_input')}
              className="bg-gradient-to-br from-purple-900/40 to-amber-900/40 border border-amber-500/30 rounded-3xl p-8 cursor-pointer relative overflow-hidden group shadow-2xl shadow-purple-500/10"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-bl-xl z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                RECOMMANDÉ
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-amber-500 mb-6 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">Mode Zéro Clic</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                L'aboutissement ultime de notre plateforme. Décrivez votre projet en une phrase et l'IA s'occupe de 100% de la diffusion de A à Z. Vous n'avez plus rien à faire.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Création 100% autonome</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Parfaite optimisation</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Rapports auto sans interaction</li>
              </ul>
              
              <div className="flex items-center text-amber-400 font-bold group-hover:translate-x-2 transition-transform">
                Lancer le mode Zéro Clic <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setMode('assisted')}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 cursor-pointer relative overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 mb-6 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-300" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-white">Assistant Détaillé</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Un accompagnement pas-à-pas pour configurer votre projet. Vous validez la stratégie, déterminez les règles et gardez la main sur le processus.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Choix finaux par l'humain</li>
                <li className="flex items-center gap-2 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Personnalisation avancée</li>
                <li className="flex items-center gap-2 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Apprentissage pas-à-pas</li>
              </ul>
              
              <div className="flex items-center text-slate-300 font-bold group-hover:translate-x-2 transition-transform">
                Démarrer l'Assistant <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'zeroclick_input') {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full">
          <button onClick={() => setMode('selection')} className="text-sm text-slate-400 hover:text-white mb-8 flex items-center gap-1 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Retour
          </button>
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Mode Zéro Clic</h1>
            <p className="text-xl text-slate-400 mb-2">Décrivez votre projet ou déposez votre document.</p>
            <p className="text-amber-400 font-medium">C'est la SEULE chose que vous aurez à faire.</p>
          </div>

          <div className="space-y-4">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex relative focus-within:border-amber-500/50 focus-within:bg-white/10 transition-colors shadow-2xl">
               <textarea 
                 value={zcInput}
                 onChange={e => setZcInput(e.target.value)}
                 disabled={isZCLoading}
                 placeholder="Ex: Je lance une nouvelle formation sur la productivité pour les développeurs freelancers dans 2 semaines. Mon site c'est https://..."
                 className="flex-1 bg-transparent border-none outline-none resize-none p-4 text-lg min-h-[120px] custom-scrollbar placeholder:text-slate-500"
               />
               <div className="absolute right-4 bottom-4 flex gap-2">
                 <button className="p-3 bg-white/10 hover:bg-white/20 text-slate-300 rounded-xl transition-colors tooltip relative group cursor-pointer">
                    <UploadCloud className="w-5 h-5" />
                    <span className="absolute -top-10 right-0 w-max bg-black text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Joindre un document</span>
                 </button>
                 <button 
                  onClick={handleLaunchZeroClick}
                  disabled={!zcInput.trim() || isZCLoading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-amber-500 font-bold text-white rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center gap-2"
                 >
                   {isZCLoading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                   LANCER
                 </button>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === 'zeroclick_dashboard') {
    return (
      <div className="min-h-[calc(100vh-8rem)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6 pt-10">
          
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 mb-8 text-center relative overflow-hidden backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
             <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
               <CheckCircle2 className="w-8 h-8 text-emerald-400" />
             </div>
             <h1 className="text-3xl font-bold text-white mb-4">Bienvenue dans la diffusion autonome. 🎯</h1>
             <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
               Votre projet est maintenant entre les mains de notre IA experte. Elle va analyser le marché, définir la stratégie, créer les visuels, planifier et publier.<br/><br/>
               <span className="font-bold text-emerald-300">VOUS N'AVEZ STRICTEMENT PLUS RIEN À FAIRE.</span><br/><br/>
               Je m'occupe de tout. Vous recevrez votre premier rapport dans 7 jours. Si urgence, écrivez-moi. Bonne route ! 🚀
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Mode Zéro Clic Activé
                </div>
                
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  Projet en cours de diffusion
                </h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progression Globale</span>
                      <span className="text-emerald-400 font-bold">Analyse initale</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[15%] transition-all duration-1000 rounded-full stripe-pattern" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-[#0B0F19]/50 rounded-2xl p-5 border border-white/5">
                    <span className="block text-sm text-slate-400 mb-1">État du système</span>
                    <span className="text-xl font-bold text-emerald-400 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Tout va bien</span>
                  </div>
                  <div className="bg-[#0B0F19]/50 rounded-2xl p-5 border border-white/5">
                    <span className="block text-sm text-slate-400 mb-1">Prochain rapport dans</span>
                    <span className="text-xl font-bold font-mono text-white">7 Jours</span>
                  </div>
                  <div className="bg-[#0B0F19]/50 rounded-2xl p-5 border border-white/5 col-span-2 lg:col-span-1">
                    <div className="flex justify-between items-end mb-2">
                      <span className="block text-sm text-slate-400">Objectif Mensuel</span>
                      <span className="text-xs font-bold text-slate-500">0%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                       <div className="h-full bg-blue-500 w-[2%]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0 vues</span>
                      <span>10k vues</span>
                    </div>
                  </div>
                </div>
             </div>

             <div className="space-y-6 flex flex-col">
                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 transition-colors flex flex-col items-center justify-center text-center group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg block mb-1">Voir le rapport</span>
                  <span className="text-sm text-slate-400">Indisponible (Génération en cours)</span>
                </button>
                
                <Link to="/social/ai-chat" className="flex-1 bg-gradient-to-br from-purple-900/40 to-amber-900/40 hover:from-purple-900/60 hover:to-amber-900/60 border border-amber-500/30 rounded-3xl p-6 transition-colors flex flex-col items-center justify-center text-center group outline-none">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg block mb-1 text-white">Parler à l'IA</span>
                  <span className="text-sm text-amber-200/70">Ajustements manuels rares</span>
                </Link>
             </div>
          </div>
        </motion.div>
        
        <style>{`
          .stripe-pattern {
            background-image: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.15) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.15) 50%,
              rgba(255, 255, 255, 0.15) 75%,
              transparent 75%,
              transparent
            );
            background-size: 1rem 1rem;
            animation: move-stripes 1s linear infinite;
          }
          @keyframes move-stripes {
            from { background-position: 1rem 0; }
            to { background-position: 0 0; }
          }
        `}</style>
      </div>
    );
  }

  // Assisted Mode Render
  return (
    <div className="h-[calc(100vh-8rem)] flex shadow-2xl bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl relative">
      <button onClick={() => setMode('selection')} className="absolute top-6 right-6 text-sm text-slate-400 hover:text-white transition-colors z-10 flex items-center gap-1">
         Quitter l'assistant
      </button>

      {/* Sidebar Progress */}
      <div className="w-64 bg-slate-900/50 border-r border-white/5 p-6 hidden md:block mt-8">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 mb-8">Assistant IA</h2>
        
        <div className="space-y-6">
          {steps.map((s, idx) => {
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <div key={s.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' :
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
      <div className="flex-1 flex flex-col relative pt-12">
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
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20' 
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

                  {m.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          disabled={isTyping}
                          className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-sm disabled:opacity-50"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.inputType === 'upload' && (
                    <button onClick={handleUpload} className="w-full p-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-blue-500/50 transition-colors text-slate-400 hover:text-blue-400">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="font-medium">Cliquer pour uploader ou glisser ici</span>
                    </button>
                  )}

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
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 rounded-tl-none shadow-xl flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
              onKeyDown={e => e.key === 'Enter' && handleSendText()}
              disabled={isTyping}
              placeholder="Écrivez votre réponse ici..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleSendText}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/20"
            >
              <ChevronRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

