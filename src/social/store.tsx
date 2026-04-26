export interface SocialAccount {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  username: string;
  name: string;
  followers: number;
  avatar: string;
  status: 'active' | 'expired' | 'error';
  lastSync: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  autonomyLevel: number; // 0 to 100
  aiStatus: 'active' | 'learning' | 'attention' | 'issue';
  aiMode: 'full_auto' | 'supervised' | 'assisted' | 'emergency';
  confidenceScore: number;
  avatar: string;
  activeCampaigns: number;
  crisisLevel: 1 | 2 | 3 | 4 | 5; // 1: Normal, 2: Signal, 3: Negative, 4: Active Crisis, 5: Major
}

export interface IA_Task {
  id: string;
  clientId: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  type: 'scan_morning' | 'publish' | 'engage' | 'scan_noon' | 'scan_evening' | 'daily_report' | 'crisis_management';
  scheduledFor: string;
  progress: number;
}

export interface IA_Log {
  id: string;
  clientId: string;
  action: string;
  timestamp: string;
  type: 'publish' | 'engage' | 'analyze' | 'warning' | 'crisis' | 'system';
  details?: string;
}

export interface Post {
  id: string;
  clientId?: string;
  content: string;
  platforms: ('twitter' | 'linkedin' | 'instagram' | 'facebook')[];
  status: 'draft' | 'scheduled' | 'published' | 'failed' | 'ai-suggested';
  scheduledDate: string;
  media: string[];
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif';
  name: string;
  size: string;
  date: string;
}

export const initialClients: Client[] = [
  { id: 'c1', name: 'TechInnovate', industry: 'SaaS / B2B', autonomyLevel: 85, aiStatus: 'active', aiMode: 'full_auto', confidenceScore: 92, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80', activeCampaigns: 2, crisisLevel: 1 },
  { id: 'c2', name: 'GreenEats', industry: 'Food / B2C', autonomyLevel: 40, aiStatus: 'learning', aiMode: 'assisted', confidenceScore: 65, avatar: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=100&q=80', activeCampaigns: 1, crisisLevel: 2 },
  { id: 'c3', name: 'LuxeCorp', industry: 'Mode & Luxe', autonomyLevel: 10, aiStatus: 'attention', aiMode: 'supervised', confidenceScore: 88, avatar: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=100&q=80', activeCampaigns: 0, crisisLevel: 1 },
];

export const initialTasks: IA_Task[] = [
  { id: 't1', clientId: 'c1', title: 'Scan Matinal des Tendances SaaS', status: 'completed', type: 'scan_morning', scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), progress: 100 },
  { id: 't2', clientId: 'c1', title: 'Publication Automatique LinkedIn', status: 'running', type: 'publish', scheduledFor: new Date().toISOString(), progress: 45 },
  { id: 't3', clientId: 'c2', title: 'Veille Concurrentielle Food', status: 'pending', type: 'scan_noon', scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), progress: 0 },
  { id: 't4', clientId: 'c3', title: 'Réponse aux commentaires DM', status: 'pending', type: 'engage', scheduledFor: new Date(Date.now() + 1000 * 60 * 30).toISOString(), progress: 0 },
];

export const initialLogs: IA_Log[] = [
  { id: 'l1', clientId: 'c1', action: 'Publication automatique: "Les 5 tendances SaaS 2026"', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), type: 'publish' },
  { id: 'l2', clientId: 'c2', action: 'Apprentissage: Analyse des performances du format Carousel', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), type: 'analyze' },
  { id: 'l3', clientId: 'c3', action: 'Alerte: Baisse d\'engagement détectée (-15%). Suggestion de contenu requise.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: 'warning' },
  { id: 'l4', clientId: 'c1', action: 'Engagement: Réponse à 12 commentaires sur LinkedIn', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), type: 'engage' },
  { id: 'l5', clientId: 'c2', action: 'Veille: Nouvelle tendance "Vegan" détectée sur TikTok', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), type: 'analyze' },
];

export const initialAccounts: SocialAccount[] = [
  { id: '1', platform: 'twitter', username: '@cabinetpro', name: 'Cabinet ProDigital', followers: 8452, avatar: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100&q=80', status: 'active', lastSync: new Date().toISOString() },
  { id: '2', platform: 'linkedin', username: 'cabinet-prodigital', name: 'Cabinet ProDigital', followers: 3210, avatar: 'https://images.unsplash.com/photo-1556761175-129418cb210d?w=100&q=80', status: 'active', lastSync: new Date().toISOString() },
  { id: '3', platform: 'instagram', username: 'prodigital_officiel', name: 'Cabinet ProDigital', followers: 15600, avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&q=80', status: 'active', lastSync: new Date().toISOString() }
];

export const initialPosts: Post[] = [
  {
    id: '1',
    clientId: 'c1',
    content: 'Découvrez notre nouvelle offre de digitalisation pour les PME. #DigitalAfrique #Transformation',
    platforms: ['twitter', 'linkedin'],
    status: 'published',
    scheduledDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    media: ['https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80'],
    metrics: { likes: 145, shares: 32, comments: 12, views: 2450 }
  },
  {
    id: '101',
    clientId: 'c1',
    content: '🚀 Lancement de notre nouvelle feature IA ! Comment l\'IA va transformer votre support client. Lien en bio.',
    platforms: ['linkedin'],
    status: 'ai-suggested',
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    media: [] // ['https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80']
  },
  {
    id: '2',
    clientId: 'c2',
    content: 'Les 5 erreurs à éviter lors de la création de votre site vitrine. Lien dans la bio 🚀',
    platforms: ['instagram', 'facebook'],
    status: 'published',
    scheduledDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    media: ['https://images.unsplash.com/photo-1556761175-129418cb210d?w=400&q=80'],
    metrics: { likes: 342, shares: 15, comments: 24, views: 5600 }
  },
  {
    id: '102',
    clientId: 'c2',
    content: 'Recette du vendredi : Burger Végétalien au Jackfruit ! 🍔🌱 Dites-nous ce que vous en pensez en commentaire.',
    platforms: ['instagram'],
    status: 'ai-suggested',
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    media: []
  },
  {
    id: '3',
    clientId: 'c3',
    content: 'Heureux d\'annoncer notre nouveau partenariat avec la fondation pour l\'entrepreneuriat!',
    platforms: ['linkedin'],
    status: 'published',
    scheduledDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    media: ['https://images.unsplash.com/photo-1531123897727-8f129e1bf08c?w=400&q=80'],
    metrics: { likes: 89, shares: 10, comments: 5, views: 1200 }
  },
  {
    id: '4',
    content: 'Webinaire gratuit ce jeudi : Comment utiliser l\'IA pour votre PME ? Inscrivez-vous !',
    platforms: ['twitter', 'linkedin', 'facebook'],
    status: 'scheduled',
    scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    media: ['https://images.unsplash.com/photo-1573164574048-f968d7ee9f20?w=400&q=80']
  },
  {
    id: '6',
    content: 'Brouillon : Post sur les nouvelles régulations RGPD.',
    platforms: ['linkedin'],
    status: 'draft',
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    media: []
  },
  {
    id: '7',
    content: 'Félicitations à nos nouveaux gradués de la formation Excel Avancé ! 🎓',
    platforms: ['instagram', 'linkedin', 'facebook'],
    status: 'published',
    scheduledDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    media: ['https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80'],
    metrics: { likes: 520, shares: 80, comments: 45, views: 8900 }
  },
  {
    id: '8',
    content: 'Notre API plante ? Voici comment résoudre le problème en 3 étapes.',
    platforms: ['twitter'],
    status: 'failed',
    scheduledDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    media: []
  }
];

export const initialMedia: Media[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80', type: 'image', name: 'team_meeting.jpg', size: '2.4 MB', date: '2026-04-20' },
  { id: '2', url: 'https://images.unsplash.com/photo-1556761175-129418cb210d?w=800&q=80', type: 'image', name: 'office_work.jpg', size: '1.8 MB', date: '2026-04-21' },
  { id: '3', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf08c?w=800&q=80', type: 'image', name: 'presentation.jpg', size: '3.1 MB', date: '2026-04-22' },
  { id: '4', url: 'https://images.unsplash.com/photo-1573164574048-f968d7ee9f20?w=800&q=80', type: 'image', name: 'coding.jpg', size: '2.0 MB', date: '2026-04-23' },
  { id: '5', url: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=800&q=80', type: 'image', name: 'security_expert.jpg', size: '1.5 MB', date: '2026-04-24' },
  { id: '6', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80', type: 'image', name: 'graduation.jpg', size: '4.2 MB', date: '2026-04-25' },
  { id: '7', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2a?w=800&q=80', type: 'image', name: 'dashboard_ui.jpg', size: '1.1 MB', date: '2026-04-26' },
  { id: '8', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', type: 'image', name: 'weekend_vibes.jpg', size: '2.8 MB', date: '2026-04-26' }
];

export const platformColors = {
  twitter: '#000000', // X is black now, or blue (#1DA1F2)
  linkedin: '#0A66C2',
  instagram: '#E1306C',
  facebook: '#1877F2'
};

// Global Store Hook (Simple implementation using useState & Context isn't needed if we pass as props or use simple context)
// But for React simplicity we will create a lightweight context
import React, { createContext, useContext, useState } from 'react';

interface SocialContextType {
  accounts: SocialAccount[];
  clients: Client[];
  logs: IA_Log[];
  tasks: IA_Task[];
  posts: Post[];
  media: Media[];
  addPost: (post: Omit<Post, 'id' | 'status' | 'metrics'> & { status?: string }) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [logs, setLogs] = useState<IA_Log[]>(initialLogs);
  const [tasks, setTasks] = useState<IA_Task[]>(initialTasks);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [media, setMedia] = useState<Media[]>(initialMedia);

  const addPost = (postData: Omit<Post, 'id' | 'status' | 'metrics'> & { status?: string }) => {
    const newPost: Post = {
      ...postData,
      id: Math.random().toString(36).substring(7),
      status: (postData.status as any) || 'draft',
    };
    setPosts([newPost, ...posts]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };
  
  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <SocialContext.Provider value={{ accounts, clients, logs, tasks, posts, media, addPost, updatePost, deletePost, updateClient }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) throw new Error('useSocial must be used within SocialProvider');
  return context;
};
