/* ============================================================
   SOCIAL — pasek profili autora (FAB) + stopka
   Wstrzykiwane po załadowaniu strony, poza drzewem Reacta,
   żeby nie ruszać skompilowanej aplikacji.
   Linki: pusty "url" = pozycja pomijana (nie ma martwych linków).
   Kolejność zgodna z design systemem: X · LinkedIn · YouTube ·
   Instagram · Facebook · GitHub · Linktree (akcent) · Mastodon.
============================================================= */
(function () {
  'use strict';

  // ---- 1. KONFIGURACJA — tu wpisujesz swoje adresy ----
  var LINKI = [
    { id: 'x',         nazwa: 'X (Twitter)', url: 'https://x.com/panserhjertet' },
    { id: 'linkedin',  nazwa: 'LinkedIn',    url: 'https://www.linkedin.com/in/pwasiak30/' },
    { id: 'youtube',   nazwa: 'YouTube',     url: 'https://www.youtube.com/@WasiakYT' },
    { id: 'instagram', nazwa: 'Instagram',   url: 'https://www.instagram.com/psychologia.wasiak/' },
    { id: 'facebook',  nazwa: 'Facebook',    url: 'https://www.facebook.com/psychologia.wasiak' },
    { id: 'github',    nazwa: 'GitHub',      url: 'https://github.com/pwasiak30' },
    { id: 'linktree',  nazwa: 'Linktree',    url: 'https://linktree.wasiakpawel.pl/', akcent: true },
    { id: 'mastodon',  nazwa: 'Mastodon',    url: 'https://mastodon.social/@s3in610' }
  ];
  var PORTFOLIO = 'https://wasiakpawel.pl';

  // ---- 2. IKONY (linie, currentColor — dziedziczą kolor z CSS) ----
  var S = 'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  var IKONY = {
    x: '<path d="M4 4l16 16M20 4L4 20" ' + S + '/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3" ' + S + '/><path d="M7.5 10v7M12 10v7M12 17v-4.2c0-1.6 1-2.6 2.4-2.6 1.3 0 2.1 1 2.1 2.6V17" ' + S + '/><circle cx="7.5" cy="6.7" r="0.9" fill="currentColor"/>',
    youtube: '<rect x="2.5" y="6" width="19" height="12" rx="4" ' + S + '/><path d="M10.5 9.7l5 2.3-5 2.3z" ' + S + '/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" ' + S + '/><circle cx="12" cy="12" r="4" ' + S + '/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor"/>',
    facebook: '<path d="M15 21v-7h2.5l0.5-3H15V9c0-0.9 0.3-1.5 1.6-1.5H18V4.8C17.6 4.7 16.6 4.6 15.5 4.6c-2.3 0-3.9 1.4-3.9 4V11H9v3h2.6v7" ' + S + '/>',
    github: '<path d="M12 3c-4.9 0-8.9 4-8.9 9 0 3.9 2.5 7.2 6 8.4 0.3 0.1 0.5-0.1 0.5-0.4v-1.6c-2.5 0.5-3-1.1-3-1.1-0.4-1-1-1.3-1-1.3-0.8-0.5 0.1-0.5 0.1-0.5 0.9 0.1 1.4 0.9 1.4 0.9 0.8 1.4 2.1 1 2.6 0.7 0.1-0.6 0.3-1 0.6-1.3-2-0.2-4.1-1-4.1-4.4 0-1 0.3-1.8 0.9-2.4-0.1-0.2-0.4-1.1 0.1-2.4 0 0 0.8-0.2 2.5 0.9 0.7-0.2 1.5-0.3 2.3-0.3 0.8 0 1.6 0.1 2.3 0.3 1.7-1.1 2.5-0.9 2.5-0.9 0.5 1.3 0.2 2.2 0.1 2.4 0.6 0.6 0.9 1.4 0.9 2.4 0 3.4-2.1 4.2-4.1 4.4 0.3 0.3 0.6 0.9 0.6 1.7v2.5c0 0.3 0.2 0.5 0.5 0.4 3.5-1.2 6-4.5 6-8.4 0-5-4-9-8.9-9z" fill="currentColor"/>',
    linktree: '<path d="M12 21V10M12 13L6 7M12 13l6-6M12 10L8 6M12 10l4-4" ' + S + '/><circle cx="12" cy="4.5" r="1.4" fill="currentColor"/>',
    mastodon: '<path d="M6 8.5c0-2.5 1.8-4 6-4s6 1.5 6 4v4c0 2.7-2 4.3-4.6 4.3-1 0-1.9-0.3-2.6-0.9l1-1.6c0.4 0.3 0.9 0.5 1.5 0.5 1.2 0 2-0.7 2-1.9v-0.6c-0.6 0.4-1.4 0.6-2.3 0.6-2.6 0-4.3-1.5-4.3-3.9M6 8.5v5.5c0 2.7 1.9 4.8 6 4.8" ' + S + '/>'
  };

  function linki(klasa, rozmiar) {
    return LINKI.filter(function (l) { return l.url; }).map(function (l) {
      return '<a href="' + l.url + '" target="_blank" rel="noopener me" aria-label="' + l.nazwa + '" class="' + klasa + (l.akcent ? ' ' + klasa + '--akcent' : '') + '">' +
        '<svg viewBox="0 0 24 24" width="' + rozmiar + '" height="' + rozmiar + '" aria-hidden="true">' + IKONY[l.id] + '</svg></a>';
    }).join('');
  }

  // ---- 3. BUDOWA ELEMENTÓW ----
  function fab() {
    var n = document.createElement('nav');
    n.id = 'social-fab';
    n.className = 'social-fab';
    n.setAttribute('aria-label', 'Profile społecznościowe autora');
    n.innerHTML = linki('social-fab__link', 18);
    return n;
  }

  function stopka() {
    var f = document.createElement('footer');
    f.id = 'social-stopka';
    f.className = 'social-stopka';
    f.innerHTML =
      '<div class="social-stopka__linki">' + linki('social-stopka__link', 16) + '</div>' +
      '<p>© ' + new Date().getFullYear() + ' Paweł Wasiak</p>' +
      '<p>Zobacz więcej projektów na <a href="' + PORTFOLIO + '" target="_blank" rel="noopener">wasiakpawel.pl</a></p>';
    return f;
  }

  // ---- 4. WSTAWIENIE + PILNOWANIE ----
  // React przy pełnym przerenderowaniu dokumentu może usunąć obce węzły,
  // więc obserwator dokłada je z powrotem, jeśli znikną.
  // Stopka musi być zawsze ostatnia (pod treścią strony) — React przy
  // zmianie podstrony potrafi wstawić swój kontener za nią, wtedy
  // przenosimy ją z powrotem na koniec <body>.
  function wstaw() {
    var body = document.body;
    if (!body) return;
    var s = document.getElementById('social-stopka') || stopka();
    var f = document.getElementById('social-fab') || fab();
    var el = s.nextElementSibling, ok = s.parentNode === body;
    while (ok && el) {
      if (el !== f && el.tagName !== 'SCRIPT') ok = false;
      el = el.nextElementSibling;
    }
    if (!ok) body.appendChild(s);
    if (f.parentNode !== body) body.appendChild(f);
  }

  function start() {
    wstaw();
    new MutationObserver(wstaw).observe(document.body, { childList: true });
  }

  if (document.readyState === 'complete') setTimeout(start, 0);
  else window.addEventListener('load', function () { setTimeout(start, 0); });
})();
