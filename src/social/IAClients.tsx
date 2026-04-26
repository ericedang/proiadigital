import { useState } from 'react';
import { motion } from 'motion/react';
import { useSocial, Client } from './store';
import { Users, Search, Plus, Settings2, BarChart2, ShieldAlert } from 'lucide-react';

export default function IAClients() {
  const { clients, updateClient } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Clients</h1>
          <p className="text-slate-400">Configurez l'autonomie de l'IA pour chaque compte.</p>
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
          <ClientCard key={client.id} client={client} onUpdate={(updates) => updateClient(client.id, updates)} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client, onUpdate }: { client: Client, onUpdate: (updates: Partial<Client>) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-50 text-slate-500">
        #{client.id}
      </div>

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 p-0.5">
          <img src={client.avatar} alt={client.name} className="w-full h-full rounded-xl object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{client.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300 font-medium inline-block mt-1">
            {client.industry}
          </span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Autonomy Slider */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300">Niveau d'Autonomie IA</span>
            <span className="text-sm font-bold text-amber-400">{client.autonomyLevel}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={client.autonomyLevel}
            onChange={(e) => onUpdate({ autonomyLevel: parseInt(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Humain</span>
            <span>Assisté</span>
            <span>Autonome</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><BarChart2 className="w-3 h-3" /> Confiance</div>
            <div className="text-lg font-bold text-white">{client.confidenceScore}%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> État</div>
            <div className="text-sm font-bold text-emerald-400 capitalize">{client.aiStatus === 'active' ? 'Opérationnel' : client.aiStatus}</div>
          </div>
        </div>

        {/* Config button */}
        <button className="w-full flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-sm font-medium text-white transition-colors">
          <Settings2 className="w-4 h-4" />
          Règles Éditoriales
        </button>
      </div>
    </motion.div>
  );
}
