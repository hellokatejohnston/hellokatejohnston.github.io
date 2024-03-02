document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.burger');
  const menu = document.querySelector('.header-nav');
  const menuLinks = document.querySelectorAll('.header-nav a');

  // Toggle mobile menu
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuButton.classList.toggle('is-active');
  });

  // Close mobile menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-active');
      menuButton.classList.remove('is-active');
    });
  });

  // Smooth scrolling
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});