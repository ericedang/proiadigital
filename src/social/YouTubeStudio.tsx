import { Outlet, Link } from 'react-router-dom';
import { BarChart2, Video, MessageSquare, ArrowLeft } from 'lucide-react';

export default function YouTubeStudio() {
  return (
    <div className="flex flex-col h-full bg-[#0F0F0F] text-white">
      {/* YouTube Style Header */}
      <div className="bg-[#212121] px-4 py-3 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <Link to="/social/accounts" className="text-white"><ArrowLeft className="w-6 h-6" /></Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shrink-0">
             <Video className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-medium">YouTube Studio API</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Channel Info */}
        <div className="flex flex-col items-center text-center pb-2">
           <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-[#212121] shadow-lg mb-3">
              <span className="text-3xl font-bold">GE</span>
           </div>
           <h2 className="text-xl font-bold">GreenEats TV</h2>
           <p className="text-[#AAAAAA] mt-1">Abonnés : 8.5K <span className="text-emerald-400">↑ 2.3% ce mois</span></p>
        </div>

        {/* Analytics Card */}
        <div className="bg-[#212121] rounded-xl border border-[#303030] p-5">
           <h3 className="font-medium text-[#AAAAAA] mb-4 text-sm tracking-wider">APERÇU (Dernières 48h)</h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium flex items-center gap-2">👁️ 12.4K</span>
                <span className="text-emerald-400 text-sm font-medium">↑ 18%</span>
              </div>
              <div className="w-full h-1 bg-[#303030] rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[65%]" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                 <div>
                   <span className="text-[#AAAAAA] block mb-1">Visionnage</span>
                   <span className="font-medium">845h <span className="text-emerald-400">↑ 12%</span></span>
                 </div>
                 <div>
                   <span className="text-[#AAAAAA] block mb-1">Abonnés</span>
                   <span className="font-medium">+124 <span className="text-emerald-400">↑ 8%</span></span>
                 </div>
              </div>
           </div>
        </div>

        {/* Next Videos */}
        <div className="bg-[#212121] rounded-xl border border-[#303030] p-5">
           <h3 className="font-medium text-[#AAAAAA] mb-4 text-sm tracking-wider">PROCHAINES VIDÉOS</h3>
           <div className="flex gap-4 items-center">
              <div className="w-24 h-16 bg-[#303030] rounded-lg flex items-center justify-center shrink-0">
                 <span className="text-xs text-[#AAAAAA]">Miniature</span>
              </div>
              <div>
                 <h4 className="font-medium text-sm line-clamp-2 leading-tight mb-1">Comment manger éco-responsable sans se ruiner...</h4>
                 <div className="flex items-center gap-2 text-xs text-[#AAAAAA]">
                   <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">Programmée</span>
                   <span>Mar 15 - 18:00</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Create Grid */}
        <div className="grid grid-cols-2 gap-3">
           <button className="bg-[#212121] border border-[#303030] p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#303030] active:scale-95 transition-all">
             <Video className="w-6 h-6 text-red-500" />
             <span className="text-sm font-medium">Nouvelle vidéo</span>
           </button>
           <button className="bg-[#212121] border border-[#303030] p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#303030] active:scale-95 transition-all">
             <span className="text-2xl">📱</span>
             <span className="text-sm font-medium">Nouveau short</span>
           </button>
           <button className="bg-[#212121] border border-[#303030] p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#303030] active:scale-95 transition-all">
             <span className="text-2xl">🔴</span>
             <span className="text-sm font-medium">Lancer un live</span>
           </button>
           <button className="bg-[#212121] border border-[#303030] p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#303030] active:scale-95 transition-all">
             <MessageSquare className="w-6 h-6 text-blue-400" />
             <span className="text-sm font-medium text-center">Post communauté</span>
           </button>
        </div>

      </div>
    </div>
  );
}
