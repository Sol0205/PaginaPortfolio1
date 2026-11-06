const projects = {
  games: {
    kicker: 'PROYECTO DE FORMACIÓN · HENRY',
    title: 'Catálogo de videojuegos',
    description: 'Proyecto individual realizado durante la formación Desarrollador Web Full Stack en Henry. La temática del proyecto es un catálogo para explorar, buscar y ordenar videojuegos, consultar sus detalles y crear nuevos títulos.',
    tech: ['React', 'Redux', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL'],
    url: 'https://github.com/Sol0205/PI-Games-SolMargarit'
  },
  nextnest: {
    kicker: 'QUEST 002 · EN DESARROLLO',
    title: 'NextNest',
    description: 'Aplicación web en desarrollo con una arquitectura separada entre frontend y backend, formularios y persistencia relacional.',
    tech: ['Next.js', 'React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    url: 'https://github.com/Sol0205/appNextNest'
  },
  finance: {
    kicker: 'QUEST 003 · PROYECTO PERSONAL',
    title: 'AI Finance',
    description: 'Market brief educativo para consultar cotizaciones, evolución histórica y sentimiento de noticias, con una cartera virtual y un backtest reproducible.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Chart.js', 'VADER'],
    url: ''
  }
};

const dialog = document.querySelector('#project-dialog');
const toast = document.querySelector('#toast');
let toastTimer;
let foundCollectible = false;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    document.querySelector('#dialog-kicker').textContent = project.kicker;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    const tech = document.querySelector('#dialog-tech');
    tech.replaceChildren(...project.tech.map((item) => {
      const chip = document.createElement('span');
      chip.textContent = item;
      return chip;
    }));
    const link = document.querySelector('#dialog-link');
    link.hidden = !project.url;
    if (project.url) link.href = project.url;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const collectible = document.querySelector('#collectible');
function collectStar() {
  if (foundCollectible) {
    showToast('✦ Ya encontraste el coleccionable secreto. ¡Buen ojo!');
    return;
  }
  foundCollectible = true;
  collectible.innerHTML = '<span>✦</span><small>¡+50 XP!</small>';
  collectible.classList.add('collected');
  showToast('✦ ¡Coleccionable secreto encontrado! +50 XP');
}
collectible.addEventListener('click', collectStar);
collectible.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    collectStar();
  }
});

const zoneLinks = [...document.querySelectorAll('.zone-link')];
const zones = ['inicio', 'misiones', 'habilidades', 'formacion'].map((id) => document.getElementById(id));
const progress = document.querySelector('#progress-fill');
const progressLabel = document.querySelector('#progress-label');
const contact = document.getElementById('contacto');

function setActiveZone(zoneId) {
  const zoneIndex = zoneId === 'contacto' ? zones.length - 1 : Math.max(0, zones.findIndex((zone) => zone.id === zoneId));
  zoneLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${zoneId}`));
  progress.style.width = `${((zoneIndex + 1) / zones.length) * 100}%`;
  progressLabel.textContent = `${String(zoneIndex + 1).padStart(2, '0')} / 04 ZONAS`;
}

const zoneObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveZone(visible.target.id);
}, { threshold: [0.25, 0.5, 0.72] });
zones.forEach((zone) => zoneObserver.observe(zone));
zoneObserver.observe(contact);

zoneLinks.forEach((link) => link.addEventListener('click', () => {
  if (link.hash === '#contacto') showToast('¡Zona extra desbloqueada! Hablemos de tu próxima misión.');
}));

