
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.burger');
  const menu = document.querySelector('.header-nav');

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('is-active');
  });
});
