
// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach((el) => observer.observe(el));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });

  navLinks.forEach((a) => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
});

// Resume download hook
const resumeDownloadLink = document.getElementById('download-resume');
if (resumeDownloadLink) {
  resumeDownloadLink.addEventListener('click', () => {
    // The download attribute on the anchor performs the download.
  });
}

// Floating icons parallax and cursor interaction
const photoWrap = document.querySelector('.hero-photo-wrap');
const floatingIcons = document.querySelectorAll('.floating-icon');
if (photoWrap && floatingIcons.length) {
  photoWrap.addEventListener('mousemove', (e) => {
    const rect = photoWrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    floatingIcons.forEach((el, i) => {
      const factor = 0.02 + i * 0.015;
      el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
  photoWrap.addEventListener('mouseleave', () => {
    floatingIcons.forEach(el => el.style.transform = '');
  });
}
