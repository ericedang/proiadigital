import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Insights() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // If no articles in Firestore, use defaults
      if (docs.length === 0) {
        setArticles([
          {
            category: "Économie",
            title: "Le développement économique de l'Afrique : Enjeux et perspectives pour 2026",
            date: "10 Avril 2026",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
          },
          {
            category: "Régional",
            title: "Zone CEMAC : Vers une intégration par le partage des savoirs régionaux",
            date: "05 Avril 2026",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
          },
          {
            category: "Cameroun",
            title: "Le modèle camerounais : Analyse d'un développement basé sur la connaissance",
            date: "28 Mars 2026",
            image: "https://images.unsplash.com/photo-1543336302-602ee50f9ffb?auto=format&fit=crop&q=80&w=800"
          }
        ]);
      } else {
        setArticles(docs);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section id="insights" className="py-20 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">Insights & Expertise</h2>
            <p className="text-slate-500 text-lg">
              Nos dernières analyses sur l'impact de la transformation digitale et des technologies émergentes sur le monde des affaires.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            Voir tous les articles
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <a href={`#article-${i}`} className="block relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <img 
                  src={a.image} 
                  alt={a.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                    {a.category}
                  </span>
                </div>
              </a>
              <p className="text-xs font-bold text-slate-400 mb-3">{a.date}</p>
              <a href={`#article-${i}`}>
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                  {a.title}
                </h3>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// MJ Commit
