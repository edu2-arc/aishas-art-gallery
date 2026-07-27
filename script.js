const paintings = [
  {
    title: 'Ember Horizon',
    artist: 'Sunset Collection I',
    description: 'A fiery sun melts into cloud bands as the coast catches the final warm light.',
    technique: 'Sunset landscape',
    year: '2026',
    className: 'artwork-one'
  },
  {
    title: 'Golden Tide',
    artist: 'Beach Collection I',
    description: 'Long reflections and rolling waves describe a late-afternoon beach drifting into dusk.',
    technique: 'Beach seascape',
    year: '2026',
    className: 'artwork-two'
  },
  {
    title: 'Neon Rainline',
    artist: 'City Night Collection I',
    description: 'Wet streets mirror glowing towers as electric colors pulse through a midnight skyline.',
    technique: 'City at night',
    year: '2025',
    className: 'artwork-three'
  },
  {
    title: 'Moon Bay',
    artist: 'Island Night Collection I',
    description: 'Palm silhouettes and moonlit water create a quiet island cove under deep blue skies.',
    technique: 'Island at night',
    year: '2025',
    className: 'artwork-four'
  },
  {
    title: 'Coral Dusk',
    artist: 'Sunset Collection II',
    description: 'Coral and violet skies stretch above a calm shoreline with soft reflective surf.',
    technique: 'Sunset seascape',
    year: '2024',
    className: 'artwork-five'
  },
  {
    title: 'Harbor Midnight',
    artist: 'City Night Collection II',
    description: 'Harbor lights and distant bridges carve bright lines across dark water.',
    technique: 'Nocturne cityscape',
    year: '2024',
    className: 'artwork-six'
  },
  {
    title: 'Shoreline Wind',
    artist: 'Beach Collection II',
    description: 'Foamy textures and open skies capture the motion and sound of an early-evening beach.',
    technique: 'Coastal impression',
    year: '2024',
    className: 'artwork-two'
  },
  {
    title: 'Lantern Isle',
    artist: 'Island Night Collection II',
    description: 'Small lantern glows dot the coast as moonlight sweeps across a tropical island village.',
    technique: 'Island nocturne',
    year: '2023',
    className: 'artwork-four'
  },
  {
    title: 'Sunfall Promenade',
    artist: 'Sunset Collection III',
    description: 'A boardwalk scene dissolves into amber tones as sunlight fades into evening.',
    technique: 'Atmospheric sunset',
    year: '2023',
    className: 'artwork-one'
  },
  {
    title: 'Night Boulevard',
    artist: 'City Night Collection III',
    description: 'Headlights, signs, and rain sheen blend into rhythmic color blocks of urban motion.',
    technique: 'Urban nightscape',
    year: '2022',
    className: 'artwork-six'
  },
  {
    title: 'Lagoon Moonrise',
    artist: 'Island Night Collection III',
    description: 'A quiet lagoon reflects a rising moon while palms frame a silver-blue horizon.',
    technique: 'Moonlit seascape',
    year: '2022',
    className: 'artwork-four'
  },
  {
    title: 'Driftlight Coast',
    artist: 'Beach Collection III',
    description: 'Low light and long surf lines create a calm shoreline scene at the edge of night.',
    technique: 'Beach twilight',
    year: '2021',
    className: 'artwork-two'
  }
];

const techniques = [
  {
    title: 'Sunsets',
    description: 'Warm dusk palettes, horizon glow, and reflective skies that carry the final light of day.',
    examples: ['Golden hour', 'Afterglow', 'Cloud drama'],
    icon: '☀'
  },
  {
    title: 'Beaches',
    description: 'Shoreline rhythm, ocean textures, and coastal atmosphere from serene mornings to twilight waves.',
    examples: ['Waves', 'Sand textures', 'Sea haze'],
    icon: '◠'
  },
  {
    title: 'Cities at Night',
    description: 'Neon reflections, rain-slick streets, and dramatic urban contrast shaped by artificial light.',
    examples: ['Neon glow', 'Street reflections', 'Tower silhouettes'],
    icon: '✦'
  },
  {
    title: 'Islands at Night',
    description: 'Moonlit waters, tropical silhouettes, and quiet island lights set in deep nocturnal color.',
    examples: ['Moon paths', 'Palm silhouettes', 'Lantern coasts'],
    icon: '☾'
  }
];

const paintingsGrid = document.getElementById('paintings-grid');
const techniquesGrid = document.getElementById('techniques-grid');

paintingsGrid.innerHTML = paintings.map(({ title, artist, description, technique, year, className }) => `
  <article class="gallery-card">
    <div class="artwork ${className}" role="img" aria-label="${title}"></div>
    <div class="card-body">
      <p class="eyebrow">${year}</p>
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="meta-row">
        <span>${artist}</span>
        <span>${technique}</span>
      </div>
    </div>
  </article>
`).join('');

techniquesGrid.innerHTML = techniques.map(({ title, description, examples, icon }) => `
  <article class="technique-card">
    <div class="technique-top">
      <div class="technique-icon" aria-hidden="true">${icon}</div>
      <div>
        <p class="eyebrow">Technique</p>
        <h3>${title}</h3>
      </div>
    </div>
    <p>${description}</p>
    <div class="technique-list">
      ${examples.map(example => `<span>${example}</span>`).join('')}
    </div>
  </article>
`).join('');

const revealTargets = [
  ...document.querySelectorAll('.gallery-card'),
  ...document.querySelectorAll('.technique-card'),
  ...document.querySelectorAll('.visit-card')
];

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay', `${(index % 6) * 80}ms`);
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cinematicLayer = document.createElement('div');
cinematicLayer.className = 'cinematic-transition';
document.body.appendChild(cinematicLayer);

if (!prefersReducedMotion) {
  document.body.classList.add('transition-intro');
  requestAnimationFrame(() => {
    document.body.classList.add('page-ready');
    setTimeout(() => {
      document.body.classList.remove('transition-intro');
    }, 920);
  });
}

const cinematicLinks = document.querySelectorAll('a[href^="#"]');
let isTransitioning = false;

cinematicLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    if (prefersReducedMotion) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
      return;
    }

    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    document.body.classList.add('transitioning');

    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    }, 260);

    setTimeout(() => {
      document.body.classList.remove('transitioning');
      isTransitioning = false;
    }, 900);
  });
});
