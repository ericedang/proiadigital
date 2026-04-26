import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial } from './store';
import { Search, Plus, Bell, MoreVertical, Archive, Pause, Play, BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeView() {
  const { projects } = useSocial();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const activeCount = projects.filter(p => p.status === 'En cours').length;
  const unreadCount = projects.reduce((acc, p) => acc + p.unreadCount, 0);

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      {/* WhatsApp Style Header */}
      <div className="bg-[#202C33] px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-medium text-[#E9EDEF]">SocialGenius Pro</h1>
        <div className="flex items-center gap-4">
           <button className="relative">
             <Bell className="w-6 h-6 text-[#A0AAB0]" />
             {unreadCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00A884] rounded-full text-[10px] flex items-center justify-center font-bold text-white border-2 border-[#202C33]">
                 {unreadCount}
               </span>
             )}
           </button>
           <button onClick={() => navigate('/social/accounts')}><MoreVertical className="w-6 h-6 text-[#A0AAB0]" /></button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-[#111B21]">
        <div className="bg-[#202C33] rounded-lg flex items-center px-3 py-1.5 focus-within:bg-[#202C33]">
           <Search className="w-5 h-5 text-[#8696A0] mr-3" />
           <input 
             type="text" 
             placeholder="Rechercher un projet..." 
             className="bg-transparent border-none outline-none w-full text-[#D1D7DB] placeholder:text-[#8696A0]"
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="px-4 py-2">
         <span className="text-[#8696A0] text-sm uppercase tracking-wider font-medium">Mes Projets [{activeCount} actifs]</span>
      </div>

      {/* Projects List/Grid */}
      <div className="flex-1 overflow-y-auto md:p-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
         {filteredProjects.map(project => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/social/chat/${project.id}`)}
              className="flex items-center px-4 py-3 md:rounded-xl md:bg-[#111B21] md:border md:border-[#202C33] hover:bg-[#202C33] md:hover:border-[#00A884]/50 cursor-pointer group active:bg-[#2A3942] transition-all duration-200"
            >
               {/* "Avatar" */}
               <div className="relative shrink-0 mr-4">
                 <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600">
                    {project.name.charAt(0)}
                 </div>
                 <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#111B21] ${
                   project.status === 'En cours' ? 'bg-[#00A884]' : 
                   project.status === 'En pause' ? 'bg-[#FFB02E]' : 
                   project.status === 'Planifié' ? 'bg-[#53BDEB]' : 'bg-[#8696A0]'
                 }`} />
               </div>

               {/* Chat info */}
               <div className="flex-1 min-w-0 border-b border-[#202C33] md:border-none group-last:border-none pb-3 md:pb-0 pt-1 md:pt-0 relative">
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[#E9EDEF] font-medium text-base truncate pr-2">{project.name}</h3>
                    <span className={`text-xs ${project.unreadCount > 0 ? 'text-[#00A884]' : 'text-[#8696A0]'}`}>
                      {project.lastActivityTime}
                    </span>
                 </div>
                 
                 <div className="flex justify-between items-center">
                    <p className={`text-sm truncate pr-2 ${project.unreadCount > 0 ? 'text-[#E9EDEF]' : 'text-[#8696A0]'}`}>
                       {project.status === 'En cours' && <span className="text-[#00A884] mr-1">Phase {project.phase}/{project.totalPhases} •</span>}
                       {project.lastActivityText}
                    </p>
                    {project.unreadCount > 0 && (
                      <span className="bg-[#00A884] text-[#111B21] text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {project.unreadCount}
                      </span>
                    )}
                 </div>
               </div>
            </div>
         ))}
         </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/social/onboarding')}
        className="absolute bottom-6 right-6 w-14 h-14 bg-[#00A884] rounded-2xl flex items-center justify-center shadow-lg hover:bg-[#00C298] transition-colors active:scale-95 shadow-[#00A884]/20 z-20"
      >
        <Plus className="w-8 h-8 text-[#111B21]" />
      </button>
    </div>
  );
}
