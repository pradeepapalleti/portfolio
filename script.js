
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

// Cursor glow effect
const cursorMotionQuery = window.matchMedia('(pointer: fine)');
const cursorState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  active: false,
  rafId: null
};

function updateCursorEffect() {
  document.documentElement.style.setProperty('--cursor-x', `${cursorState.x}px`);
  document.documentElement.style.setProperty('--cursor-y', `${cursorState.y}px`);
  document.documentElement.style.setProperty('--cursor-active', cursorState.active ? '1' : '0');
  cursorState.rafId = null;
}

if (cursorMotionQuery.matches) {
  document.addEventListener('pointermove', (event) => {
    cursorState.x = event.clientX;
    cursorState.y = event.clientY;
    cursorState.active = true;

    if (!cursorState.rafId) {
      cursorState.rafId = requestAnimationFrame(updateCursorEffect);
    }
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    cursorState.active = false;

    if (!cursorState.rafId) {
      cursorState.rafId = requestAnimationFrame(updateCursorEffect);
    }
  });

  window.addEventListener('blur', () => {
    cursorState.active = false;

    if (!cursorState.rafId) {
      cursorState.rafId = requestAnimationFrame(updateCursorEffect);
    }
  });
}

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

const projectData = {
  collegenavigator: {
    title: 'CollegeNavigator',
    problem: 'Students struggle to find, compare, and evaluate colleges in one place. CollegeNavigator solves this by providing a unified platform to search, filter, save, and compare colleges based on courses, placements, and reviews.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/pradeepapalleti/CollegeNavigator',
    live: 'https://college-navigator-psi.vercel.app/',
    snapshot: 'project-snapshots/collegenavigator.png'
  },
  moodify: {
    title: 'MOODIFY',
    problem: 'Music discovery is often generic and fails to reflect a listener\'s current emotional state. Moodify addresses this by analyzing the user\'s mood from text input using NLP-based sentiment analysis and dynamically generating personalized Spotify playlists that match their emotions in real time.',
    tech: ['Python', 'NLP', 'Spotipy', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/pradeepapalleti/Moodify',
    live: 'https://moodify-gso9.onrender.com/',
    snapshot: 'project-snapshots/moodify.png'
  },
  codesync: {
    title: 'CodeSync',
    problem: 'Remote teams and pair programmers lack a lightweight, real-time environment to collaboratively write and share code without setup overhead. CodeSync solves this by providing a browser-based platform where multiple users can simultaneously edit code with instant, low-latency synchronization via Socket.IO.',
    tech: ['JavaScript', 'Node.js', 'Socket.IO', 'HTML', 'CSS'],
    github: 'https://github.com/pradeepapalleti/Codesync',
    live: 'https://codesync-virid-tau.vercel.app/',
    snapshot: 'project-snapshots/codesync.png'
  },
  'mentor-management': {
    title: 'Mentor Management',
    problem: 'Academic institutions often lack a structured digital system to track mentee progress, activities, and feedback — relying on manual records that are error-prone and hard to manage. The Mentor Management System bridges this gap with a role-based web platform where mentors can monitor academic performance and provide feedback, while mentees can log activities, upload certifications, and track their progress.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/pradeepapalleti/Mentor-Management',
    live: 'https://mentorbridge.infinityfreeapp.com/',
    snapshot: 'project-snapshots/mentor-management.png'
  },
  'cse-portal': {
    title: 'CSE Portal PESITM',
    problem: 'Academic institutions rely on fragmented tools to manage student, faculty, and admin workflows, leading to inefficiency and poor communication. The CSE Portal centralizes these operations with role-based access control, enabling each user type to interact with only their relevant data and features.',
    tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL'],
    github: 'https://github.com/shubhamrajput27/CSE-Portal-PESITM',
    live: '',
    snapshot: 'project-snapshots/cse-portal-pesitm.png'
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('project-modal-title');
const modalProblem = document.getElementById('project-modal-problem');
const modalTech = document.getElementById('project-modal-tech');
const modalLinks = document.getElementById('project-modal-links');
const modalSnapshotWrap = document.getElementById('project-modal-snapshot');
const modalSnapshotImg = document.getElementById('project-modal-snapshot-img');

function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project || !modal) {
    return;
  }

  modalTitle.textContent = project.title;
  modalProblem.textContent = project.problem;
  modalTech.innerHTML = project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join('');
  if (modalSnapshotWrap && modalSnapshotImg) {
    modalSnapshotImg.onload = () => {
      modalSnapshotWrap.hidden = false;
    };
    modalSnapshotImg.onerror = () => {
      modalSnapshotWrap.hidden = true;
      modalSnapshotImg.removeAttribute('src');
    };
    modalSnapshotWrap.hidden = !project.snapshot;
    if (project.snapshot) {
      modalSnapshotImg.src = project.snapshot;
      modalSnapshotImg.alt = `${project.title} project snapshot`;
    }
  }
  modalLinks.innerHTML = `
    <a class="project-modal-link github" href="${project.github}" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i> GitHub</a>
    ${project.live ? `<a class="project-modal-link live" href="${project.live}" target="_blank" rel="noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ''}
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  if (!modal) {
    return;
  }
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-card[data-project]').forEach((card) => {
  card.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('a');
    if (clickedLink) {
      return;
    }
    openProjectModal(card.dataset.project);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close-modal]')) {
      closeProjectModal();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

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
