import React from 'react';
import { Link } from 'react-router-dom';
import FadeInUp from '../components/FadeInUp';

const Developer: React.FC = () => {
    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Le Développeur
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            À propos du créateur et responsable de ce site web.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FadeInUp className="bg-slate-800/50 rounded-lg p-8 md:p-12 shadow-xl grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1 text-center">
                            <img src="https://hbaouya.github.io/images/profile.jpg" alt="Photo de Abdelhakim Baouya" className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-brand-primary object-cover" />
                            <h2 className="text-2xl font-bold text-white">Abdelhakim Baouya</h2>
                            <p className="text-brand-primary font-semibold">Enseignant-Chercheur UT2</p>
                             <div className="mt-4 flex justify-center space-x-4 text-slate-400">
                                <a href="https://www.linkedin.com/in/hakim-baouya-247653b4/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors text-xl"><i className="fab fa-linkedin"></i></a>
                                <a href="https://hbaouya.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors text-xl"><i className="fas fa-globe"></i></a>
                            </div>
                        </div>
                        <div className="md:col-span-2 text-slate-300">
                            <p className="mb-4">Ce site web a été conçu et développé par <strong className="text-white">Abdelhakim Baouya</strong>, membre fondateur du GT-ICO et enseignant-chercheur à l'Université Toulouse - Jean Jaurès (UT2) et rattaché à l'IRIT.</p>
                            <p className="mb-4">Passionné par la fiabilité et la sécurité des systèmes critiques, il a mis en place cette plateforme pour servir de vitrine aux activités du groupe de travail, faciliter la diffusion des recherches et renforcer les collaborations.</p>
                            <p>Pour toute question ou suggestion concernant le site, n'hésitez pas à prendre contact.</p>
                        </div>
                    </FadeInUp>
                    
                    <div className="text-center mt-20">
                         <FadeInUp delay={200}>
                            <h3 className="text-2xl font-bold text-white mb-4">Ressources pour les Membres</h3>
                            <p className="text-slate-400 max-w-xl mx-auto mb-8">Un outil pour générer une carte de membre officielle à utiliser sur vos supports professionnels.</p>
                            <Link to="/card-generator" className="px-8 py-3 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">
                                Générer ma carte de membre
                            </Link>
                        </FadeInUp>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Developer;