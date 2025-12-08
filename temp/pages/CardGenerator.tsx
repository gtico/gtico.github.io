import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import FadeInUp from '../components/FadeInUp';
import logo from '../assets/images/logo.svg';
import logoICO from '../assets/images/logo-ICO.svg';

const CardGenerator: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setLoading(true);

        try {
            // Ensure images are loaded (simple wait in React usually works as it renders, but good practice to check)
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#0F172A',
                scale: 3,
                useCORS: true,
            });

            const link = document.createElement('a');
            link.download = 'gt-ico-member-card.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating card:", error);
            alert("Une erreur est survenue lors de la génération de l'image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
             <style>
                {`
                .gradient-border {
                    border: 2px solid;
                    border-image-slice: 1;
                    border-image-source: linear-gradient(to bottom right, #F59E0B, #d41e24);
                }
                `}
            </style>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Carte de Membre
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Générez et téléchargez votre carte de membre officielle du GT-ICO.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    
                    <FadeInUp delay={200} className="w-full max-w-md">
                        <div 
                            id="logo-card" 
                            ref={cardRef}
                            className="bg-slate-900 rounded-2xl shadow-2xl shadow-brand-primary/10 overflow-hidden relative p-8 gradient-border"
                        >
                            <div className="relative flex flex-col items-center justify-between h-full text-center">
                                <div className="flex-grow flex flex-col items-center justify-center">
                                    <p className="text-lg font-semibold text-slate-300 tracking-wider mb-6">Membre Officiel du</p>
                                    <img src={logo} alt="GT-ICO Logo" className="w-48 h-48 mb-6" />
                                    <h1 className="text-3xl font-bold text-white tracking-wider">GT-ICO</h1>
                                    <p className="text-base text-slate-400">Facteur Humain & Cybersécurité</p>
                                </div>
                                <div className="w-full pt-6 mt-6 border-t border-slate-700">
                                    <p className="text-sm text-slate-500 mb-3">Supporté par</p>
                                    <img src={logoICO} alt="Logo ICO" className="h-16 mx-auto" />
                                </div>
                            </div>
                        </div>
                    </FadeInUp>

                    <FadeInUp delay={300} className="mt-8 text-center">
                        <button 
                            onClick={handleDownload}
                            disabled={loading}
                            className="px-8 py-3 font-semibold text-brand-dark bg-brand-primary hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Génération en cours...' : 'Télécharger la Carte (.png)'}
                        </button>
                        <p className="text-slate-500 text-sm mt-4">L'image sera téléchargée en haute résolution.</p>
                        <Link to="/developpeur" className="text-brand-primary hover:text-amber-400 mt-4 inline-block transition-colors">&larr; Retour à la page développeur</Link>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default CardGenerator;