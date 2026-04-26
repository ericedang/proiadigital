import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Target, Users, Share2, MessageCircle, Calendar, Wallet } from 'lucide-react';

interface IAWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function IAWizard({ isOpen, onClose, onComplete }: IAWizardProps) {
  const [step, setStep] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [data, setData] = useState({ objectif: '', audience: '', plateformes: [] as string[], ton: 50, deadline: '', budget: '' });

  const nextStep = () => {
    setIsThinking(true);
    setTimeout(() => { setIsThinking(false); setStep(s => s + 1); }, 600);
  };
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const togglePlatform = (p: string) => {
    setData(prev => ({
      ...prev, plateformes: prev.plateformes.includes(p) ? prev.plateformes.filter(x => x !== p) : [...prev.plateformes, p]
    }));
  };

  useEffect(() => { if (isOpen) setStep(0); }, [isOpen]);

  const stepsCount = 8;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
          
          <motion.div initial={{opacity: 0, scale: 0.95, y: 20}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.95, y: 20}}
            className="relative w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-white/10 bg-indigo-900/20">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">Wizard Intelligent</span>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">Quitter</button>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-indigo-500" initial={{ width: 0 }} animate={{ width: `${(step / (stepsCount - 1)) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>

            <div className="p-8 min-h-[350px] flex flex-col justify-center relative">
              {isThinking ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    {step === 0 && (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><Sparkles className="w-10 h-10 text-indigo-400" /></div>
                        <h2 className="text-2xl font-bold text-white mb-3">Je vois que vous avez un projet en tête.</h2>
                        <p className="text-slate-300 text-lg">Laissez-moi vous guider pas à pas. Je ne présuppose rien.</p>
                      </div>
                    )}
                    {step === 1 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-4">1. Quel est votre objectif principal ?</h2>
                        <div className="grid grid-cols-2 gap-3">
                          {['Augmenter la notoriété', 'Générer des leads', 'Fidéliser la communauté', 'Vendre un produit'].map(opt => (
                            <button key={opt} onClick={() => { setData({...data, objectif: opt}); nextStep(); }} className={`p-4 rounded-xl text-left border ${data.objectif === opt ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300'}`}>{opt}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-4">2. Qui voulez-vous atteindre ?</h2>
                        <div className="grid grid-cols-2 gap-3">
                          {['Jeunes (18-25)', 'Professionnels (B2B)', 'Familles / Parents', 'Grand public'].map(opt => (
                           <button key={opt} onClick={() => { setData({...data, audience: opt}); nextStep(); }} className={`p-4 rounded-xl text-left border ${data.audience === opt ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300'}`}>{opt}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-4">3. Sur quelles plateformes ?</h2>
                        <div className="flex flex-wrap gap-3">
                          {['LinkedIn', 'Instagram', 'TikTok', 'X', 'Facebook'].map(opt => (
                            <button key={opt} onClick={() => togglePlatform(opt)} className={`px-5 py-3 rounded-xl border ${data.plateformes.includes(opt) ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300'}`}>{opt}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 4 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-6">4. Quel ton adopter ?</h2>
                        <input type="range" min="0" max="100" value={data.ton} onChange={(e) => setData({...data, ton: parseInt(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg accent-indigo-500 cursor-pointer" />
                         <div className="flex justify-between mt-2 text-sm"><span className="text-slate-400">Pro</span><span className="text-slate-400">Décontracté</span></div>
                      </div>
                    )}
                    {step === 5 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-4">5. Deadline ?</h2>
                        <input type="date" value={data.deadline} onChange={(e) => setData({...data, deadline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white style-date-input" />
                      </div>
                    )}
                     {step === 6 && (
                      <div>
                        <h2 className="text-xl font-bold text-white mb-4">6. Budget ?</h2>
                         <div className="grid grid-cols-2 gap-3 mb-4">
                          {['Organique (0€)', '< 500€', '500€ - 2000€', 'Sur mesure'].map(opt => (
                            <button key={opt} onClick={() => { setData({...data, budget: opt}); nextStep(); }} className={`p-4 rounded-xl text-left border ${data.budget === opt ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300'}`}>{opt}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 7 && (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-emerald-400" /></div>
                        <h2 className="text-2xl font-bold text-white mb-2">J'ai tout ce qu'il me faut.</h2>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-900 flex justify-between items-center">
              <button onClick={prevStep} disabled={step === 0 || step === stepsCount - 1} className="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-0">Retour</button>
              {step === 0 ? <button onClick={nextStep} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl">Démarrer</button>
               : step === stepsCount - 1 ? <button onClick={() => onComplete(data)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl">Valider et envoyer</button>
               : <button onClick={nextStep} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl">Continuer</button>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
