import { motion } from 'motion/react';
import { useSocial } from './store';
import { 
  BarChart2, Users, FileText, Activity, TrendingUp, Calendar, Clock, Image as ImageIcon, Smile, Frown, Meh, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const data = [
  { name: '1 Avr', twitter: 400, linkedin: 240, instagram: 2400 },
  { name: '5 Avr', twitter: 300, linkedin: 139, instagram: 2210 },
  { name: '10 Avr', twitter: 200, linkedin: 980, instagram: 2290 },
  { name: '15 Avr', twitter: 278, linkedin: 390, instagram: 2000 },
  { name: '20 Avr', twitter: 189, linkedin: 480, instagram: 2181 },
  { name: '25 Avr', twitter: 239, linkedin: 380, instagram: 2500 },
  { name: '30 Avr', twitter: 349, linkedin: 430, instagram: 2100 },
  { name: '5 Mai', twitter: 450, linkedin: 550, instagram: 2600, isPredictive: true }, // Predictive point
];

const COLORS = ['#1DA1F2', '#0A66C2', '#E1306C'];

const sentimentData = [
  { name: 'Positif', value: 65, color: '#10B981' },
  { name: 'Neutre', value: 25, color: '#94A3B8' },
  { name: 'Négatif', value: 10, color: '#F43F5E' },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-white/5`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full text-sm font-medium">
        <TrendingUp className="w-4 h-4" />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-slate-400 font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { posts, accounts } = useSocial();
  
  const totalFollowers = accounts.reduce((acc, a) => acc + a.followers, 0);
  const totalPosts = posts.filter(p => p.status === 'published').length;
  const scheduledPosts = posts.filter(p => p.status === 'scheduled');
  
  const platformData = accounts.map((acc, i) => ({
    name: acc.platform,
    value: acc.followers,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Vue d'ensemble IA</h1>
          <p className="text-slate-400">Analytique prédictive globale et état des performances de vos clients.</p>
        </div>
        <button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/50 px-6 py-2.5 rounded-full font-bold transition-colors shadow-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5"/> Rapport Prédictif IA
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Abonnés Cumulés" value={(totalFollowers / 1000).toFixed(1) + 'K'} icon={Users} trend="+12.5%" colorClass="from-purple-500 to-blue-500" />
        <StatCard title="Posts Publiés" value={totalPosts} icon={FileText} trend="+5.2%" colorClass="from-blue-500 to-cyan-500" />
        <StatCard title="Engagement Total" value="14.2K" icon={Activity} trend="+18.4%" colorClass="from-pink-500 to-rose-500" />
        <StatCard title="Score Émotion" value="Positif" icon={Smile} trend="+2.1%" colorClass="from-emerald-500 to-green-500" />
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictive Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">Évolution & Prédictions <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-widest border border-amber-500/30">IA View</span></h2>
              <p className="text-xs text-slate-400">Audience projetée pour les 7 prochains jours</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-purple-500 transition-colors">
              <option className="bg-slate-900">Tous les réseaux</option>
              <option className="bg-slate-900">Instagram</option>
              <option className="bg-slate-900">LinkedIn</option>
              <option className="bg-slate-900">Twitter</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E1306C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0A66C2" stopOpacity={0}/>
                  </linearGradient>
                  <pattern id="diagonalStride" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                     <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                {/* Regular Area */}
                <Area type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={3} fillOpacity={1} fill="url(#colorIg)" />
                <Area type="monotone" dataKey="linkedin" stroke="#0A66C2" strokeWidth={3} fillOpacity={1} fill="url(#colorLi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sentiment Analysis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-white">Analyse de Sentiments</h2>
             <Smile className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 flex justify-center items-center relative min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-2xl font-bold text-emerald-400">65%</span>
              <span className="text-xs text-slate-400">Positif</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {sentimentData.map((data, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
                  <span className="text-sm font-medium text-slate-300 capitalize">{data.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{data.value}%</span>
              </div>
            ))}
          </div>
           <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <p>La perception de marque a augmenté suite à votre dernière campagne Linkedin.</p>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Posts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Prochains posts</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">Voir tout</button>
          </div>
          <div className="space-y-4">
            {scheduledPosts.slice(0, 3).map(post => (
              <div key={post.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                  {post.media && post.media.length > 0 ? (
                    <img src={post.media[0]} alt="Media" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate mb-1">{post.content}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.scheduledDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(post.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {post.platforms.map(p => (
                    <div key={p} className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                      <img src={`https://logo.clearbit.com/${p}.com`} alt={p} className="w-4 h-4 object-contain" onError={(e) => { (e.target as any).style.display = 'none'; }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {scheduledPosts.length === 0 && (
              <div className="text-center py-8 text-slate-400">Aucun post programmé</div>
            )}
          </div>
        </motion.div>

        {/* Best times */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-lg font-bold text-white mb-2">Moments d'Or 🌟</h2>
          <p className="text-sm text-slate-300 mb-6">Basé sur l'activité de vos abonnés (30 derniers jours)</p>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-bold">Mardi, 18:00</p>
                <p className="text-sm text-purple-300">Pic d'activité sur LinkedIn</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                98%
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-bold">Vendredi, 12:30</p>
                <p className="text-sm text-pink-300">Pic d'activité sur Instagram</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                92%
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
            Voir le rapport détaillé
          </button>
        </motion.div>
      </div>
    </div>
  );
}
