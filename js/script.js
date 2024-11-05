document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuButton = document.querySelector('.burger');
  const nav = document.querySelector('.header-nav');
  let lastScroll = 0;

  // Handle scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  menuButton?.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    menuButton.classList.toggle('is-active');
  });

  // Close mobile menu on resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('is-active')) {
      nav.classList.remove('is-active');
      menuButton.classList.remove('is-active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        nav.classList.remove('is-active');
        menuButton.classList.remove('is-active');
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});