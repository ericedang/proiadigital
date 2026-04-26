import { motion } from 'motion/react';
import { useSocial } from './store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const data = [
    { name: 'X', likes: 4000, comments: 2400 },
    { name: 'LinkedIn', likes: 3000, comments: 1398 },
    { name: 'Instagram', likes: 9800, comments: 3908 },
    { name: 'Facebook', likes: 2780, comments: 3908 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-2">Analytiques Détaillées</h1>
      <p className="text-slate-400">Suivez la performance de vos contenus.</p>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">
        <h2 className="text-white font-bold mb-4">Engagement par Réseau</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#cbd5e1" tickLine={false} axisLine={false} />
            <YAxis stroke="#cbd5e1" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: 'white' }} />
            <Bar dataKey="likes" fill="#EC4899" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
