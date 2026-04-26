import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial, Post } from './store';
import { 
  Filter, Calendar as CalendarIcon, MoreVertical, Edit2, Copy, Trash2, Send, Clock, Plus
} from 'lucide-react';

export default function Posts() {
  const { posts, deletePost, updatePost } = useSocial();
  const [filter, setFilter] = useState('all'); // all, scheduled, published, draft
  
  const filteredPosts = posts.filter(p => filter === 'all' || p.status === filter);
  
  const statusColors: any = {
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const statusLabels: any = {
    published: 'Publié',
    scheduled: 'Programmé',
    draft: 'Brouillon',
    failed: 'Échoué'
  };

  return (
    <div className="space-y-6 min-h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des posts</h1>
          <p className="text-slate-400">Gérez, éditez et programmez vos contenus sociaux.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-purple-500/30 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Créer un Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'all', label: 'Tous' },
          { id: 'published', label: 'Publiés' },
          { id: 'scheduled', label: 'Programmés' },
          { id: 'draft', label: 'Brouillons' }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id 
                ? 'bg-white text-slate-900 shadow-md shadow-white/10' 
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-sm text-slate-400">
                <th className="font-medium p-6 w-1/2">Contenu</th>
                <th className="font-medium p-6">Réseaux</th>
                <th className="font-medium p-6">Statut</th>
                <th className="font-medium p-6">Date</th>
                <th className="font-medium p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredPosts.map(post => (
                  <motion.tr 
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        {post.media && post.media.length > 0 && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                            <img src={post.media[0]} alt="Media" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <p className="text-white text-sm line-clamp-2 max-w-sm">{post.content}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-1">
                        {post.platforms.map(p => (
                          <div key={p} className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                            <img src={`https://logo.clearbit.com/${p}.com`} alt={p} className="w-4 h-4 object-contain" onError={(e) => { (e.target as any).style.display = 'none'; }} />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[post.status]}`}>
                        {statusLabels[post.status]}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-white flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-slate-400" />
                          {new Date(post.scheduledDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(post.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 text-slate-400">
                        {post.status === 'draft' && (
                          <button className="p-2 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors" title="Publier maintenant">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Éditer">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Dupliquer">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="p-2 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <p>Aucun post trouvé pour ce filtre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
