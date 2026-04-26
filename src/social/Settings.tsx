import { User, Bell, Palette, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
      <p className="text-slate-400">Gérez votre compte et vos préférences.</p>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <div className="flex items-start gap-8">
          <div className="w-64 shrink-0 hidden md:block">
            <div className="space-y-2">
              {[
                { id: 'profile', icon: User, label: 'Profil' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'appearance', icon: Palette, label: 'Apparence' },
                { id: 'security', icon: Shield, label: 'Sécurité' },
              ].map(tab => (
                <button key={tab.id} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left bg-purple-600/10 text-purple-400 font-medium border border-purple-500/20">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <h2 className="text-xl font-bold text-white">Profil Utilisateur</h2>
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700">
                <img src="https://images.unsplash.com/photo-1543336302-602ee50f9ffb?w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                Changer d'avatar
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nom complet</label>
                <input type="text" defaultValue="Cabinet ProDigital" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" defaultValue="contact@prodigital.com" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Fuseau horaire</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors">
                  <option>Europe/Paris (GMT+2)</option>
                  <option>Africa/Douala (GMT+1)</option>
                </select>
              </div>
              
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 mt-4">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
