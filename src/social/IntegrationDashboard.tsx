import { useState, useEffect } from 'react';
import { 
  Code, Settings2, ShieldCheck, Activity, Smartphone, Copy, CheckCircle2, 
  AlertTriangle, RefreshCw, XCircle, ChevronRight, Globe, Key, FileCode, Check
} from 'lucide-react';

export default function IntegrationDashboard() {
  const [activeTab, setActiveTab] = useState<'status' | 'customize' | 'code' | 'diagnostic'>('status');
  const [isCopied, setIsCopied] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#00A884');
  const [brandName, setBrandName] = useState('SocialGenius Pro');

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const embedCode = `<!-- SocialGenius Pro Integration -->
<script src="https://app.socialgenius.pro/widget.js"></script>
<script>
  SocialGenius.init({
    clientId: "cl_1d9f8e7...",
    theme: "auto",
    language: "fr",
    primaryColor: "${primaryColor}",
    brandName: "${brandName}"
  });
</script>`;

  return (
    <div className="flex flex-col h-full bg-[#0B141A] text-[#E9EDEF]">
      <div className="bg-[#202C33] px-4 py-3 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-medium text-[#E9EDEF]">Intégration Widget</h1>
      </div>

      <div className="flex px-2 overflow-x-auto custom-scrollbar bg-[#202C33] border-b border-[#111B21]">
        {[
          { id: 'status', label: 'Statut', icon: Activity },
          { id: 'customize', label: 'Personnalisation', icon: Settings2 },
          { id: 'code', label: 'Code', icon: FileCode },
          { id: 'diagnostic', label: 'Diagnostic', icon: ShieldCheck },
        ].map(tab => (
          <button 
           key={tab.id}
           onClick={() => setActiveTab(tab.id as any)}
           className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-[#00A884] text-[#00A884]' : 'border-transparent text-[#8696A0]'}`}
          >
           <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8">
        
        {activeTab === 'status' && (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
               {/* Status Card */}
               <div className="bg-[#111B21] rounded-2xl p-5 md:p-6 border border-[#202C33] shadow-lg flex flex-col">
                  <h3 className="text-[#8696A0] text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"><Activity className="w-4 h-4"/> STATUT GLOBAL</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#00A884] rounded-full animate-pulse shadow-[0_0_8px_#00A884]" />
                    <span className="font-bold text-lg md:text-xl">En ligne et fonctionnel</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-auto bg-[#202C33] p-4 rounded-xl border border-[#2A3942]">
                     <div>
                       <span className="text-xs text-[#8696A0] block">Dernière vérif.</span>
                       <span className="text-sm md:text-base font-medium">Aujourd'hui, 09:45</span>
                     </div>
                     <div>
                       <span className="text-xs text-[#8696A0] block">Temps de réponse</span>
                       <span className="text-sm md:text-base font-medium text-[#00A884]">145ms</span>
                     </div>
                     <div>
                       <span className="text-xs text-[#8696A0] block">Uptime (30j)</span>
                       <span className="text-sm md:text-base font-medium">99.97%</span>
                     </div>
                     <div>
                       <span className="text-xs text-[#8696A0] block">Sessions actives</span>
                       <span className="text-sm md:text-base font-medium">257</span>
                     </div>
                  </div>
               </div>

               {/* Sites Intégrés */}
               <div className="bg-[#111B21] rounded-2xl p-5 md:p-6 border border-[#202C33] shadow-lg flex flex-col">
                  <h3 className="text-[#8696A0] text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"><Globe className="w-4 h-4"/> SITES INTÉGRÉS</h3>
                  <div className="space-y-3 flex-1 flex flex-col">
                    <div className="bg-[#202C33] p-3 md:p-4 rounded-xl border border-[#2A3942] flex items-center justify-between transition-colors hover:border-[#00A884]/50">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <span className="font-medium text-[#E9EDEF]">monsite.com</span>
                           <CheckCircle2 className="w-4 h-4 text-[#00A884]" />
                         </div>
                         <span className="text-xs text-[#8696A0]">245 sessions • Version 2.4.1</span>
                       </div>
                       <button className="text-[#00A884] text-sm font-medium px-3 py-1.5 hover:bg-[#00A884]/10 rounded-lg transition-colors">Config</button>
                    </div>
                    <div className="bg-[#202C33] p-3 md:p-4 rounded-xl border border-[#2A3942] flex items-center justify-between transition-colors hover:border-[#00A884]/50">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <span className="font-medium text-[#E9EDEF]">admin.monsite.com</span>
                           <CheckCircle2 className="w-4 h-4 text-[#00A884]" />
                         </div>
                         <span className="text-xs text-[#8696A0]">12 sessions • Version 2.4.1</span>
                       </div>
                       <button className="text-[#00A884] text-sm font-medium px-3 py-1.5 hover:bg-[#00A884]/10 rounded-lg transition-colors">Config</button>
                    </div>
                    <button className="mt-auto w-full py-3 bg-transparent border-2 border-dashed border-[#202C33] text-[#8696A0] rounded-xl font-medium hover:bg-[#202C33] hover:text-[#E9EDEF] transition-colors text-sm flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" /> AJOUTER UN NOUVEAU SITE
                    </button>
                  </div>
               </div>
             </div>

             {/* Sécurité */}
             <div className="bg-[#111B21] rounded-2xl p-5 md:p-6 border border-[#202C33] shadow-lg">
                <h3 className="text-[#8696A0] text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"><Key className="w-4 h-4"/> SÉCURITÉ & API</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-[#E9EDEF] block mb-2">Clé API Serveur</span>
                    <div className="flex items-center bg-[#202C33] p-2.5 rounded-lg border border-[#2A3942]">
                      <span className="text-sm font-mono text-[#8696A0] flex-1">sk_live_xxxxxxxxxxxxx</span>
                      <button className="px-4 py-1.5 bg-[#2A3942] rounded-md text-sm font-medium hover:bg-[#3A4A53] transition-colors">Afficher</button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#E9EDEF] block mb-2">SSO / Authentification</span>
                    <label className="flex items-center gap-4 bg-[#202C33] p-4 rounded-xl border border-[#2A3942] cursor-pointer hover:bg-[#2A3942] transition-colors">
                       <input type="checkbox" defaultChecked className="accent-[#00A884] w-5 h-5 shrink-0" />
                       <div>
                         <span className="text-sm md:text-base font-medium block text-[#E9EDEF]">Accepter les tokens JWT parents</span>
                         <span className="text-xs text-[#8696A0]">Connecte automatiquement l'utilisateur</span>
                       </div>
                    </label>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'customize' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="bg-[#111B21] rounded-2xl p-4 border border-[#202C33]">
                <h3 className="text-[#8696A0] text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"><Settings2 className="w-4 h-4"/> MARQUE BLANCHE (WHITE LABEL)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#E9EDEF] block mb-2">Couleur Principale</label>
                    <div className="flex gap-2">
                       <input 
                         type="color" 
                         value={primaryColor} 
                         onChange={e => setPrimaryColor(e.target.value)}
                         className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                       />
                       <input 
                         type="text" 
                         value={primaryColor} 
                         onChange={e => setPrimaryColor(e.target.value)}
                         className="flex-1 bg-[#202C33] border border-[#2A3942] outline-none px-3 rounded-lg text-sm font-mono"
                       />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[#E9EDEF] block mb-2">Nom de la marque</label>
                    <input 
                      type="text" 
                      value={brandName} 
                      onChange={e => setBrandName(e.target.value)}
                      className="w-full bg-[#202C33] border border-[#2A3942] outline-none p-3 rounded-lg text-sm text-[#E9EDEF] placeholder:text-[#8696A0]"
                      placeholder="Mon Gestionnaire Social..."
                    />
                  </div>

                  <div>
                     <label className="flex flex-col gap-2 bg-[#202C33] p-3 rounded-xl border border-[#2A3942]">
                       <div className="flex items-center gap-3">
                         <input type="checkbox" defaultChecked className="accent-[#00A884] w-4 h-4" />
                         <span className="text-sm font-medium">Masquer le logo "Propulsé par SocialGenius"</span>
                       </div>
                     </label>
                  </div>

                  <div className="pt-4 border-t border-[#202C33]">
                     <span className="text-sm font-medium text-[#E9EDEF] block mb-3">Aperçu en temps réel :</span>
                     <div className="border border-[#202C33] rounded-xl overflow-hidden shadow-2xl relative">
                        {/* Simulation widget header */}
                        <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: primaryColor }}>
                           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white shadow-inner">
                             {brandName.charAt(0)}
                           </div>
                           <span className="font-semibold text-white truncate">{brandName}</span>
                        </div>
                        <div className="bg-[#111B21] p-4 text-xs text-[#8696A0] h-24 flex items-center justify-center">
                           L'interface s'adaptera à cette couleur
                        </div>
                     </div>
                  </div>

                </div>
             </div>
             
             <button 
                onClick={() => {
                   window.parent.postMessage({
                     type: 'SOCIALGENIUS_EVENT',
                     action: 'config_saved',
                     data: { primaryColor, brandName }
                   }, '*');
                   alert('Configuration sauvegeardée et notifiée au site parent via postMessage !');
                }}
                className="w-full bg-[#00A884] text-[#111B21] font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
             >
                SAUVEGARDER LA CONFIGURATION
             </button>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-[#111B21] rounded-2xl p-4 border border-[#202C33]">
               <h3 className="text-[#8696A0] text-sm font-medium mb-3 flex items-center gap-2"><Code className="w-4 h-4"/> VOTRE CODE D'INTÉGRATION</h3>
               <p className="text-sm text-[#E9EDEF] mb-4">Copiez ce code et collez-le dans la balise <code>&lt;head&gt;</code> de votre site web :</p>
               
               <div className="relative group">
                  <pre className="bg-[#202C33] border border-[#2A3942] p-4 rounded-xl text-xs font-mono text-[#53BDEB] overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                  <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-[#111B21] border border-[#2A3942] rounded-lg text-[#8696A0] hover:text-[#E9EDEF] hover:bg-[#2A3942] transition-colors"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-[#00A884]" /> : <Copy className="w-4 h-4" />}
                  </button>
               </div>
            </div>

            <div className="bg-[#111B21] rounded-2xl p-4 border border-[#202C33]">
               <h3 className="text-[#8696A0] text-sm font-medium mb-3 uppercase tracking-wider">Tester l'intégration</h3>
               <div className="flex items-center gap-2">
                 <input 
                   type="text" 
                   placeholder="https://votre-site.com"
                   className="flex-1 bg-[#202C33] border border-[#2A3942] outline-none px-3 py-2.5 rounded-lg text-sm text-[#E9EDEF]"
                 />
                 <button className="px-4 py-2.5 bg-[#00A884] text-[#111B21] font-bold rounded-lg text-sm hover:bg-[#00C298]">
                   TESTER
                 </button>
               </div>
            </div>

            <div className="space-y-2">
               <button className="w-full flex items-center justify-between bg-[#202C33] p-3 rounded-xl border border-[#2A3942] hover:bg-[#2A3942] transition-colors text-sm font-medium">
                 <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Configurer le Widget Flottant</span>
                 <ChevronRight className="w-4 h-4 text-[#8696A0]" />
               </button>
               <button className="w-full flex items-center justify-between bg-[#202C33] p-3 rounded-xl border border-[#2A3942] hover:bg-[#2A3942] transition-colors text-sm font-medium">
                 <span className="flex items-center gap-2"><Code className="w-4 h-4" /> Documentation API REST</span>
                 <ChevronRight className="w-4 h-4 text-[#8696A0]" />
               </button>
            </div>
          </div>
        )}

        {activeTab === 'diagnostic' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="bg-[#111B21] rounded-2xl p-4 border border-[#202C33]">
                <h3 className="text-[#8696A0] text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> TESTS EN TEMPS RÉEL</h3>
                
                <div className="space-y-3 font-mono text-sm">
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#202C33] border border-[#2A3942]">
                     <span className="text-[#E9EDEF]">Connexion à l'API</span>
                     <span className="text-[#00A884] font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> OK (45ms)</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#202C33] border border-[#2A3942]">
                     <span className="text-[#E9EDEF]">Authentification SSO</span>
                     <span className="text-[#00A884] font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> OK</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#202C33] border border-[#2A3942]">
                     <span className="text-[#E9EDEF]">Chargement du widget</span>
                     <span className="text-[#00A884] font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> OK (1.2s)</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#202C33] border border-[#2A3942]">
                     <span className="text-[#E9EDEF]">WebSockets (temps réel)</span>
                     <span className="text-[#00A884] font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> OK</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#3A2C21] border border-[#FFB02E]/30">
                     <span className="text-[#E9EDEF]">Cache navigateur</span>
                     <span className="text-[#FFB02E] font-bold justify-end flex items-center gap-1 w-24"><AlertTriangle className="w-4 h-4" /> À vider</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg bg-[#3A1C21] border border-[#E95065]/30">
                     <span className="text-[#E9EDEF]">Sandbox iframe : Micro</span>
                     <span className="text-[#E95065] font-bold justify-end flex items-center gap-1 w-24"><XCircle className="w-4 h-4" /> Refusé</span>
                   </div>
                </div>
                
                <div className="mt-6 p-4 bg-[#00A884]/10 border border-[#00A884]/30 rounded-xl flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#00A884]/20 flex items-center justify-center shrink-0">
                     <ShieldCheck className="w-5 h-5 text-[#00A884]" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#E9EDEF] mb-1">Tous les systèmes sont (presque) opérationnels</h4>
                     <p className="text-sm text-[#8696A0]">L'intégration est active, mais certaines fonctionnalités natives comme l'enregistrement vocal nécessitent l'attribut <code>allow="microphone"</code> dans votre iframe.</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
               <button className="py-3 bg-[#2A3942] hover:bg-[#3A4A53] rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                 <RefreshCw className="w-4 h-4" /> Relancer
               </button>
               <button className="py-3 bg-transparent border border-[#2A3942] hover:bg-[#202C33] rounded-xl text-sm font-medium transition-colors">
                 Support
               </button>
             </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
