// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Intersection Observer for animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      // Optional: Stop observing the element once the animation has been triggered
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all elements with the .fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

async function loadPublications() {
    const container = document.getElementById('publications-list');
    if (!container) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/publications/publications.json';

    // Deux proxys : principal et secours
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];

    let publications = null;
    let lastError = null;

    // Essaye les proxys l’un après l’autre
    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            publications = await response.json();
            if (Array.isArray(publications)) break; // succès !
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!publications) {
        console.error("❌ Impossible de charger les publications via les proxys :", lastError);
        container.innerHTML = '<p class="text-red-400">Impossible de charger les publications pour le moment.</p>';
        return;
    }

    // Si aucun contenu
    if (publications.length === 0) {
        container.innerHTML = '<p>Aucune publication à afficher pour le moment.</p>';
        return;
    }

    // ✅ Affichage
    container.innerHTML = '';
    publications.forEach(pub => {
        const publicationElement = document.createElement('div');
        publicationElement.className = 'bg-slate-800/50 p-6 rounded-lg';
        publicationElement.innerHTML = `
            <p>
                <strong class="text-white">${pub.authors}</strong>. 
                "${pub.title}", <em>${pub.journal}</em>. ${pub.year}.
            </p>
            <a href="${pub.url}" target="_blank" rel="noopener noreferrer"
               class="font-semibold text-brand-primary hover:text-amber-400 text-sm mt-2 inline-block">
               Lire la publication &rarr;
            </a>
        `;
        container.appendChild(publicationElement);
    });
}



// Function to load theses from a JSON file
async function loadTheses() {
    const container = document.getElementById('theses-list');
    if (!container) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/theses/theses.json';

    // Liste des proxys à tester (AllOrigins + corsproxy.io)
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];

    let theses = null;
    let lastError = null;

    // Essayer les proxys l’un après l’autre
    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            theses = await response.json();
            if (Array.isArray(theses)) break; // succès
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!theses) {
        console.error("❌ Impossible de charger les thèses via les proxys :", lastError);
        container.innerHTML = '<p class="text-red-400">Impossible de charger les thèses pour le moment.</p>';
        return;
    }

    if (theses.length === 0) {
        container.innerHTML = '<p>Aucune thèse à afficher pour le moment.</p>';
        return;
    }

    // Clear existing content and build the list
    container.innerHTML = '';
    theses.forEach(thesis => {
        const thesisElement = document.createElement('div');
        thesisElement.className = 'bg-slate-800/50 p-6 rounded-lg';
        thesisElement.innerHTML = `
            <h4 class="text-xl font-bold text-white">${thesis.title}</h4>
            <p class="text-brand-primary font-semibold text-sm mt-1 mb-2">Par ${thesis.author} - ${thesis.year}</p>
            <p class="text-slate-400">${thesis.description}</p>
            <p class="text-slate-500 text-sm mt-3"><strong>Direction :</strong> ${thesis.supervisors}</p>
        `;
        container.appendChild(thesisElement);
    });
}


async function loadProjets() {
    const container = document.getElementById('projets-list');
    if (!container) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/projets/projets.json';
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];
    let projets = null;
    let lastError = null;

    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement des projets via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            projets = await response.json();
            if (Array.isArray(projets)) break;
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!projets) {
        console.error("❌ Impossible de charger les projets via les proxys :", lastError);
        container.innerHTML = '<p class="text-red-400">Impossible de charger les projets pour le moment.</p>';
        return;
    }

    if (projets.length === 0) {
        container.innerHTML = '<p>Aucun projet à afficher pour le moment.</p>';
        return;
    }

    container.innerHTML = '';
    projets.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'grid md:grid-cols-2 gap-8 items-center';

        const isEven = index % 2 === 0;

        const imageContainer = `
            <div class="${isEven ? '' : 'md:order-2'}">
                <div class="${project.imageBgClass || 'bg-slate-700/50'} p-6 rounded-lg shadow-xl">
                    <img src="${project.imageUrl}" alt="Logo du projet ${project.title}" class="w-full h-auto">
                </div>
            </div>
        `;

        const textContainer = `
            <div class="${isEven ? '' : 'md:order-1'}">
                <h3 class="text-2xl font-bold text-brand-primary mb-3">${project.title}</h3>
                <p class="text-slate-300 mb-4">${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand-primary hover:text-amber-400">En savoir plus &rarr;</a>
            </div>
        `;
        projectElement.innerHTML = imageContainer + textContainer;
        container.appendChild(projectElement);
    });
}

async function loadPostdocs() {
    const container = document.getElementById('postdocs-list');
    if (!container) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/postdocs/postdocs.json';
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];
    let postdocs = null;
    let lastError = null;

    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement des post-docs via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            postdocs = await response.json();
            if (Array.isArray(postdocs)) break;
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!postdocs) {
        console.error("❌ Impossible de charger les post-docs via les proxys :", lastError);
        container.innerHTML = '<p class="text-red-400">Impossible de charger les post-docs pour le moment.</p>';
        return;
    }

    if (postdocs.length === 0) {
        container.innerHTML = '<p>Aucun post-doc à afficher pour le moment.</p>';
        return;
    }

    container.innerHTML = '';
    postdocs.forEach(postdoc => {
        const postdocElement = document.createElement('div');
        postdocElement.className = 'bg-slate-800/50 p-6 rounded-lg';
        postdocElement.innerHTML = `
            <h4 class="text-xl font-bold text-white">${postdoc.title}</h4>
            <p class="text-brand-primary font-semibold text-sm mt-1 mb-2">Par ${postdoc.researcher} (${postdoc.period})</p>
            <p class="text-slate-400">${postdoc.description}</p>
        `;
        container.appendChild(postdocElement);
    });
}

async function loadMembers() {
    const container = document.getElementById('members-list');
    if (!container) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/membres/members.json';
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];
    let members = null;
    let lastError = null;

    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement des membres via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            members = await response.json();
            if (Array.isArray(members)) break;
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!members) {
        console.error("❌ Impossible de charger les membres via les proxys :", lastError);
        container.innerHTML = '<p class="text-red-400 text-center col-span-full">Impossible de charger les membres pour le moment.</p>';
        return;
    }

    if (members.length === 0) {
        container.innerHTML = '<p class="text-center col-span-full">Aucun membre à afficher pour le moment.</p>';
        return;
    }

    container.innerHTML = '';
    const defaultAvatar = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzY0NzQ4QiI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjwvc3ZnPg==`;

    members.forEach((member, index) => {
        const memberElement = document.createElement('div');
        const staggerDelay = (index % 4) + 1; // Stagger from 1 to 4
        memberElement.className = `bg-slate-800/50 rounded-lg p-6 text-center group fade-in-up stagger-${staggerDelay} transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-brand-primary/20`;

        const photoUrl = member.photoUrl || defaultAvatar;

        let socialLinks = '';
        if (member.socials) {
            if (member.socials.linkedin) {
                socialLinks += `<a href="${member.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-primary transition-colors" aria-label="LinkedIn Profile"><i class="fab fa-linkedin fa-lg"></i></a>`;
            }
            if (member.socials.website) {
                socialLinks += `<a href="${member.socials.website}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-primary transition-colors" aria-label="Personal Website"><i class="fas fa-globe fa-lg"></i></a>`;
            }
        }

        memberElement.innerHTML = `
            <img src="${photoUrl}" alt="Photo de ${member.name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700 group-hover:border-brand-primary transition-colors duration-300 object-cover">
            <h3 class="text-xl font-bold text-white mb-1">${member.name}</h3>
            <p class="text-brand-primary font-semibold mb-3">${member.role}</p>
            <p class="text-slate-400 text-sm">${member.description}</p>
            <div class="mt-4 flex justify-center space-x-4 text-slate-500">
                ${socialLinks}
            </div>
        `;
        container.appendChild(memberElement);
        // We need to re-observe the new elements
        observer.observe(memberElement);
    });
}

async function loadEvents() {
    const upcomingContainer = document.getElementById('upcoming-events-list');
    const pastContainer = document.getElementById('past-events-list');
    if (!upcomingContainer || !pastContainer) return;

    const targetUrl = 'https://scout.univ-toulouse.fr/pub/docs/group-GT-ICO/web/evenement/events.json';
    const proxies = [
        url => `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];
    let events = null;
    let lastError = null;

    for (const proxyBuilder of proxies) {
        const proxyUrl = proxyBuilder(targetUrl);
        console.log(`🔄 Tentative de chargement des événements via : ${proxyUrl}`);
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            events = await response.json();
            if (Array.isArray(events)) break;
        } catch (error) {
            console.warn(`⚠️ Erreur avec proxy ${proxyUrl}:`, error);
            lastError = error;
        }
    }

    if (!events) {
        console.error("❌ Impossible de charger les événements via les proxys :", lastError);
        const errorMessage = '<p class="text-red-400">Impossible de charger les événements pour le moment.</p>';
        upcomingContainer.innerHTML = errorMessage;
        pastContainer.innerHTML = errorMessage;
        return;
    }

    const upcomingEvents = events.filter(e => e.status === 'upcoming');
    const pastEvents = events.filter(e => e.status === 'past');

    // Populate upcoming events
    if (upcomingEvents.length === 0) {
        upcomingContainer.innerHTML = '<p>Aucun événement à venir pour le moment.</p>';
    } else {
        upcomingContainer.innerHTML = '';
        upcomingEvents.forEach((event, index) => {
            const staggerDelay = (index % 4) + 1;
            const eventElement = document.createElement('div');
            eventElement.className = `bg-slate-800/50 rounded-lg p-6 md:flex items-center gap-8 fade-in-up stagger-${staggerDelay} transform hover:shadow-brand-primary/20 hover:scale-[1.02] transition-all duration-300`;
            eventElement.innerHTML = `
                <div class="text-center flex-shrink-0 w-24 mx-auto md:mx-0 mb-4 md:mb-0">
                    <p class="text-5xl font-bold text-brand-primary">${event.date.day}</p>
                    <p class="text-lg text-slate-400">${event.date.month}</p>
                </div>
                <div class="flex-grow">
                    <p class="text-sm text-brand-secondary font-semibold mb-1">${event.category}</p>
                    <h3 class="text-xl font-bold text-white mb-2">${event.title}</h3>
                    <p class="text-slate-400 text-sm mb-4">${event.description}</p>
                    <div class="flex items-center text-sm text-slate-500 gap-4">
                        <span><i class="${event.details.icon} mr-1"></i>${event.details.text}</span>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex-shrink-0">
                    <a href="${event.action.link}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-amber-400 rounded-md shadow-md transition-all duration-300">${event.action.text}</a>
                </div>
            `;
            upcomingContainer.appendChild(eventElement);
            observer.observe(eventElement);
        });
    }

    // Populate past events
    if (pastEvents.length === 0) {
        pastContainer.innerHTML = '<p class="col-span-full">Aucun événement passé à afficher pour le moment.</p>';
    } else {
        pastContainer.innerHTML = '';
        pastEvents.forEach((event, index) => {
            const staggerDelay = (index % 3) + 1;
            const eventElement = document.createElement('div');
            eventElement.className = `bg-slate-800/50 rounded-lg overflow-hidden group fade-in-up stagger-${staggerDelay}`;
            eventElement.innerHTML = `
                <img src="${event.imageUrl}" alt="Image de l'événement ${event.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 past-event-image cursor-pointer">
                <div class="p-6">
                    <p class="text-sm text-brand-primary font-semibold mb-2">${event.date.month} ${event.date.year}</p>
                    <h3 class="text-lg font-bold text-white mb-2">${event.title}</h3>
                    <p class="text-sm text-slate-400 mb-4">${event.description}</p>
                    <a href="${event.reportUrl}" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand-primary hover:text-amber-400">Lire le compte rendu complet &rarr;</a>
                </div>
            `;
            pastContainer.appendChild(eventElement);
            observer.observe(eventElement);
        });
    }
}


// Main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // Image Modal Logic
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImage = document.getElementById('modal-image');
        const modalCloseButton = document.getElementById('modal-close-button');
        
        // Use event delegation for images that might be loaded dynamically
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('past-event-image')) {
                 e.preventDefault();
                modalImage.src = e.target.src;
                imageModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        const closeModal = () => {
            imageModal.classList.add('hidden');
            modalImage.src = ""; // Clear src to avoid showing old image briefly
            document.body.style.overflow = ''; // Restore scrolling
        };

        if(modalCloseButton) {
            modalCloseButton.addEventListener('click', closeModal);
        }

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Tabbed Content Logic for Research Page
    const tabsContainer = document.getElementById('tabs-nav');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        const tabPanelsContainer = document.getElementById('tabs-content');
        if (!tabPanelsContainer) return;

        const tabPanels = Array.from(tabPanelsContainer.querySelectorAll('.tab-panel'));

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active-tab'));
                tabPanels.forEach(panel => panel.classList.add('hidden'));

                button.classList.add('active-tab');
                
                const targetPanelId = button.dataset.tab;
                const targetPanel = document.getElementById(targetPanelId);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                }
            });
        });
    }

    // Load dynamic content
    loadPublications();
    loadTheses();
    loadProjets();
    loadPostdocs();
    loadMembers();
    loadEvents();
});