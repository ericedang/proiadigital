import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSocial } from './store';
import { Activity, BrainCircuit, AlertTriangle, CheckCircle2, TrendingUp, RefreshCcw, Bell, ShieldAlert, Clock, Pause, Play, Ban, Check, X } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') return <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold border border-emerald-500/20"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Actif</span>;
  if (status === 'attention') return <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full text-xs font-bold border border-amber-500/20"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Validation Requise</span>;
  if (status === 'learning') return <span className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full text-xs font-bold border border-blue-500/20"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Apprentissage</span>;
  return null;
};

const CrisisBadge = ({ level }: { level: number }) => {
  if (level === 1) return <span className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Normal</span>;
  if (level === 2) return <span className="text-xs text-yellow-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Signal Faible</span>;
  if (level === 3) return <span className="text-xs text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Tendance Négative</span>;
  if (level === 4) return <span className="text-xs text-red-500 font-bold flex items-center gap-1"><ShieldAlert className="w-3 h-3 animate-pulse" /> Crise Active</span>;
  if (level === 5) return <span className="text-xs text-red-700 font-bold flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded-md"><ShieldAlert className="w-3 h-3 animate-ping" /> Crise Majeure</span>;
  return null;
};

export default function IAControlCenter() {
  const { clients, logs, tasks, isLiveMode, setIsLiveMode, addLog, addTask, updateTask, updateLog, updateClient } = useSocial();

  const activeClients = clients.filter(c => c.aiStatus === 'active').length;
  const avgConfidence = Math.round(clients.reduce((acc, c) => acc + c.confidenceScore, 0) / clients.length);

  // Simulation Logic
  useEffect(() => {
    let interval: any;
    if (isLiveMode) {
      interval = setInterval(() => {
        const rand = Math.random();
        
        // Update random running task
        const runningTasks = tasks.filter(t => t.status === 'running');
        if (runningTasks.length > 0) {
          const task = runningTasks[Math.floor(Math.random() * runningTasks.length)];
          if (task.progress >= 100) {
            updateTask(task.id, { status: 'completed' });
            addLog({
              clientId: task.clientId,
              action: `Tâche terminée : ${task.title}`,
              type: 'system',
            });
          } else {
            updateTask(task.id, { progress: task.progress + Math.floor(Math.random() * 20) });
          }
        } else if (rand > 0.5) {
          // Change a pending to running
          const pendingTasks = tasks.filter(t => t.status === 'pending');
          if (pendingTasks.length > 0) {
             const task = pendingTasks[Math.floor(Math.random() * pendingTasks.length)];
             updateTask(task.id, { status: 'running', progress: 5 });
          }
        }

        // Random new event requiring validation
        if (rand > 0.85) {
           const client = clients[Math.floor(Math.random() * clients.length)];
           const crisis = Math.random() > 0.7;
           addLog({
             clientId: client.id,
             action: crisis ? `Alerte: Sentiment très négatif détecté. Suspendre les campagnes ?` : `Suggestion: Réponse générée pour commentaire critique.`,
             type: crisis ? 'crisis' : 'engage',
             validationStatus: 'pending'
           });
           if (crisis) updateClient(client.id, { crisisLevel: 4, aiStatus: 'attention' });
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLiveMode, tasks, clients, addLog, addTask, updateTask, updateLog, updateClient]);

  const handleValidate = (logId: string, clientId: string, approved: boolean) => {
     updateLog(logId, { validationStatus: approved ? 'approved' : 'rejected' });
     addLog({
        clientId,
        action: `Décision IA ${approved ? 'Approuvée' : 'Rejetée'} par l'humain. Score de confiance mis à jour.`,
        type: 'system'
     });
     // Reset crisis if approved
     const client = clients.find(c => c.id === clientId);
     if (client && client.crisisLevel > 1) {
        updateClient(clientId, { crisisLevel: 1, aiStatus: 'active' });
     }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200 mb-2">Centre de Contrôle IA</h1>
          <p className="text-slate-400">Supervision en temps réel de votre assistant CM virtuel.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 border transition-all ${
               isLiveMode ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-lg shadow-red-500/20' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {isLiveMode ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
            {isLiveMode ? 'Arrêter Simulation' : 'Live Simulation'}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Mise à jour en temps réel</span>
            <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-emerald-500 animate-ping' : 'bg-slate-700'}`} />
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400"><BrainCircuit className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-slate-500 uppercase">État Global</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">Opérationnel</h3>
          <p className="text-sm text-emerald-400">Aucune anomalie détectée</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400"><TrendingUp className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-slate-500 uppercase">Confiance</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{avgConfidence}%</h3>
          <p className="text-sm text-slate-400">Score moyen de prédiction</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Activity className="w-6 h-6" /></div>
            <span className="text-xs font-bold text-slate-500 uppercase">Charge Cognitive</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">34%</h3>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '34%' }}></div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* File d'exécution (Tasks) */}
        <div className="xl:col-span-2 bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">File d'Exécution IA</h2>
              <p className="text-xs text-slate-400">Tâches planifiées et en cours</p>
            </div>
            <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 transition-colors">
              Gérer la file
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map(task => {
              const client = clients.find(c => c.id === task.clientId);
              return (
                <div key={task.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${
                      task.status === 'running' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      task.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      'bg-slate-800/50 border-slate-700 text-slate-400'
                    }`}>
                      {task.status === 'running' ? <Activity className="w-4 h-4 animate-spin" /> : 
                       task.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                       <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{task.title}</h4>
                      <p className="text-xs text-slate-400">{client?.name} • {new Date(task.scheduledFor).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {task.status === 'running' && (
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] text-amber-400 mb-1">
                          <span>Progression</span>
                          <span>{Math.min(task.progress, 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full w-full">
                          <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${Math.min(task.progress, 100)}%` }}></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                       {task.status === 'running' ? (
                         <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"><Pause className="w-3.5 h-3.5" /></button>
                       ) : task.status === 'pending' ? (
                         <button className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"><Play className="w-3.5 h-3.5" /></button>
                       ) : null}
                       {task.status !== 'completed' && (
                         <button className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"><Ban className="w-3.5 h-3.5" /></button>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Logs & Decisions */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Dernières Décisions & Logs</h2>
            <RefreshCcw className={`w-4 h-4 text-slate-500 ${isLiveMode ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
            {logs.map((log) => {
              const client = clients.find(c => c.id === log.clientId);
              return (
                <motion.div initial={{opacity:0, height: 0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0}} key={log.id} className="relative pl-6 pb-4 border-l border-white/10 last:border-transparent last:pb-0 overflow-hidden">
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${
                    log.type === 'publish' ? 'bg-emerald-400' :
                    log.type === 'crisis' ? 'bg-red-500 animate-pulse' :
                    log.type === 'warning' ? 'bg-amber-400' :
                    log.type === 'analyze' ? 'bg-blue-400' : 'bg-purple-400'
                  }`} />
                  <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">
                    <span>{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                    <span className="font-medium text-slate-400">{client?.name}</span>
                  </div>
                  <p className="text-sm text-slate-200">{log.action}</p>
                  
                  {log.validationStatus === 'pending' && (
                    <div className="flex gap-2 mt-3 mb-1">
                      <button onClick={() => handleValidate(log.id, log.clientId, true)} className="flex-1 flex items-center justify-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold py-1.5 rounded-lg border border-emerald-500/20 transition-colors">
                        <Check className="w-3.5 h-3.5" /> Approuver
                      </button>
                      <button onClick={() => handleValidate(log.id, log.clientId, false)} className="flex-1 flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold py-1.5 rounded-lg border border-red-500/20 transition-colors">
                        <X className="w-3.5 h-3.5" /> Refuser
                      </button>
                    </div>
                  )}
                  {log.validationStatus === 'approved' && (
                     <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md"><Check className="w-3 h-3"/> Approuvé (Confiance +)</div>
                  )}
                  {log.validationStatus === 'rejected' && (
                     <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md"><X className="w-3 h-3"/> Rejeté (Apprentissage)</div>
                  )}
                </motion.div>
              )
            })}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Clients Supervision */}
        <div className="xl:col-span-3 bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Supervision Clients & Crises</h2>
            <div className="text-xs text-slate-400 flex gap-4">
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Full Auto</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Supervisé</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map(client => (
              <div key={client.id} className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors relative overflow-hidden group">
                {client.crisisLevel > 3 && (
                   <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{client.name}</h4>
                    <p className="text-xs text-slate-400">{client.industry}</p>
                  </div>
                </div>

                <div className="space-y-3 relative z-10 mt-2">
                  <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-2 px-3 border border-white/5">
                    <span className="text-xs text-slate-400">Mode IA</span>
                    <span className="text-xs text-amber-400 font-bold uppercase">{client.aiMode.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-2 px-3 border border-white/5">
                    <span className="text-xs text-slate-400">Niveau de Crise</span>
                    <CrisisBadge level={client.crisisLevel} />
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-2 px-3 border border-white/5">
                    <span className="text-xs text-slate-400">Statut Global</span>
                    <StatusBadge status={client.aiStatus} />
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
