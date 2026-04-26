import { useState } from 'react';
import { Image as ImageIcon, Video, Calendar as CalendarIcon, Hash, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function CreateScreen() {
  const [text, setText] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['instagram']);
  const navigate = useNavigate();
  
  const MAX_CHARS = platforms.includes('twitter') ? 280 : 2200;

  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter(x => x !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      <div className="bg-[#202C33] px-4 py-3 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#8696A0]">Annuler</button>
        <span className="font-medium">Nouveau Post</span>
        <button className="text-[#00A884] font-medium disabled:opacity-50" disabled={!text}>Suivant</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-6 md:space-y-8 bg-[#111B21] md:p-8 md:rounded-3xl md:border md:border-[#202C33] shadow-lg">
          
          {/* Platform Selection */}
          <div>
             <span className="text-[#8696A0] text-sm font-medium mb-3 block">Choisissez les plateformes :</span>
             <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  {id: 'instagram', icon: '📸', name: 'Insta'},
                  {id: 'twitter', icon: '🐦', name: 'X'},
                  {id: 'linkedin', icon: '💼', name: 'LinkedIn'},
                  {id: 'youtube', icon: '▶️', name: 'YouTube'},
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-sm font-medium transition-colors ${platforms.includes(p.id) ? 'bg-[#00A884] text-[#111B21]' : 'bg-[#202C33] text-[#8696A0] hover:bg-[#2A3942]'}`}
                  >
                    <span>{p.icon}</span> {p.name}
                  </button>
                ))}
             </div>
          </div>

          <div className="h-px bg-[#202C33] w-full" />

          {/* Text Input */}
          <div>
             <textarea 
               value={text}
               onChange={e => setText(e.target.value)}
               placeholder="Quoi de neuf ?"
               className="w-full bg-transparent border-none outline-none text-[#E9EDEF] text-lg md:text-xl resize-none min-h-[120px] md:min-h-[160px] placeholder:text-[#8696A0]"
             />
             <div className="flex justify-between items-center text-xs text-[#8696A0]">
               <span className={text.length > MAX_CHARS ? 'text-[#E95065]' : ''}>
                 📝 {text.length}/{MAX_CHARS} {platforms.includes('twitter') ? '(limite Twitter)' : ''}
               </span>
               <button className="flex items-center gap-1 text-[#00A884] hover:underline font-medium"><HelpCircle className="w-3.5 h-4.5"/> IA Suggestion</button>
             </div>
          </div>

          <div className="h-px bg-[#202C33] w-full" />

          {/* Media */}
          <div>
             <span className="text-[#8696A0] text-sm font-medium mb-3 block">Médias associés :</span>
             <div className="flex gap-3">
                <button className="w-20 h-20 md:w-24 md:h-24 bg-[#202C33] rounded-xl flex flex-col items-center justify-center text-[#8696A0] hover:bg-[#2A3942] hover:text-[#E9EDEF] active:scale-95 transition-all">
                  <ImageIcon className="w-6 h-6 md:w-7 md:h-7 mb-1 md:mb-2" />
                  <span className="text-xs md:text-sm font-medium">Photo</span>
                </button>
                <button className="w-20 h-20 md:w-24 md:h-24 bg-[#202C33] rounded-xl flex flex-col items-center justify-center text-[#8696A0] hover:bg-[#2A3942] hover:text-[#E9EDEF] active:scale-95 transition-all">
                  <Video className="w-6 h-6 md:w-7 md:h-7 mb-1 md:mb-2" />
                  <span className="text-xs md:text-sm font-medium">Vidéo</span>
                </button>
             </div>
          </div>

          <div className="h-px bg-[#202C33] w-full" />

          {/* Planification */}
          <div className="bg-[#0B141A] rounded-2xl border border-[#202C33] overflow-hidden">
             <div className="p-3 md:p-4 border-b border-[#202C33] flex items-center justify-between bg-[#202C33]/50">
               <div className="flex items-center gap-2 text-[#E9EDEF] font-medium"><CalendarIcon className="w-5 h-5 text-[#8696A0]" /> Options de publication</div>
             </div>
             <div className="p-1 md:p-2">
               <label className="flex items-center gap-3 p-3 hover:bg-[#202C33]/50 active:bg-[#202C33] rounded-xl cursor-pointer transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-[#00A884] flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00A884]" />
                  </div>
                  <span className="text-[#E9EDEF]">Publier maintenant</span>
               </label>
               <label className="flex items-center gap-3 p-3 hover:bg-[#202C33]/50 active:bg-[#202C33] rounded-xl cursor-pointer transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-[#8696A0] shrink-0" />
                  <span className="text-[#E9EDEF]">Planifier la date/heure</span>
               </label>
               <label className="flex items-center gap-3 p-3 hover:bg-[#202C33]/50 active:bg-[#202C33] rounded-xl text-[#00A884] cursor-pointer transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-[#00A884] shrink-0 flex items-center justify-center"><span className="text-xs">✨</span></div>
                  <span className="font-medium">Laisser l'IA optimiser l'horaite</span>
               </label>
             </div>
          </div>
          
          {/* Submit button on desktop is rendered inline for better layout */}
          <div className="hidden md:block pt-4">
            <button className="w-full bg-[#00A884] text-[#111B21] font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(0,168,132,0.3)] hover:scale-[1.01] active:scale-95 transition-all text-lg hover:bg-[#00C298] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none" disabled={!text}>
              PUBLIER LA CAMPAGNE
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden p-4 bg-[#202C33] border-t border-[#111B21] pb-safe">
         <button className="w-full bg-[#00A884] text-[#111B21] font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50 text-lg hover:bg-[#00C298]" disabled={!text}>
            PUBLIER
         </button>
      </div>
    </div>
  );
}
