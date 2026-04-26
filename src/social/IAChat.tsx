import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, Sparkles, User, BrainCircuit, Mic, CheckCircle2, Circle, AlertCircle, Info, ChevronRight, GraduationCap, X, Rocket, Shield, Activity, BarChart3, Clock, Zap } from 'lucide-react';
import { useSocial } from './store';
import IAWizard from './IAWizard';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | ReactNode;
  timestamp: string;
  options?: string[];
  type?: 'normal' | 'validation' | 'dashboard';
  coachNote?: string;
  reformulation?: string;
  verification?: string[];
}

type TrafficLight = 'green' | 'orange' | 'red' | 'blue';
type InteractionMode = 'guidage' | 'autonomie';
type TrustLevel = 1 | 2 | 3 | 4;

const vagueWords = ['améliorer', 'optimiser', 'développer', 'gérer', 'ma présence', 'ma visibilité', 'mon image', 'les réseaux sociaux', 'le digital', 'en ligne', 'plus de clients', 'plus de vues', "plus d'abonnés", 'quelque chose de bien', 'un bon post', 'du contenu', 'je ne sais pas', 'perdu', 'aidez-moi'];
const confidentWords = ['fais confiance', 'gérez tout', 'surprenez-moi', 'occupez-vous', 'pas le temps', 'délègue', 'pilote automatique'];

const highlightVagueWords = (text: string): ReactNode => {
  const regex = new RegExp(`(${vagueWords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        if (vagueWords.some(v => v.toLowerCase() === part.toLowerCase())) {
          return <span key={i} className="bg-amber-500/20 text-amber-200 px-1 rounded border border-amber-500/40">{part}</span>;
        }
        return part;
      })}
    </>
  );
};

export default function IAChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1', role: 'assistant',
    content: "Bonjour ! Je suis SocialGenius, votre CM virtuel expert. Avant de lancer une action, je m'assure de toujours parfaitement comprendre votre besoin.\n\nComment puis-je vous aider aujourd'hui ? (ex: Je veux lancer une campagne, J'ai besoin d'analyser mes stats...)",
    timestamp: new Date().toISOString()
  }]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [showWizard, setShowWizard] = useState(false);
  const [isCoachMode, setIsCoachMode] = useState(false);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('guidage');
  const [trustLevel, setTrustLevel] = useState<TrustLevel>(1);

  const [axes, setAxes] = useState({
    objectif: { filled: false, value: '', label: 'Objectif (Pourquoi ?)' },
    contexte: { filled: false, value: '', label: 'Contexte (Cadre)' },
    audience: { filled: false, value: '', label: 'Audience (Pour qui ?)' },
    moyens: { filled: false, value: '', label: 'Moyens (Ressources)' },
    contraintes: { filled: false, value: '', label: 'Contraintes (Limites)' }
  });

  const [missingInfo, setMissingInfo] = useState<string[]>(['Objectif principal', 'Cible visée', 'Moyens disponibles']);
  const [trafficColor, setTrafficColor] = useState<TrafficLight>('blue');
  const [trafficMessage, setTrafficMessage] = useState('Mode découverte. Laissez-moi comprendre votre besoin.');

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  useEffect(() => {
    const filledCount = Object.values(axes).filter(a => a.filled).length;
    if (filledCount === 5) {
      setTrafficColor('green'); setTrafficMessage('J\'ai tout ce qu\'il me faut. Prêt à exécuter.'); setMissingInfo([]);
    } else if (filledCount >= 3) {
      setTrafficColor('orange'); setTrafficMessage('Je peux y aller, mais il me manque des infos pour être optimal.');
    } else if (filledCount > 0) {
      setTrafficColor('red'); setTrafficMessage('Je ne peux pas encore agir. Informations critiques manquantes.');
    } else {
      setTrafficColor('blue'); setTrafficMessage('Mode découverte. Laissez-moi comprendre votre besoin.');
    }
  }, [axes]);

  const calculateProgress = () => (Object.values(axes).filter(a => a.filled).length / 5) * 100;
  const getProgressLabel = () => {
    const p = calculateProgress();
    if (p < 20) return "Découverte de votre besoin";
    if (p < 40) return "Analyse du contexte";
    if (p < 60) return "Définition de la stratégie";
    if (p < 80) return "Construction du plan d'action";
    return "Finalisation et validation";
  };

  const simulateIntelligence = (userInput: string) => {
    const input = userInput.toLowerCase();
    const hasVagueWords = vagueWords.some(word => input.includes(word));
    const hasConfidentWords = confidentWords.some(word => input.includes(word));

    setTimeout(() => {
      if (input === 'démarrer l\'assistant') {
        setShowWizard(true); setIsTyping(false); return;
      }
      
      // PROJECT DIFFUSION CHAT COMMANDS
      if (input.includes('comment se passe') || input.includes('diffusion')) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', type: 'dashboard',
          content: "Voici le tableau de bord instantané de votre diffusion en cours :",
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('accélérer') || input.includes('rythme')) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', type: 'validation',
          content: "Oui, je peux augmenter la fréquence de 30%. Je prévois +2 posts/semaine. Confirmez-vous ?",
          reformulation: "1. Augmentation de la fréquence de 30%.\n2. +2 posts supplémentaires par semaine.",
          verification: ["Attention: Cela pourrait diluer un peu l'engagement par post."],
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('promotion') || input.includes('-20%')) {
         setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', type: 'validation',
          content: "Je crée une campagne flash. 5 posts, 3 stories, 1 email. Prêt en 10 minutes. Je lance ?",
          reformulation: "1. Création campagne flash 'Promotion -20%'\n2. Assets: 5 posts, 3 stories, 1 email",
          verification: ["J'ai bien noté la promotion de -20%"],
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('presse') || input.includes('article')) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', 
          content: "Excellent ! Je crée un dispositif spécial : post de célébration + citation + lien. Je le programme dans 2h pour l'audience optimale.",
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('pas satisfait') || input.includes('déçu')) {
         setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', 
          content: "Je note. Pouvez-vous me dire ce qui ne vous convient pas ? Je m'améliore : visuel, texte, ton, timing ?",
          options: ["Le visuel n'est pas bon", "Le texte est hors sujet", "Le ton est trop sec"],
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('stop') || input.includes('problème')) {
         setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', 
          content: "Mode pause activé 🛑. Toutes les publications sont suspendues. Je garde le calendrier en attente. Dites-moi quand reprendre.",
          timestamp: new Date().toISOString()
        }]);
      } else if (hasConfidentWords || input === 'passer en autonomie') {
         setInteractionMode('autonomie');
         setTrustLevel(2);
         setMessages(prev => [...prev, {
            id: Date.now().toString(), role: 'system',
            content: "🚀 Mode Autonomie activé. Je prends les commandes. Déléguez-moi l'exécution.",
            timestamp: new Date().toISOString()
         }, {
            id: (Date.now() + 1).toString(), role: 'assistant', type: 'dashboard',
            content: "Détendez-vous, je m'occupe de tout comme un véritable community manager senior. Voici mon tableau de bord d'actions en temps réel.",
            timestamp: new Date().toISOString()
         }]);
      } else if ((hasVagueWords && input.includes('perdu')) || input === 'reprendre le contrôle') {
         setInteractionMode('guidage');
         setMessages(prev => [...prev, {
            id: Date.now().toString(), role: 'system',
            content: "🤝 Mode Guidage activé. Je vais vous accompagner étape par étape.",
            timestamp: new Date().toISOString()
         }, {
            id: (Date.now() + 1).toString(), role: 'assistant',
            content: "Je vois que vous hésitez ou que vous avez besoin d'accompagnement. C'est tout à fait normal ! \n\nPrenons 2 minutes. Si je devais résumer, que cherchez-vous en priorité ?",
            options: ["🎯 Notoriété (Plus de visibilité)", "💰 Ventes (Plus de clients)", "🤝 Communauté (Plus d'engagement)", "Démarrer l'assistant"],
            timestamp: new Date().toISOString()
         }]);
      } else if (hasVagueWords && !input.includes('validation')) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant',
          content: "C'est un excellent objectif ! Cependant, votre demande est un peu vague. Pour vous aider concrètement, j'ai besoin de comprendre les détails. Je peux vous guider étape par étape si vous le souhaitez.",
          options: ["Démarrer l'assistant", "Je précise moi-même", "Gérez tout à ma place"],
          coachNote: "Sans consigne spécifique, une IA (ou un humain) risque de viser à côté. Prendre 1 minute pour définir l'audience et le but permet de garantir les résultats.",
          timestamp: new Date().toISOString(),
        }]);
      } else if (input.includes('campagne') || input.includes('lancer') || input.includes('nouveau produit')) {
        setAxes(prev => ({ ...prev, objectif: { filled: true, value: 'Lancer un nouveau produit/campagne', label: prev.objectif.label } }));
        setMissingInfo(['Audience cible exacte', 'Budget/Moyens alloués', 'Plateformes privilégiées']);
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant',
          content: "Excellente intention ! Pour construire la meilleure stratégie de campagne, j'ai besoin de comprendre le cadre.\nPouvez-vous me préciser :\n1. Qui est le client idéal pour ce lancement ?\n2. Quel budget ou ressources y allouez-vous ?",
          coachNote: "Définir l'audience permet de choisir les bonnes plateformes et le bon ton sans gaspiller de budget.",
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('jeunes') || input.includes('18-25') || input.includes('budget')) {
        setAxes(prev => ({ ...prev, audience: { filled: true, value: 'Jeunes 18-25 ans', label: prev.audience.label }, moyens: { filled: true, value: 'Budget modéré', label: prev.moyens.label } }));
        setMissingInfo(['Contexte spécifique', 'Contraintes légales ou de ton']);
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant',
          content: "Merci, c'est très clair (Cible: 18-25 ans, moyens modérés). Je remarque cependant que vous comptez toucher cette cible avec un budget modéré. \n\nAvez-vous des contraintes spécifiques à respecter ? (Sujets tabous, charte stricte, etc.)",
          options: ["Aucune contrainte, soyez créatif !", "Charte très stricte, ton pro", "Budget revu à la hausse"],
          coachNote: "Les jeunes de 18-25 ans sont particulièrement difficiles à captiver. Privilégiez les contenus courts (snack content) !",
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('aucune contrainte') || input.includes('carte blanche') || input.includes('créatif')) {
        setAxes(prev => ({ ...prev, contraintes: { filled: true, value: 'Carte blanche, ton créatif autorisé', label: prev.contraintes.label }, contexte: { filled: true, value: 'Lancement audacieux', label: prev.contexte.label } }));
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', type: 'validation',
          content: "Parfait, nous avons tous les éléments ! Voici ce que je vous recommande...",
          reformulation: "1. Campagne de lancement audacieuse\n2. Cible: Jeunes de 18-25 ans (TikTok & Instagram Reels)\n3. Budget modéré (Guérilla Marketing)\n4. Ton très créatif (carte blanche).",
          verification: ["J'ai bien noté l'objectif de lancement", "Je prends en compte la cible jeune", "! Attention: Un budget réduit exigera des contenus viraux."],
          timestamp: new Date().toISOString()
        }]);
      } else if (input.includes('valider')) {
        if (interactionMode === 'autonomie') {
             setMessages(prev => [...prev, {
                id: Date.now().toString(), role: 'assistant',
                content: "Validé ! 🚀 Je mets à jour la stratégie et continue l'exécution en arrière-plan. Vous remarquerez les changements dans les prochains posts créés.",
                timestamp: new Date().toISOString()
             }]);
        } else {
             setMessages(prev => [...prev, {
                id: Date.now().toString(), role: 'assistant',
                content: "C'est parti ! 🚀 J'ai généré les scripts vidéo, préparé le calendrier de publication et set-up la structure de la campagne. Vous pouvez retrouver tout cela dans l'onglet Calendrier.",
                timestamp: new Date().toISOString()
             }]);
        }
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant',
          content: interactionMode === 'autonomie' ? "Je note cette consigne experte. J'ajuste ma stratégie de contenu en conséquence." : "Je comprends. Pour être tout à fait sûr de vous apporter la meilleure solution, pourriez-vous m'en dire plus sur le contexte de cette demande ? Qu'est-ce qui a fonctionné ou non par le passé ?",
          options: interactionMode === 'guidage' ? ["Démarrer l'assistant", "Je vous fais confiance pour gérer"] : undefined,
          timestamp: new Date().toISOString()
        }]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;
    if (text === "Démarrer l'assistant" || text === "Démarrer l'assistant complet") { setShowWizard(true); return; }

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: interactionMode === 'guidage' ? highlightVagueWords(text) : text, timestamp: new Date().toISOString() }]);
    setInputValue(''); setIsTyping(true);
    simulateIntelligence(text);
  };

  const handleWizardComplete = (data: any) => {
    setShowWizard(false);
    setAxes({
       objectif: { filled: !!data.objectif, value: data.objectif, label: 'Objectif (Pourquoi ?)' },
       contexte: { filled: !!data.ton, value: `Ton: ${data.ton}`, label: 'Contexte (Cadre)' },
       audience: { filled: !!data.audience, value: data.audience, label: 'Audience (Pour qui ?)' },
       moyens: { filled: !!data.budget, value: data.budget, label: 'Moyens (Ressources)' },
       contraintes: { filled: !!data.deadline, value: `Deadline: ${data.deadline}`, label: 'Contraintes (Limites)' }
    });
    setMessages(prev => [...prev, {
      id: Date.now().toString(), role: 'user',
      content: `J'ai rempli mes préférences: Objectif=${data.objectif}, Audience=${data.audience}, Plates-formes=${data.plateformes.join(',')}, Deadline=${data.deadline}`,
      timestamp: new Date().toISOString()
    }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
          id: Date.now().toString(), role: 'assistant', type: 'validation',
          content: "Merci pour ces précisions, grâce à l'assistant j'ai une vision très claire.",
          reformulation: `1. Objectif: ${data.objectif}\n2. Audience: ${data.audience}\n3. Plateformes: ${data.plateformes.join(', ')}\n4. Budget: ${data.budget}\n5. Deadline: ${data.deadline}`,
          verification: ["Toutes les informations sont collectées", "! Attention: la deadline nécessite de lancer la production très rapidement."],
          timestamp: new Date().toISOString()
        }]);
      setIsTyping(false);
    }, 1500);
  };

  const getTrafficColorClasses = () => trafficColor === 'green' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : trafficColor === 'orange' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : trafficColor === 'red' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';

  const TrustBadge = () => (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(level => (
          <div key={level} className={`h-1.5 flex-1 rounded-full ${level <= trustLevel ? 'bg-indigo-500' : 'bg-slate-700'}`} />
        ))}
      </div>
      <span className="text-[10px] text-slate-400 uppercase tracking-wider text-center">
        Niveau {trustLevel} : {trustLevel === 1 ? 'Découverte' : trustLevel === 2 ? 'Apprivoisement' : trustLevel === 3 ? 'Confiance' : 'Symbiose'}
      </span>
    </div>
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col xl:flex-row gap-6">
      <IAWizard isOpen={showWizard} onClose={() => setShowWizard(false)} onComplete={handleWizardComplete} />

      {/* LEFT COLUMN: Context or Autonomy Overview */}
      <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
        <div className={`border rounded-3xl p-6 backdrop-blur-xl flex-1 flex flex-col relative overflow-hidden transition-colors duration-500 ${interactionMode === 'guidage' ? 'bg-white/5 border-white/5' : 'bg-slate-900 border-indigo-500/20 shadow-lg shadow-indigo-500/10'}`}>
          {interactionMode === 'guidage' ? (
            <>
              <div className="absolute top-0 right-0 p-3 opacity-10"><BrainCircuit className="w-24 h-24" /></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white relative z-10">Ce que je sais</h2>
                <div className="text-xs font-bold text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-md">Score: {calculateProgress()}%</div>
              </div>
              
              <div className="space-y-4 flex-1 relative z-10">
                {Object.entries(axes).map(([key, data]) => (
                  <div key={key} className="flex gap-3">
                    <div className="mt-0.5">{data.filled ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-600" />}</div>
                    <div>
                      <p className={`text-sm font-medium ${data.filled ? 'text-white' : 'text-slate-400'}`}>{data.label}</p>
                      {data.filled ? <p className="text-xs text-slate-300 mt-1">{data.value}</p> : <p className="text-xs text-slate-500 italic mt-1">En attente de précision...</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
                <div className="flex justify-between text-xs font-medium mb-2"><span className="text-indigo-400">{getProgressLabel()}</span><span className="text-white">{calculateProgress()}%</span></div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${calculateProgress()}%` }} /></div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-0 right-0 p-3 opacity-5"><Rocket className="w-32 h-32 text-indigo-500" /></div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Rocket className="w-5 h-5 text-indigo-400"/> Mode Autonomie</h2>
              
              <div className="flex-1 space-y-6 relative z-10">
                <TrustBadge />
                
                <div className="space-y-3">
                   <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                     <span className="text-xs text-slate-400">Confiance IA</span>
                     <span className="text-sm font-bold text-emerald-400">94%</span>
                   </div>
                   <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                     <span className="text-xs text-slate-400">Décisions prises</span>
                     <span className="text-sm font-bold text-indigo-400">128</span>
                   </div>
                   <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                     <span className="text-xs text-slate-400">Temps économisé</span>
                     <span className="text-sm font-bold text-purple-400">47h</span>
                   </div>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">En ce moment</h3>
                   <div className="space-y-2">
                     <div className="flex gap-2 text-xs text-slate-300 items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0 animate-pulse" />
                       <p>Analyse de la performance de la campagne d'hier.</p>
                     </div>
                     <div className="flex gap-2 text-xs text-slate-300 items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0 animate-pulse" />
                       <p>Rédaction de 3 brouillons LinkedIn pour validation.</p>
                     </div>
                   </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CENTER COLUMN: Chat Area */}
      <div className={`flex-1 flex flex-col rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl transition-colors duration-500 ${interactionMode === 'guidage' ? 'bg-white/5 border border-white/5' : 'bg-slate-900 border border-indigo-500/20'}`}>
        <div className="p-4 border-b border-white/5 bg-slate-900/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full p-0.5 shadow-lg ${interactionMode === 'guidage' ? 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/20' : 'bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-indigo-500/20'}`}>
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                 {interactionMode === 'guidage' ? <Shield className="w-5 h-5 text-amber-400" /> : <Rocket className="w-5 h-5 text-indigo-400" />}
              </div>
            </div>
            <div>
              <h2 className="text-white font-bold flex items-center gap-2">
                {interactionMode === 'guidage' ? 'Consultant IA (Guidage)' : 'Pilote IA (Autonomie)'} 
                <Sparkles className={`w-3 h-3 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`} />
              </h2>
              <p className="text-xs text-slate-400 hidden md:block">
                {interactionMode === 'guidage' ? 'Avancez sereinement étape par étape.' : 'Je m\'occupe de l\'exécution. Vous supervisez.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
               onClick={() => {
                 setInteractionMode(prev => prev === 'guidage' ? 'autonomie' : 'guidage');
                 handleSend(interactionMode === 'guidage' ? 'Passer en autonomie' : 'Reprendre le contrôle');
               }} 
               className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${interactionMode === 'autonomie' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
            >
              {interactionMode === 'guidage' ? '🚀 Tout Déléguer' : '🤝 Reprendre le contrôle'}
            </button>
            {interactionMode === 'guidage' && (
              <>
                <button onClick={() => setIsCoachMode(!isCoachMode)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${isCoachMode ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                  <GraduationCap className="w-4 h-4" /> Mode Coach {isCoachMode ? 'ON' : 'OFF'}
                </button>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border ${getTrafficColorClasses()} transition-colors duration-300 hidden sm:flex`}>
                   <div className={`w-2 h-2 rounded-full ${trafficColor === 'green' ? 'bg-emerald-500 animate-pulse' : trafficColor === 'orange' ? 'bg-amber-500' : trafficColor === 'red' ? 'bg-red-500' : 'bg-indigo-400 animate-pulse'}`} />
                   {trafficMessage}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : message.role === 'system' ? 'justify-center' : 'justify-start'}`}>
              
              {message.role === 'system' ? (
                 <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-slate-400 my-4">
                   {message.content}
                 </div>
              ) : (
                <div className={`flex gap-3 max-w-[90%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-inner ${message.role === 'user' ? (interactionMode === 'guidage' ? 'bg-amber-600/20' : 'bg-indigo-600/20') : (interactionMode === 'guidage' ? 'bg-amber-500/20' : 'bg-indigo-500/20')}`}>
                    {message.role === 'user' ? <User className={`w-4 h-4 ${interactionMode === 'guidage' ? 'text-amber-300' : 'text-indigo-300'}`} /> : <Bot className={`w-4 h-4 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`} />}
                  </div>
                  <div className="space-y-3 w-full">
                    {message.type === 'validation' ? (
                       <div className={`bg-slate-800/80 p-5 rounded-3xl border shadow-xl shadow-black/20 w-full space-y-5 ${interactionMode === 'guidage' ? 'border-amber-500/30' : 'border-indigo-500/30'}`}>
                         <h3 className="text-white font-bold flex items-center gap-2"><Sparkles className={`w-5 h-5 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`}/> Validation requise</h3>
                         <p className="text-sm text-slate-300 mb-4">{message.content}</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                              <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2"><CheckCircle2 className={`w-4 h-4 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`}/>1. Reformulation</h4>
                              <p className="text-sm text-slate-300 whitespace-pre-wrap">{message.reformulation}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                              <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2"><AlertCircle className={`w-4 h-4 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`}/>2. Vérification</h4>
                              <ul className="space-y-2 text-sm">
                                {message.verification?.map((v, i) => (
                                  <li key={i} className="flex gap-2 text-slate-300">
                                    {v.startsWith('!') ? <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> : <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/>}
                                    <span>{v.replace('!', '')}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                         </div>
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/5 border-t-indigo-500/30 text-center">
                            <h4 className="font-bold text-white mb-4 text-sm ">3. Quelle est votre décision ?</h4>
                            <div className="flex flex-wrap justify-center gap-3">
                              <button onClick={() => handleSend("✅ Valider et Lancer")} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-transform hover:scale-105">✅ Valider et lancer</button>
                              <button onClick={() => handleSend("✏️ Modifier")} className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium text-sm transition-transform hover:scale-105">✏️ Modifier</button>
                              <button onClick={() => handleSend("🔄 Alternative")} className={`px-5 py-2.5 hover:bg-opacity-80 text-white rounded-xl font-medium text-sm transition-transform hover:scale-105 ${interactionMode==='guidage' ? 'bg-amber-600' : 'bg-indigo-600'}`}>🔄 Alternative</button>
                            </div>
                         </div>
                       </div>
                    ) : message.type === 'dashboard' ? (
                       <div className="bg-slate-800/80 p-5 rounded-3xl border border-indigo-500/30 shadow-xl shadow-black/20 w-full space-y-4">
                           <p className="text-sm text-slate-300 mb-4">{message.content}</p>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                 <div className="flex items-center gap-2 text-indigo-400 mb-2"><Activity className="w-4 h-4"/> <span className="font-bold text-sm">Décisions d'Aujourd'hui</span></div>
                                 <ul className="space-y-3 mt-3">
                                   <li className="text-xs text-slate-300 border-l-2 border-indigo-500 pl-2">
                                     <span className="text-slate-500 mr-2">08:32</span> Ajustement horaire post → engagement +23% attendu
                                   </li>
                                   <li className="text-xs text-slate-300 border-l-2 border-amber-500 pl-2">
                                     <span className="text-slate-500 mr-2">12:15</span> Report publication → actualité sensible détectée
                                   </li>
                                   <li className="text-xs text-slate-300 border-l-2 border-emerald-500 pl-2">
                                     <span className="text-slate-500 mr-2">16:45</span> Boost post performant → reach x3 prévu
                                   </li>
                                 </ul>
                              </div>
                              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                 <div className="flex items-center gap-2 text-amber-400 mb-2"><Zap className="w-4 h-4"/> <span className="font-bold text-sm">Alertes & Escalades</span></div>
                                 <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-2">
                                    <p className="text-xs font-bold text-red-400">⚠️ Pic de commentaires négatifs</p>
                                    <button className="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white">Voir la situation</button>
                                 </div>
                                 <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <p className="text-xs font-bold text-indigo-400">🔔 Opportunité partenariat</p>
                                    <button className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-xs text-white">Valider le DM</button>
                                 </div>
                              </div>
                           </div>
                       </div>
                    ) : (
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap shadow-xl ${
                        message.role === 'user' 
                          ? (interactionMode === 'guidage' ? 'bg-amber-600 text-white rounded-tr-sm' : 'bg-indigo-600 text-white rounded-tr-sm') 
                          : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-white/5'
                      }`}>{message.content}</div>
                    )}
                    
                    {isCoachMode && message.coachNote && message.role === 'assistant' && interactionMode === 'guidage' && (
                      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-amber-900/40 border border-amber-500/40 p-4 rounded-2xl flex gap-3 items-start shadow-lg">
                         <GraduationCap className="w-6 h-6 text-amber-400 shrink-0" />
                         <div>
                           <p className="text-sm font-bold text-amber-200 mb-1">Coach IA</p>
                           <p className="text-sm text-amber-200/80 leading-relaxed">{message.coachNote}</p>
                         </div>
                      </motion.div>
                    )}

                    {message.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.options.map((opt, i) => (
                          <button key={i} onClick={() => handleSend(opt)} className={`px-4 py-2 ${opt.includes('assistant') ? 'bg-amber-600 hover:bg-amber-500 text-white border border-amber-400' : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'} rounded-xl text-xs font-medium transition-all text-left`}>{opt}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${interactionMode === 'guidage' ? 'bg-amber-500/20' : 'bg-indigo-500/20'}`}>
                  <Bot className={`w-4 h-4 ${interactionMode === 'guidage' ? 'text-amber-400' : 'text-indigo-400'}`} />
                </div>
                <div className="p-4 rounded-3xl bg-slate-800 text-slate-200 rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${interactionMode === 'guidage' ? 'bg-amber-400' : 'bg-indigo-400'}`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${interactionMode === 'guidage' ? 'bg-amber-400' : 'bg-indigo-400'}`} style={{ animationDelay: '150ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${interactionMode === 'guidage' ? 'bg-amber-400' : 'bg-indigo-400'}`} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/5 bg-slate-900/80 backdrop-blur-md">
           <div className="flex gap-2">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 text-slate-400 shrink-0"><Mic className="w-5 h-5" /></button>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={interactionMode === 'guidage' ? "Décrivez votre besoin (ex: aider moi, je suis perdu...)" : "Donnez vos instructions au pilote..."} className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-colors ${interactionMode === 'guidage' ? 'focus:border-amber-500' : 'focus:border-indigo-500'}`} />
            <button onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping} className={`p-3 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shrink-0 ${interactionMode === 'guidage' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'}`}><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: What's Missing (Only in Guidage mode) */}
      {interactionMode === 'guidage' && (
        <div className="w-full xl:w-64 flex flex-col gap-6 shrink-0">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-amber-500" /> Ce qu'il manque</h2>
            {missingInfo.length > 0 ? (
              <div className="space-y-3 flex-1">
                {missingInfo.map((info, i) => (
                  <div key={i} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold leading-none shrink-0 mt-0.5">{i+1}</span>
                    <div>
                      <p className="text-sm font-medium text-amber-200">{info}</p>
                      <button onClick={() => setInputValue(`Concernant ${info.toLowerCase()}: `)} className="text-xs text-amber-400 hover:text-amber-300 mt-1 flex items-center gap-1 font-medium">Préciser <ChevronRight className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                 <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
                 <p className="text-sm font-medium text-emerald-400">Toutes les informations nécessaires sont collectées.</p>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-white/5">
               <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-200 leading-relaxed"><Info className="w-4 h-4 text-amber-400 mb-2" />L'IA bloque l'exécution tant que le besoin n'est pas qualifié.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
