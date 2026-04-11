import { motion } from 'motion/react';
import { Globe, BookOpen, Lightbulb, Calculator, Share2, Briefcase, GraduationCap, Users2, BarChart3, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const expertiseAreas = [
  { id: 'p3', title: 'Formation', desc: 'Devenez le leader de demain. Maîtrisez les outils qui transforment les industries et pilotez vos projets avec assurance.', icon: GraduationCap, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
  { id: 'p40', title: 'Séminaires & Ateliers', desc: 'Inspirez l\'excellence collective. Résolvez vos problématiques complexes par la co-création et l\'intelligence partagée.', icon: Users2, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p11', title: 'Web & Digital', desc: 'Ne soyez plus invisible. Attirez vos partenaires avec une vitrine digitale d\'excellence.', icon: Globe, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', title: 'Gestion & Comptabilité', desc: 'Prenez des décisions basées sur des chiffres réels. Maîtrisez votre santé financière.', icon: BarChart3, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', title: 'Marketing & Réseaux Sociaux', desc: 'Créez un lien indéfectible avec votre audience. Transformez vos abonnés en ambassadeurs passionnés.', icon: Share2, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
  { id: 'p16', title: 'Audit & Conseil', desc: 'Identifiez vos leviers de croissance. Obtenez une feuille de route claire.', icon: ShieldCheck, image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800' },
  { id: 'p21', title: 'Événementiel', desc: 'Marquez les esprits. Confiez-nous vos événements pour une exécution sans faille.', icon: Briefcase, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
  { id: 'p7', title: 'Design & Branding', desc: 'Une identité qui impose le respect. Démarquez-vous avec un design unique.', icon: Lightbulb, image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde3?auto=format&fit=crop&q=80&w=800' },
  { id: 'p25', title: 'Automatisation', desc: 'Gagnez des heures de travail chaque semaine. Libérez votre potentiel en automatisant vos tâches répétitives.', icon: Calculator, image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p37', title: 'Savoir & Développement', desc: 'Réduisez l\'incertitude. Obtenez des données terrain précises pour réussir votre implantation sur le continent.', icon: BookOpen, image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800' },
];

export default function ExpertisePage() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 border border-accent/20 text-xs font-bold tracking-widest text-accent uppercase bg-accent/5">
            Accompagnement 360°
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 leading-tight">
            Nos Domaines <span className="text-accent">d'Expertise</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
            Un accompagnement complet pour la digitalisation et le développement de votre structure, ancré dans les réalités africaines.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white border border-slate-100 hover:border-accent hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-colors" />
                <div className="absolute bottom-0 left-0 bg-accent p-3">
                  <s.icon size={20} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-tight">{s.title}</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{s.desc}</p>
                <button
                  onClick={() => navigate(`/boutique?highlight=${s.id}`)}
                  className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Commander ce service
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MJ Commit
