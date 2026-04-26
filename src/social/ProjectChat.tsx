import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocial } from './store';
import { ArrowLeft, MoreVertical, Paperclip, Mic, Send, Check, CheckCheck, Clock, CheckCircle2, Image as ImageIcon, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'report' | 'preview';
  actions?: string[];
}

export default function ProjectChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useSocial();
  const project = projects.find(p => p.id === id);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1', sender: 'ai', time: '09:00', type: 'report',
      text: `Bonjour ! Votre projet ${project?.name} avance bien.\n\n📊 Résumé d'hier :\n• 3 posts publiés\n• 12K reach\n• 4 nouveaux inscrits\n• 8 commentaires traités\n\nAujourd'hui, je prévois :\n• 11h : Post témoignage\n• 16h : Story coulisse\n• 18h : Thread Twitter`
    },
    {
      id: '2', sender: 'ai', time: '09:15', type: 'preview',
      text: `📸 Aperçu du post de 11h\n[Image Générée]\nLégende : "Découvrez comment Marie a gagné 2h par jour grâce à notre méthode..."`,
      actions: ['✅ Valider et publier', '✏️ Modifier', '🔄 Version alternative']
    },
    { id: '3', sender: 'user', time: '09:20', text: 'Parfait pour Marie ! 👍', status: 'read' }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), status: 'sent' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === (messages.length + 1).toString() ? {...m, status: 'delivered'} : m));
    }, 1000);
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: 'Je m\'en occupe tout de suite ! 🚀', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    }, 2500);
  };

  if (!project) return <div>Introuvable</div>;

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      {/* Header */}
      <div className="bg-[#202C33] px-3 py-2 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate('/social')} className="p-1 -ml-1 text-[#8696A0] active:bg-[#2A3942] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold relative shrink-0">
          <span className="text-xl">🤖</span>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A884] rounded-full border-2 border-[#202C33]" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[#E9EDEF] font-medium text-base truncate leading-tight">Projet {project.name}</h2>
          <span className="text-[#8696A0] text-xs">En ligne</span>
        </div>
        <button className="p-2"><MoreVertical className="w-5 h-5 text-[#8696A0]" /></button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-chat-pattern">
         <div className="flex justify-center mb-6">
            <span className="bg-[#182229] px-3 py-1 rounded-lg text-[#8696A0] text-xs font-medium shadow-sm">Aujourd'hui</span>
         </div>
         
         {messages.map((msg) => (
           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] md:max-w-2xl lg:max-w-3xl rounded-2xl p-2 shadow-sm ${msg.sender === 'user' ? 'bg-[#005C4B] rounded-tr-sm' : 'bg-[#202C33] rounded-tl-sm'}`}>
                {msg.type === 'report' && (
                  <div className="mb-2 bg-[#111B21] rounded-lg p-3 border border-[#2A3942]">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#00A884] mb-2"><BarChart2 className="w-4 h-4"/> Rapport Quotidien</div>
                    <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-[#E9EDEF]">{msg.text}</pre>
                  </div>
                )}
                {msg.type === 'preview' && (
                  <div className="mb-2">
                    <div className="bg-[#111B21] rounded-lg overflow-hidden border border-[#2A3942] mb-2">
                      <div className="aspect-video bg-slate-800 relative flex justify-center items-center">
                        <ImageIcon className="w-8 h-8 text-slate-600" />
                      </div>
                      <div className="p-3">
                         <p className="text-[15px]">{msg.text.split('\n')[2]}</p>
                      </div>
                    </div>
                    {msg.actions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.actions.map(action => (
                          <button key={action} className="bg-[#2A3942] text-[#00A884] text-sm font-medium px-3 py-1.5 rounded-lg active:bg-[#3A4A53]">
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {(msg.type === 'text' || !msg.type) && (
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                )}
                
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[11px] text-[#8696A0]">{msg.time}</span>
                  {msg.sender === 'user' && (
                    <span className={msg.status === 'read' ? 'text-[#53BDEB]' : 'text-[#8696A0]'}>
                      {msg.status === 'sent' ? <Check className="w-3.5 h-3.5" /> : <CheckCheck className="w-3.5 h-3.5" />}
                    </span>
                  )}
                </div>
             </div>
           </div>
         ))}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#202C33] p-3 flex items-end gap-2 pb-safe">
         <div className="flex-1 bg-[#2A3942] rounded-3xl flex items-center px-4 py-2 min-h-[44px]">
           <button className="mr-3 text-[#E9EDEF]"><Paperclip className="w-6 h-6" /></button>
           <textarea 
             value={input}
             onChange={e => setInput(e.target.value)}
             placeholder="Message..."
             className="bg-transparent border-none outline-none w-full text-[15px] resize-none max-h-32 custom-scrollbar placeholder:text-[#8696A0] py-1"
             rows={1}
           />
         </div>
         {input.trim() ? (
           <button onClick={handleSend} className="w-12 h-12 bg-[#00A884] rounded-full flex justify-center items-center text-white shrink-0 active:scale-95 shadow-md">
             <Send className="w-5 h-5 ml-1" />
           </button>
         ) : (
           <button className="w-12 h-12 bg-[#00A884] rounded-full flex justify-center items-center text-white shrink-0 active:scale-95 shadow-md">
             <Mic className="w-5 h-5" />
           </button>
         )}
      </div>

      <style>{`
        .bg-chat-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h10v10H10z' fill='%23202C33' fill-opacity='0.2'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
