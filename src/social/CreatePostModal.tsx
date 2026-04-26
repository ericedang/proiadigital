import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial } from './store';
import { Calendar as CalendarIcon, Clock, X, Image as ImageIcon, Check, Send } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
}

export default function CreatePostModal({ isOpen, onClose, initialDate }: CreatePostModalProps) {
  const { addPost } = useSocial();
  
  const [newContent, setNewContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialDate) {
        setScheduleDate(initialDate.toISOString().split('T')[0]);
      } else {
        setScheduleDate('');
      }
      setScheduleTime('');
      setNewContent('');
      setSelectedPlatforms(['linkedin']);
    }
  }, [isOpen, initialDate]);

  const platformsList = [
    { id: 'linkedin', label: 'LinkedIn', color: 'bg-blue-600' },
    { id: 'twitter', label: 'Twitter', color: 'bg-sky-500' },
    { id: 'instagram', label: 'Instagram', color: 'bg-pink-600' },
    { id: 'facebook', label: 'Facebook', color: 'bg-blue-500' }
  ];

  const handleCreatePost = (status: 'draft' | 'scheduled') => {
    if (!newContent) return;

    let dateStr = new Date().toISOString();
    if (scheduleDate && scheduleTime) {
       const [year, month, day] = scheduleDate.split('-');
       const [hours, minutes] = scheduleTime.split(':');
       const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
       dateStr = date.toISOString();
    } else if (scheduleDate) {
       dateStr = new Date(scheduleDate).toISOString();
    }

    addPost({
      content: newContent,
      platforms: selectedPlatforms as any[],
      scheduledDate: dateStr,
      media: [],
      status
    });

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setNewContent('');
    setSelectedPlatforms(['linkedin']);
    setScheduleDate('');
    setScheduleTime('');
  };

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) { 
         setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h2 className="text-xl font-bold text-white">Nouveau Post</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              {/* Platforms selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Réseaux sociaux</label>
                <div className="flex flex-wrap gap-2">
                  {platformsList.map(platform => {
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                          isSelected 
                            ? `${platform.color} border-transparent text-white shadow-lg` 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <img src={`https://logo.clearbit.com/${platform.id}.com`} alt={platform.label} className="w-4 h-4 object-contain rounded-sm" onError={(e) => { (e.target as any).style.display = 'none'; }} />
                        <span className="font-medium text-sm">{platform.label}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Contenu du post</label>
                <div className="relative">
                  <textarea 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Qu'avez-vous en tête ?"
                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 min-h-[150px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Ajouter un média">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Programmation</label>
                <div className="flex gap-4">
                  <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-1 flex items-center px-4">
                    <CalendarIcon className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                    <input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="bg-transparent border-none w-full text-white focus:outline-none py-3 style-date-input"
                    />
                  </div>
                  <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-1 flex items-center px-4">
                    <Clock className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                    <input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="bg-transparent border-none w-full text-white focus:outline-none py-3 style-time-input"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Laissez vide pour publier immédiatement en tant que brouillon, ou sélectionnez une date pour programmer.</p>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => handleCreatePost('draft')}
                className="px-6 py-2.5 rounded-xl font-medium transition-colors bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                Enregistrer Brouillon
              </button>
              <button 
                onClick={() => handleCreatePost('scheduled')}
                disabled={!newContent || !scheduleDate}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/30 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Programmer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
