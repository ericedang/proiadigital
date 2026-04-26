import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial, Project } from './store';
import { 
  ArrowLeft, Activity, Target, MessageSquare, Bot, Plus, Pause, 
  Settings, CheckCircle2, AlertCircle, BarChart3, Users, Zap, Image as ImageIcon
} from 'lucide-react';

export default function ProjectControlCenter() {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject } = useSocial();
  const project = projects.find(p => p.id === id);
  const [autonomyLevel, setAutonomyLevel] = useState<number>(project?.autonomyLevel || 1);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'studio'>('dashboard');

  if (!project) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Projet introuvable.</p>
        <Link to="/social/projects" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">Retour aux projets</Link>
      </div>
    );
  }

  const handleAutonomyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(e.target.value);
    setAutonomyLevel(level);
    updateProject(project.id, { autonomyLevel: level as Project['autonomyLevel'] });
  };

  const togglePause = () => {
    const newStatus = project.status === 'En pause' ? 'En cours' : 'En pause';
    updateProject(project.id, { status: newStatus as Project['status'] });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-start gap-4">
          <Link to="/social/projects" className="mt-1 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors outline-none block">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <span className={`px-2 py-1 text-xs font-bold rounded border ${
                project.status === 'En cours' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                project.status === 'Terminé' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                project.status === 'En pause' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {project.status.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-400">Phase {project.phase}/{project.totalPhases} : {project.phaseName} • {project.durationDays} Jours de diffusion</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex p-1 bg-white/5 rounded-xl">
             <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Vue Générale</button>
             <button onClick={() => setActiveTab('studio')} className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${activeTab === 'studio' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Studio Créatif</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={togglePause} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
              <Pause className="w-4 h-4" />
              <span>{project.status === 'En pause' ? 'Reprendre' : 'Mettre en pause'}</span>
            </button>
            <Link to="/social/ai-chat" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all font-medium flex items-center gap-2 outline-none">
              <Bot className="w-4 h-4" />
              <span>Chat IA</span>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Column: IA Control & Timeline */}
            <div className="lg:col-span-1 space-y-6">
              {/* Autonomy Level */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-amber-400" />
                  <span>Niveau d'Autonomie IA</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <input 
                      type="range" 
                      min="0" max="4" step="1" 
                      value={autonomyLevel} 
                      onChange={handleAutonomyChange}
                      className="w-full accent-amber-500 bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="bg-black/30 rounded-xl p-3 text-sm">
                    {autonomyLevel === 0 && <><span className="text-slate-300 font-bold block mb-1">0 - Full Humain</span>L'IA attend vos ordres. Vous validez tout de A à Z.</>}
                    {autonomyLevel === 1 && <><span className="text-blue-300 font-bold block mb-1">1 - Assisté</span>L'IA prépare les contenus, vous validez par lot.</>}
                    {autonomyLevel === 2 && <><span className="text-emerald-300 font-bold block mb-1">2 - Semi-Auto</span>L'IA publie seule, validation requise pour le sensible.</>}
                    {autonomyLevel === 3 && <><span className="text-amber-300 font-bold block mb-1">3 - Full Auto</span>L'IA gère la diffusion complète et optimise selon les perfs.</>}
                    {autonomyLevel === 4 && <><span className="text-purple-300 font-bold block mb-1">4 - Proactif</span>L'IA propose de nouvelles campagnes, gère le budget, innove.</>}
                  </div>
                </div>
              </div>

              {/* Timeline Placeholder */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-bold mb-4 flex items-center justify-between">
                  Plan de Diffusion
                </h3>
                <div className="relative border-l-2 border-white/10 ml-3 space-y-6 pb-2">
                  {['Teaser', 'Révélation', 'Engagement', 'Conversion', 'Fidélisation', 'Récurrence'].map((phase, idx) => (
                    <div key={phase} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${idx < project.phase ? 'bg-emerald-500 border-emerald-500' : idx === project.phase - 1 ? 'bg-[#0B0F19] border-amber-500' : 'bg-[#0B0F19] border-white/20'}`} />
                      <p className={`font-medium ${idx < project.phase ? 'text-emerald-400' : idx === project.phase - 1 ? 'text-amber-400' : 'text-slate-500'}`}>{phase}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center/Right Column: Dashboard */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-slate-400 text-sm block mb-1 flex items-center gap-2"><Target className="w-4 h-4" /> Reach</span>
                  <span className="text-2xl font-bold">{project.reach}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-slate-400 text-sm block mb-1 flex items-center gap-2"><Users className="w-4 h-4" /> Engagement</span>
                  <span className="text-2xl font-bold">{project.engagement}</span>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-5">
                  <span className="text-purple-300 text-sm block mb-1 flex items-center gap-2"><Zap className="w-4 h-4" /> Contenus Créés</span>
                  <span className="text-2xl font-bold text-white">{project.contentCreated}</span>
                </div>
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-5">
                  <span className="text-amber-300 text-sm block mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Conversions</span>
                  <span className="text-2xl font-bold text-white">{project.conversion} <span className="text-sm font-normal text-amber-500/70">/ {project.conversionGoal}</span></span>
                </div>
              </div>

              {/* AI Actions Board */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Suivi IA en Temps Réel
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#0B0F19]/50 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Création de 5 posts LinkedIn terminés.</p>
                      <p className="text-sm text-slate-400 mt-1">L'IA a généré les carrousels pour le thème "Productivité".</p>
                    </div>
                    <span className="text-xs text-slate-500">Il y a 2h</span>
                  </div>
                  
                  {autonomyLevel >= 2 ? (
                     <div className="flex items-start gap-4 p-4 bg-[#0B0F19]/50 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Publication automatique TikTok.</p>
                        <p className="text-sm text-slate-400 mt-1">L'IA a posté le Reel et ajusté les tags selon la dernière tendance.</p>
                      </div>
                      <span className="text-xs text-slate-500">Il y a 30m</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-amber-200">Validation requise</p>
                        <p className="text-sm text-amber-500/70 mt-1">3 visuels Instagram et 1 article sont en attente de validation.</p>
                      </div>
                      <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-sm transition-colors">
                        Valider
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'studio' && (
          <motion.div key="studio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-bold flex items-center gap-2"><ImageIcon className="w-5 h-5 text-purple-400" /> Galerie des contenus générés</h2>
                   <div className="flex gap-2">
                     <button className="px-3 py-1.5 text-sm bg-white/10 rounded-lg font-medium text-white">Tous</button>
                     <button className="px-3 py-1.5 text-sm hover:bg-white/5 rounded-lg font-medium text-slate-400 transition-colors">En attente</button>
                     <button className="px-3 py-1.5 text-sm hover:bg-white/5 rounded-lg font-medium text-slate-400 transition-colors">Rejetés</button>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    {/* Mocked generated content items */}
                    <div className="bg-white/5 border border-amber-500/30 rounded-2xl overflow-hidden group cursor-pointer relative">
                      <div className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10 animate-pulse">À VALIDER</div>
                      <div className="aspect-[4/5] bg-slate-800 relative">
                         <img src="https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&q=80" alt="Generated" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <p className="text-xs text-white line-clamp-3">Découvrez pourquoi 85% des travailleurs gagnent en sérénité grâce à cette technique simple. Lien en bio ! #Productivité #NoStress</p>
                            <div className="flex gap-2 mt-3">
                              <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-1.5 rounded-lg text-sm">Approuver</button>
                              <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 rounded-lg text-sm">Ajuster</button>
                            </div>
                         </div>
                      </div>
                      <div className="p-3 bg-[#0B0F19]/50 flex justify-between items-center">
                         <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500"></span><span className="text-xs text-slate-400">Instagram Feed</span></div>
                         <span className="text-xs text-slate-500">Généré il y a 2h</span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer relative">
                      <div className="aspect-video bg-slate-800 relative">
                         <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Generated" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <p className="text-xs text-white line-clamp-2">Comment optimiser vos réunions d'équipe ? Thread court. 👇</p>
                            <div className="flex gap-2 mt-3">
                              <span className="text-xs text-emerald-400 font-bold border border-emerald-500/30 px-2 py-1 rounded bg-emerald-500/10">Approuvé automatiquement</span>
                            </div>
                         </div>
                      </div>
                      <div className="p-3 bg-[#0B0F19]/50 flex justify-between items-center">
                         <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-xs text-slate-400">LinkedIn Post</span></div>
                         <span className="text-xs text-slate-500">Généré hier</span>
                      </div>
                    </div>
                 </div>
               </div>

               <div className="md:col-span-1">
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-6">
                    <h3 className="font-bold mb-4 text-white">Directives Artistiques (IA)</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-500 block mb-1">Style de l'image</span>
                        <div className="bg-[#0B0F19]/50 rounded-xl p-3 border border-white/5">
                           <p className="text-sm">Minimaliste, tons chauds (ambre/violet), professionnel mais accessible.</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-1">Tone of voice</span>
                        <div className="bg-[#0B0F19]/50 rounded-xl p-3 border border-white/5">
                           <p className="text-sm">Direct, axé sur les résultats, avec une pointe d'humour (emojis autorisés).</p>
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium">Modifier les directives</button>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
