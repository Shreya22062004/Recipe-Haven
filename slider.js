document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.slider-img');
  let current = 0;
  let interval;

  function showImage(idx) {
    images.forEach((img, i) => {
      img.style.display = (i === idx) ? 'block' : 'none';
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function startAutoRotate() {
    interval = setInterval(nextImage, 3000);
  }

  function stopAutoRotate() {
    clearInterval(interval);
  }

  // Initialize
  showImage(current);
  startAutoRotate();

  // Optional: pause on hover
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoRotate);
    slider.addEventListener('mouseleave', startAutoRotate);
  }
});
