import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const defaultArticles = [
  {
    category: 'Économie',
    title: "Le développement économique de l'Afrique : Enjeux et perspectives pour 2026",
    date: '10 Avril 2026',
    image: 'https://picsum.photos/seed/africa-economy/800/600',
  },
  {
    category: 'Régional',
    title: 'Zone CEMAC : Vers une intégration par le partage des savoirs régionaux',
    date: '05 Avril 2026',
    image: 'https://picsum.photos/seed/cemac/800/600',
  },
  {
    category: 'Cameroun',
    title: "Le modèle camerounais : Analyse d'un développement basé sur la connaissance",
    date: '28 Mars 2026',
    image: 'https://picsum.photos/seed/cameroon-dev/800/600',
  },
];

export default function InsightsPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    try {
      const q = query(collection(db, 'articles'), orderBy('timestamp', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setArticles(docs.length > 0 ? docs : defaultArticles);
      }, () => {
        // Firestore error — use defaults
        setArticles(defaultArticles);
      });
      return () => unsub();
    } catch {
      setArticles(defaultArticles);
    }
  }, []);

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
            Analyses & Publications
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 leading-tight">
            Insights & <span className="text-accent">Expertise</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">
            Nos dernières analyses sur le développement africain, les savoirs régionaux et la transformation digitale.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
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
              </div>
              <p className="text-xs font-bold text-slate-400 mb-3">{a.date}</p>
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                {a.title}
              </h3>
              {a.content && (
                <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3">{a.content}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// MJ Commit
