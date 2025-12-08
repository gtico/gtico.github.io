import React, { useEffect, useState } from 'react';
import FadeInUp from '../components/FadeInUp';
import { loadData } from '../utils/dataLoader';

const Members: React.FC = () => {
    const [members, setMembers] = useState<any[]>([]);
    const defaultAvatar = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzY0NzQ4QiI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjwvc3ZnPg==`;

    useEffect(() => {
        loadData('https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/membres/members.json')
            .then(data => setMembers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <section className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-brand-secondary/30 opacity-80"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <FadeInUp>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Nos Experts
                        </h1>
                    </FadeInUp>
                    <FadeInUp delay={100}>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                            Découvrez les chercheurs et praticiens passionnés qui animent le GT-ICO.
                        </p>
                    </FadeInUp>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {members.length === 0 ? <p className="text-center col-span-full">Chargement...</p> : 
                            members.map((member, index) => (
                                <FadeInUp key={index} delay={((index % 4) + 1) * 100} className="bg-slate-800/50 rounded-lg p-6 text-center group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-brand-primary/20">
                                    <img 
                                        src={member.photoUrl || defaultAvatar} 
                                        alt={`Photo de ${member.name}`} 
                                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700 group-hover:border-brand-primary transition-colors duration-300 object-cover" 
                                    />
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-brand-primary font-semibold mb-3">{member.role}</p>
                                    <p className="text-slate-400 text-sm">{member.description}</p>
                                    <div className="mt-4 flex justify-center space-x-4 text-slate-500">
                                        {member.socials?.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                                                <i className="fab fa-linkedin fa-lg"></i>
                                            </a>
                                        )}
                                        {member.socials?.website && (
                                            <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                                                <i className="fas fa-globe fa-lg"></i>
                                            </a>
                                        )}
                                    </div>
                                </FadeInUp>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default Members;