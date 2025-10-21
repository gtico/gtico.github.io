// Header scroll effect
const header = document.getElementById('main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-brand-dark/90', 'backdrop-blur-sm', 'shadow-lg', 'shadow-brand-secondary/10');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-brand-dark/90', 'backdrop-blur-sm', 'shadow-lg', 'shadow-brand-secondary/10');
            header.classList.add('bg-transparent');
        }
    });
}

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
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
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
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
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
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
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
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
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


// Main DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    // Image Modal Logic
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImage = document.getElementById('modal-image');
        const modalCloseButton = document.getElementById('modal-close-button');
        const pastEventImages = document.querySelectorAll('.past-event-image');

        pastEventImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior if wrapped in <a>
                modalImage.src = img.src;
                imageModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            });
        });

        const closeModal = () => {
            imageModal.classList.add('hidden');
            modalImage.src = ""; // Clear src to avoid showing old image briefly
            document.body.style.overflow = ''; // Restore scrolling
        };

        modalCloseButton.addEventListener('click', closeModal);

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
});