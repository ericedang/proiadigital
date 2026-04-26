import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, Calendar as CalendarIcon, FileText, Image as ImageIcon, 
  Users, Settings, Bell, Search, Menu, X, LogOut, Bot, Sparkles, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialProvider, useSocial } from './store';

const SidebarLink = ({ to, icon: Icon, label, badge, color }: { to: string, icon: any, label: string, badge?: number, color?: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
  
  return (
    <Link to={to} className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? (color || 'bg-purple-600 shadow-lg shadow-purple-500/30 text-white') : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

export const SocialLayoutContent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { posts } = useSocial();
  
  const pendingPostsCount = posts.filter(p => p.status === 'scheduled').length;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    // Always Dark Mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#07090F] text-white font-sans overflow-hidden flex">
      {/* Background Gradients (Gold + Purple) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/10 blur-[150px] pointer-events-none" />

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:static top-0 left-0 h-full w-[280px] z-50 flex flex-col bg-[#0B0F19]/50 border-r border-white/5 backdrop-blur-3xl shrink-0`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100/70">
              SocialGenius
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 uppercase tracking-widest pl-4 mb-2">CM Virtuel IA</p>
          <div className="space-y-1">
            <SidebarLink to="/social/projects" icon={Users} label="Mes Projets" />
            <SidebarLink to="/social/ai-chat" icon={Bot} label="Console IA" />
            <SidebarLink to="/social/onboarding" icon={Sparkles} label="Nouveau Projet" color="text-amber-400 hover:bg-amber-400/10" />
            <SidebarLink to="/social/ai-center" icon={BrainCircuit} label="Tableau de Bord IA" color="bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-200 border border-amber-500/20" />
          </div>
        </div>

        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-4 mb-2 mt-4">Opérations</p>
          <SidebarLink to="/social/dashboard" icon={BarChart2} label="Dashboard" />
          <SidebarLink to="/social/calendar" icon={CalendarIcon} label="Calendrier" badge={pendingPostsCount} />
          <SidebarLink to="/social/posts" icon={FileText} label="Gestion des Posts" />
          <SidebarLink to="/social/analytics" icon={BarChart2} label="Analytiques" />
          <SidebarLink to="/social/media" icon={ImageIcon} label="Médiathèque" />
          <SidebarLink to="/social/accounts" icon={Users} label="Comptes" />
        </div>

        <div className={`p-4 mx-4 mb-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md`}>
          <SidebarLink to="/social/settings" icon={Settings} label="Paramètres" />
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className={`h-20 shrink-0 border-b flex items-center justify-between px-6 z-30 bg-[#0B0F19]/50 border-white/5 backdrop-blur-3xl`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-lg hover:bg-white/10 transition-colors`}>
              <Menu className="w-6 h-6" />
            </button>
            <div className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/5 w-[300px]`}>
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher avec l'IA..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mr-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              IA ACTIVE
            </div>
            <button className={`relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
            </button>
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50 p-0.5 relative group cursor-pointer`}>
              <img src="https://images.unsplash.com/photo-1543336302-602ee50f9ffb?w=100&q=80" alt="User" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function SocialLayout() {
  return (
    <SocialProvider>
      <SocialLayoutContent />
    </SocialProvider>
  );
}

