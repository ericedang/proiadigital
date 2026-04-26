import { useState } from 'react';
import { motion } from 'motion/react';
import { useSocial, Project } from './store';
import { Link } from 'react-router-dom';
import { Users, Bot, Zap, Clock, CheckCircle, Activity, Plus } from 'lucide-react';

export default function ProjectsList() {
  const { projects } = useSocial();
  
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'En cours': return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20';
      case 'Planifié': return 'text-blue-400 bg-blue-400/10 border-blue-500/20';
      case 'Terminé': return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
      case 'En pause': return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes Projets</h1>
          <p className="text-slate-400 mt-2">Gérez vos campagnes de diffusion et l'assistance de l'IA.</p>
        </div>
        <Link to="/social/onboarding" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all outline-none font-medium">
          <Plus className="w-5 h-5" />
          <span>Nouveau Projet</span>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} to={`/social/projects/${project.id}`} className="block group outline-none">
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm relative overflow-hidden transition-all group-hover:bg-white/10 group-hover:border-purple-500/30"
            >
              {/* Autonomy Badge */}
              <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 border-b border-l border-white/10 rounded-bl-xl text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                {project.autonomyLevel === 3 ? 'FULL AUTO' : project.autonomyLevel === 2 ? 'SEMI-AUTO' : project.autonomyLevel === 1 ? 'ASSISTÉ' : 'HUMAIN'}
              </div>

              <div className="flex flex-col h-full gap-4 pt-2">
                <div>
                  <div className={`inline-flex px-2 py-1 rounded-md border text-xs font-bold mb-3 ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{project.name}</h3>
                </div>

                <div className="bg-[#0B0F19]/50 rounded-xl p-4 border border-white/5 text-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phase Actuelle</span>
                    <span className="font-semibold text-white">{project.phaseName} ({project.phase}/{project.totalPhases})</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-purple-500 to-amber-500 h-1.5 rounded-full" style={{ width: `${(project.phase / project.totalPhases) * 100}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div>
                    <span className="text-xs text-slate-500 block">Jours écoulés</span>
                    <span className="text-xl font-bold font-mono">{project.durationDays}j</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Reach Global</span>
                    <span className="text-xl font-bold font-mono">{project.reach}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Contenus</span>
                    <span className="text-xl font-bold font-mono text-purple-400">{project.contentCreated}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Conversions</span>
                    <span className="text-xl font-bold font-mono text-amber-400">{project.conversion}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
