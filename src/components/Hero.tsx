import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2070" 
          alt="Équipe professionnelle camerounaise" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/85 backdrop-blur-[1px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl relative z-10 px-6 text-center"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 mb-6 border border-white/20 rounded-none text-xs font-bold tracking-widest text-white uppercase bg-accent/20 backdrop-blur-md"
        >
          Expertise & Savoir Africain
        </motion.span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight text-white uppercase">
          L'Intelligence <span className="text-accent">Collective</span> au service de votre <span className="text-accent">Croissance</span>
        </h1>

        <div className="max-w-3xl mx-auto mb-10">
          <p className={`text-lg md:text-xl text-slate-300 leading-relaxed font-medium transition-all duration-500 ${isExpanded ? '' : 'line-clamp-2'}`}>
            Le développement est basé sur la connaissance et la pensée. Nous explorons les savoirs régionaux de la zone CEMAC et les leviers du développement économique de l'Afrique pour propulser votre structure vers l'excellence opérationnelle et stratégique.
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-accent text-xs font-black uppercase tracking-widest flex items-center gap-2 mx-auto hover:underline"
          >
            {isExpanded ? 'Réduire' : 'Lire la suite'}
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-8 border-l-8 border-accent max-w-2xl mx-auto mb-12 text-left">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Besoin d'un accompagnement expert ?</h3>
          <p className="text-slate-300 text-sm">Nos experts vous répondent dans les meilleurs délais pour transformer vos ambitions en résultats concrets et durables.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onOpenBooking}
            className="border-2 border-accent text-accent px-10 py-4 rounded-none text-sm font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform active:scale-95"
          >
            Commander ou réserver
          </button>
          <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 rounded-none text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center">
            Nos Domaines d'Expertise
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// MJ Commit
