document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('nav ul');
  if (!menuIcon) return;
  if (!navLinks) return;

  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('menu-open');
  });

  // Optional: auto-close when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('menu-open');
    });
  });
});
