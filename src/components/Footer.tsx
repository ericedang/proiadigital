import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-slate-200 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold text-primary uppercase tracking-tighter inline-block mb-6">
              CABINET <span className="text-accent">PRODIGITAL</span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Plateforme dédiée à la découverte et à la valorisation du savoir africain, des savoirs régionaux de la zone CEMAC et du développement économique de l'Afrique.
            </p>
            <div className="mt-6 text-primary font-bold">
              <p>Contact : 699323123</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Expertise</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/expertise" className="hover:text-accent transition-colors">Nos services</Link></li>
              <li><Link to="/boutique" className="hover:text-accent transition-colors">Boutique</Link></li>
              <li><Link to="/insights" className="hover:text-accent transition-colors">Insights</Link></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Société</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">À propos</a></li>
              <li><Link to="/insights" className="hover:text-accent transition-colors">Articles</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors">Carrières</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Commander ou réserver</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CABINET PRODIGITAL. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// MJ Commit
