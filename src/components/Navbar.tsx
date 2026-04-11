import { motion } from "motion/react";
import { Menu, X, User as UserIcon, LogOut, CreditCard, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, loginWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { cn } from "../lib/utils";

const ADMIN_EMAIL = 'ericapple2021@gmail.com';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPayment: () => void;
}

export default function Navbar({ onOpenBooking, onOpenPayment }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navBg = scrolled || !isHome ? 'glass-light shadow-sm' : 'glass';
  const textColor = scrolled || !isHome ? 'text-primary' : 'text-white';
  const accentBorder = scrolled || !isHome ? 'border-primary' : 'border-accent';
  const activeRoute = (path: string) => location.pathname === path;

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", navBg)}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className={cn("text-xl font-display font-black tracking-tighter", textColor)}>
            CABINET <span className="text-accent">PRODIGITAL</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/boutique"
            className={cn(
              "text-xs font-bold transition-all uppercase tracking-widest flex items-center gap-2 py-1 border-b-2",
              activeRoute('/boutique') ? 'text-accent border-accent' : `${textColor} border-transparent hover:text-accent`
            )}
          >
            <ShoppingBag size={16} />
            Boutique
          </Link>
          <Link
            to="/expertise"
            className={cn(
              "text-xs font-bold transition-all uppercase tracking-widest py-1 border-b-2",
              activeRoute('/expertise') ? 'text-accent border-accent' : `${textColor} border-transparent hover:text-accent`
            )}
          >
            Expertise
          </Link>
          <Link
            to="/insights"
            className={cn(
              "text-xs font-bold transition-all uppercase tracking-widest py-1 border-b-2",
              activeRoute('/insights') ? 'text-accent border-accent' : `${textColor} border-transparent hover:text-accent`
            )}
          >
            Insights
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {user.email === ADMIN_EMAIL && (
                <Link
                  to="/admin"
                  className="p-2 text-accent hover:opacity-80 transition-opacity"
                  title="Tableau de bord Admin"
                >
                  <CreditCard size={16} />
                </Link>
              )}
              <div className={cn("flex items-center gap-2 text-xs font-bold", textColor)}>
                <img src={user.photoURL || ''} alt="" className="w-7 h-7 rounded-full border-2 border-accent" />
                <span className="hidden lg:inline uppercase tracking-widest">{user.displayName}</span>
              </div>
              <button onClick={logout} className={cn("p-2 opacity-60 hover:opacity-100 transition-opacity", textColor)}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className={cn("text-xs font-bold hover:text-accent transition-all uppercase tracking-widest flex items-center gap-2", textColor)}>
              <UserIcon size={16} />
              Connexion
            </button>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPayment}
              className={cn("hidden lg:flex items-center gap-2 hover:text-accent transition-colors text-xs font-black uppercase tracking-widest", textColor)}
            >
              <CreditCard size={16} />
              Paiement
            </button>
            <button
              onClick={onOpenBooking}
              className={cn("border-2 text-xs px-6 py-2.5 rounded-none font-black hover:bg-accent hover:text-white hover:border-accent transition-all uppercase tracking-widest", accentBorder, scrolled || !isHome ? 'text-primary' : 'text-accent')}
            >
              Réserver
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className={cn("md:hidden", textColor)} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-6 py-8 flex flex-col gap-6 shadow-xl"
        >
          <Link to="/expertise" className="text-lg font-medium text-primary hover:text-accent transition-colors">Expertise</Link>
          <Link to="/insights" className="text-lg font-medium text-primary hover:text-accent transition-colors">Insights</Link>
          <Link to="/boutique" className="text-lg font-medium text-primary hover:text-accent transition-colors">Boutique</Link>
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => { onOpenPayment(); setIsOpen(false); }}
              className="flex items-center justify-center gap-2 border border-slate-200 py-3 text-sm font-bold text-primary"
            >
              <CreditCard size={18} />
              Paiement
            </button>
            <button
              onClick={() => { onOpenBooking(); setIsOpen(false); }}
              className="bg-accent text-white px-6 py-3 text-sm font-bold"
            >
              Réserver un rendez-vous
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// MJ Commit
