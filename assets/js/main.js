
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

// Function to load publications from a JSON file
async function loadPublications() {
    const container = document.getElementById('publications-list');
    // Only run this function if the container exists on the page
    if (!container) {
        return;
    }

    try {
        const response = await fetch('assets/data/publications.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const publications = await response.json();
        
        if (publications.length === 0) {
            container.innerHTML = '<p>Aucune publication à afficher pour le moment.</p>';
            return;
        }

        // Clear existing content and build the list
        container.innerHTML = ''; 
        publications.forEach(pub => {
            const publicationElement = document.createElement('div');
            publicationElement.className = 'bg-slate-800/50 p-6 rounded-lg';
            publicationElement.innerHTML = `
                <p><strong class="text-white">${pub.authors}</strong>. "${pub.title}", <em>${pub.journal}</em>. ${pub.year}.</p>
                <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand-primary hover:text-amber-400 text-sm mt-2 inline-block">Lire la publication &rarr;</a>
            `;
            container.appendChild(publicationElement);
        });

    } catch (error) {
        console.error("Impossible de charger les publications:", error);
        container.innerHTML = '<p class="text-red-400">Une erreur est survenue lors du chargement des publications.</p>';
    }
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
});