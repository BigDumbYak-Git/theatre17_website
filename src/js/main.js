// Theatre 17 — main.js

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile nav toggle ----
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ---- Archive year filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const archiveCards = document.querySelectorAll('.archive-card');
  if (filterBtns.length && archiveCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const year = btn.dataset.year;
        archiveCards.forEach(card => {
          if (year === 'all' || card.dataset.year === year) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Bio filter ----
  const bioFilterBtns = document.querySelectorAll('.bio-filter-btn');
  const bioCards = document.querySelectorAll('.bio-card');
  if (bioFilterBtns.length && bioCards.length) {
    bioFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        bioFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        bioCards.forEach(card => {
          const tags = card.dataset.tags || '';
          if (filter === 'all' || tags.includes(filter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Mark active nav link ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- Gallery lightbox ----
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const lightboxClose    = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  if (lightbox) {
    const openLightbox = (src, caption) => {
      lightboxImg.src = src;
      lightboxImg.alt = caption;
      lightboxCap.textContent = caption;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.gallery-item[data-lightbox-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        openLightbox(btn.dataset.lightboxSrc, btn.dataset.lightboxCaption);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // ---- Form submission placeholder ----
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    // Netlify handles submission; this just enhances UX
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
    });
  });

});
