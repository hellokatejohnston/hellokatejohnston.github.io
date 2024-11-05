document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('header');
  const menuButton = document.querySelector('.burger');
  const menu = document.querySelector('.header-nav');
  const menuLinks = document.querySelectorAll('.header-nav a');
  
  // Scroll handling
  let lastScroll = 0;
  const scrollThreshold = 10;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Determine scroll direction
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
    } else {
      header.classList.add('scroll-up');
      header.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const toggleMenu = () => {
    menu.classList.toggle('is-active');
    menuButton.classList.toggle('is-active');
    
    // Toggle aria-expanded
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
  };

  // Initialize mobile menu button
  menuButton.setAttribute('aria-label', 'Toggle menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.addEventListener('click', toggleMenu);

  // Handle menu link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close mobile menu
      menu.classList.remove('is-active');
      menuButton.classList.remove('is-active');
      menuButton.setAttribute('aria-expanded', 'false');

      // Smooth scroll to target if it's an internal link
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Basic form validation
      for (const [key, value] of Object.entries(data)) {
        if (!value.trim()) {
          alert(`Please fill in the ${key} field`);
          return;
        }
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it
      console.log('Form submitted:', data);
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Add intersection observer for animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.hero-content, .emmy-image, .about-content, .contact-content').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-active')) {
      toggleMenu();
    }
  });
});