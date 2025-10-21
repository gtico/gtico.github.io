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

// Image Modal Logic
document.addEventListener('DOMContentLoaded', () => {
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

        // Close modal when clicking on the background overlay
        imageModal.addEventListener('click', (e) => {
            // Check if the click is on the dark background itself
            if (e.target === imageModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});

// Tabbed Content Logic for Research Page
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs-nav');
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        const tabPanelsContainer = document.getElementById('tabs-content');
        if (!tabPanelsContainer) return;

        const tabPanels = Array.from(tabPanelsContainer.querySelectorAll('.tab-panel'));

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate all buttons
                tabButtons.forEach(btn => btn.classList.remove('active-tab'));
                
                // Hide all panels
                tabPanels.forEach(panel => panel.classList.add('hidden'));

                // Activate clicked button
                button.classList.add('active-tab');
                
                // Show corresponding panel
                const targetPanelId = button.dataset.tab;
                const targetPanel = document.getElementById(targetPanelId);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                }
            });
        });
    }
});