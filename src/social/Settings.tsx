import { useState } from 'react';
import { User, Bell, Palette, Shield } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Profil' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'appearance', icon: Palette, label: 'Apparence' },
    { id: 'security', icon: Shield, label: 'Sécurité' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
      <p className="text-slate-400">Gérez votre compte et vos préférences.</p>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-64 shrink-0 flex overflow-x-auto md:flex-col space-x-2 md:space-x-0 md:space-y-2 pb-4 md:pb-0 custom-scrollbar">
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl text-left font-medium border transition-colors shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-purple-600/10 text-purple-400 border-purple-500/20 shadow-sm' 
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex-1 w-full space-y-6 md:pl-4 md:border-l border-white/5">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-white">Profil Utilisateur</h2>
                <div className="flex flex-wrap gap-6 items-center">
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
                    <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors appearance-none custom-select">
                      <option className="bg-slate-900 text-white">Europe/Paris (GMT+2)</option>
                      <option className="bg-slate-900 text-white">Africa/Douala (GMT+1)</option>
                    </select>
                  </div>
                  
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 mt-4 inline-block w-full md:w-auto">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-white">Préférences de notifications</h2>
                <div className="space-y-4">
                  {[
                    { title: "Rapports IA Quotidiens", desc: "Recevez un résumé des actions de l'IA chaque matin.", default: true },
                    { title: "Alertes de Crise", desc: "Soyez notifié immédiatement en cas de bad buzz.", default: true },
                    { title: "Génération de Calendrier", desc: "Alerte quand un nouveau mois est planifié.", default: false },
                    { title: "Validation Requise", desc: "Notifications lorsque l'IA a besoin d'une décision.", default: true }
                  ].map((notif, i) => (
                    <label key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                        <input type="checkbox" defaultChecked={notif.default} className="peer appearance-none w-5 h-5 border-2 border-slate-600 rounded bg-slate-900 checked:bg-purple-600 checked:border-purple-600 transition-colors cursor-pointer" />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">{notif.title}</p>
                        <p className="text-sm text-slate-400">{notif.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 mt-4">
                    Mettre à jour
                </button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-white">Apparence</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <p className="text-white font-medium mb-4">Thème Global</p>
                    <div className="flex gap-4">
                      <button className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full border-2 border-purple-500 bg-slate-900 flex flex-col overflow-hidden">
                          <div className="h-1/2 bg-slate-800"></div>
                          <div className="h-1/2 bg-slate-900"></div>
                        </div>
                        <span className="text-sm font-medium text-purple-400">Sombre</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 opacity-50 cursor-not-allowed" title="Le thème clair arrive bientôt">
                        <div className="w-16 h-16 rounded-full border-2 border-slate-700 bg-white flex flex-col overflow-hidden">
                          <div className="h-1/2 bg-slate-100"></div>
                          <div className="h-1/2 bg-white"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-500">Clair</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-white">Sécurité & API</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="font-medium text-white">Mot de passe</p>
                    <p className="text-sm text-slate-400 mb-4">Dernière modification il y a 3 mois</p>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm font-medium">
                      Changer de mot de passe
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="font-medium text-white mb-2">Clés d'API SocialGenius</p>
                    <p className="text-sm text-slate-400 mb-4">Gérez les clés d'accès pour interagir avec le système IA de l'extérieur.</p>
                    <div className="flex gap-2 items-center">
                      <input type="text" readOnly value="sk_test_4582...98f2" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-400 font-mono text-sm" />
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium">
                        Révoquer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
