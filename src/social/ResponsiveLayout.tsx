import { Outlet, Link, useLocation } from 'react-router-dom';
import { MessageCircle, PlusSquare, Calendar, Settings, Menu, X } from 'lucide-react';
import { SocialProvider } from './store';
import { useEffect, useState } from 'react';

export default function ResponsiveLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show bottom nav in chat views on mobile
  const isChatView = path.includes('/chat/');

  const navItems = [
    { icon: MessageCircle, label: 'Projets', path: '/social' },
    { icon: PlusSquare, label: 'Créer', path: '/social/create' },
    { icon: Calendar, label: 'Calendrier', path: '/social/calendar' },
    { icon: Settings, label: 'Widget / Paramètres', path: '/social/settings' },
  ];

  // Simuler le fonctionnement de l'intégration iframe avec query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get('theme');
    const primary = params.get('primaryColor');
    
    if (primary) {
      document.documentElement.style.setProperty('--app-primary', primary);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SOCIALGENIUS_CONFIG') {
        console.log('Received config from parent window:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <SocialProvider>
      <div className="flex flex-col md:flex-row h-screen w-full bg-[var(--parent-bg,#0B141A)] font-sans selection:bg-[#00A884] selection:text-white relative overflow-hidden">
        
        {/* Desktop / Tablet Sidebar */}
        <nav className="hidden md:flex flex-col w-20 lg:w-64 border-r border-[var(--parent-border,#202C33)] bg-[#111B21] h-full py-4 z-40 transition-all duration-300">
           <div className="px-4 mb-8 flex items-center justify-center lg:justify-start">
             <div className="w-10 h-10 bg-[#00A884] rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg">SG</div>
             <span className="ml-3 font-semibold text-white hidden lg:block text-lg">SocialGenius</span>
           </div>
           <div className="flex flex-col gap-2 px-2 flex-1">
             {navItems.map((item) => {
               const isActive = path === item.path || (item.path === '/social' && path === '/social/');
               return (
                 <Link 
                   key={item.path} 
                   to={item.path}
                   className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 outline-none ${isActive ? 'bg-[#202C33] text-[#00A884]' : 'text-[#8696A0] hover:bg-[#202C33]/50 hover:text-white'}`}
                 >
                   <item.icon className="w-6 h-6 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                   <span className="font-medium hidden lg:block">{item.label}</span>
                 </Link>
               );
             })}
           </div>
        </nav>

        {/* Main Content Area */}
        <main className={`flex-1 overflow-hidden relative flex flex-col ${!isChatView ? 'pb-16 md:pb-0' : 'pb-safe md:pb-0'} h-full w-full`}>
          <div className="flex-1 w-full max-w-7xl mx-auto md:p-4 lg:p-6 h-full overflow-hidden flex flex-col relative">
            <div className="flex-1 bg-[#0B141A] md:rounded-3xl md:border md:border-[#202C33] md:shadow-2xl overflow-hidden relative flex flex-col">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        {!isChatView && (
          <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#111B21] border-t border-[#202C33] flex items-center justify-around pb-safe z-50">
            {navItems.map((item) => {
              const isActive = path === item.path || (item.path === '/social' && path === '/social/');
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="flex flex-col items-center justify-center w-16 h-full gap-1 outline-none tap-highlight-transparent"
                >
                  <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#202C33]' : 'hover:bg-[#202C33]/50'}`}>
                    <item.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-[#00A884]' : 'text-[#8696A0]'}`} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#00A884]' : 'text-[#8696A0]'}`}>{item.label.split(' ')[0]}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </SocialProvider>
  );
}

