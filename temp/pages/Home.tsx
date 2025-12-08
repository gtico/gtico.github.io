import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeInUp from '../components/FadeInUp';
import { loadData } from '../utils/dataLoader';

const Home: React.FC = () => {
    const [publications, setPublications] = useState<any[]>([]);

    useEffect(() => {
        loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/publications/publications.json')
            .then(data => setPublications(data.slice(0, 3))) // Limit to recent
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden pt-20 pb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-900 to-brand-secondary/20 opacity-80"></div>
                <div className="absolute inset-0 bg-brand-dark animate-background-pan" style={{backgroundImage: 'linear-gradient(120deg, transparent 25%, rgba(100, 116, 139, 0.1) 50%, transparent 75%)', backgroundSize: '200% 200%'}}></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Facteur Humain & Cybersécurité
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={150}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                            Explorer l'intersection de la psychologie, de l'ergonomie et de la technologie pour construire un cyberespace plus sûr et plus résilient.
                        </p>
                    </FadeInUp>
                    <FadeInUp delay={300}>
                        <Link to="/recherche" className="px-8 py-4 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">
                            Découvrir nos recherches
                        </Link>
                    </FadeInUp>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeInUp>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Mission</h2>
                            <p className="text-slate-300 mb-4">
                                Le Groupe de Travail "Facteur Humain et Cybersécurité" (GT-ICO) a pour vocation de fédérer les compétences pour adresser les défis complexes posés par le maillon humain en sécurité numérique.
                            </p>
                            <p className="text-slate-300">
                                Nous adoptons une approche pluridisciplinaire, combinant sciences humaines et sociales, informatique et droit, pour développer des solutions innovantes et pragmatiques.
                            </p>
                        </FadeInUp>
                        <FadeInUp delay={200} className="grid grid-cols-2 gap-6">
                            {[
                                { val: '10+', label: 'Chercheurs' },
                                { val: '4', label: 'Axes de Recherche' },
                                { val: '2+', label: 'Projets en cours' },
                                { val: '3', label: 'Communauté' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-800/50 p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-brand-secondary/20">
                                    <h3 className="text-2xl font-bold text-brand-primary">{stat.val}</h3>
                                    <p className="text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Key Areas Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <FadeInUp className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ce que nous faisons</h2>
                        <p className="text-slate-400 mt-4">Nos activités se concentrent sur la recherche, la formation et la collaboration pour renforcer le facteur humain en cybersécurité.</p>
                    </FadeInUp>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Recherche Fondamentale & Appliquée', desc: 'Nous menons des projets de recherche pour mieux comprendre les comportements, les vulnérabilités et les moyens de renforcer la résilience humaine face aux cybermenaces.' },
                            { title: 'Partage de Connaissances', desc: 'Nous organisons des séminaires, des ateliers et des événements pour diffuser les résultats de nos recherches et favoriser les échanges entre académiques et industriels.' },
                            { title: 'Formation & Sensibilisation', desc: 'Nous contribuons au développement de programmes de formation et d\'outils de sensibilisation pour améliorer la culture de la sécurité au sein des organisations.' }
                        ].map((item, i) => (
                            <FadeInUp key={i} delay={i * 200} className="bg-slate-800/50 p-8 rounded-lg border border-slate-700/50 transform hover:border-brand-primary hover:scale-105 transition-all duration-300">
                                <h3 className="text-xl font-bold text-brand-primary mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* Publications Section */}
            <section className="py-24 bg-slate-900/50">
                <FadeInUp className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Publications Récentes</h2>
                    <p className="text-slate-400 mb-10">Découvrez nos dernières contributions à la communauté scientifique.</p>
                    
                    <div className="space-y-6 text-left text-slate-300">
                        {publications.length === 0 ? <p className="text-center">Chargement...</p> : 
                            publications.map((pub, idx) => (
                                <div key={idx} className="bg-slate-800/50 p-6 rounded-lg">
                                    <p>
                                        <strong className="text-white">{pub.authors}</strong>. 
                                        "{pub.title}", <em>{pub.journal}</em>. {pub.year}.
                                    </p>
                                    <a href={pub.url} target="_blank" rel="noopener noreferrer"
                                       className="font-semibold text-brand-primary hover:text-amber-400 text-sm mt-2 inline-block">
                                       Lire la publication &rarr;
                                    </a>
                                </div>
                            ))
                        }
                    </div>

                    <Link to="/recherche" className="mt-10 inline-block px-6 py-3 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-md transition-colors duration-300">
                        Voir toutes les contributions
                    </Link>
                </FadeInUp>
            </section>
        </>
    );
};

export default Home;