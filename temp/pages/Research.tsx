import React, { useEffect, useState } from 'react';
import FadeInUp from '../components/FadeInUp';
import { loadData } from '../utils/dataLoader';

const Research: React.FC = () => {
    const [activeTab, setActiveTab] = useState('projets');
    const [data, setData] = useState({
        projets: [],
        theses: [],
        postdocs: [],
        publications: []
    });

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [projets, theses, postdocs, publications] = await Promise.all([
                    loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/projets/projets.json').catch(() => []),
                    loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/theses/theses.json').catch(() => []),
                    loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/postdocs/postdocs.json').catch(() => []),
                    loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/publications/publications.json').catch(() => [])
                ]);
                setData({ projets, theses, postdocs, publications });
            } catch (e) {
                console.error(e);
            }
        };
        fetchAll();
    }, []);

    const tabs = [
        { id: 'projets', label: 'Projets Phares' },
        { id: 'theses', label: 'Thèses' },
        { id: 'postdocs', label: 'Post-docs' },
        { id: 'publications', label: 'Publications' }
    ];

    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Recherche & Innovation
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Analyser et comprendre l'interaction entre les individus, les technologies et les systèmes pour renforcer la sécurité numérique.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20 bg-brand-dark">
                <div className="container mx-auto px-4">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Nos Axes de Recherche</h2>
                        <p className="text-slate-400 mt-2">Une approche pluridisciplinaire pour renforcer le maillon humain de la cybersécurité.</p>
                    </FadeInUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         {/* Static Research Areas content preserved from HTML */}
                         {[
                             { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: "Psychologie & Ingénierie Sociale", desc: "Étudier les biais cognitifs et les leviers psychologiques exploités par les cyberattaquants." },
                             { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Ergonomie & UX de la Sécurité", desc: "Concevoir des systèmes de sécurité intuitifs et efficaces qui minimisent la charge cognitive de l'utilisateur." },
                             { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Culture de Sécurité & Formation", desc: "Développer des méthodes de sensibilisation et de formation innovantes pour ancrer les bonnes pratiques." },
                             { icon: "M8 9l4-4 4 4m0 6l-4 4-4-4", title: "IA, Éthique & Comportement", desc: "Analyser l'impact de l'IA sur le comportement humain et les questions éthiques en matière de cybersécurité." }
                         ].map((area, idx) => (
                             <FadeInUp key={idx} delay={idx * 100} className="bg-slate-800/50 p-6 rounded-lg text-center">
                                 <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/20 mx-auto mb-4">
                                     <svg className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={area.icon} />
                                     </svg>
                                 </div>
                                 <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
                                 <p className="text-slate-400 text-sm">{area.desc}</p>
                             </FadeInUp>
                         ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Nos Travaux et Contributions</h2>
                        <p className="text-slate-400 mt-2">Explorez nos projets, thèses, et publications.</p>
                    </FadeInUp>

                    <FadeInUp className="flex justify-center mb-8">
                        <div className="flex flex-wrap justify-center border border-slate-700 rounded-lg overflow-hidden">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 sm:px-6 py-2 font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === tab.id ? 'bg-brand-primary text-brand-dark' : 'bg-transparent text-slate-300 hover:bg-slate-800'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </FadeInUp>

                    <div className="min-h-[300px]">
                        {/* Projects */}
                        {activeTab === 'projets' && (
                            <div className="space-y-16 animate-fade-in-up">
                                {data.projets.length === 0 ? <p className="text-center text-slate-400">Chargement...</p> : 
                                    data.projets.map((project: any, index: number) => {
                                        const isEven = index % 2 === 0;
                                        return (
                                            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                                                <div className={isEven ? '' : 'md:order-2'}>
                                                    <div className={`${project.imageBgClass || 'bg-slate-700/50'} p-6 rounded-lg shadow-xl`}>
                                                        <img src={project.imageUrl} alt={`Logo du projet ${project.title}`} className="w-full h-auto" />
                                                    </div>
                                                </div>
                                                <div className={isEven ? '' : 'md:order-1'}>
                                                    <h3 className="text-2xl font-bold text-brand-primary mb-3">{project.title}</h3>
                                                    <p className="text-slate-300 mb-4">{project.description}</p>
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:text-amber-400">En savoir plus &rarr;</a>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )}

                        {/* Theses */}
                        {activeTab === 'theses' && (
                            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
                                {data.theses.map((thesis: any, idx: number) => (
                                    <div key={idx} className="bg-slate-800/50 p-6 rounded-lg">
                                        <h4 className="text-xl font-bold text-white">{thesis.title}</h4>
                                        <p className="text-brand-primary font-semibold text-sm mt-1 mb-2">Par {thesis.author} - {thesis.year}</p>
                                        <p className="text-slate-400">{thesis.description}</p>
                                        <p className="text-slate-500 text-sm mt-3"><strong>Direction :</strong> {thesis.supervisors}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Post-docs */}
                        {activeTab === 'postdocs' && (
                            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
                                {data.postdocs.map((postdoc: any, idx: number) => (
                                    <div key={idx} className="bg-slate-800/50 p-6 rounded-lg">
                                        <h4 className="text-xl font-bold text-white">{postdoc.title}</h4>
                                        <p className="text-brand-primary font-semibold text-sm mt-1 mb-2">Par {postdoc.researcher} ({postdoc.period})</p>
                                        <p className="text-slate-400">{postdoc.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Publications */}
                        {activeTab === 'publications' && (
                            <div className="space-y-6 max-w-4xl mx-auto text-slate-300 animate-fade-in-up">
                                {data.publications.map((pub: any, idx: number) => (
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-brand-secondary/10">
                <FadeInUp className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Contribuez au GT-ICO.</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">Nous vous encourageons à nous transmettre un mail présentant votre travail. Notre communauté est toujours ouverte aux nouvelles contributions.</p>
                    <a href="mailto:brahim.hamid@irit.fr" className="px-8 py-3 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">Nous Contacter</a>
                </FadeInUp>
            </section>
        </>
    );
};

export default Research;