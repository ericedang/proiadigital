import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Intelligence Artificielle",
    message: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: Timestamp.now(),
        status: "unread"
      });
      setLoading(false);
      setSent(true);
    } catch (error) {
      console.error("Error saving message:", error);
      setLoading(false);
      alert("Une erreur est survenue lors de l'envoi du message.");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-primary leading-tight">
              Prêt à transformer votre <span className="text-accent">business</span> ?
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Remplissez ce formulaire pour une première analyse gratuite de vos besoins. Nos experts vous recontacteront sous 24h.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-primary">Audit gratuit de 30 minutes</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-primary">Plan d'action personnalisé</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-primary">Accès à notre réseau d'experts</p>
              </div>
            </div>
          </div>

          <div className="bg-transparent p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Message Reçu !</h3>
                <p className="text-slate-500 mb-8">
                  Merci de nous avoir contactés. Un expert Cabinet ProDigital vous répondra très prochainement.
                </p>
                <button 
                  onClick={() => setSent(false)}
                  className="text-accent font-bold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Nom complet</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent transition-colors text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email professionnel</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jean@entreprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent transition-colors text-slate-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Sujet</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent transition-colors text-slate-900 appearance-none cursor-pointer"
                  >
                    <option>Intelligence Artificielle</option>
                    <option>Transformation Digitale</option>
                    <option>Communication Stratégique</option>
                    <option>Gouvernance & Organisation</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Décrivez brièvement votre projet..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent transition-colors text-slate-900 resize-none"
                  />
                </div>
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
                >
                  {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                      Envoyer ma demande
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// MJ Commit
