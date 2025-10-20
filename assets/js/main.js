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
