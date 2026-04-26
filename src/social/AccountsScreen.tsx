import { useState } from 'react';
import { useSocial } from './store';
import { Instagram, Linkedin, Youtube, Twitter, CheckCircle2, AlertTriangle, XCircle, Plus, MoreHorizontal, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConnectedAccounts() {
  const { accounts } = useSocial();
  const [connecting, setConnecting] = useState<string | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'instagram': return <Instagram className="w-6 h-6 text-pink-500" />;
      case 'linkedin': return <Linkedin className="w-6 h-6 text-blue-500" />;
      case 'youtube': return <Youtube className="w-6 h-6 text-red-500" />;
      case 'twitter': return <Twitter className="w-6 h-6 text-sky-400" />;
      default: return <div className="w-6 h-6 bg-slate-500 rounded-lg" />;
    }
  };

  const simulateConnection = (platform: string) => {
    setConnecting(platform);
    setTimeout(() => setConnecting(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      <div className="bg-[#202C33] px-4 py-4 shadow-sm sticky top-0 z-10 border-b border-[#111B21]">
        <h1 className="text-xl font-medium text-[#E9EDEF]">Comptes Connectés</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <div key={account.id} className="bg-[#111B21] rounded-2xl p-4 flex flex-col justify-between border border-[#202C33] min-h-[140px]">
               <div className="flex items-start justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#202C33] rounded-xl flex items-center justify-center relative shrink-0">
                       {getPlatformIcon(account.platform)}
                       {account.status === 'connected' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00A884] rounded-full border-2 border-[#111B21]" />}
                       {account.status === 'expiring' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFB02E] rounded-full border-2 border-[#111B21]" />}
                       {account.status === 'disconnected' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#E95065] rounded-full border-2 border-[#111B21]" />}
                    </div>
                    <div className="min-w-0">
                       <h3 className="font-medium text-[#E9EDEF] flex items-center gap-2 truncate">
                         <span className="truncate">{account.name}</span>
                         {account.status === 'connected' && <CheckCircle2 className="w-4 h-4 text-[#00A884] shrink-0" />}
                       </h3>
                       <p className="text-sm text-[#8696A0] truncate">{account.handle}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-1 shrink-0 ml-2">
                   {account.status === 'disconnected' ? (
                     <button 
                       onClick={() => simulateConnection(account.id)}
                       disabled={connecting === account.id}
                       className="px-3 py-1.5 bg-[#00A884] text-[#111B21] text-sm font-medium rounded-lg disabled:opacity-50 h-8 flex items-center"
                     >
                       {connecting === account.id ? <RotateCw className="w-4 h-4 animate-spin" /> : 'Co.'}
                     </button>
                   ) : (
                     <>
                       {account.platform === 'youtube' && (
                          <Link to="/social/youtube" className="p-1.5 text-[#00A884] bg-[#00A884]/10 rounded-lg hover:bg-[#00A884]/20"><Youtube className="w-5 h-5" /></Link>
                       )}
                       <button className="p-1.5 text-[#8696A0] hover:bg-[#202C33] rounded-lg"><MoreHorizontal className="w-5 h-5"/></button>
                     </>
                   )}
                 </div>
               </div>

               <div className="mt-4 pt-3 border-t border-[#202C33] flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#E9EDEF]">{account.followers.toLocaleString()} <span className="text-[#8696A0] font-normal">abonnés</span></p>
                    {account.platform === 'youtube' && account.details?.videos && (
                        <p className="text-xs text-[#8696A0] mt-0.5">{account.details.videos} vidéos uploadées</p>
                    )}
                  </div>
                  <p className={`text-[11px] font-medium px-2 py-1 rounded-md ${account.status === 'expiring' ? 'bg-[#FFB02E]/10 text-[#FFB02E]' : 'bg-[#202C33] text-[#8696A0]'}`}>
                    {account.status === 'expiring' ? '⚠ Token expire' : `Synchro : ${account.lastSync}`}
                  </p>
               </div>
            </div>
          ))}

          <div className="bg-[#111B21] rounded-2xl p-4 border border-[#202C33] border-dashed flex items-center justify-center cursor-pointer hover:bg-[#202C33] transition-colors min-h-[140px]">
             <div className="text-center">
               <div className="w-12 h-12 bg-[#202C33] rounded-full mx-auto flex items-center justify-center mb-2">
                 <Plus className="w-6 h-6 text-[#00A884]" />
               </div>
               <span className="font-medium text-[#E9EDEF] text-sm">Ajouter un compte</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
