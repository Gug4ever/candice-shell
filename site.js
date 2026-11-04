(function () {
  var LANGS = ['en', 'fr', 'es'];
  var KEY = 'candice-lang';
  var lang = 'en';
  try {
    var saved = localStorage.getItem(KEY);
    if (LANGS.indexOf(saved) > -1) lang = saved;
  } catch (e) {}

  function t(key) {
    var d = window.CS_I18N[lang];
    return d && d[key] != null ? d[key] : window.CS_I18N.en[key];
  }

  var quoteIndex = Math.floor(Math.random() * 7) + 1;

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var v = t(el.getAttribute('data-t'));
      if (v != null) el.innerHTML = v;
    });
    var quote = document.getElementById('hero-quote');
    if (quote) quote.innerHTML = t('q' + quoteIndex);
    var titleKey = document.documentElement.getAttribute('data-title');
    if (titleKey) {
      var plain = document.createElement('span');
      plain.innerHTML = t(titleKey);
      document.title = plain.textContent + (titleKey === 'site.name' ? '' : ' · Candice Shell');
    }
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang;
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      apply();
    });
  });

  var menu = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var lb = document.getElementById('lb');
  var lbImg = lb && lb.querySelector('img');
  var lbCap = lb && lb.querySelector('.lb-cap');
  var lbClose = lb && lb.querySelector('.lb-close');
  var opener = null;

  function closeLb() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  if (lb) {
    document.querySelectorAll('[data-lb]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b;
        lbImg.src = b.getAttribute('data-lb');
        var cap = b.getAttribute('data-cap');
        lbImg.alt = cap ? t(cap).replace(/<[^>]+>/g, '') : '';
        lbCap.innerHTML = cap ? t(cap) : '';
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        lbClose.focus();
      });
    });
    lb.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lb.hidden) closeLb();
    });
  }

  apply();
})();
