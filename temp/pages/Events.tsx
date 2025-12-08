import React, { useEffect, useState } from 'react';
import FadeInUp from '../components/FadeInUp';
import { loadData } from '../utils/dataLoader';

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/evenement/events.json')
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    // Filter for upcoming events and slice to get the last three
    const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(-3);
    const pastEvents = events.filter(e => e.status === 'past');

    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Nos Événements
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Rencontres, partages et découvertes : vivez au rythme du GT-ICO.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Prochains Événements</h2>
                        <p className="text-slate-400 mt-2">Ne manquez pas nos prochains rendez-vous.</p>
                    </FadeInUp>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {upcomingEvents.length === 0 ? <p className="text-center">Aucun événement à venir pour le moment.</p> :
                            upcomingEvents.map((event, index) => (
                                <FadeInUp key={index} delay={index * 100} className="bg-slate-800/50 rounded-lg p-6 md:flex items-center gap-8 transform hover:shadow-brand-primary/20 hover:scale-[1.02] transition-all duration-300">
                                    <div className="text-center flex-shrink-0 w-24 mx-auto md:mx-0 mb-4 md:mb-0">
                                        <p className="text-5xl font-bold text-brand-primary">{event.date.day}</p>
                                        <p className="text-lg text-slate-400">{event.date.month}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-brand-secondary font-semibold mb-1">{event.category}</p>
                                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{event.description}</p>
                                        <div className="flex items-center text-sm text-slate-500 gap-4">
                                            <span><i className={`${event.details.icon} mr-1`}></i>{event.details.text}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex-shrink-0">
                                        <a href={event.action.link} target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-amber-400 rounded-md shadow-md transition-all duration-300">{event.action.text}</a>
                                    </div>
                                </FadeInUp>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Past Events */}
            <section className="py-20 bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <FadeInUp className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Événements Passés</h2>
                        <p className="text-slate-400 mt-2">Retour sur nos moments forts.</p>
                    </FadeInUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastEvents.length === 0 ? <p className="col-span-full text-center">Aucun événement passé à afficher.</p> :
                            pastEvents.map((event, index) => (
                                <FadeInUp key={index} delay={index * 100} className="bg-slate-800/50 rounded-lg overflow-hidden group">
                                    <img 
                                        src={event.imageUrl} 
                                        alt={`Image de l'événement ${event.title}`} 
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        onClick={() => setSelectedImage(event.imageUrl)}
                                    />
                                    <div className="p-6">
                                        <p className="text-sm text-brand-primary font-semibold mb-2">{event.date.month} {event.date.year}</p>
                                        <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                                        <p className="text-sm text-slate-400 mb-4">{event.description}</p>
                                        <a href={event.reportUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:text-amber-400">Lire le compte rendu complet &rarr;</a>
                                    </div>
                                </FadeInUp>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4 transition-opacity duration-300" onClick={() => setSelectedImage(null)}>
                    <div className="relative bg-brand-dark p-2 rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button className="absolute -top-4 -right-4 text-white bg-brand-primary hover:bg-amber-400 rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold leading-none z-10" onClick={() => setSelectedImage(null)}>&times;</button>
                        <img src={selectedImage} alt="Image agrandie" className="max-w-[90vw] max-h-[90vh] object-contain rounded" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Events;