import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, Smartphone, ShieldCheck, Loader2, CheckCircle2, Landmark } from "lucide-react";
import { cn } from "../lib/utils";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  serviceName: string;
}

const PAYMENT_METHODS = [
  { id: 'card', name: 'Carte Bancaire', icon: CreditCard },
  { id: 'momo', name: 'MTN MoMo', icon: Smartphone },
  { id: 'om', name: 'Orange Money', icon: Smartphone },
  { id: 'bank', name: 'Virement', icon: Landmark },
];

export default function PaymentModal({ isOpen, onClose, amount: initialAmount, serviceName: initialService }: PaymentModalProps) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(initialAmount || 0);
  const [serviceName, setServiceName] = useState(initialService || "");

  const SERVICES_LIST = [
    "Diagnostic Digital Premium",
    "Formation sur mesure",
    "Développement Web/Mobile",
    "Audit de sécurité",
    "Conseil stratégique",
    "Autre service"
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-primary">
            <X size={24} />
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Détails de la commande</h3>
                  <p className="text-slate-500">Précisez le service et le montant à régler</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Service sollicité</label>
                    <select 
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent text-sm"
                    >
                      <option value="" disabled>Choisir un service...</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Montant à imputer (€)</label>
                    <input 
                      type="number" 
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-bold text-primary"
                    />
                  </div>
                </div>

                <button 
                  disabled={!serviceName || !amount}
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Continuer
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Paiement Sécurisé</h3>
                  <p className="text-slate-500">{serviceName}</p>
                  <div className="mt-4 text-4xl font-display font-bold text-accent">{amount}€</div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Mode de paiement</p>
                  <div className="grid grid-cols-2 gap-4">
                    {PAYMENT_METHODS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={cn(
                          "p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all",
                          method === m.id 
                            ? "border-accent bg-accent/5 text-accent" 
                            : "border-slate-200 text-slate-400 hover:border-accent/30"
                        )}
                      >
                        <m.icon size={24} />
                        <span className="text-xs font-bold">{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-200 py-4 rounded-full font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Retour
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-primary text-white py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-6 text-primary">Détails du paiement</h3>
                
                {method === 'card' ? (
                  <div className="space-y-4 mb-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Numéro de carte</label>
                      <input type="text" placeholder="**** **** **** ****" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Expiration</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">CVC</label>
                        <input type="text" placeholder="***" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                  </div>
                ) : method === 'bank' ? (
                  <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Informations Bancaires</p>
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">IBAN</p>
                      <p className="text-sm font-mono font-bold text-primary">CM21 10001 00001 12345678901 23</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">BIC/SWIFT</p>
                      <p className="text-sm font-mono font-bold text-primary">PRODCMMX</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Numéro de téléphone</label>
                      <input type="text" placeholder="+237 6XX XX XX XX" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent" />
                    </div>
                    <p className="text-xs text-slate-500 italic">Une demande de validation USSD sera envoyée sur votre mobile.</p>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-8 text-slate-400">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Paiement 100% sécurisé</span>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 border border-slate-200 py-4 rounded-full font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Retour
                  </button>
                  <button 
                    disabled={loading}
                    onClick={handlePayment}
                    className="flex-[2] bg-accent text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : `Payer ${amount}€`}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">Paiement Réussi !</h3>
                <p className="text-slate-500 mb-8">
                  Votre transaction pour <strong>{serviceName}</strong> a été confirmée. Vous recevrez un reçu par email sous peu.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-primary text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-primary/20"
                >
                  Terminer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// MJ Commit
