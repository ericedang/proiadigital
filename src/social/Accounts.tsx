import { motion } from 'motion/react';
import { useSocial } from './store';
import { 
  Users, RefreshCcw, Plus, Trash2, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

const PlatformColors: any = {
  twitter: 'from-slate-800 to-black', // or blue if vintage X
  linkedin: 'from-[#0077b5] to-[#0A66C2]',
  instagram: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
  facebook: 'from-[#1877F2] to-[#166FE5]',
};

const PlatformNames: any = {
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function Accounts() {
  const { accounts } = useSocial();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Comptes Connectés</h1>
          <p className="text-slate-400">Gérez les réseaux sociaux associés à votre espace.</p>
        </div>
      </div>

      {/* Connected Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Account Card */}
        <button className="h-[200px] border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-slate-300 group-hover:text-purple-400" />
          </div>
          <span className="text-slate-400 font-medium group-hover:text-white transition-colors">Connecter un réseau</span>
        </button>

        {accounts.map(acc => (
          <motion.div 
            key={acc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`h-[200px] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${PlatformColors[acc.platform]} bg-opacity-90 shadow-xl shadow-black/20 group`}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <img src={acc.avatar} alt={acc.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">{acc.name}</h3>
                  <p className="text-white/70 text-sm">{acc.username}</p>
                </div>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <img src={`https://logo.clearbit.com/${acc.platform}.com`} alt={acc.platform} className="w-5 h-5 object-contain" onError={(e) => { (e.target as any).style.display = 'none'; }} />
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between mt-4">
              <div>
                <p className="text-white/60 text-xs mb-1">Abonnés</p>
                <p className="text-2xl font-bold text-white">{acc.followers.toLocaleString()}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" title="Synchroniser">
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors hover:border hover:border-red-500/50" title="Déconnecter">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status indicator */}
            <div className={`absolute bottom-0 left-0 w-full h-1 ${acc.status === 'active' ? 'bg-emerald-400' : acc.status === 'expired' ? 'bg-amber-400' : 'bg-red-500'}`} />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <h2 className="text-lg font-bold text-white mb-4">Informations de synchronisation</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-100 font-medium text-sm">Tous vos comptes sont synchronisés</p>
              <p className="text-emerald-400/80 text-xs mt-1">Dernière mise à jour il y a 2 heures.</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Les données (abonnés, likes, vues) sont mises à jour automatiquement toutes les 6 heures avec notre API partenaire.
          </p>
        </div>
      </div>
    </div>
  );
}
