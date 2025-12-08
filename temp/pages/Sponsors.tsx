import React from 'react';
import FadeInUp from '../components/FadeInUp';
import logoICO from '../assets/images/logo-ICO.svg';

const Sponsors: React.FC = () => {
    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-red-500/20 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Notre Sponsor Principal
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Le GT-ICO est fier d'être soutenu par un acteur majeur de la cybersécurité en Occitanie.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <FadeInUp className="bg-slate-800/50 rounded-lg p-8 md:p-12 shadow-xl grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-1 text-center">
                            <a href="https://www.ico-occitanie.fr/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <img src={logoICO} alt="Logo de l'Institut de Cybersécurité en Occitanie" className="w-full h-auto object-contain" />
                            </a>
                        </div>
                        <div className="md:col-span-2 text-slate-300">
                            <h2 className="text-3xl font-bold text-white mb-4">Institut de Cybersécurité en Occitanie (ICO)</h2>
                            <p className="mb-4">
                                Le GT-ICO est une initiative soutenue et hébergée par l'Institut de Cybersécurité en Occitanie. L'ICO a pour mission de fédérer les acteurs académiques, industriels et institutionnels pour faire de l'Occitanie un pôle d'excellence en matière de cybersécurité.
                            </p>
                            <p className="mb-6">
                                Grâce à son soutien, le GT-ICO bénéficie d'un écosystème dynamique pour mener ses recherches, organiser des événements et diffuser ses connaissances sur l'importance cruciale du facteur humain dans la sécurité numérique.
                            </p>
                            <a href="https://www.ico-occitanie.fr/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">
                                Visiter le site de l'ICO
                            </a>
                        </div>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default Sponsors;