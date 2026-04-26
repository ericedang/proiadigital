import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Image as ImageIcon, 
  Share2, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  Search,
  MessageSquare,
  Bell,
  X
} from 'lucide-react';
import { db, auth, logout } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { cn } from '../lib/utils';

const ADMIN_EMAIL = 'ericapple2021@gmail.com';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Article State
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Économie',
    content: '',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  });

  useEffect(() => {
    if (auth.currentUser?.email !== ADMIN_EMAIL) {
      onClose();
      return;
    }

    // Real-time listeners
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubInteractions = onSnapshot(query(collection(db, 'interactions'), orderBy('timestamp', 'desc')), (snapshot) => {
      setInteractions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubMessages = onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubArticles = onSnapshot(query(collection(db, 'articles'), orderBy('timestamp', 'desc')), (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubAppointments = onSnapshot(query(collection(db, 'appointments'), orderBy('startTime', 'desc')), (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    setLoading(false);

    return () => {
      unsubUsers();
      unsubInteractions();
      unsubServices();
      unsubMessages();
      unsubArticles();
      unsubAppointments();
    };
  }, [onClose]);

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'articles'), {
        ...newArticle,
        timestamp: Timestamp.now(),
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      setNewArticle({
        title: '',
        category: 'Économie',
        content: '',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
      });
      alert('Article publié avec succès !');
    } catch (error) {
      console.error('Error publishing article:', error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Supprimer cet article ?')) {
      await deleteDoc(doc(db, 'articles', id));
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    await updateDoc(doc(db, 'messages', id), { status: 'read' });
  };

  if (auth.currentUser?.email !== ADMIN_EMAIL) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-display font-black tracking-tighter">
            PRO DIGITAL <span className="text-accent">ADMIN</span>
          </h2>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Expert Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
            { id: 'publications', label: 'Publications', icon: FileText },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'appointments', label: 'Rendez-vous', icon: Bell },
            { id: 'media', label: 'Médiathèque', icon: ImageIcon },
            { id: 'crm', label: 'Répertoire Clients', icon: Users },
            { id: 'settings', label: 'Paramètres', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-none text-sm font-bold transition-all uppercase tracking-widest",
                activeTab === item.id ? "bg-accent text-primary" : "hover:bg-white/5 text-slate-400"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-primary uppercase tracking-widest">
              {activeTab.replace('-', ' ')}
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-primary relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{auth.currentUser?.displayName}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Admin Principal</p>
              </div>
              <img src={auth.currentUser?.photoURL || ''} className="w-10 h-10 rounded-none border-2 border-accent" alt="" />
              <button onClick={onClose} className="ml-4 p-2 hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Visites Total', value: '12,450', trend: '+12%', color: 'bg-blue-500' },
                    { label: 'Nouveaux Clients', value: users.length, trend: '+5%', color: 'bg-accent' },
                    { label: 'Interactions', value: interactions.length, trend: '+18%', color: 'bg-green-500' },
                    { label: 'Services Actifs', value: services.length || 8, trend: '0%', color: 'bg-purple-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 border-b-4 border-primary shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-black text-primary">{stat.value}</h4>
                        <span className="text-xs font-bold text-green-500">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 border border-slate-200">
                    <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                      <MessageSquare size={18} className="text-accent" />
                      Dernières Interactions
                    </h4>
                    <div className="space-y-4">
                      {interactions.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 border-l-4 border-accent">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-primary">{item.userName || 'Anonyme'}</p>
                            <p className="text-xs text-slate-500 mt-1">{item.action || 'A consulté un service'}</p>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">
                            {item.timestamp?.toDate().toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 border border-slate-200">
                    <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Share2 size={18} className="text-accent" />
                      Réseaux Sociaux Clients
                    </h4>
                    <div className="space-y-4">
                      {['TechCorp Solutions', 'Global Retail', 'Startup Vision'].map((client, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 hover:border-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black">
                              {client[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary">{client}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">3 posts programmés</p>
                            </div>
                          </div>
                          <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline">
                            Gérer
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'publications' && (
              <motion.div
                key="publications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1 bg-white p-8 border border-slate-200">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Nouvel Article</h4>
                  <form onSubmit={handlePublishArticle} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre</label>
                      <input 
                        required
                        type="text" 
                        value={newArticle.title}
                        onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-accent"
                        placeholder="Titre de l'article..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</label>
                      <select 
                        value={newArticle.category}
                        onChange={e => setNewArticle({...newArticle, category: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-accent"
                      >
                        <option>Économie</option>
                        <option>Régional</option>
                        <option>Cameroun</option>
                        <option>Digital</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contenu</label>
                      <textarea 
                        required
                        rows={6}
                        value={newArticle.content}
                        onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-accent"
                        placeholder="Texte de l'article..."
                      />
                    </div>
                    <button type="submit" className="w-full bg-accent text-primary py-4 text-xs font-black uppercase tracking-widest">
                      Publier l'article
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 bg-white p-8 border border-slate-200">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Articles Publiés</h4>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border border-slate-100">
                        <div className="flex items-center gap-4">
                          <img src={article.image} className="w-16 h-16 object-cover" alt="" />
                          <div>
                            <p className="text-sm font-bold text-primary">{article.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{article.category} • {article.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-primary"><Edit3 size={18} /></button>
                          <button onClick={() => handleDeleteArticle(article.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments' && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 border border-slate-200"
              >
                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Gestion des Rendez-vous</h4>
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-6 border border-slate-100 bg-slate-50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm font-bold text-primary">{apt.clientName}</p>
                          <p className="text-xs text-slate-500">{apt.clientEmail}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-3 py-1",
                          apt.status === 'confirmed' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                        )}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service</p>
                          <p className="text-sm font-bold text-primary">{apt.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Heure</p>
                          <p className="text-sm font-bold text-primary">
                            {apt.startTime?.toDate().toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      {apt.reasons && (
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Raisons</p>
                          <p className="text-sm text-slate-600 italic">"{apt.reasons}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-slate-200"
              >
                <div className="p-6 border-b border-slate-100">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest">Messages Reçus</h4>
                </div>
                <div className="divide-y divide-slate-100">
                  {messages.map((msg) => (
                    <div key={msg.id} className={cn("p-6 transition-colors", msg.status === 'unread' ? "bg-accent/5" : "bg-white")}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm font-bold text-primary">{msg.name}</p>
                          <p className="text-xs text-slate-500">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {msg.timestamp?.toDate().toLocaleString()}
                          </span>
                          {msg.status === 'unread' && (
                            <button 
                              onClick={() => handleMarkMessageRead(msg.id)}
                              className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline"
                            >
                              Marquer comme lu
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 border-l-4 border-accent">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Sujet: {msg.subject}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="p-20 text-center text-slate-400">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-bold uppercase tracking-widest text-xs">Aucun message pour le moment</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'crm' && (
              <motion.div
                key="crm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-slate-200 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rechercher un client..." 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-none text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <button className="bg-accent text-primary px-6 py-2 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Plus size={16} />
                    Ajouter Client
                  </button>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière Activité</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.photoURL} className="w-8 h-8 rounded-none border border-accent" alt="" />
                            <span className="text-sm font-bold text-primary">{u.displayName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {u.lastLogin?.toDate().toLocaleDateString() || 'Récemment'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary"><Edit3 size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-white p-8 border border-slate-200">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Modifier les Services</h4>
                  <div className="space-y-6">
                    {['Formation', 'Séminaires', 'Web & Apps'].map((s, i) => (
                      <div key={i} className="p-4 bg-slate-50 border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-primary">{s}</span>
                          <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-primary"><Edit3 size={14} /></button>
                            <button className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <textarea 
                          className="w-full p-3 text-xs bg-white border border-slate-200 outline-none focus:border-accent"
                          placeholder="Description du service..."
                          rows={3}
                        />
                        <button className="mt-2 text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-1">
                          <Save size={12} />
                          Enregistrer
                        </button>
                      </div>
                    ))}
                    <button className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                      <Plus size={18} />
                      Ajouter un nouveau service
                    </button>
                  </div>
                </div>

                <div className="bg-white p-8 border border-slate-200">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Textes & Hero</h4>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre Principal (Hero)</label>
                      <input 
                        type="text" 
                        defaultValue="Découvrir le Savoir Africain"
                        className="w-full p-4 bg-slate-50 border border-slate-200 font-display font-bold text-primary outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sous-titre (Hero)</label>
                      <textarea 
                        rows={4}
                        defaultValue="Le développement est basé sur la connaissance et la pensée..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 text-sm text-slate-600 outline-none focus:border-accent"
                      />
                    </div>
                    <button className="bg-primary text-white px-8 py-3 text-xs font-black uppercase tracking-widest">
                      Mettre à jour le site
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// MJ Commit
