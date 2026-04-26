import { motion, AnimatePresence } from 'motion/react';
import { useSocial, Media as MediaType } from './store';
import { 
  UploadCloud, Image as ImageIcon, Video, File, Search, Filter, MoreVertical, Folder, Grid, List as ListIcon, Loader2
} from 'lucide-react';
import { useState } from 'react';

export default function Media() {
  // @ts-ignore
  const { media, updatePost } = useSocial(); 
  // We can't directly mutate media in this mock unless we add `addMedia` to store, but let's just use local state for uploaded files so we can simulate it easily
  const [localMedia, setLocalMedia] = useState<MediaType[]>(media);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <ImageIcon className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newM: MediaType = {
        id: Math.random().toString(),
        url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
        name: 'nouvelle_image_campagne.jpg',
        type: 'image',
        size: '1.2 MB',
        date: new Date().toISOString()
      };
      setLocalMedia([newM, ...localMedia]);
    }, 1500);
  };

  return (
    <div className="space-y-6 flex flex-col min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Médiathèque</h1>
          <p className="text-slate-400">Stockez et organisez vos assets visuels.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Nouveau dossier
          </button>
          <button onClick={handleSimulateUpload} disabled={isUploading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
            Importer
          </button>
        </div>
      </div>

      {/* Tools */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 px-3 py-1 flex-1">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un média..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 w-full"
          />
        </div>
        <div className="flex items-center gap-2 pr-2 border-l border-white/10 pl-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors" title="Filtres">
            <Filter className="w-4 h-4" />
          </button>
          <div className="flex bg-slate-900/50 rounded-lg p-1">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div onClick={handleSimulateUpload} className="border-2 border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all p-8 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-slate-300">
           {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8" />}
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{isUploading ? 'Téléchargement en cours...' : 'Glissez-déposez vos fichiers ici'}</h3>
        <p className="text-slate-400 text-sm">JPG, PNG, GIF, MP4 (Max. 50MB)</p>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
          {localMedia.map(item => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group relative"
            >
              <div className="aspect-square relative flex items-center justify-center bg-slate-900/50 overflow-hidden">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white/20 hover:bg-purple-600 text-white rounded-xl backdrop-blur-md transition-colors font-medium px-4">
                    Sélectionner
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate" title={item.name}>{item.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.size} • {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white/80">
                {getIcon(item.type)}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden pb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-slate-400">
                <th className="font-medium p-4 w-[60%]">Nom</th>
                <th className="font-medium p-4 text-center">Type</th>
                <th className="font-medium p-4 text-right">Taille</th>
                <th className="font-medium p-4 text-right">Ajouté le</th>
              </tr>
            </thead>
            <tbody>
              {localMedia.map(item => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white text-sm font-medium">{item.name}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-purple-400 transition-colors">
                      {getIcon(item.type)}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-slate-400">{item.size}</td>
                  <td className="p-4 text-right text-sm text-slate-400">{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
