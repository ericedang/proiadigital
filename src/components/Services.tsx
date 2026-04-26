import { motion } from "motion/react";
import { Globe, BookOpen, TrendingUp, Lightbulb, Map, ShieldCheck, Calculator, Share2, Briefcase, GraduationCap, Users2 } from "lucide-react";
import { cn } from "../lib/utils";

const services = [
  {
    id: 'p3',
    title: "Formation",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    desc: "Devenez le leader de demain. Maîtrisez les outils qui transforment les industries et pilotez vos projets avec assurance.",
    details: [
      { label: "Problème", content: "Manque de compétences internes pour piloter la transformation digitale.", color: "text-slate-400" },
      { label: "Solution", content: "Curriculum adapté aux réalités du marché africain et de votre secteur.", color: "text-accent" },
      { label: "Résultat", content: "Équipes autonomes, expertes et prêtes à relever les défis de demain.", color: "text-primary" }
    ]
  },
  {
    id: 'p40',
    title: "Séminaires & Ateliers",
    icon: Users2,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf08c?auto=format&fit=crop&q=80&w=800",
    desc: "Inspirez l'excellence collective. Résolvez vos problématiques complexes par la co-création et l'intelligence partagée.",
    details: [
      { label: "Problème", content: "Besoin de cohésion et de réflexion stratégique collective.", color: "text-slate-400" },
      { label: "Solution", content: "Animation d'ateliers design thinking et séminaires de direction.", color: "text-accent" },
      { label: "Résultat", content: "Feuille de route claire et engagement total de vos collaborateurs.", color: "text-primary" }
    ]
  },
  {
    id: 'p11',
    title: "Web & Applications",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    desc: "Ne soyez plus invisible. Attirez vos futurs partenaires avec une vitrine digitale qui reflète votre excellence.",
    details: [
      { label: "Problème", content: "Absence de présence en ligne ou outils numériques obsolètes.", color: "text-slate-400" },
      { label: "Solution", content: "Développement full-stack moderne et design UX/UI intuitif.", color: "text-accent" },
      { label: "Résultat", content: "Visibilité accrue et conversion optimisée de vos visiteurs.", color: "text-primary" }
    ]
  },
  {
    id: 'p2',
    title: "Gestion & Comptabilité",
    icon: Calculator,
    image: "https://images.unsplash.com/photo-1573167101669-476636b96ea6?auto=format&fit=crop&q=80&w=800",
    desc: "Prenez des décisions basées sur des chiffres réels. Maîtrisez votre santé financière pour une croissance sereine.",
    details: [
      { label: "Problème", content: "Complexité de la gestion comptable et manque de visibilité financière.", color: "text-slate-400" },
      { label: "Solution", content: "Expertise en gestion et support aux processus comptables subsidiaires.", color: "text-accent" },
      { label: "Résultat", content: "États financiers précis et pilotage stratégique de votre activité.", color: "text-primary" }
    ]
  },
  {
    id: 'p6',
    title: "Marketing & Réseaux Sociaux",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1573165231977-3f0e27806045?auto=format&fit=crop&q=80&w=800",
    desc: "Créez un lien indéfectible avec votre audience. Transformez vos abonnés en ambassadeurs passionnés.",
    details: [
      { label: "Problème", content: "Faible engagement et manque de stratégie de contenu cohérente.", color: "text-slate-400" },
      { label: "Solution", content: "Génération et publication de contenus ciblés et gestion de communauté.", color: "text-accent" },
      { label: "Résultat", content: "Notoriété renforcée et communauté active au service de votre marque.", color: "text-primary" }
    ]
  },
  {
    id: 'p21',
    title: "Organisation d'Événements",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1520607162513-32243d463870?auto=format&fit=crop&q=80&w=800",
    desc: "Marquez les esprits. Confiez-nous vos événements pour une exécution sans faille qui valorise votre image.",
    details: [
      { label: "Problème", content: "Difficultés de coordination et manque d'outils digitaux événementiels.", color: "text-slate-400" },
      { label: "Solution", content: "Digitalisation complète et pilotage de projet événementiel rigoureux.", color: "text-accent" },
      { label: "Résultat", content: "Événements fluides, modernes et impact durable sur vos invités.", color: "text-primary" }
    ]
  },
  {
    id: 'p25',
    title: "Automatisation des Processus",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1573164574048-f968d7ee9f20?auto=format&fit=crop&q=80&w=800",
    desc: "Gagnez des heures de travail chaque semaine. Libérez votre potentiel en automatisant vos tâches répétitives.",
    details: [
      { label: "Problème", content: "Tâches répétitives et perte de temps opérationnel.", color: "text-slate-400" },
      { label: "Solution", content: "Mise en place de workflows automatisés et intégration d'outils métier.", color: "text-accent" },
      { label: "Résultat", content: "Gain de productivité massif et réduction drastique des erreurs.", color: "text-primary" }
    ]
  },
  {
    id: 'p37',
    title: "Savoir & Développement",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    desc: "Réduisez l'incertitude. Obtenez des données terrain précises pour réussir votre implantation sur le continent.",
    details: [
      { label: "Problème", content: "Fragmentation des connaissances et modèles de développement inadaptés.", color: "text-slate-400" },
      { label: "Solution", content: "Études approfondies et promotion de la pensée critique africaine.", color: "text-accent" },
      { label: "Résultat", content: "Développement ancré dans les réalités locales et succès durable.", color: "text-primary" }
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-slate-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">Nos Domaines d'Expertise</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">
            Un accompagnement 360° pour la digitalisation et le développement de votre structure.
          </p>
          <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col bg-transparent rounded-none overflow-hidden border-b-4 border-transparent hover:border-accent hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-0 left-0 bg-accent p-4">
                  <s.icon size={24} className="text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tight">{s.title}</h3>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                  {s.desc}
                </p>

                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-shop', { detail: { productId: s.id } }))}
                  className="w-full py-3 mb-8 bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Commander ce service
                </button>

                <div className="mt-auto space-y-6 pt-6 border-t border-slate-100">
                  <ul className="space-y-4">
                    {s.details.map((detail, idx) => (
                      <li key={idx} className="flex flex-col">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", 
                          detail.label === "Solution" ? "text-white bg-accent w-fit px-2" : "text-slate-400")}>
                          {detail.label}
                        </span>
                        <span className="text-sm text-primary font-bold leading-snug">
                          {detail.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MJ Commit
