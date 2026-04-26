import { useState } from 'react';
import { useSocial, Post } from './store';
import { ChevronLeft, ChevronRight, Plus, Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import CreatePostModal from './CreatePostModal';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | undefined>(undefined);
  const { posts, addPost } = useSocial();

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Lundi = 1
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getPostsForDay = (day: Date) => {
    return posts.filter(p => isSameDay(new Date(p.scheduledDate), day));
  };

  const statusColors: any = {
    published: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    scheduled: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    draft: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    failed: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const platformColors: any = {
    twitter: 'border-l-sky-500',
    linkedin: 'border-l-blue-600',
    instagram: 'border-l-pink-500',
    facebook: 'border-l-blue-500'
  }

  const simulateMagicGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Generate 3 sample AI posts in the current week
      const d1 = new Date(); d1.setDate(d1.getDate() + 1); d1.setHours(11, 0, 0);
      const d2 = new Date(); d2.setDate(d2.getDate() + 3); d2.setHours(18, 30, 0);
      const d3 = new Date(); d3.setDate(d3.getDate() + 4); d3.setHours(9, 0, 0);
      
      const newPosts = [
         { content: '🚀 L\'IA permet d\'automatiser 80% de votre activité...', platforms: ['linkedin'], scheduledDate: d1.toISOString(), status: 'ai-suggested' },
         { content: 'Découvrez notre dernière étude sur le marché B2B 2026. 📊', platforms: ['twitter', 'linkedin'], scheduledDate: d2.toISOString(), status: 'ai-suggested' },
         { content: 'Astuce du jour : Comment optimiser vos posts Instagram ? ✨', platforms: ['instagram'], scheduledDate: d3.toISOString(), status: 'ai-suggested' }
      ];

      newPosts.forEach(post => {
         // @ts-ignore
         addPost({ ...post, media: [] });
      });

    }, 2000);
  };

  const getBestTimeForDay = (day: Date) => {
    // Simulate AI giving a "best time" for specific days depending on day of week
    const dow = day.getDay();
    if (dow === 2 || dow === 4) return '11:00'; // Mar/Jeu
    if (dow === 1 || dow === 6) return '18:30';
    return null;
  };

  // Basic Drag and Drop State Simulation
  const [draggedPost, setDraggedPost] = useState<string | null>(null);

  const handleDragStart = (e: any, postId: string) => {
    setDraggedPost(postId);
  };

  const handleDrop = (e: any, day: Date) => {
    e.preventDefault();
    if (!draggedPost) return;
    console.log(`Dropped post ${draggedPost} on ${day.toISOString()}`);
    // In a real app we would update the store post.scheduledDate to `day`
    setDraggedPost(null);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 flex flex-col min-h-full h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Planificateur Intelligent</h1>
          <p className="text-slate-400">Générez et organisez votre stratégie de contenu.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-xl">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 font-bold text-white capitalize w-40 text-center">
              {format(currentDate, 'MMMM yyyy', { locale: fr })}
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={simulateMagicGenerate}
            disabled={isGenerating}
            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2 group"
          >
            {isGenerating ? (
              <Wand2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
            {isGenerating ? 'Génération...' : 'Magic Generate'}
          </button>
          
          <button 
            onClick={() => { setSelectedDateForModal(undefined); setIsModalOpen(true); }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nouveau
          </button>
        </div>
      </div>

      {/* Overview stats generated by AI */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Posts ce mois</p>
              <h3 className="text-2xl font-bold text-white">24</h3>
            </div>
            <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl text-xs font-bold">+12% vs last month</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Reach Estimé IA</p>
              <h3 className="text-2xl font-bold text-white">45.2k</h3>
            </div>
            <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl text-xs font-bold flex items-center gap-1"><Sparkles className="w-3 h-3"/> Optimisé</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">A/B Tests Actifs</p>
              <h3 className="text-2xl font-bold text-white">3</h3>
            </div>
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl text-xs font-bold">En cours</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex-1 flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-white/10 bg-slate-900/50 shrink-0">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
            <div key={day} className="p-4 text-center text-sm font-bold text-slate-400">
              {day}
            </div>
          ))}
        </div>
        
        {/* Days Grid */}
        <div className="grid grid-cols-7 flex-1 overflow-y-auto">
          {days.map((day, i) => {
            const dayPosts = getPostsForDay(day);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());
            const bestTime = getBestTimeForDay(day);
            
            return (
              <div 
                key={day.toISOString()} 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
                className={`min-h-[120px] p-2 border-b border-r border-white/5 relative group transition-colors hover:bg-white/[0.02] ${!isCurrentMonth ? 'bg-black/20 opacity-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1">
                     <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-slate-300'}`}>
                       {format(day, 'd')}
                     </span>
                     {bestTime && isCurrentMonth && (
                       <span className="text-[9px] font-bold text-amber-500/70 border border-amber-500/20 bg-amber-500/5 px-1 rounded-sm flex items-center gap-0.5">
                         <Sparkles className="w-2 h-2" /> {bestTime}
                       </span>
                     )}
                  </div>
                  <button 
                    onClick={() => { setSelectedDateForModal(day); setIsModalOpen(true); }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition-opacity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
                  {dayPosts.map(post => (
                    <div 
                      draggable
                      onDragStart={(e) => handleDragStart(e, post.id)}
                      key={post.id} 
                      className={`text-xs p-1.5 pl-2 rounded flex flex-col gap-1 cursor-grab active:cursor-grabbing border border-l-4 ${statusColors[post.status]} ${platformColors[post.platforms?.[0]] || ''}`}
                      title={post.content}
                    >
                      <div className="flex justify-between items-center opacity-80">
                         <span className="font-bold text-[10px] uppercase">
                            {new Date(post.scheduledDate).getHours()}h • {post.platforms?.[0] || 'Unknown'}
                         </span>
                         {post.id === '1' && (
                            <span className="bg-blue-500 text-white text-[9px] px-1 rounded-sm font-bold flex items-center" title="Post testé en A/B">A/B</span>
                         )}
                      </div>
                      <span className="truncate">{post.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <CreatePostModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         initialDate={selectedDateForModal} 
      />
    </div>
  );
}
