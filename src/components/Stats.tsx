import { motion } from "motion/react";
import { BarChart3, Users, Globe, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Études Publiées", value: "200+", icon: BarChart3 },
  { label: "Experts Partenaires", value: "50+", icon: Users },
  { label: "Pays d'Analyse", value: "15", icon: Globe },
  { label: "Savoirs Documentés", value: "100%", icon: ShieldCheck },
];

export default function Stats() {
  return (
    <section className="py-16 px-6 bg-primary text-white overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-accent">
                <s.icon size={24} />
              </div>
              <p className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">
                {s.value}
              </p>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// MJ Commit
