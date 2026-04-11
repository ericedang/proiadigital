import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Check, CreditCard, Smartphone, Landmark, FileText, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const products = [
  // Digitalisation
  { id: 'p1', name: 'Pack Digitalisation PME', price: 450000, category: 'Digitalisation', desc: 'Propulsez votre entreprise dans l\'ère moderne. Ce pack transforme vos processus manuels en flux digitaux fluides, vous permettant de gagner 30% de productivité dès le premier trimestre. Inclut un site web haute performance et une stratégie sociale automatisée.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p11', name: 'Pack Web Vitrine', price: 300000, category: 'Digitalisation', desc: 'Ne soyez plus invisible. Attirez de nouveaux clients avec une vitrine digitale qui reflète votre excellence. Un site optimisé pour convertir vos visiteurs en partenaires fidèles.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800' },
  { id: 'p12', name: 'E-commerce Starter', price: 600000, category: 'Digitalisation', desc: 'Vendez partout, tout le temps. Ouvrez votre boutique au monde entier et simplifiez vos encaissements. Une solution clé en main pour booster votre chiffre d\'affaires sans limites géographiques.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800' },
  { id: 'p13', name: 'Application Mobile MVP', price: 1500000, category: 'Digitalisation', desc: 'Soyez dans la poche de vos clients. Fidélisez votre audience avec une application mobile intuitive qui facilite l\'accès à vos services et renforce votre image de marque innovante.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800' },
  { id: 'p24', name: 'Refonte Site Web', price: 200000, category: 'Digitalisation', desc: 'Redonnez vie à votre image numérique. Améliorez l\'expérience utilisateur et la vitesse de votre site pour réduire le taux de rebond et multiplier vos contacts qualifiés.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800' },
  { id: 'p25', name: 'Intégration API Tierce', price: 150000, category: 'Digitalisation', desc: 'Faites communiquer vos outils. Automatisez le transfert de données entre vos logiciels pour éliminer les erreurs de saisie et libérer du temps pour vos tâches à haute valeur ajoutée.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800' },
  
  // Gestion & Comptabilité
  { id: 'p2', name: 'Logiciel Gestion Comptable', price: 250000, category: 'Gestion', desc: 'Prenez des décisions basées sur des chiffres réels. Simplifiez votre tenue de compte et générez vos états financiers en un clic pour une visibilité totale sur votre santé financière.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p8', name: 'Logiciel de Paie (Annuel)', price: 350000, category: 'Gestion', desc: 'Zéro erreur, zéro stress. Automatisez vos bulletins de paie et la gestion de vos RH pour garantir la conformité légale et la satisfaction de vos collaborateurs.', image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800' },
  { id: 'p26', name: 'Audit Comptable Annuel', price: 500000, category: 'Gestion', desc: 'Sécurisez votre patrimoine. Identifiez les risques et optimisez vos processus financiers pour rassurer vos partenaires et investisseurs grâce à une expertise certifiée.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800' },
  { id: 'p27', name: 'Externalisation Comptable', price: 150000, category: 'Gestion', desc: 'Concentrez-vous sur votre cœur de métier. Confiez votre comptabilité à nos experts et bénéficiez d\'un suivi rigoureux sans les coûts d\'un service interne.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800' },
  { id: 'p28', name: 'Conseil en Trésorerie', price: 100000, category: 'Gestion', desc: 'Optimisez chaque franc. Maîtrisez vos flux de trésorerie pour anticiper vos besoins de financement et maximiser vos opportunités d\'investissement.', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800' },

  // Formation
  { id: 'p3', name: 'Formation Expert Digital', price: 150000, category: 'Formation', desc: 'Devenez le leader de demain. Maîtrisez les outils qui transforment les industries. Cette formation vous donne les clés pour piloter des projets complexes et innover dans un monde numérique.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
  { id: 'p9', name: 'Formation Excel Avancé', price: 85000, category: 'Formation', desc: 'Gagnez des heures de travail chaque semaine. Apprenez à automatiser vos rapports et à analyser des données complexes pour devenir l\'élément indispensable de votre équipe.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800' },
  { id: 'p10', name: 'Formation Management', price: 125000, category: 'Formation', desc: 'Inspirez l\'excellence. Développez un leadership authentique pour mobiliser vos équipes vers des objectifs ambitieux et créer un environnement de travail productif.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p17', name: 'Formation Design Thinking', price: 95000, category: 'Formation', desc: 'Innovez par l\'empathie. Apprenez une méthodologie éprouvée pour résoudre des problèmes complexes et créer des produits que vos clients vont adorer.', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
  { id: 'p29', name: 'Formation Cybersécurité', price: 180000, category: 'Formation', desc: 'Protégez votre avenir numérique. Apprenez à identifier les menaces et à sécuriser vos données critiques pour éviter des pertes financières et réputationnelles majeures.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { id: 'p30', name: 'Atelier Intelligence Artificielle', price: 200000, category: 'Formation', desc: 'Ne vous laissez pas dépasser. Intégrez l\'IA générative dans votre quotidien pour multiplier votre créativité et votre vitesse d\'exécution par dix.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },

  // Marketing & Réseaux Sociaux
  { id: 'p5', name: 'Pack SEO Local', price: 120000, category: 'Marketing', desc: 'Soyez le premier choix dans votre ville. Dominez les résultats de recherche locaux pour attirer les clients qui cherchent vos services juste à côté de chez vous.', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', name: 'Gestion Communauté (1 mois)', price: 200000, category: 'Marketing', desc: 'Créez un lien indéfectible avec votre audience. Transformez vos abonnés en ambassadeurs passionnés grâce à une animation experte et stratégique de vos réseaux.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
  { id: 'p18', name: 'Pack Réseaux Sociaux', price: 150000, category: 'Marketing', desc: 'Une image de marque cohérente partout. Optimisez vos profils pour projeter une image professionnelle qui inspire confiance et autorité dans votre secteur.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800' },
  { id: 'p19', name: 'Vidéo Corporate (1 min)', price: 250000, category: 'Marketing', desc: 'Racontez votre histoire avec impact. Captivez votre audience avec une vidéo de haute qualité qui humanise votre entreprise et explique clairement votre valeur ajoutée.', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800' },
  { id: 'p20', name: 'Rédaction Contenu (10 art.)', price: 100000, category: 'Marketing', desc: 'Devenez une autorité dans votre domaine. Attirez du trafic organique qualifié avec des articles experts qui répondent aux questions de vos futurs clients.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p31', name: 'Campagne Google Ads', price: 300000, category: 'Marketing', desc: 'Des résultats immédiats. Ciblez précisément les personnes prêtes à acheter vos services et maximisez votre retour sur investissement publicitaire.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },

  // Conseil & Audit
  { id: 'p4', name: 'Audit Digital Complet', price: 75000, category: 'Conseil', desc: 'Identifiez vos leviers de croissance. Obtenez une feuille de route claire pour moderniser votre structure et surpasser vos concurrents sur le plan technologique.', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800' },
  { id: 'p14', name: 'Support Technique (10h)', price: 100000, category: 'Conseil', desc: 'La tranquillité d\'esprit garantie. Bénéficiez d\'une assistance réactive pour résoudre vos blocages techniques et maintenir vos outils en parfait état de marche.', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800' },
  { id: 'p15', name: 'Conseil Stratégie Fiscale', price: 200000, category: 'Conseil', desc: 'Optimisez votre rentabilité. Naviguez sereinement dans la complexité fiscale de la zone CEMAC et réduisez vos charges en toute légalité.', image: 'https://images.unsplash.com/photo-1554224155-1696413575a8?auto=format&fit=crop&q=80&w=800' },
  { id: 'p16', name: 'Audit Sécurité Informatique', price: 400000, category: 'Conseil', desc: 'Anticipez les cyberattaques. Dormez sur vos deux oreilles en sachant que vos systèmes sont protégés contre les intrusions et le vol de données.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
  { id: 'p23', name: 'Analyse Données PowerBI', price: 300000, category: 'Conseil', desc: 'Visualisez votre succès. Transformez vos données brutes en tableaux de bord parlants pour piloter votre activité avec une précision chirurgicale.', image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p32', name: 'Conseil Juridique Digital', price: 250000, category: 'Conseil', desc: 'Soyez en règle, soyez serein. Protégez votre entreprise et vos clients en vous conformant aux réglementations sur les données personnelles (RGPD/Loi locale).', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800' },

  // Événementiel
  { id: 'p21', name: 'Gestion Projet Événementiel', price: 500000, category: 'Événementiel', desc: 'Marquez les esprits. Confiez-nous l\'organisation de vos événements pour une exécution sans faille qui valorise votre image auprès de vos partenaires.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
  { id: 'p22', name: 'Solution Billetterie En Ligne', price: 150000, category: 'Événementiel', desc: 'Simplifiez l\'accès à vos événements. Offrez une expérience d\'achat fluide à vos participants et gérez vos entrées avec une technologie moderne et sécurisée.', image: 'https://images.unsplash.com/photo-1505373633560-828303b5572b?auto=format&fit=crop&q=80&w=800' },
  { id: 'p33', name: 'Streaming Live Événement', price: 400000, category: 'Événementiel', desc: 'Élargissez votre audience. Diffusez vos conférences au-delà des murs de la salle et touchez des milliers de personnes en temps réel avec une qualité pro.', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800' },
  { id: 'p34', name: 'Application Mobile Événement', price: 800000, category: 'Événementiel', desc: 'Engagez vos participants. Offrez un outil interactif pour le networking, l\'agenda et les questions-réponses, rendant votre événement inoubliable.', image: 'https://images.unsplash.com/photo-1505373633560-828303b5572b?auto=format&fit=crop&q=80&w=800' },

  // Design
  { id: 'p7', name: 'Création Logo & Charte', price: 180000, category: 'Design', desc: 'Une identité qui impose le respect. Démarquez-vous avec un design unique qui communique instantanément vos valeurs et votre professionnalisme.', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde3?auto=format&fit=crop&q=80&w=800' },
  { id: 'p35', name: 'Design Interface UI/UX', price: 450000, category: 'Design', desc: 'Le plaisir d\'utilisation au service de la performance. Concevez des outils que vos utilisateurs vont adorer utiliser, augmentant ainsi leur fidélité et votre efficacité.', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800' },
  { id: 'p36', name: 'Montage Vidéo Publicitaire', price: 150000, category: 'Design', desc: 'Vendez plus avec l\'image. Créez des spots percutants qui captent l\'attention en quelques secondes et poussent vos prospects à l\'action.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800' },
  
  // Savoir & Développement
  { id: 'p37', name: 'Étude de Marché Afrique', price: 700000, category: 'Savoir', desc: 'Réduisez l\'incertitude. Obtenez des données terrain précises pour réussir votre implantation ou le lancement de votre nouveau produit sur le continent.', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800' },
  { id: 'p38', name: 'Rapport Économique CEMAC', price: 300000, category: 'Savoir', desc: 'Anticipez les tendances régionales. Accédez à une analyse pointue des enjeux économiques pour orienter vos investissements stratégiques avec assurance.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p39', name: 'Accompagnement Startup', price: 1000000, category: 'Savoir', desc: 'Passez de l\'idée au succès. Bénéficiez d\'un mentorat de haut niveau pour structurer votre projet, lever des fonds et accélérer votre croissance.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800' },
  { id: 'p40', name: 'Conférence Thématique', price: 250000, category: 'Savoir', desc: 'Éclairez vos décisions. Profitez de l\'expertise de nos consultants sur les grands enjeux du numérique pour inspirer vos équipes et vos partenaires.', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800' }
];

export default function Shop({ isOpen, onClose, fullPage = false }: { isOpen: boolean, onClose: () => void, fullPage?: boolean }) {
  const [step, setStep] = useState<'browse' | 'quote' | 'payment' | 'success'>('browse');
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'om' | 'card' | 'bank' | 'later' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleOpenShop = (e: any) => {
      const productId = e.detail?.productId;
      if (productId) {
        setStep('browse');
        setSearchQuery(''); // Clear search to ensure product is visible
        setTimeout(() => {
          const element = document.getElementById(`product-${productId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-accent', 'ring-offset-4');
            setTimeout(() => element.classList.remove('ring-4', 'ring-accent', 'ring-offset-4'), 3000);
          }
        }, 500);
      }
    };
    window.addEventListener('open-shop', handleOpenShop);
    return () => window.removeEventListener('open-shop', handleOpenShop);
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addToCart = (p: any) => {
    setCart([...cart, p]);
    setStep('quote');
  };

  const handleConfirmOrder = async () => {
    if (!auth.currentUser) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    setLoading(true);
    const path = 'orders';
    try {
      const orderData = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Client Anonyme',
        userEmail: auth.currentUser.email || 'Pas d\'email',
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price })),
        total,
        paymentMethod,
        status: paymentMethod === 'later' ? 'later' : 'pending',
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, path), orderData);
      
      setLoading(false);
      setStep('success');
    } catch (error) {
      setLoading(false);
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={fullPage ? 'pt-28 pb-20 px-6 min-h-screen bg-surface' : 'fixed inset-0 z-[300] flex items-center justify-end'}>
          {!fullPage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
          )}
          
          <motion.div 
            initial={fullPage ? { opacity: 0, y: 10 } : { x: '100%' }}
            animate={fullPage ? { opacity: 1, y: 0 } : { x: 0 }}
            exit={fullPage ? { opacity: 0 } : { x: '100%' }}
            transition={fullPage ? { duration: 0.3 } : { type: 'spring', damping: 25, stiffness: 200 }}
            className={fullPage ? 'max-w-7xl mx-auto' : 'relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col'}
          >
            {/* Header */}
            {fullPage ? (
              <div className="mb-12">
                <span className="inline-block px-4 py-1.5 mb-6 border border-accent/20 text-xs font-bold tracking-widest text-accent uppercase bg-accent/5">
                  Solutions & Services
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4">
                  Boutique <span className="text-accent">Digitale</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg">Découvrez nos solutions et services experts pour la transformation de votre structure.</p>
              </div>
            ) : (
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div>
                  <h2 className="text-2xl font-display font-black tracking-tighter uppercase">
                    Boutique <span className="text-accent">Digitale</span>
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Solutions & Services Experts</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 transition-colors">
                  <X size={24} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className={fullPage ? '' : 'flex-1 overflow-y-auto p-8'}>
              {step === 'browse' && (
                <div className="space-y-8">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Rechercher un produit, une catégorie..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 outline-none focus:border-accent font-medium text-primary"
                    />
                  </div>

                  {/* Category Quick Links */}
                  <div className="sticky top-0 z-10 bg-white py-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSearchQuery(cat)}
                        className={cn(
                          "whitespace-nowrap px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors",
                          searchQuery === cat ? "bg-accent text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <div 
                          key={p.id} 
                          id={`product-${p.id}`}
                          className="group flex flex-col md:flex-row gap-6 bg-slate-50 p-6 border border-slate-200 hover:border-accent transition-all"
                        >
                          <div className="w-full md:w-40 h-40 shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-lg font-bold text-primary uppercase tracking-tight">{p.name}</h3>
                              <span className="text-[8px] font-black bg-primary/5 text-slate-400 px-2 py-0.5 uppercase tracking-widest">{p.category}</span>
                            </div>
                            <div className="relative">
                              <p className={cn(
                                "text-xs text-slate-500 mb-4 leading-relaxed",
                                !expandedProducts.includes(p.id) && "line-clamp-2"
                              )}>
                                {p.desc}
                              </p>
                              {p.desc.length > 100 && (
                                <button 
                                  onClick={() => toggleExpand(p.id)}
                                  className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline mb-4 block"
                                >
                                  {expandedProducts.includes(p.id) ? 'Réduire' : 'Lire la suite'}
                                </button>
                              )}
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <span className="text-xl font-black text-primary">{p.price.toLocaleString()} FCFA</span>
                              <button 
                                onClick={() => addToCart(p)}
                                className="bg-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
                              >
                                Commander
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">Aucun produit trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 'quote' && (
                <div className="space-y-8">
                  <div className="bg-slate-50 p-6 border-l-4 border-accent">
                    <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-widest">Votre Sélection</h3>
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                        <span className="text-sm font-medium text-slate-600">{item.name}</span>
                        <span className="text-sm font-bold text-primary">{item.price.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-slate-300 flex justify-between items-center">
                      <span className="font-black text-primary uppercase tracking-widest">Total</span>
                      <span className="text-xl font-black text-accent">{total.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}>
                    <h3 className="text-lg font-bold text-primary uppercase tracking-widest">Demande de Devis / Proforma</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom Complet / Entreprise</label>
                        <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-200 outline-none focus:border-accent font-bold text-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Professionnel</label>
                        <input required type="email" className="w-full p-4 bg-slate-50 border border-slate-200 outline-none focus:border-accent font-bold text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Détails de votre sollicitation</label>
                      <textarea required rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 outline-none focus:border-accent text-sm text-slate-600" placeholder="Décrivez vos besoins spécifiques..."></textarea>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep('browse')}
                        className="flex-1 py-4 border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                      >
                        Retour
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-widest hover:bg-black transition-all"
                      >
                        Valider & Payer
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-primary uppercase tracking-widest">Devis Proforma Généré</h3>
                    <p className="text-sm text-slate-500 mt-2">Choisissez votre mode de paiement pour finaliser l'achat direct.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'momo', label: 'MTN Mobile Money', icon: Smartphone, color: 'border-yellow-400' },
                      { id: 'om', label: 'Orange Money', icon: Smartphone, color: 'border-orange-500' },
                      { id: 'card', label: 'Carte Bancaire (Visa/Mastercard)', icon: CreditCard, color: 'border-accent' },
                      { id: 'bank', label: 'Virement Bancaire', icon: Landmark, color: 'border-blue-600' },
                      { id: 'later', label: 'Commander & Payer plus tard', icon: Check, color: 'border-slate-400' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={cn(
                          "flex items-center gap-6 p-6 border-2 transition-all text-left",
                          paymentMethod === method.id ? method.color + " bg-slate-50" : "border-slate-100 hover:border-slate-300"
                        )}
                      >
                        <div className={cn("p-3 rounded-none", method.color.replace('border', 'bg'))}>
                          <method.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-black text-primary uppercase tracking-widest">{method.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Paiement sécurisé</p>
                        </div>
                        {paymentMethod === method.id && <Check className="ml-auto text-green-500" />}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={!paymentMethod || loading}
                    onClick={handleConfirmOrder}
                    className="w-full py-6 bg-primary text-white font-black uppercase tracking-widest hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" /> : 'Confirmer la Commande'}
                  </button>
                </div>
              )}

              {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Check size={48} />
                  </div>
                  <h3 className="text-3xl font-display font-black text-primary uppercase tracking-tighter">Félicitations !</h3>
                  <p className="text-slate-500 max-w-sm">
                    Votre commande a été enregistrée avec succès. Notre équipe vous contactera dans les plus brefs délais pour la mise en œuvre de votre service.
                  </p>
                  <button 
                    onClick={() => { setStep('browse'); setCart([]); setPaymentMethod(null); onClose(); }}
                    className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest hover:bg-black transition-all"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </AnimatePresence>
  );
}

// MJ Commit
