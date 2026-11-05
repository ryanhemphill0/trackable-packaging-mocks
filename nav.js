// Header navigation: mobile menu toggle + tap/keyboard support for desktop dropdowns.
(function () {
  var nav = document.querySelector('.header-nav');
  if (!nav) return;
  var btn = nav.querySelector('.menu-btn');
  var panel = document.getElementById('mnav');
  var root = document.documentElement;

  function setOpen(open) {
    if (!btn || !panel) return;
    panel.hidden = !open;
    nav.classList.toggle('menu-open', open);
    root.classList.toggle('nav-locked', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (btn && panel) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(panel.hidden);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && !panel.hidden) setOpen(false);
    });
  }

  // Desktop dropdowns open on hover via CSS; this adds tap (tablets) and keyboard support.
  var dds = nav.querySelectorAll('.dd');
  function closeDropdowns(except) {
    dds.forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove('open');
      var b = dd.querySelector('.nav-link');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  dds.forEach(function (dd) {
    var b = dd.querySelector('.nav-link');
    if (!b) return;
    b.setAttribute('aria-haspopup', 'true');
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !dd.classList.contains('open');
      closeDropdowns(dd);
      dd.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    closeDropdowns();
    if (panel && !panel.hidden && !nav.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (panel && !panel.hidden) { setOpen(false); btn.focus(); }
  });
})();
