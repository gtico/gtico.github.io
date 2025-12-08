import React from 'react';
import FadeInUp from '../components/FadeInUp';

const Legal: React.FC = () => {
    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Mentions Légales
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Informations relatives à l'éditeur et à l'hébergement du site GT-ICO.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12 text-slate-300">
                        <FadeInUp>
                            <h2 className="text-3xl font-bold text-white mb-4">1. Éditeur du site</h2>
                            <div className="border-l-4 border-brand-primary pl-6 space-y-4">
                                <p>Le site web GT-ICO est édité par le Groupe de Travail "Facteur Humain et Cybersécurité" de l'Institut de Cybersécurité en Occitanie (ICO).</p>
                                <ul className="list-disc list-inside text-slate-400">
                                    <li><strong>Directeur de la publication :</strong> Abdelhakim Baouya</li>
                                    <li><strong>Contact :</strong> <a href="mailto:abaouya@acm.org" className="text-brand-primary hover:underline">abaouya@acm.org</a></li>
                                    <li><strong>Adresse :</strong> Laboratoire IRIT</li>
                                </ul>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={100}>
                            <h2 className="text-3xl font-bold text-white mb-4">2. Hébergement</h2>
                            <div className="border-l-4 border-brand-primary pl-6 space-y-4">
                                <p>Ce site est actuellement hébergé sur la plateforme GitHub Pages.</p>
                                <ul className="list-disc list-inside text-slate-400">
                                    <li><strong>Société :</strong> GitHub, Inc.</li>
                                    <li><strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA 94107, United States</li>
                                    <li><strong>Site Web :</strong> <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">pages.github.com</a></li>
                                </ul>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={200}>
                            <h2 className="text-3xl font-bold text-white mb-4">3. Propriété intellectuelle</h2>
                            <div className="border-l-4 border-brand-primary pl-6 space-y-4">
                                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={300}>
                            <h2 className="text-3xl font-bold text-white mb-4">4. Données personnelles</h2>
                            <div className="border-l-4 border-brand-primary pl-6 space-y-4">
                                <p>Le site ne collecte aucune donnée personnelle nominative sur ses visiteurs sans leur consentement.</p>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Legal;