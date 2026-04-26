import { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Search, Filter } from 'lucide-react';

export default function UnifiedCalendar() {
  const [filter, setFilter] = useState('Tous');

  const schedule = [
    { id: 1, time: '09:00', platform: '📸', name: 'Instagram', title: 'Photo recette du jour', text: 'Notre recette healthy du jour !', status: 'Programmé' },
    { id: 2, time: '12:30', platform: '🐦', name: 'Twitter', title: 'Thread : 5 astuces', text: '1/5 Saviez-vous que...', status: 'Publié', published: true },
    { id: 3, time: '18:00', platform: '▶️', name: 'YouTube', title: 'Nouvelle vidéo', text: 'Comment manger éco', status: 'En attente upload', warning: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      <div className="bg-[#202C33] px-4 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-medium text-[#E9EDEF]">Calendrier</h1>
      </div>

      {/* Week View Simple */}
      <div className="bg-[#111B21] border-b border-[#202C33] p-3 flex justify-between items-center overflow-x-auto custom-scrollbar gap-2">
         {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
           <div key={i} className={`flex flex-col items-center justify-center w-10 h-12 rounded-lg shrink-0 ${i === 2 ? 'bg-[#00A884] text-[#111B21] font-bold' : 'bg-[#202C33] text-[#8696A0]'}`}>
             <span className="text-xs mb-0.5">{day}</span>
             <span className={i === 2 ? 'text-sm' : 'text-sm text-[#E9EDEF]'}>{13 + i}</span>
           </div>
         ))}
      </div>

      {/* Filters */}
      <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide border-b border-[#202C33] custom-scrollbar">
        {['Tous', '📸 Insta', '🐦 X', '💼 LinkedIn', '▶️ YT'].map(f => (
          <button 
           key={f}
           onClick={() => setFilter(f)}
           className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-[#00A884] text-[#111B21]' : 'bg-[#202C33] text-[#8696A0]'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 flex flex-col items-center">
         <div className="w-full max-w-3xl">
           <h2 className="text-[#8696A0] font-medium text-sm flex items-center gap-2 mb-6">
             <CalendarIcon className="w-4 h-4" /> 15 Mars 2024
           </h2>

           <div className="relative border-l-2 border-[#202C33] ml-2 md:ml-4 space-y-8 pb-4">
             {schedule.map((item, idx) => (
               <div key={item.id} className="relative pl-6 md:pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[10px] top-1.5 w-4 h-4 rounded-full border-2 border-[#111B21] flex items-center justify-center text-[8px] ${item.published ? 'bg-[#00A884]' : item.warning ? 'bg-[#FFB02E]' : 'bg-[#53BDEB]'}`} />
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-bold text-[#E9EDEF] text-lg">{item.time}</span>
                    <span className="text-sm font-medium text-[#8696A0]">{item.platform} {item.name}</span>
                  </div>

                  <div className="bg-[#111B21] hover:bg-[#202C33] transition-colors rounded-2xl p-4 md:p-5 border border-[#202C33]">
                     <h3 className="font-medium text-[#E9EDEF] text-lg mb-1">{item.title}</h3>
                     <p className="text-sm text-[#8696A0] line-clamp-2 md:line-clamp-none mb-4">{item.text}</p>
                     
                     <div className="flex items-center gap-1.5">
                       {item.published ? (
                         <span className="flex items-center gap-1 text-[#00A884] text-xs font-bold bg-[#00A884]/10 px-2 py-1 rounded-md"><CheckCircle2 className="w-3.5 h-3.5" /> {item.status}</span>
                       ) : item.warning ? (
                          <span className="text-[#FFB02E] text-xs font-bold bg-[#FFB02E]/10 px-2 py-1 rounded-md">⏳ {item.status}</span>
                       ) : (
                          <span className="text-[#53BDEB] text-xs font-bold bg-[#53BDEB]/10 px-2 py-1 rounded-md">✅ {item.status}</span>
                       )}
                     </div>
                  </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}
