import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial, Client } from './store';
import { Users, Search, Plus, Settings2, BarChart2, ShieldAlert, X, Save } from 'lucide-react';

export default function IAClients() {
  const { clients, updateClient } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Clients</h1>
          <p className="text-slate-400">Configurez l'autonomie de l'IA pour chaque compte et paramétrez les règles de crise.</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Nouveau Client
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <ClientCard 
            key={client.id} 
            client={client} 
            onUpdate={(updates) => updateClient(client.id, updates)} 
            onOpenSettings={() => setEditingClient(client)}
          />
        ))}
      </div>

      <AnimatePresence>
        {editingClient && (
          <EditorialRulesModal 
            client={editingClient} 
            onClose={() => setEditingClient(null)} 
            onSave={(updates) => {
              updateClient(editingClient.id, updates);
              setEditingClient(null);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ClientCard({ client, onUpdate, onOpenSettings }: { client: Client, onUpdate: (updates: Partial<Client>) => void, onOpenSettings: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors"
    >
      <div className="absolute top-0 right-0 p-4 opacity-50 text-slate-500 text-xs font-mono">
        #{client.id}
      </div>

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 p-0.5 shadow-lg shadow-black/20">
          <img src={client.avatar} alt={client.name} className="w-full h-full rounded-xl object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">{client.name}</h3>
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 text-slate-300 font-medium inline-block mt-1 border border-white/5">
            {client.industry}
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Autonomy Slider */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 relative overflow-hidden group-hover:border-white/10 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/10 blur-xl rounded-full"></div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-300">Niveau d'Autonomie IA</span>
            <span className="text-xs font-bold px-2 py-1 bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">{client.autonomyLevel}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={client.autonomyLevel}
            onChange={(e) => onUpdate({ autonomyLevel: parseInt(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none relative z-10"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium uppercase">
            <span>Humain</span>
            <span>Assisté</span>
            <span>Autonome</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col justify-center">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><BarChart2 className="w-3 h-3" /> Confiance</div>
            <div className="flex items-baseline gap-1">
              <div className="text-lg font-bold text-white">{client.confidenceScore}%</div>
              <div className="text-[10px] text-emerald-400">+2%</div>
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col justify-center relative overflow-hidden">
            <div className={`absolute bottom-0 left-0 w-full h-0.5 ${client.aiStatus === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> État IA</div>
            <div className={`text-sm font-bold capitalize ${client.aiStatus === 'active' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {client.aiStatus === 'active' ? 'Opérationnel' : client.aiStatus}
            </div>
          </div>
        </div>

        {/* Config button */}
        <button 
          onClick={onOpenSettings}
          className="w-full flex justify-center items-center gap-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 py-3 rounded-xl text-sm font-medium text-purple-300 transition-colors"
        >
          <Settings2 className="w-4 h-4" />
          Configurer Automatisation & Crise (Modules 4-6)
        </button>
      </div>
    </motion.div>
  );
}

function EditorialRulesModal({ client, onClose, onSave }: { client: Client, onClose: () => void, onSave: (u: any) => void }) {
  const [activeTab, setActiveTab] = useState<'auto' | 'crise'>('auto');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-white">Paramètres d'IA - {client.name}</h2>
            <p className="text-xs text-slate-400 mt-1">Modules 4, 5 et 6 : Automatisation & Crise</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex border-b border-white/5 bg-slate-900/80">
          <button onClick={() => setActiveTab('auto')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'auto' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}>Automatisation (Mod. 4 & 5)</button>
          <button onClick={() => setActiveTab('crise')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'crise' ? 'border-red-500 text-red-400' : 'border-transparent text-slate-400 hover:text-white'}`}>Gestion de Crise (Mod. 6)</button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {activeTab === 'auto' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-3">Automatisation Quotidienne</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 accent-purple-500" />
                  <div>
                    <p className="text-sm text-white font-medium">Réponses automatiques aux commentaires positifs</p>
                    <p className="text-xs text-slate-400">L'IA like et répond aux commentaires avec un ton adapté à la marque.</p>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-3">Génération Auto de Calendrier</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 accent-purple-500" />
                  <div>
                    <p className="text-sm text-white font-medium">Planifier le mois M+1 automatiquement</p>
                    <p className="text-xs text-slate-400">Génère 12 posts (3/semaine) le 25 du mois précédent, en attente de validation humaine.</p>
                  </div>
                </label>
              </div>
              
              <div>
                 <label className="text-xs font-medium text-slate-400 mb-2 block">Ton Editorial (Prompt Contextuel)</label>
                 <textarea className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 h-24" defaultValue="Le ton doit être professionnel mais chaleureux. Utiliser des emojis (max 2 par post). Toujours conclure par une question ouverte." />
              </div>
            </div>
          )}

          {activeTab === 'crise' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <h3 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Détection d'Anomalie et Bad Buzz</h3>
                <p className="text-xs text-red-200 mb-4">L'IA analyse le sentiment en temps réel. Définissez le seuil de déclenchement d'alerte.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white"><span>Sensibilité au sentiment négatif</span><span>Haute</span></div>
                  <input type="range" min="1" max="100" defaultValue="80" className="w-full accent-red-500" />
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-3">Actions Correctives Automatiques</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 accent-red-500" />
                    <p className="text-sm text-slate-300">Suspendre toutes les campagnes sponsorisées si Niveau Crise &gt; 3</p>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 accent-purple-500" />
                    <p className="text-sm text-slate-300">Envoyer SMS d'urgence au manager (astreinte)</p>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-purple-500" />
                    <p className="text-sm text-slate-300">Activer les réponses "Tampon" (Message d'attente générique)</p>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3 justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-300 font-medium hover:bg-white/10 transition-colors">Annuler</button>
          <button onClick={() => onSave({})} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4"/> Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  )
}
