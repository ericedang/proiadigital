import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jean-Marcellin Nkou",
    role: "CEO, TechCorp Douala",
    content: "L'accompagnement de Pro Digital a été déterminant dans notre transformation digitale. Leur expertise technique et stratégique est inégalée.",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Marie-Claire Engolo",
    role: "Directrice Innovation, Retail CEMAC",
    content: "Une équipe à l'écoute qui comprend réellement les enjeux du marché camerounais. Les résultats sur nos processus internes sont impressionnants.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf08c?auto=format&fit=crop&q=80&w=100"
  },
  {
    name: "Marc Ewane",
    role: "Fondateur, Startup Vision",
    content: "Plus qu'un cabinet de conseil, un véritable partenaire stratégique local. Ils nous ont aidés à bâtir une infrastructure solide pour le futur en Afrique centrale.",
    image: "https://images.unsplash.com/photo-1605993439219-9d09d20b1fc2?auto=format&fit=crop&q=80&w=100"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">Ils nous font confiance</h2>
          <div className="w-20 h-1.5 bg-accent rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-transparent p-10 rounded-[2.5rem] border border-slate-200 relative"
            >
              <Quote className="text-accent/20 absolute top-8 right-8" size={40} />
              <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.role}</p>
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
