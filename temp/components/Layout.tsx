import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import logoICO from '../assets/images/logo-ICO.svg';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper for NavLink styling
  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? "nav-link-active text-sm font-medium" : "nav-link text-sm font-medium";

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none fixed"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header id="main-header" className="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-slate-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
                <img src={logo} alt="GT-ICO Logo" className="w-10 h-10" />
                <span className="text-xl font-bold tracking-wider text-white">GT-ICO</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-8">
                <NavLink to="/" className={getLinkClass}>Accueil</NavLink>
                <NavLink to="/recherche" className={getLinkClass}>Recherche</NavLink>
                <NavLink to="/membres" className={getLinkClass}>Membres</NavLink>
                <NavLink to="/evenements" className={getLinkClass}>Événements</NavLink>
              </nav>
              <button 
                id="mobile-menu-button" 
                className="md:hidden text-slate-300 hover:text-brand-primary"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div id="mobile-menu" className="md:hidden py-4 border-t border-slate-700">
                <NavLink to="/" onClick={closeMenu} className={({isActive}) => isActive ? "block py-2 text-brand-primary" : "block py-2 text-slate-300 hover:text-brand-primary"}>Accueil</NavLink>
                <NavLink to="/recherche" onClick={closeMenu} className={({isActive}) => isActive ? "block py-2 text-brand-primary" : "block py-2 text-slate-300 hover:text-brand-primary"}>Recherche</NavLink>
                <NavLink to="/membres" onClick={closeMenu} className={({isActive}) => isActive ? "block py-2 text-brand-primary" : "block py-2 text-slate-300 hover:text-brand-primary"}>Membres</NavLink>
                <NavLink to="/evenements" onClick={closeMenu} className={({isActive}) => isActive ? "block py-2 text-brand-primary" : "block py-2 text-slate-300 hover:text-brand-primary"}>Événements</NavLink>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow">
            <Outlet />
        </main>

        <footer className="bg-slate-900/70 border-t border-slate-700/50 pt-16 pb-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-1 mb-6 md:mb-0">
                       <Link to="/" className="flex items-center space-x-2">
                          <img src={logo} alt="GT-ICO Logo" className="w-8 h-8" />
                          <span className="text-lg font-bold tracking-wider text-white">GT-ICO</span>
                      </Link>
                      <p className="text-slate-400 mt-4 text-sm">Groupe de Travail sur le Facteur Humain et la Cybersécurité.</p>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      <div>
                          <h4 className="font-semibold text-white mb-4">Accès Rapides</h4>
                          <ul className="space-y-2">
                              <li><Link to="/" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Accueil</Link></li>
                              <li><Link to="/recherche" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Recherche</Link></li>
                              <li><Link to="/membres" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Membres</Link></li>
                              <li><Link to="/evenements" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Événements</Link></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold text-white mb-4">À Propos</h4>
                          <ul className="space-y-2">
                             <li><Link to="/sponsors" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Sponsors</Link></li>
                             <li><Link to="/mentions-legales" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Mentions légales</Link></li>
                              <li><Link to="/developpeur" className="text-slate-400 hover:text-brand-primary text-sm transition-colors">Développeur</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="mt-12 border-t border-slate-700/50 pt-8 text-center">
                  <div className="mb-8">
                      <p className="text-sm text-slate-400 mb-4">Supporté par l'Institut de Cybersécurité en Occitanie</p>
                      <div className="flex justify-center">
                          <a href="https://www.ico-occitanie.fr/" target="_blank" rel="noopener noreferrer" className="inline-block transition-opacity hover:opacity-80">
                             <img src={logoICO} alt="Logo Institut de Cybersécurité en Occitanie" className="h-16 rounded-lg" />
                          </a>
                      </div>
                  </div>
                  <p className="text-slate-500 text-sm">&copy; 2025 GT-ICO. Tous droits réservés.</p>
              </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;