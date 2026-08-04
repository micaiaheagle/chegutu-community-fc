/* ==========================================================================
   CHEGUTU COMMUNITY FOOTBALL CLUB — Site behaviour
   Vanilla JavaScript, no dependencies. Every module is guarded so a page
   only runs the code it actually needs.
   ========================================================================== */
(function () {
  'use strict';

  var D = window.CCFC || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var on = function (el, ev, fn, o) { if (el) el.addEventListener(ev, fn, o); };
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* WebP support, decided once. Everything the JS renders then asks for the
     lighter file; browsers that cannot decode it keep getting the JPEG. */
  var USE_WEBP = (function () {
    try {
      var c = document.createElement('canvas');
      return c.toDataURL && c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch (e) { return false; }
  })();
  /* Only photos/ and thumbs/ have WebP twins. Anything the club drops in
     later (staff headshots, new folders) is served exactly as supplied. */
  function img(path) {
    var p = String(path);
    if (!USE_WEBP) return p;
    /* a bare filename belongs to photos/ or thumbs/; any other folder is
       something the club added later and has no WebP twin */
    if (p.indexOf('/') > -1 && !/^(photos|thumbs)\//.test(p)) return p;
    return p.replace(/\.jpe?g$/i, '.webp');
  }
  /* Content in data.js already contains a few safe HTML entities (&amp; &rsquo;)
     so trusted strings pass through unescaped. User input never does. */
  function raw(s) { return String(s == null ? '' : s); }

  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MON3   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAY3   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function parseDate(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtLong(s)  { var d = parseDate(s); return DAY3[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function fmtShort(s) { var d = parseDate(s); return DAY3[d.getDay()] + ' ' + d.getDate() + ' ' + MON3[d.getMonth()]; }
  function param(n) { return new URLSearchParams(location.search).get(n); }
  function money(n) { return '$' + Number(n).toFixed(2); }
  function icon(id, cls) { return '<svg aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '><use href="#' + id + '"/></svg>'; }
  function initials(name) {
    return String(name).replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2)
      .map(function (w) { return w[0]; }).join('').toUpperCase() || 'CC';
  }

  /* ====================================================== TOASTS ======== */
  function toast(msg, kind) {
    var wrap = $('#toastWrap'); if (!wrap) return;
    var t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    t.innerHTML = icon(kind === 'err' ? 'i-alert' : 'i-check-circle') + '<span>' + esc(msg) + '</span>';
    wrap.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .3s, transform .3s';
      t.style.opacity = '0'; t.style.transform = 'translateY(10px)';
      setTimeout(function () { t.remove(); }, 320);
    }, 3200);
  }
  window.ccfcToast = toast;

  /* ================================================ HEADER & SCROLL ===== */
  function initScroll() {
    var bar = $('#scrollProgress'), top = $('#toTop'), header = $('#siteHeader');
    var ticking = false;
    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (top) top.classList.toggle('is-visible', y > 520);
      if (header) header.classList.toggle('is-stuck', y > 40);
      sweepReveals();
      ticking = false;
    }
    on(window, 'scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    on(top, 'click', function () { window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });
  }

  /* ======================================================= DRAWER ======= */
  function initDrawer() {
    var drawer = $('#drawer'), burger = $('#burger');
    if (!drawer || !burger) return;
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-open');
      var first = drawer.querySelector('.drawer__close');
      if (first) setTimeout(function () { first.focus(); }, 260);
    }
    function close() {
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
      if (lastFocus) lastFocus.focus();
    }
    on(burger, 'click', function () { drawer.classList.contains('is-open') ? close() : open(); });
    $$('[data-drawer-close]').forEach(function (b) { on(b, 'click', close); });
    $$('.drawer__sub a, .drawer__link', drawer).forEach(function (a) { on(a, 'click', close); });

    $$('.drawer__toggle', drawer).forEach(function (btn) {
      on(btn, 'click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        $$('.drawer__toggle', drawer).forEach(function (o) { if (o !== btn) o.setAttribute('aria-expanded', 'false'); });
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });

    on(document, 'keydown', function (e) {
      if (e.key !== 'Escape' || !drawer.classList.contains('is-open')) return;
      close();
    });
    /* focus trap */
    on(drawer, 'keydown', function (e) {
      if (e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
      var f = $$('a[href], button:not([disabled]), input, select, textarea', drawer)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ======================================================= SEARCH ======= */
  function initSearch() {
    var ov = $('#searchOverlay'), openBtn = $('#searchOpen'), closeBtn = $('#searchClose');
    var input = $('#siteSearch'), out = $('#searchResults');
    if (!ov) return;
    var idx = (D.searchIndex || []).slice();
    (D.news || []).forEach(function (n) { idx.push({ t: n.title, u: 'article.html?id=' + n.id, d: n.cat + ' — ' + fmtLong(n.date) }); });
    (D.squad || []).forEach(function (p) { idx.push({ t: p.name, u: 'player.html?id=' + p.id, d: p.pos + ' — No. ' + p.no }); });

    function open() { ov.classList.add('is-open'); document.body.classList.add('nav-open'); setTimeout(function () { input.focus(); }, 200); }
    function close() { ov.classList.remove('is-open'); document.body.classList.remove('nav-open'); input.value = ''; out.innerHTML = ''; }
    on(openBtn, 'click', open);
    on(closeBtn, 'click', close);
    on(ov, 'click', function (e) { if (e.target === ov) close(); });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('is-open')) close();
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
    on(input, 'input', function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { out.innerHTML = ''; return; }
      var hits = idx.filter(function (i) {
        return (i.t + ' ' + i.d).toLowerCase().indexOf(q) > -1;
      }).slice(0, 12);
      out.innerHTML = hits.length
        ? hits.map(function (h) { return '<a href="' + h.u + '"><strong>' + raw(h.t) + '</strong><span>' + raw(h.d) + '</span></a>'; }).join('')
        : '<a href="contact.html"><strong>No matches</strong><span>Try another search, or contact the club</span></a>';
    });
    on(input, 'keydown', function (e) {
      if (e.key === 'Enter') { var f = out.querySelector('a'); if (f) location.href = f.getAttribute('href'); }
    });
  }

  /* ===================================================== LANGUAGE ======= */
  function initLang() {
    var wrap = $('#langSwitch'); if (!wrap) return;
    var btn = $('#langBtn'), label = $('#langLabel');
    var CODES = { en: 'EN', sn: 'SN', nd: 'ND' };

    function apply(code) {
      var dict = (D.i18n && D.i18n[code]) || {};
      $$('[data-i18n]').forEach(function (el) {
        var k = el.getAttribute('data-i18n');
        if (!el.hasAttribute('data-i18n-en')) el.setAttribute('data-i18n-en', el.innerHTML);
        el.innerHTML = dict[k] != null ? dict[k] : el.getAttribute('data-i18n-en');
      });
      if (label) label.textContent = CODES[code] || 'EN';
      document.documentElement.setAttribute('data-lang', code);
      $$('[data-lang]', wrap).forEach(function (b) {
        b.setAttribute('aria-current', b.getAttribute('data-lang') === code ? 'true' : 'false');
      });
      try { localStorage.setItem('ccfc-lang', code); } catch (e) {}
    }
    on(btn, 'click', function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    on(document, 'click', function () { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); });
    $$('[data-lang]', wrap).forEach(function (b) {
      on(b, 'click', function () {
        apply(b.getAttribute('data-lang'));
        wrap.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    var saved = 'en';
    try { saved = localStorage.getItem('ccfc-lang') || 'en'; } catch (e) {}
    apply(saved);
  }

  /* ======================================================= REVEAL ======= */
  /* Split a heading into physical lines and wrap each in .line > span so the
     text can rise out of a mask. Re-runs on resize because line breaks move. */
  function splitLines(el) {
    if (el.dataset.splitDone === String(el.offsetWidth)) return;
    if (!el.dataset.splitHtml) el.dataset.splitHtml = el.innerHTML;
    el.innerHTML = el.dataset.splitHtml;

    /* wrap every word so we can measure where the browser broke the line */
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var texts = [], n;
    while ((n = walker.nextNode())) texts.push(n);
    texts.forEach(function (t) {
      if (!t.nodeValue.trim()) return;
      /* carry any inline styling (em, .serif-i, .text-gold …) onto each word,
         so rebuilding the lines never drops the author's markup */
      var inherited = [], p = t.parentNode;
      while (p && p !== el) {
        if (p.className) inherited.push(p.className);
        if (p.tagName === 'EM' || p.tagName === 'I') inherited.push('as-em');
        p = p.parentNode;
      }
      var cls = 'w' + (inherited.length ? ' ' + inherited.join(' ') : '');
      var frag = document.createDocumentFragment();
      t.nodeValue.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        var s = document.createElement('span');
        s.className = cls; s.textContent = w;
        frag.appendChild(s);
      });
      t.parentNode.replaceChild(frag, t);
    });

    var words = $$('.w', el);
    if (!words.length) { el.dataset.splitDone = String(el.offsetWidth); return; }

    /* group words by their vertical offset = one visual line */
    var lines = [], lastTop = null;
    words.forEach(function (w) {
      var top = Math.round(w.offsetTop);
      if (lastTop === null || Math.abs(top - lastTop) > 4) { lines.push([]); lastTop = top; }
      lines[lines.length - 1].push(w);
    });

    var out = document.createDocumentFragment();
    lines.forEach(function (grp, i) {
      var line = document.createElement('span'); line.className = 'line';
      var inner = document.createElement('span'); inner.style.setProperty('--i', i);
      grp.forEach(function (w, j) {
        if (j) inner.appendChild(document.createTextNode(' '));
        inner.appendChild(w);            /* keeps the word's inherited classes */
      });
      line.appendChild(inner); out.appendChild(line);
    });
    el.innerHTML = ''; el.appendChild(out);
    el.dataset.splitDone = String(el.offsetWidth);
  }

  function initLineHeadings() {
    var els = $$('[data-lines]');
    if (!els.length) return;
    if (REDUCED) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    els.forEach(splitLines);
    var t;
    on(window, 'resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        els.forEach(function (el) {
          if (!el.classList.contains('is-in')) splitLines(el);
        });
      }, 240);
    });
  }

  var revealIO = null;
  function initReveal() {
    var els = $$('[data-reveal]:not([data-reveal-bound]), [data-lines]:not([data-reveal-bound]), [data-wipe]:not([data-reveal-bound])');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || REDUCED) {
      els.forEach(function (el) { el.classList.add('is-in'); el.setAttribute('data-reveal-bound', ''); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          /* also settle anything the user jump-scrolled straight past, so
             nothing is ever left invisible after an anchor jump or fast fling */
          if (!e.isIntersecting && e.boundingClientRect.top > 0) return;
          e.target.classList.add('is-in');
          revealIO.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -9% 0px', threshold: 0.05 });
    }
    els.forEach(function (el, i) {
      el.setAttribute('data-reveal-bound', '');
      if (!el.style.getPropertyValue('--rd')) {
        var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : i;
        el.style.setProperty('--rd', Math.min(sibs, 7) * 85 + 'ms');
      }
      revealIO.observe(el);
    });
    sweepReveals();
  }

  /* Safety net — nothing on this site may ever stay invisible. Runs on scroll
     and on a timer, and settles anything that has reached the viewport. */
  var sweepQueued = false;
  function sweepReveals() {
    if (sweepQueued) return;
    sweepQueued = true;
    requestAnimationFrame(function () {
      sweepQueued = false;
      var h = window.innerHeight;
      $$('[data-reveal-bound]:not(.is-in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) el.classList.add('is-in');
        else if (r.bottom <= 0) el.classList.add('is-in');   /* already scrolled past */
      });
    });
  }

  /* ===================================================== PARALLAX ======= */
  function initParallax() {
    var els = $$('[data-parallax]');
    if (!els.length || REDUCED) return;
    var ticking = false;
    function frame() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var depth = parseFloat(el.getAttribute('data-parallax')) || 0.16;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;   /* -1 … 1 */
        el.style.setProperty('--py', (-progress * depth * 100).toFixed(2) + 'px');
      });
      ticking = false;
    }
    on(window, 'scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    on(window, 'resize', frame, { passive: true });
    frame();
  }

  /* ====================================================== CURTAIN ======= */
  function initCurtain() {
    var c = $('#curtain'); if (!c) return;
    if (REDUCED) { c.remove(); return; }
    var hide = function () { c.classList.add('is-done'); setTimeout(function () { c.remove(); }, 1200); };
    if (document.readyState === 'complete') setTimeout(hide, 260);
    else on(window, 'load', function () { setTimeout(hide, 260); });
    setTimeout(hide, 2600);   /* never let it trap the page */
  }

  /* ===================================================== COUNTERS ======= */
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = REDUCED ? 0 : 1500, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = dur ? Math.min((ts - t0) / dur, 1) : 1;
        var eased = 1 - Math.pow(1 - p, 3);
        var v = target * eased;
        el.textContent = (target % 1 ? v.toFixed(1) : Math.round(v)) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else if (el.closest('.stat')) el.closest('.stat').classList.add('is-counted');
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================== HERO ======== */
  function initHero() {
    var hero = $('#hero'); if (!hero) return;
    var slides = $$('.hero__slide', hero);
    var dots   = $$('#heroDots button');
    var thumbs = $$('#heroThumbs .hero__thumb');
    var curEl  = $('#heroCur');
    var titleEl = $('#heroTitle');
    var leadEl  = $('#heroLead');
    var badgeEl = $('#heroBadge');
    var DELAY = 5200;

    /* ---- background video ------------------------------------------------
       Loaded only where it is worth the data: wide viewport, no Save-Data,
       not a 2g/3g connection. Everywhere else the poster frame stands in, so
       nobody burns a mobile bundle on a 5 MB autoplay. */
    var vSlide = hero.querySelector('.hero__slide--video');
    var video = vSlide ? vSlide.querySelector('video') : null;
    if (video) {
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      /* Phones get the video too — just the smaller file. Only an explicit
         Save-Data request or a genuinely slow connection skips it. */
      var slow = conn && (conn.saveData === true || /^(2g|slow-2g)$/.test(conn.effectiveType || ''));
      if (!slow && !REDUCED) {
        var srcEl = document.createElement('source');
        srcEl.src = video.getAttribute(window.innerWidth >= 1100 ? 'data-src-720' : 'data-src-480');
        srcEl.type = 'video/mp4';
        video.appendChild(srcEl);
        /* Do not start until enough is buffered to run without stuttering,
           and never fight the rest of the page for bandwidth on first paint. */
        video.preload = 'auto';
        var started = false;
        function tryStart() {
          if (started || video.readyState < 3) return;   /* 3 = HAVE_FUTURE_DATA */
          started = true;
          var pr = video.play();
          if (pr && pr.catch) pr.catch(function () { /* autoplay blocked — poster stays */ });
        }
        video.addEventListener('canplaythrough', tryStart);
        video.addEventListener('loadeddata', function () { setTimeout(tryStart, 400); });
        /* if the network drops out mid-play, pause and wait rather than judder */
        video.addEventListener('waiting', function () {
          if (video.readyState < 3) video.pause();
        });
        video.addEventListener('canplay', function () {
          if (started && video.paused && slides[i] === vSlide && !video.ended) {
            var r = video.play(); if (r && r.catch) r.catch(function () {});
          }
        });
        /* when the match footage finishes, hand straight over to the slides */
        video.addEventListener('ended', function () {
          if (slides[i] === vSlide) { copyIdx[i] = 0; go(i + 1); }
        });
        /* give the images and fonts a clear run first */
        if (document.readyState === 'complete') video.load();
        else on(window, 'load', function () { setTimeout(function () { video.load(); }, 300); });
        /* safety net: if the video never becomes ready, move on rather than stall */
        setTimeout(function () {
          if (!started && slides[i] === vSlide) { copyIdx[i] = 0; go(i + 1); }
        }, 12000);
      } else {
        video.parentNode.removeChild(video);
        video = null;
      }
    }
    function syncVideo(n) {
      hero.classList.toggle('is-video', !!(vSlide && slides[n] === vSlide));
      if (!video) return;
      if (slides[n] === vSlide) {
        try { video.currentTime = 0; } catch (e) {}
        var q = video.play(); if (q && q.catch) q.catch(function () {});
      } else { video.pause(); }
    }
    function dwellOf(n) { return +(slides[n].getAttribute('data-dwell') || DELAY); }

    /* headline rises out of its mask on first paint */
    if (titleEl && !REDUCED) splitLines(titleEl);
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('is-ready'); }); });
    syncVideo(0);

    /* Slides 2+ ship with their picture held back in data-src, so first paint
       fetches one image instead of six. Wake a slide just before it is needed,
       and top the rest up once the page has finished its own loading. */
    function wake(n) {
      var el = slides[n]; if (!el || el.dataset.woke) return;
      el.dataset.woke = '1';
      $$('source[data-srcset]', el).forEach(function (s) {
        s.srcset = s.getAttribute('data-srcset'); s.removeAttribute('data-srcset');
      });
      $$('img[data-src]', el).forEach(function (im) {
        im.src = im.getAttribute('data-src'); im.removeAttribute('data-src');
      });
    }
    wake(1);                       /* the one that comes next */
    function wakeRest() { slides.forEach(function (_, n) { wake(n); }); }
    if (document.readyState === 'complete') setTimeout(wakeRest, 1200);
    else on(window, 'load', function () { setTimeout(wakeRest, 1200); });

    if (slides.length < 2) return;
    var i = 0, timer = null, busy = false;

    /* A slide may carry several copy sets in data-texts (JSON). They rotate on
       the slide's own dwell before the hero moves to the next slide — which is
       how the video holds while six different messages pass over it. */
    var copySets = slides.map(function (s) {
      var raw = s.getAttribute('data-texts');
      if (raw) {
        try {
          var arr = JSON.parse(raw);
          if (arr && arr.length) return arr;
        } catch (e) { /* fall through to the single-set form */ }
      }
      return [{ badge: s.getAttribute('data-badge'), title: s.getAttribute('data-title'), lead: s.getAttribute('data-lead') }];
    });
    var copyIdx = slides.map(function () { return 0; });

    function copyFor(n) { return copySets[n][copyIdx[n]] || copySets[n][0]; }
    function hasMoreCopy(n) { return copyIdx[n] < copySets[n].length - 1; }

    /* Swap only the words, leaving the picture (or the video) running. */
    function swapCopy(n) {
      if (busy) return;
      busy = true;
      var c = copyFor(n);
      hero.classList.add('is-out');
      window.setTimeout(function () {
        hero.classList.remove('is-ready');
        hero.classList.remove('is-out');
        if (badgeEl && c.badge) badgeEl.lastChild.textContent = ' ' + c.badge;
        if (leadEl && c.lead) leadEl.textContent = c.lead;
        if (c.title && titleEl) {
          titleEl.dataset.splitHtml = c.title;
          titleEl.dataset.splitDone = '';
          if (REDUCED) titleEl.innerHTML = c.title; else splitLines(titleEl);
        }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { hero.classList.add('is-ready'); busy = false; });
        });
      }, REDUCED ? 0 : 300);
      restart();
    }

    function advance() {
      /* still more to say over this slide? change the words, keep the picture */
      if (hasMoreCopy(i)) { copyIdx[i]++; swapCopy(i); return; }
      /* the footage is still running — start the messages again rather than
         cutting away mid-match; the slides take over when the video ends */
      if (vSlide && slides[i] === vSlide && video && !video.ended) {
        copyIdx[i] = 0; swapCopy(i); return;
      }
      copyIdx[i] = 0;
      go(i + 1);
    }

    function go(n) {
      if (busy) return;
      n = (n + slides.length) % slides.length;
      if (n === i) return;
      busy = true;

      copyIdx[n] = 0;
      var c = copyFor(n);
      var prev = slides[i];
      var next = slides[n];

      /* the rail updates immediately so the click feels instant */
      [dots, thumbs].forEach(function (set) {
        if (!set.length) return;
        set.forEach(function (el, k) { el.setAttribute('aria-current', k === n ? 'true' : 'false'); });
      });
      if (curEl) curEl.textContent = String(n + 1).padStart(2, '0');
      i = n;

      /* 1 — the current copy leaves upward */
      hero.classList.add('is-out');

      window.setTimeout(function () {
        /* 2 — the image wipes across while the headline is off-screen */
        prev.classList.add('is-leaving');
        prev.classList.remove('is-active');
        next.classList.add('is-active');
        syncVideo(n);
        window.setTimeout(function () {
          prev.classList.remove('is-leaving');
          busy = false;
        }, 680);

        /* 3 — the new copy is rebuilt at its start position, then rises in.
           Order matters: drop is-ready FIRST so the freshly-built lines are
           created already sitting below their mask, with nothing to unwind. */
        hero.classList.remove('is-ready');
        hero.classList.remove('is-out');
        if (badgeEl && c.badge) badgeEl.lastChild.textContent = ' ' + c.badge;
        if (leadEl && c.lead) leadEl.textContent = c.lead;
        if (c.title && titleEl) {
          titleEl.dataset.splitHtml = c.title;
          titleEl.dataset.splitDone = '';
          if (REDUCED) titleEl.innerHTML = c.title; else splitLines(titleEl);
        }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { hero.classList.add('is-ready'); });
        });
      }, REDUCED ? 0 : 300);

      restart();
    }

    function restart() {
      stop();
      hero.style.setProperty('--hero-delay', dwellOf(i) + 'ms');
      if (!REDUCED) timer = setTimeout(advance, dwellOf(i));
    }
    function stop() { if (timer) clearTimeout(timer); timer = null; }

    dots.forEach(function (d, n) { on(d, 'click', function () { go(n); }); });
    thumbs.forEach(function (t, n) { on(t, 'click', function () { go(n); }); });
    /* The hero fills the screen, so pausing on hover would freeze the rotation
       almost permanently. Only the thumbnail rail holds it — that is where
       someone is deliberately choosing a slide. */
    var rail = hero.querySelector('.hero__rail');
    if (rail) {
      on(rail, 'mouseenter', stop);
      on(rail, 'mouseleave', restart);
    }
    on(document, 'visibilitychange', function () { document.hidden ? stop() : restart(); });

    var x0 = null;
    on(hero, 'touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    on(hero, 'touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });

    on(document, 'keydown', function (e) {
      if (document.activeElement && document.activeElement.closest && document.activeElement.closest('.hero')) {
        if (e.key === 'ArrowRight') go(i + 1);
        if (e.key === 'ArrowLeft') go(i - 1);
      }
    });

    restart();
  }

  /* ====================================================== TICKER ======== */
  function initTicker() {
    var track = $('#tickerTrack'); if (!track) return;
    var fx = (D.fixtures || []).slice(0, 8);
    var rs = (D.results || []).slice(0, 3).reverse();
    var html = '';

    rs.forEach(function (r) {
      var w = r.gf > r.ga ? 'w' : (r.gf === r.ga ? 'd' : 'l');
      var us = 'CCFC', them = raw(r.opponent);
      html += '<a class="ticker__item" role="listitem" href="results.html">' +
        '<span class="ticker__meta">' + esc(fmtShort(r.date)) + ' &middot; FT &middot; ' + raw(r.comp) + '</span>' +
        '<span class="ticker__teams">' + (r.home ? us : them) + ' <span class="ticker__score">' +
          (r.home ? r.gf + '-' + r.ga : r.ga + '-' + r.gf) + '</span> ' + (r.home ? them : us) + '</span>' +
        '<span class="ticker__venue">' + (w === 'w' ? 'Win' : w === 'd' ? 'Draw' : 'Defeat') + ' &middot; ' + (r.team === 'women' ? 'Women' : 'Boys') + '</span></a>';
    });
    fx.forEach(function (f) {
      html += '<a class="ticker__item" role="listitem" href="fixtures.html">' +
        '<span class="ticker__meta">' + esc(fmtShort(f.date)) + ' &middot; ' + esc(f.time) + ' &middot; ' + raw(f.comp) + '</span>' +
        '<span class="ticker__teams">' + (f.home ? 'CCFC v ' + raw(f.opponent) : raw(f.opponent) + ' v CCFC') + '</span>' +
        '<span class="ticker__venue">' + raw(f.venue) + '</span></a>';
    });
    if (!html) { track.innerHTML = '<span class="ticker__item">Fixtures to be confirmed</span>'; return; }

    /* duplicated once so the crawl can loop without a visible seam */
    track.innerHTML = html + html;
    var setWidth = 0;
    var items = $$('.ticker__item', track);
    var half = items.length / 2;
    for (var k = 0; k < half; k++) setWidth += items[k].offsetWidth;
    $$('.ticker__item', track).slice(half).forEach(function (el) { el.setAttribute('aria-hidden', 'true'); el.tabIndex = -1; });

    $$('[data-ticker]').forEach(function (b) {
      on(b, 'click', function () {
        nudge(b.getAttribute('data-ticker') === 'next' ? 262 : -262);
      });
    });

    function nudge(px) {
      var target = track.scrollLeft + px, t0 = null, from = track.scrollLeft;
      paused = true;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 380, 1);
        track.scrollLeft = from + (target - from) * (1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(step);
        else { normalise(); pos = track.scrollLeft; setTimeout(function () { paused = false; }, 1200); }
      }
      requestAnimationFrame(step);
    }
    function normalise() {
      if (!setWidth) return;
      if (track.scrollLeft >= setWidth) track.scrollLeft -= setWidth;
      else if (track.scrollLeft < 0) track.scrollLeft += setWidth;
    }

    /* Continuous right-to-left crawl, so more fixtures keep arriving.
       The position is accumulated in JS: assigning sub-pixel increments
       straight to scrollLeft quantises to zero and never moves. */
    var paused = false, pos = 0, SPEED = 34, last = 0;   /* px per SECOND, not per frame */
    if (REDUCED || !setWidth) return;

    function resync() { pos = track.scrollLeft; if (pos >= setWidth) pos -= setWidth; }

    (function crawl(ts) {
      if (ts) {
        if (!last) last = ts;
        var dt = Math.min(ts - last, 64);   /* clamp so a stalled tab cannot jump */
        last = ts;
        if (!paused && !document.hidden && setWidth) {
          pos += SPEED * dt / 1000;
          if (pos >= setWidth) pos -= setWidth;
          track.scrollLeft = pos;
        }
      }
      requestAnimationFrame(crawl);
    })();

    function hold() { paused = true; }
    function release(delay) {
      clearTimeout(resumeT);
      resumeT = setTimeout(function () { resync(); paused = false; }, delay || 0);
    }
    var resumeT;
    on(track, 'mouseenter', hold);
    on(track, 'mouseleave', function () { release(0); });
    on(track, 'focusin', hold);
    on(track, 'focusout', function () { release(0); });
    /* let a human take over by dragging or scrolling, then pick the crawl back up */
    on(track, 'pointerdown', hold);
    on(window, 'pointerup', function () { release(1600); });
    on(track, 'wheel', function () { hold(); release(1600); }, { passive: true });
    on(track, 'touchstart', hold, { passive: true });
    on(track, 'touchend', function () { release(1800); }, { passive: true });
  }

  /* =================================================== ACCORDION ======== */
  function initAccordion() {
    $$('.acc__btn').forEach(function (btn) {
      on(btn, 'click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        var group = btn.closest('.accordion');
        if (group && group.hasAttribute('data-single')) {
          $$('.acc__btn', group).forEach(function (o) { if (o !== btn) o.setAttribute('aria-expanded', 'false'); });
        }
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  }

  /* ======================================================== TABS ======== */
  function initTabs() {
    $$('.tabs').forEach(function (tabs) {
      var btns = $$('.tabs__btn', tabs), panels = $$('.tabs__panel', tabs);
      function select(n) {
        btns.forEach(function (b, j) { b.setAttribute('aria-selected', j === n ? 'true' : 'false'); b.tabIndex = j === n ? 0 : -1; });
        panels.forEach(function (p, j) { p.hidden = j !== n; });
      }
      btns.forEach(function (b, n) {
        on(b, 'click', function () { select(n); });
        on(b, 'keydown', function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          var next = (n + d + btns.length) % btns.length;
          select(next); btns[next].focus();
        });
      });
      var start = btns.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
      select(start < 0 ? 0 : start);
    });
  }

  /* ==================================================== FIXTURES ======== */
  function matchCard(f) {
    var us = 'Chegutu Community', them = raw(f.opponent);
    var home = f.home;
    return '<article class="match-card" data-reveal>' +
      '<div class="match-card__top"><span class="match-card__comp">' + raw(f.comp) + '</span>' +
        '<span>' + (home ? 'Home' : 'Away') + ' &middot; ' + (f.team === 'women' ? 'Women' : 'Boys') + '</span></div>' +
      '<div class="match-card__body">' +
        '<div class="match-card__teams">' +
          '<div class="match-card__team"><img class="match-card__crest" src="assets/img/crest-128.png" alt="" width="52" height="45"><span class="match-card__name">' + (home ? us : them) + '</span></div>' +
          '<span class="match-card__vs">V</span>' +
          '<div class="match-card__team">' + (home
            ? '<span class="match-card__crest">' + esc(initials(them)) + '</span><span class="match-card__name">' + them + '</span>'
            : '<img class="match-card__crest" src="assets/img/crest-128.png" alt="" width="52" height="45"><span class="match-card__name">' + us + '</span>') + '</div>' +
        '</div>' +
        '<div class="match-card__kick">' + esc(fmtShort(f.date)) + ' &middot; ' + esc(f.time) + '</div>' +
        '<div class="match-card__venue">' + icon('i-pin') + '<span>' + raw(f.venue) + '</span></div>' +
      '</div>' +
      '<div class="match-card__foot">' +
        (f.tickets ? '<a class="btn btn--sm btn--block" href="tickets.html">Buy Tickets</a>' : '<a class="btn btn--sm btn--ghost btn--block" href="fixtures.html">Match Details</a>') +
      '</div></article>';
  }

  function resultCard(r) {
    var us = 'Chegutu Community', them = raw(r.opponent);
    var ours = r.gf, theirs = r.ga;
    var res = ours > theirs ? 'w' : ours === theirs ? 'd' : 'l';
    return '<article class="match-card match-card--result" data-reveal>' +
      '<div class="match-card__top"><span class="match-card__comp">' + raw(r.comp) + '</span>' +
        '<span>Full Time &middot; ' + (r.team === 'women' ? 'Women' : 'Boys') + '</span></div>' +
      '<div class="match-card__body">' +
        '<div class="match-card__teams">' +
          '<div class="match-card__team">' + (r.home
            ? '<img class="match-card__crest" src="assets/img/crest-128.png" alt="" width="52" height="45"><span class="match-card__name">' + us + '</span>'
            : '<span class="match-card__crest">' + esc(initials(them)) + '</span><span class="match-card__name">' + them + '</span>') + '</div>' +
          '<span class="match-card__score">' + (r.home ? ours : theirs) + '<span>&ndash;</span>' + (r.home ? theirs : ours) + '</span>' +
          '<div class="match-card__team">' + (r.home
            ? '<span class="match-card__crest">' + esc(initials(them)) + '</span><span class="match-card__name">' + them + '</span>'
            : '<img class="match-card__crest" src="assets/img/crest-128.png" alt="" width="52" height="45"><span class="match-card__name">' + us + '</span>') + '</div>' +
        '</div>' +
        '<div class="match-card__kick"><span class="result-pill result-pill--' + res + '" style="display:inline-grid;vertical-align:middle;margin-right:.4rem">' +
          res.toUpperCase() + '</span>' + esc(fmtShort(r.date)) + '</div>' +
        (r.scorers && r.scorers !== '—' ? '<div class="match-card__venue">' + icon('i-ball') + '<span>' + raw(r.scorers) + '</span></div>' : '') +
      '</div>' +
      (r.report ? '<div class="match-card__foot"><a class="btn btn--sm btn--ghost btn--block" href="article.html?id=' + esc(r.report) + '">Match Report</a></div>' : '') +
      '</article>';
  }

  function fixtureRow(f) {
    var d = parseDate(f.date);
    return '<article class="fixture-row" data-reveal="left">' +
      '<div class="fixture-row__date"><div class="fixture-row__day">' + d.getDate() + '</div><div class="fixture-row__mon">' + MON3[d.getMonth()] + '</div></div>' +
      '<div class="fixture-row__main">' +
        '<div class="fixture-row__teams">' + (f.home ? 'Chegutu Community v ' + raw(f.opponent) : raw(f.opponent) + ' v Chegutu Community') + '</div>' +
        '<div class="fixture-row__sub"><span>' + icon('i-clock') + ' ' + esc(f.time) + '</span><span>' + icon('i-pin') + ' ' + raw(f.venue) + '</span><span>' + raw(f.comp) + '</span></div>' +
      '</div>' +
      '<div class="fixture-row__right">' +
        '<span class="badge ' + (f.home ? 'badge--gold' : 'badge--outline') + '">' + (f.home ? 'Home' : 'Away') + '</span>' +
        '<span class="badge badge--navy">' + (f.team === 'women' ? 'Women' : 'Boys') + '</span>' +
        (f.tickets ? '<a class="btn btn--sm" href="tickets.html">Tickets</a>' : '') +
      '</div></article>';
  }

  function initFixtures() {
    var grid = $('#fixturesGrid'), list = $('#fixturesList'), nextWrap = $('#nextMatch'), prevWrap = $('#prevResult');
    var all = (D.fixtures || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var pre = param('team');

    if (grid) grid.innerHTML = all.slice(0, +(grid.getAttribute('data-limit') || 3)).map(matchCard).join('');

    if (list) {
      var render = function (team) {
        var items = team === 'all' ? all : all.filter(function (f) { return f.team === team; });
        list.innerHTML = items.length ? items.map(fixtureRow).join('')
          : '<div class="empty">' + icon('i-calendar') + '<h4>No fixtures listed</h4><p>Fixtures for this team will appear here as soon as they are confirmed.</p></div>';
        initReveal();
      };
      var start = (pre === 'women' || pre === 'boys') ? pre : 'all';
      render(start);
      $$('[data-fixture-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-fixture-filter') === start ? 'true' : 'false');
        on(b, 'click', function () {
          $$('[data-fixture-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          render(b.getAttribute('data-fixture-filter'));
        });
      });
    }

    if (nextWrap && all[0]) nextWrap.innerHTML = matchCard(all[0]);
    var res = (D.results || []).slice().sort(function (a, b) { return a.date > b.date ? -1 : 1; });
    if (prevWrap && res[0]) prevWrap.innerHTML = resultCard(res[0]);

    var rg = $('#resultsGrid');
    if (rg) {
      var renderR = function (team) {
        var items = team === 'all' ? res : res.filter(function (r) { return r.team === team; });
        rg.innerHTML = items.length ? items.map(resultCard).join('')
          : '<div class="empty">' + icon('i-ball') + '<h4>No results yet</h4><p>Results will be published here after each match.</p></div>';
        initReveal();
      };
      renderR('all');
      $$('[data-result-filter]').forEach(function (b) {
        on(b, 'click', function () {
          $$('[data-result-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          renderR(b.getAttribute('data-result-filter'));
        });
      });
    }

    initCountdown(all[0]);
  }

  function initCountdown(fx) {
    var el = $('#countdown'); if (!el || !fx) return;
    var target = new Date(fx.date + 'T' + (fx.time || '15:00') + ':00');
    function tick() {
      var diff = target - new Date();
      if (diff <= 0) { el.innerHTML = '<div class="countdown__unit"><span class="countdown__num">LIVE</span><span class="countdown__lbl">Kick Off</span></div>'; return; }
      var d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5),
          m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
      var u = [[d, 'Days'], [h, 'Hours'], [m, 'Mins'], [s, 'Secs']];
      el.innerHTML = u.map(function (x) {
        return '<div class="countdown__unit"><span class="countdown__num">' + String(x[0]).padStart(2, '0') + '</span><span class="countdown__lbl">' + x[1] + '</span></div>';
      }).join('');
    }
    tick(); setInterval(tick, 1000);
  }

  /* ======================================================= TABLES ======= */
  function renderTable(host, key) {
    var t = (D.tables || {})[key]; if (!t || !host) return;
    /* the Form column only appears when there is real form data to put in it */
    var hasForm = t.rows.some(function (r) { return r.form; });
    var rows = t.rows.map(function (r) {
      var pts = r.w * 3 + r.d, gd = r.gf - r.ga;
      var form = String(r.form || '').split('').map(function (c) {
        var cls = c === 'W' ? 'var(--win)' : c === 'D' ? 'var(--draw)' : 'var(--loss)';
        return '<span style="background:' + cls + '" title="' + (c === 'W' ? 'Win' : c === 'D' ? 'Draw' : 'Loss') + '">' + c + '</span>';
      }).join('');
      return '<tr' + (r.club ? ' class="is-club"' : '') + '>' +
        '<td>' + r.pos + '</td>' +
        '<td><span class="team-cell">' + (r.club
            ? '<img src="assets/img/crest-64.png" alt="" width="26" height="23">'
            : '<span class="mini-crest">' + esc(initials(r.team)) + '</span>') +
          '<b>' + raw(r.team) + '</b></span></td>' +
        '<td class="num">' + r.p + '</td><td>' + r.w + '</td><td>' + r.d + '</td><td>' + r.l + '</td>' +
        '<td>' + r.gf + '</td><td>' + r.ga + '</td><td class="num">' + (gd > 0 ? '+' : '') + gd + '</td>' +
        '<td class="num">' + pts + '</td>' +
        (hasForm ? '<td><span class="form-row">' + form + '</span></td>' : '') + '</tr>';
    }).join('');
    host.innerHTML =
      '<div class="table-wrap"><table class="data-table"><caption class="sr-only">' + raw(t.name) + ' ' + raw(t.season) + ' standings</caption>' +
      '<thead><tr><th scope="col">#</th><th scope="col">Team</th><th scope="col" title="Played">P</th>' +
      '<th scope="col" title="Won">W</th><th scope="col" title="Drawn">D</th><th scope="col" title="Lost">L</th>' +
      '<th scope="col" title="Goals for">GF</th><th scope="col" title="Goals against">GA</th>' +
      '<th scope="col" title="Goal difference">GD</th><th scope="col" title="Points">PTS</th>' +
      (hasForm ? '<th scope="col">Form</th>' : '') + '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="table-legend">' +
        (hasForm ? '<span><i style="background:var(--win)"></i> Win</span><span><i style="background:var(--draw)"></i> Draw</span>' +
                   '<span><i style="background:var(--loss)"></i> Loss</span>' : '') +
        '<span><i style="background:var(--gold-400)"></i> Chegutu Community FC</span>' +
        (t.official ? '<span>' + icon('i-check-circle') + ' Official league table &middot; ' + raw(t.season) + '</span>' : '') +
      '</div>';
  }

  function initTables() {
    var w = $('#tableWomen'), b = $('#tableBoys'), mini = $('#tableMini');
    if (w) renderTable(w, 'women');
    if (b) renderTable(b, 'boys');
    if (mini) {
      var t = D.tables.women;
      var all = t.rows, ci = all.findIndex(function (r) { return r.club; });
      /* always show the leaders and always show us, however far apart they are */
      var show = all.slice(0, 4);
      var gap = false;
      if (ci > 4) {
        gap = true;
        show = show.concat(all.slice(Math.max(4, ci - 1), Math.min(all.length, ci + 2)));
      } else {
        show = all.slice(0, 6);
      }
      function row(r) {
        var gd = r.gf - r.ga;
        return '<tr' + (r.club ? ' class="is-club"' : '') + '><td>' + r.pos + '</td>' +
          '<td><span class="team-cell">' + (r.club ? '<img src="assets/img/crest-64.png" alt="" width="26" height="23">' : '<span class="mini-crest">' + esc(initials(r.team)) + '</span>') +
          '<b>' + raw(r.team) + '</b></span></td><td class="num">' + r.p + '</td><td>' + (gd > 0 ? '+' : '') + gd + '</td><td class="num">' + (r.w * 3 + r.d) + '</td></tr>';
      }
      var body = show.slice(0, 4).map(row).join('') +
        (gap ? '<tr class="is-gap"><td colspan="5">&middot;&middot;&middot;</td></tr>' : '') +
        show.slice(4).map(row).join('');
      mini.innerHTML = '<div class="table-wrap"><table class="data-table" style="min-width:0"><thead><tr>' +
        '<th scope="col">#</th><th scope="col">Team</th><th scope="col">P</th><th scope="col">GD</th><th scope="col">PTS</th></tr></thead><tbody>' +
        body + '</tbody></table></div>';
    }
  }

  /* ======================================================== SQUAD ======= */
  function playerCard(p) {
    return '<a class="player-card" href="player.html?id=' + esc(p.id) + '" data-reveal="zoom" aria-label="' + esc(p.name) + ', ' + esc(p.pos) + '">' +
      '<img src="assets/img/crest-512.png" alt="" loading="lazy" width="512" height="444" style="object-fit:contain;object-position:center 40%;padding:16%;opacity:.16;filter:none">' +
      '<span class="player-card__num">' + p.no + '</span>' +
      '<span class="player-card__body">' +
        '<span class="player-card__pos">' + raw(p.pos) + (p.captain ? ' &middot; Captain' : '') + '</span>' +
        '<span class="player-card__name">' + raw(p.name) + '</span>' +
        '<span class="player-card__stats">' +
          '<span class="player-card__stat"><b>' + p.apps + '</b><small>Apps</small></span>' +
          '<span class="player-card__stat"><b>' + (p.posShort === 'GK' ? p.cleanSheets : p.goals) + '</b><small>' + (p.posShort === 'GK' ? 'Clean Sheets' : 'Goals') + '</small></span>' +
        '</span>' +
      '</span></a>';
  }

  function initSquad() {
    var host = $('#squadGrid'); if (!host) return;
    var pre = param('team');
    var state = { team: (pre === 'boys' ? 'boys' : 'women'), pos: 'all' };

    function render() {
      var items = (D.squad || []).filter(function (p) {
        return p.team === state.team && (state.pos === 'all' || p.pos === state.pos);
      }).sort(function (a, b) { return a.no - b.no; });
      host.innerHTML = items.length ? items.map(playerCard).join('')
        : '<div class="empty" style="grid-column:1/-1">' + icon('i-users') + '<h4>No players in this group</h4><p>Try another filter.</p></div>';
      var c = $('#squadCount');
      if (c) c.textContent = items.length + ' player' + (items.length === 1 ? '' : 's');
      initReveal();
    }
    $$('[data-squad-team]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-squad-team') === state.team ? 'true' : 'false');
      on(b, 'click', function () {
        state.team = b.getAttribute('data-squad-team');
        $$('[data-squad-team]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true'); render();
      });
    });
    $$('[data-squad-pos]').forEach(function (b) {
      on(b, 'click', function () {
        state.pos = b.getAttribute('data-squad-pos');
        $$('[data-squad-pos]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true'); render();
      });
    });
    render();
  }

  function initPlayer() {
    var host = $('#playerProfile'); if (!host) return;
    var p = (D.squad || []).filter(function (x) { return x.id === param('id'); })[0] || (D.squad || [])[0];
    if (!p) { host.innerHTML = '<div class="empty">' + icon('i-users') + '<h4>Player not found</h4><p><a href="squad.html">Back to the squad</a></p></div>'; return; }
    document.title = p.name + ' | Chegutu Community FC';
    var age = (function () { var d = parseDate(p.dob), t = new Date(), a = t.getFullYear() - d.getFullYear();
      if (t.getMonth() < d.getMonth() || (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())) a--; return a; })();

    host.innerHTML =
      '<div class="split split--wide-body">' +
        '<div class="split__media" style="background:linear-gradient(165deg,var(--green-600),var(--green-900));display:grid;place-items:center;aspect-ratio:3/4;position:relative">' +
          '<img src="assets/img/crest-512.png" alt="" style="width:62%;aspect-ratio:auto;opacity:.9" width="512" height="444">' +
          '<span style="position:absolute;top:.4rem;right:1.2rem;font-family:var(--font-display);font-size:clamp(4rem,12vw,7rem);color:rgba(255,240,15,.22);line-height:1">' + p.no + '</span>' +
          '<span class="split__badge"><b>No. ' + p.no + '</b><small>' + raw(p.pos) + '</small></span>' +
        '</div>' +
        '<div class="split__body">' +
          '<p class="kicker">' + (p.team === 'women' ? 'Women&rsquo;s First Team' : 'Boys First Team') + (p.captain ? ' &middot; Club Captain' : '') + '</p>' +
          '<h1 class="display">' + raw(p.name) + '</h1>' +
          '<p class="lead">' + raw(p.bio) + '</p>' +
          '<div class="stats stats--light mt-2">' +
            '<div class="stat"><span class="stat__num" data-count="' + p.apps + '">0</span><span class="stat__label">Appearances</span></div>' +
            '<div class="stat"><span class="stat__num" data-count="' + p.goals + '">0</span><span class="stat__label">Goals</span></div>' +
            (p.posShort === 'GK' ? '<div class="stat"><span class="stat__num" data-count="' + p.cleanSheets + '">0</span><span class="stat__label">Clean Sheets</span></div>' : '') +
            '<div class="stat"><span class="stat__num" data-count="' + age + '">0</span><span class="stat__label">Age</span></div>' +
          '</div>' +
          '<div class="table-wrap mt-3"><table class="data-table" style="min-width:0">' +
            '<tbody>' +
            '<tr><td style="text-align:left"><b>Position</b></td><td style="text-align:left">' + raw(p.pos) + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Squad Number</b></td><td style="text-align:left">' + p.no + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Date of Birth</b></td><td style="text-align:left">' + esc(fmtLong(p.dob)) + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Nationality</b></td><td style="text-align:left">' + raw(p.nat) + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Height</b></td><td style="text-align:left">' + raw(p.height) + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Preferred Foot</b></td><td style="text-align:left">' + raw(p.foot) + '</td></tr>' +
            '<tr><td style="text-align:left"><b>Joined the Club</b></td><td style="text-align:left">' + raw(p.joined) + '</td></tr>' +
            '</tbody></table></div>' +
          '<div class="cluster mt-3"><a class="btn" href="squad.html?team=' + esc(p.team) + '">Back to Squad ' + icon('i-arrow-right') + '</a>' +
            '<a class="btn btn--ghost" href="stats.html">Season Statistics</a></div>' +
        '</div>' +
      '</div>';
    initCounters();
  }

  /* ======================================================== STAFF ======= */
  function initStaff() {
    var host = $('#staffGrid'); if (!host) return;
    var all = D.staff || [];
    var FALLBACK = "this.onerror=null;this.src='assets/img/crest-512.png';this.style.objectFit='contain';this.style.padding='14%';this.style.background='var(--green-100)'";

    /* whoever is flagged `lead` gets the large feature card at the top */
    var lead = all.filter(function (s) { return s.lead; })[0];
    var html = '';
    if (lead) {
      html += '<div class="staff-lead" data-reveal="rise">' +
        '<div class="staff-lead__img" data-wipe><img src="assets/img/' + esc(img(lead.photo)) + '" alt="' + esc(String(lead.name).replace(/&amp;/g, '&')) + ', ' + esc(String(lead.role).replace(/&rsquo;/g, '’')) + '" loading="lazy" width="720" height="900" onerror="' + FALLBACK + '"></div>' +
        '<div class="staff-lead__body">' +
          '<p class="kicker">' + raw(lead.dept) + '</p>' +
          '<h3 class="staff-lead__name">' + raw(lead.name) + '</h3>' +
          '<p class="staff-lead__role">' + raw(lead.role) + '</p>' +
          (lead.bio ? '<p class="staff-lead__bio">' + raw(lead.bio) + '</p>' : '') +
          '<div class="cluster mt-2"><a class="btn btn--sm" href="team-women.html">Women&rsquo;s First Team <svg aria-hidden="true"><use href="#i-arrow-right"/></svg></a>' +
          '<a class="btn btn--sm btn--ghost" href="contact.html">Contact the Club</a></div>' +
        '</div></div>';
    }

    var groups = {};
    all.forEach(function (s) { if (!s.lead) (groups[s.dept] = groups[s.dept] || []).push(s); });
    html += Object.keys(groups).map(function (dept) {
      return '<div class="mb-3" data-reveal><h3 class="mb-2" style="padding-bottom:.6rem;border-bottom:2px solid var(--gold-400)">' + raw(dept) + '</h3>' +
        '<div class="grid grid-2">' + groups[dept].map(function (s) {
          return '<article class="staff-card"><div class="staff-card__img"><img src="assets/img/' + esc(img(s.photo)) + '" alt="" loading="lazy" width="220" height="260" onerror="' + FALLBACK + '"></div>' +
            '<div class="staff-card__body"><span class="staff-card__role">' + raw(s.role) + '</span>' +
            '<span class="staff-card__name">' + raw(s.name) + '</span>' +
            '<span class="staff-card__dept">' + raw(s.dept) + ' Department</span></div></article>';
        }).join('') + '</div></div>';
    }).join('');

    host.innerHTML = html;
    initReveal();
  }

  /* ========================================================= NEWS ======= */
  function newsCard(n, feature) {
    return '<article class="card' + (feature ? ' card--feature card--overlay' : '') + '" data-reveal>' +
      '<div class="card__media"><img src="assets/img/' + esc(img(n.img)) + '" alt="" loading="lazy" decoding="async" width="800" height="500"></div>' +
      '<span class="badge card__badge">' + raw(n.cat) + '</span>' +
      '<div class="card__body">' +
        '<h3 class="card__title">' + raw(n.title) + '</h3>' +
        '<p class="card__excerpt">' + raw(n.excerpt) + '</p>' +
        '<div class="card__meta">' + icon('i-calendar') + '<span>' + esc(fmtLong(n.date)) + '</span></div>' +
      '</div>' +
      '<a class="card__link" href="article.html?id=' + esc(n.id) + '">Read: ' + esc(n.title.replace(/&amp;/g, '&')) + '</a></article>';
  }

  function initNews() {
    var latest = $('#latestNews'), full = $('#newsGrid');
    var all = (D.news || []).slice().sort(function (a, b) { return a.date > b.date ? -1 : 1; });

    if (latest) {
      var n = +(latest.getAttribute('data-limit') || 5);
      latest.innerHTML = all.slice(0, n).map(function (a, i) { return newsCard(a, i === 0); }).join('');
    }
    if (full) {
      var cat = param('cat');
      var render = function (key) {
        var items = key === 'all' ? all : all.filter(function (a) { return a.catKey === key; });
        full.innerHTML = items.length ? items.map(function (a, i) { return newsCard(a, i === 0 && key === 'all'); }).join('')
          : '<div class="empty" style="grid-column:1/-1">' + icon('i-doc') + '<h4>Nothing here yet</h4><p>There are no articles in this category at the moment.</p></div>';
        initReveal();
      };
      var start = cat || 'all';
      render(start);
      $$('[data-news-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-news-filter') === start ? 'true' : 'false');
        on(b, 'click', function () {
          $$('[data-news-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          render(b.getAttribute('data-news-filter'));
        });
      });
    }
  }

  function initArticle() {
    var host = $('#articleBody'); if (!host) return;
    var all = (D.news || []);
    var a = all.filter(function (x) { return x.id === param('id'); })[0] || all[0];
    if (!a) return;
    document.title = String(a.title).replace(/&amp;/g, '&').replace(/&rsquo;/g, '’') + ' | Chegutu Community FC';
    var hero = $('#articleHero'), ttl = $('#articleTitle'), meta = $('#articleMeta'), crumb = $('#articleCrumb');
    if (hero) hero.src = 'assets/img/' + a.img;
    if (ttl) ttl.innerHTML = raw(a.title);
    if (crumb) crumb.innerHTML = raw(a.cat);
    if (meta) meta.innerHTML = '<span class="badge badge--gold">' + raw(a.cat) + '</span><span>' + icon('i-calendar') + ' ' + esc(fmtLong(a.date)) + '</span>';
    host.innerHTML = '<p class="lead">' + raw(a.excerpt) + '</p>' + (a.body || []).map(function (p) { return '<p>' + raw(p) + '</p>'; }).join('');

    var rel = $('#relatedNews');
    if (rel) {
      rel.innerHTML = all.filter(function (x) { return x.id !== a.id; }).slice(0, 3).map(function (x) { return newsCard(x); }).join('');
      initReveal();
    }
    $$('[data-share]').forEach(function (b) {
      on(b, 'click', function (e) {
        e.preventDefault();
        var kind = b.getAttribute('data-share');
        var url = encodeURIComponent(location.href);
        var txt = encodeURIComponent(String(a.title).replace(/&amp;/g, '&'));
        var map = {
          facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
          x: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + txt,
          whatsapp: 'https://wa.me/?text=' + txt + '%20' + url,
          linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url
        };
        if (kind === 'copy') {
          if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { toast('Link copied to clipboard', 'ok'); });
          return;
        }
        window.open(map[kind], '_blank', 'noopener,width=640,height=560');
      });
    });
  }

  /* ======================================================= VIDEOS ======= */
  function initVideos() {
    var host = $('#videoGrid'); if (!host) return;
    var all = D.videos || [];
    function render(cat) {
      var items = cat === 'all' ? all : all.filter(function (v) { return v.cat === cat; });
      host.innerHTML = items.map(function (v) {
        var tag = v.file ? 'button type="button"' : 'a href="videos.html#' + esc(v.id) + '"';
        return '<' + tag + ' class="video-card" data-reveal="zoom"' + (v.file ? ' data-play="' + esc(v.file) + '"' : '') + '>' +
          '<img src="assets/img/' + esc(img(v.img)) + '" alt="" loading="lazy" width="800" height="450">' +
          '<span class="video-card__play"><span>' + icon('i-play') + '</span></span>' +
          '<span class="video-card__body"><span>' + raw(v.cat) + ' &middot; ' + esc(v.dur) +
            (v.credit ? ' &middot; ' + raw(v.credit) : '') + '</span><h4>' + raw(v.title) + '</h4></span>' +
          '</' + (v.file ? 'button' : 'a') + '>';
      }).join('') || '<div class="empty" style="grid-column:1/-1">' + icon('i-video') + '<h4>No videos yet</h4></div>';

      /* playable clips open in the lightbox shell as a real <video> */
      initFeatureVideos();
      initReveal();
    }
    render('all');
    $$('[data-video-filter]').forEach(function (b) {
      on(b, 'click', function () {
        $$('[data-video-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        render(b.getAttribute('data-video-filter'));
      });
    });
  }

  /* ====================================================== GALLERY ======= */
  var LB = { items: [], i: 0 };
  function initGallery() {
    var host = $('#galleryGrid');
    var strip = $('#galleryStrip');
    var all = D.gallery || [];

    /* any number of strips on a page, each optionally filtered by category */
    $$('[data-limit][id$="Strip"]').forEach(function (el) {
      var n = +(el.getAttribute('data-limit') || 8);
      var cat = el.getAttribute('data-cat');
      var pool = cat ? all.filter(function (g) { return g.cat === cat; }) : all;
      var pick = pool.slice(0, n);
      el.innerHTML = pick.map(function (g, i) { return galItem(g, i); }).join('');
      wireLightbox(el, pick);
    });
    if (strip) initReveal();

    if (host) {
      var counter = $('#galleryCount');
      var render = function (cat) {
        var items = cat === 'all' ? all : all.filter(function (g) { return g.cat === cat; });
        host.innerHTML = items.map(function (g, i) { return galItem(g, i); }).join('');
        if (counter) counter.textContent = items.length + ' photograph' + (items.length === 1 ? '' : 's');
        wireLightbox(host, items);
        initReveal();
      };
      var bar = $('#galleryFilters');
      if (bar) {
        bar.innerHTML = (D.galleryCats || []).map(function (c, i) {
          return '<button class="filter-btn" type="button" data-gal-filter="' + esc(c.key) + '" aria-pressed="' + (i === 0) + '">' + raw(c.label) + '</button>';
        }).join('');
        $$('[data-gal-filter]', bar).forEach(function (b) {
          on(b, 'click', function () {
            $$('[data-gal-filter]', bar).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            render(b.getAttribute('data-gal-filter'));
          });
        });
      }
      render('all');
    }
  }

  /* photographs live in assets/img/<dir>/ — the club archive has no dir,
     newer sets (the Boys U19 shoot) carry one */
  function galThumb(g) { return 'assets/img/' + (g.dir ? g.dir + '/thumbs/' : 'thumbs/') + img(g.id); }
  function galFull(g)  { return 'assets/img/' + (g.dir ? g.dir + '/' : 'photos/') + img(g.id); }

  function galItem(g, i) {
    return '<button type="button" class="gal-item" data-gal="' + i + '" data-reveal="zoom" aria-label="Open photo: ' + esc(g.cap) + '">' +
      '<img src="' + galThumb(g) + '" alt="' + esc(g.cap) + '" loading="lazy" decoding="async" width="' + g.w + '" height="' + g.h + '">' +
      '<span class="gal-item__zoom">' + icon('i-zoom') + '</span>' +
      '<span class="gal-item__cap">' + esc(g.cap) + '</span></button>';
  }

  function wireLightbox(host, items) {
    $$('[data-gal]', host).forEach(function (btn) {
      on(btn, 'click', function () { LB.items = items; openLightbox(+btn.getAttribute('data-gal')); });
    });
  }

  /* Plays a club video inside the existing lightbox shell. */
  function openVideo(src, title) {
    var lb = $('#lightbox'); if (!lb) { window.open(src, '_blank', 'noopener'); return; }
    var stage = $('.lightbox__stage', lb), img = $('#lbImg'), cap = $('#lbCap'), num = $('#lbNum');
    if (img) img.style.display = 'none';
    $$('.lightbox__btn', lb).forEach(function (b) { b.style.display = 'none'; });
    var old = stage.querySelector('video'); if (old) old.remove();
    var v = document.createElement('video');
    v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute('controlsList', 'nodownload');
    v.style.cssText = 'max-width:100%;max-height:100%;width:auto;border-radius:var(--r-sm);box-shadow:0 30px 80px rgba(0,0,0,.6);background:#000';
    stage.appendChild(v);
    if (cap) cap.textContent = title || '';
    if (num) num.textContent = 'Video';
    lb.classList.add('is-open');
    document.body.classList.add('nav-open');
    var c = $('#lbClose'); if (c) c.focus();
    lb.setAttribute('data-mode', 'video');
  }

  function openLightbox(i) {
    var lb = $('#lightbox'); if (!lb) return;
    LB.i = i;
    paintLightbox();
    lb.classList.add('is-open');
    document.body.classList.add('nav-open');
    var c = $('#lbClose'); if (c) c.focus();
  }
  function paintLightbox() {
    var g = LB.items[LB.i]; if (!g) return;
    var el = $('#lbImg'), cap = $('#lbCap'), num = $('#lbNum');
    if (el) { el.src = galFull(g); el.alt = g.cap; }
    if (cap) cap.textContent = g.cap;
    if (num) num.textContent = (LB.i + 1) + ' / ' + LB.items.length;
  }
  /* Feature stills anywhere on the site open their film in the lightbox. */
  function initFeatureVideos() {
    $$('[data-play]').forEach(function (b) {
      if (b.dataset.playBound) return;
      b.dataset.playBound = '1';
      on(b, 'click', function () {
        var small = b.getAttribute('data-play-sm');
        var src = (small && window.innerWidth < 900) ? small : b.getAttribute('data-play');
        var t = b.querySelector('h4') || b.querySelector('.video-feature__tag');
        openVideo(src, b.getAttribute('aria-label') || (t ? t.textContent : ''));
      });
    });
  }

  function initLightboxChrome() {
    var lb = $('#lightbox'); if (!lb) return;
    function close() {
      lb.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      /* tear down any playing video and restore the photo viewer */
      var v = lb.querySelector('video');
      if (v) { v.pause(); v.remove(); }
      var img = $('#lbImg'); if (img) img.style.display = '';
      $$('.lightbox__btn', lb).forEach(function (b) { b.style.display = ''; });
      lb.removeAttribute('data-mode');
    }
    function step(d) {
      if (lb.getAttribute('data-mode') === 'video') return;
      LB.i = (LB.i + d + LB.items.length) % LB.items.length; paintLightbox();
    }
    on($('#lbClose'), 'click', close);
    on($('#lbPrev'), 'click', function () { step(-1); });
    on($('#lbNext'), 'click', function () { step(1); });
    on(lb, 'click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox__stage')) close(); });
    on(document, 'keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
    var x0 = null;
    on(lb, 'touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    on(lb, 'touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* ========================================================= SHOP ======= */
  var CART_KEY = 'ccfc-cart';
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function setCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} paintCart(); }

  function paintCart() {
    var cart = getCart();
    var count = cart.reduce(function (n, l) { return n + l.qty; }, 0);
    var badge = $('#cartCount');
    if (badge) { badge.textContent = count; badge.hidden = count === 0; }
    var body = $('#cartBody'), total = $('#cartTotal');
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty">' + icon('i-bag') + '<h4>Your bag is empty</h4><p>Browse the official club shop to get started.</p><a class="btn btn--sm mt-2" href="shop.html">Visit the Shop</a></div>';
      if (total) total.textContent = money(0);
      return;
    }
    body.innerHTML = cart.map(function (l, i) {
      return '<div class="cart-line">' +
        '<img src="assets/img/' + esc(img(l.img)) + '" alt="" width="64" height="64" loading="lazy">' +
        '<div><div class="cart-line__name">' + raw(l.name) + '</div>' +
        '<div class="cart-line__meta">' + esc(l.size) + ' &middot; ' + money(l.price) + '</div>' +
        '<div class="qty" style="margin-top:.35rem"><button type="button" data-cart-dec="' + i + '" aria-label="Decrease quantity">' + icon('i-minus') + '</button>' +
        '<span>' + l.qty + '</span><button type="button" data-cart-inc="' + i + '" aria-label="Increase quantity">' + icon('i-plus') + '</button></div></div>' +
        '<div style="text-align:right"><div class="cart-line__price">' + money(l.price * l.qty) + '</div>' +
        '<button type="button" data-cart-del="' + i + '" aria-label="Remove ' + esc(l.name) + '" style="color:var(--ink-300);margin-top:.4rem">' + icon('i-trash') + '</button></div>' +
        '</div>';
    }).join('');
    if (total) total.textContent = money(cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0));

    $$('[data-cart-inc]', body).forEach(function (b) { on(b, 'click', function () { var c = getCart(); c[+b.getAttribute('data-cart-inc')].qty++; setCart(c); }); });
    $$('[data-cart-dec]', body).forEach(function (b) { on(b, 'click', function () { var c = getCart(), i = +b.getAttribute('data-cart-dec'); c[i].qty--; if (c[i].qty < 1) c.splice(i, 1); setCart(c); }); });
    $$('[data-cart-del]', body).forEach(function (b) { on(b, 'click', function () { var c = getCart(); c.splice(+b.getAttribute('data-cart-del'), 1); setCart(c); }); });
  }

  function initCartDrawer() {
    var dr = $('#cartDrawer'), openBtn = $('#cartOpen');
    if (!dr) return;
    function close() { dr.classList.remove('is-open'); document.body.classList.remove('nav-open'); }
    function open() { dr.classList.add('is-open'); document.body.classList.add('nav-open'); paintCart(); }
    if (openBtn) on(openBtn, 'click', function (e) { e.preventDefault(); open(); });
    $$('[data-cart-close]').forEach(function (b) { on(b, 'click', close); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && dr.classList.contains('is-open')) close(); });
    var checkout = $('#cartCheckout');
    on(checkout, 'click', function (e) {
      var cart = getCart();
      if (!cart.length) { e.preventDefault(); toast('Your bag is empty', 'err'); return; }
      var lines = cart.map(function (l) { return l.qty + ' x ' + String(l.name).replace(/&amp;/g, '&') + ' (' + l.size + ') - ' + money(l.price * l.qty); }).join('%0A');
      var tot = money(cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0));
      e.preventDefault();
      window.open('https://wa.me/' + (D.club ? D.club.whatsapp : '263784658667') +
        '?text=' + encodeURIComponent('Hello Chegutu Community FC, I would like to order:') + '%0A%0A' + lines + '%0A%0ATotal: ' + tot, '_blank', 'noopener');
    });
    paintCart();
  }

  function initShop() {
    var host = $('#shopGrid'); if (!host) return;
    var all = D.products || [];
    var cats = ['All'].concat(all.map(function (p) { return p.cat; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    var bar = $('#shopFilters');
    if (bar) {
      bar.innerHTML = cats.map(function (c, i) {
        return '<button class="filter-btn" type="button" data-shop-filter="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + raw(c) + '</button>';
      }).join('');
    }
    function render(cat) {
      var items = cat === 'All' ? all : all.filter(function (p) { return p.cat === cat; });
      host.innerHTML = items.map(function (p) {
        return '<article class="product" data-reveal>' +
          '<div class="product__media"><img src="assets/img/' + esc(img(p.img)) + '" alt="' + esc(String(p.name).replace(/&amp;/g, '&')) + '" loading="lazy" width="600" height="600"></div>' +
          (p.tag ? '<span class="badge badge--gold product__tag">' + raw(p.tag) + '</span>' : '') +
          '<div class="product__body">' +
            '<span class="product__cat">' + raw(p.cat) + '</span>' +
            '<h3 class="product__name">' + raw(p.name) + '</h3>' +
            '<span class="product__price">' + money(p.price) + '</span>' +
            '<div class="product__foot">' +
              '<div class="product__sizes" role="group" aria-label="Choose a size for ' + esc(String(p.name).replace(/&amp;/g, '&')) + '">' +
                p.sizes.map(function (s, i) { return '<button type="button" class="size-btn" data-size="' + esc(s) + '" aria-pressed="' + (i === 0) + '">' + esc(s) + '</button>'; }).join('') +
              '</div>' +
              '<button class="btn btn--sm btn--block" type="button" data-add="' + esc(p.id) + '">Add to Bag</button>' +
            '</div>' +
          '</div></article>';
      }).join('') || '<div class="empty" style="grid-column:1/-1">' + icon('i-bag') + '<h4>Nothing in this category</h4></div>';

      $$('.product__sizes', host).forEach(function (g) {
        $$('.size-btn', g).forEach(function (b) {
          on(b, 'click', function () {
            $$('.size-btn', g).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
          });
        });
      });
      $$('[data-add]', host).forEach(function (b) {
        on(b, 'click', function () {
          var p = all.filter(function (x) { return x.id === b.getAttribute('data-add'); })[0];
          var card = b.closest('.product');
          var sizeBtn = card.querySelector('.size-btn[aria-pressed="true"]') || card.querySelector('.size-btn');
          var size = sizeBtn ? sizeBtn.getAttribute('data-size') : 'One size';
          var cart = getCart();
          var line = cart.filter(function (l) { return l.id === p.id && l.size === size; })[0];
          if (line) line.qty++;
          else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: size, qty: 1 });
          setCart(cart);
          toast(String(p.name).replace(/&amp;/g, '&') + ' added to your bag', 'ok');
        });
      });
      initReveal();
    }
    render('All');
    $$('[data-shop-filter]').forEach(function (b) {
      on(b, 'click', function () {
        $$('[data-shop-filter]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        render(b.getAttribute('data-shop-filter'));
      });
    });
  }

  /* ========================================================= STATS ====== */
  function initStats() {
    var host = $('#statLeaders'); if (!host) return;
    function board(title, list, valKey, sub) {
      return '<div data-reveal><h3 class="mb-2">' + title + '</h3><div class="leaders">' +
        list.map(function (p, i) {
          return '<a class="leader" href="player.html?id=' + esc(p.id) + '">' +
            '<span class="leader__rank">' + (i + 1) + '</span>' +
            '<span class="leader__ava" style="display:grid;place-items:center;font-family:var(--font-head);font-weight:700;color:var(--green-600)">' + p.no + '</span>' +
            '<span><span class="leader__name">' + raw(p.name) + '</span><span class="leader__meta">' + raw(p.pos) + ' &middot; ' + (p.team === 'women' ? 'Women' : 'Boys') + '</span></span>' +
            '<span class="leader__val">' + p[valKey] + '</span></a>';
        }).join('') + '</div><p class="text-muted mt-1" style="font-size:.82rem">' + sub + '</p></div>';
    }
    var sq = (D.squad || []);
    var scorers = sq.slice().sort(function (a, b) { return b.goals - a.goals; }).slice(0, 6);
    var apps = sq.slice().sort(function (a, b) { return b.apps - a.apps; }).slice(0, 6);
    var keepers = sq.filter(function (p) { return p.posShort === 'GK'; }).sort(function (a, b) { return b.cleanSheets - a.cleanSheets; });
    host.innerHTML =
      board('Leading Scorers', scorers, 'goals', 'Career goals for the club across all competitions.') +
      board('Most Appearances', apps, 'apps', 'Total senior appearances since joining the club.') +
      (keepers.length ? board('Clean Sheets', keepers, 'cleanSheets', 'Career clean sheets kept by our goalkeepers.') : '');
    initReveal();
  }

  /* ========================================================= FORMS ====== */
  function initForms() {
    $$('form[data-form]').forEach(function (form) {
      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('[type="submit"]');

      function fieldOf(input) { return input.closest('.field') || input.closest('.check'); }
      function setErr(input, msg) {
        var f = fieldOf(input); if (!f) return;
        f.classList.add('is-invalid'); f.classList.remove('is-valid');
        var e = f.querySelector('.field__err');
        if (e) e.innerHTML = '<svg aria-hidden="true"><use href="#i-alert"/></svg><span>' + esc(msg) + '</span>';
        input.setAttribute('aria-invalid', 'true');
      }
      function clearErr(input) {
        var f = fieldOf(input); if (!f) return;
        f.classList.remove('is-invalid');
        if (input.value) f.classList.add('is-valid');
        input.removeAttribute('aria-invalid');
      }
      function check(input) {
        var v = String(input.value || '').trim();
        var req = input.hasAttribute('required');
        if (input.type === 'checkbox') {
          if (req && !input.checked) { setErr(input, 'Please tick this box to continue'); return false; }
          clearErr(input); return true;
        }
        if (req && !v) { setErr(input, 'This field is required'); return false; }
        if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) { setErr(input, 'Enter a valid email address'); return false; }
        if (v && input.type === 'tel' && !/^[+\d][\d\s()\-]{6,}$/.test(v)) { setErr(input, 'Enter a valid phone number'); return false; }
        if (v && input.hasAttribute('minlength') && v.length < +input.getAttribute('minlength')) {
          setErr(input, 'Please enter at least ' + input.getAttribute('minlength') + ' characters'); return false;
        }
        clearErr(input); return true;
      }

      $$('input, select, textarea', form).forEach(function (i) {
        on(i, 'blur', function () { if (i.value || i.hasAttribute('required')) check(i); });
        on(i, 'input', function () { if (fieldOf(i) && fieldOf(i).classList.contains('is-invalid')) check(i); });
      });

      /* multi-step */
      var steps = $$('[data-step]', form);
      if (steps.length) {
        var cur = 0;
        var dots = $$('.form-step', form);
        function show(n) {
          cur = n;
          steps.forEach(function (s, i) { s.hidden = i !== n; });
          dots.forEach(function (d, i) {
            d.classList.toggle('is-active', i === n);
            d.classList.toggle('is-done', i < n);
          });
          form.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
        }
        $$('[data-next]', form).forEach(function (b) {
          on(b, 'click', function () {
            var ok = $$('input, select, textarea', steps[cur]).every(check);
            if (!ok) { toast('Please complete the highlighted fields', 'err'); return; }
            show(Math.min(cur + 1, steps.length - 1));
          });
        });
        $$('[data-prev]', form).forEach(function (b) { on(b, 'click', function () { show(Math.max(cur - 1, 0)); }); });
        show(0);
      }

      on(form, 'submit', function (e) {
        e.preventDefault();
        var inputs = $$('input, select, textarea', form).filter(function (i) { return !i.closest('[hidden]'); });
        var ok = inputs.map(check).every(Boolean);
        if (!ok) {
          if (status) { status.className = 'form-status form-status--err is-visible'; status.innerHTML = icon('i-alert') + '<span>Please check the highlighted fields and try again.</span>'; }
          var bad = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
          if (bad) bad.focus();
          return;
        }

        var data = new FormData(form);
        data.append('_subject', form.getAttribute('data-form'));
        data.append('_page', location.pathname);
        if (submitBtn) { submitBtn.setAttribute('aria-disabled', 'true'); submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = 'Sending…'; }

        function done(msg) {
          if (status) { status.className = 'form-status form-status--ok is-visible'; status.innerHTML = icon('i-check-circle') + '<span>' + msg + '</span>'; }
          form.reset();
          $$('.field', form).forEach(function (f) { f.classList.remove('is-valid', 'is-invalid'); });
          if (submitBtn) { submitBtn.removeAttribute('aria-disabled'); submitBtn.textContent = submitBtn.dataset.label || 'Submit'; }
          toast('Message sent — thank you', 'ok');
          if (status) status.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
        }
        function fallback() {
          /* No PHP available (e.g. opened directly from disk) — hand off to email */
          var lines = [];
          data.forEach(function (v, k) { if (k.charAt(0) !== '_' && String(v).trim()) lines.push(k + ': ' + v); });
          var mail = 'mailto:admin@ccfc-zw.com?subject=' + encodeURIComponent(form.getAttribute('data-form')) +
            '&body=' + encodeURIComponent(lines.join('\n'));
          if (status) {
            status.className = 'form-status form-status--ok is-visible';
            status.innerHTML = icon('i-info') + '<span>Your details are ready to send. <a href="' + mail + '" style="font-weight:700;text-decoration:underline">Click here to send by email</a>, or call ' +
              '<a href="tel:+263784658667" style="font-weight:700;text-decoration:underline">+263 784 658 667</a>.</span>';
            status.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
          }
          if (submitBtn) { submitBtn.removeAttribute('aria-disabled'); submitBtn.textContent = submitBtn.dataset.label || 'Submit'; }
        }

        if (location.protocol === 'file:') { fallback(); return; }
        fetch('form-handler.php', { method: 'POST', body: data })
          .then(function (r) { return r.ok ? r.json().catch(function () { return { ok: true }; }) : Promise.reject(r); })
          .then(function (j) { j && j.ok === false ? fallback() : done(j && j.message ? j.message : 'Thank you — your message has been received. A member of the club will be in touch shortly.'); })
          .catch(fallback);
      });
    });
  }

  /* ==================================================== MISC BITS ======= */
  function initDonate() {
    var out = $('#donateAmount'); if (!out) return;
    $$('[data-amount]').forEach(function (b) {
      on(b, 'click', function () {
        $$('[data-amount]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        out.value = b.getAttribute('data-amount');
        var impact = $('#donateImpact');
        if (impact) {
          var v = +b.getAttribute('data-amount');
          var msg = v >= 250 ? 'Funds a full season of kit, travel and coaching for an academy age group.'
            : v >= 100 ? 'Covers a term of academic support and boots for four academy players.'
            : v >= 50 ? 'Pays for match travel for an entire squad to one away fixture.'
            : v >= 25 ? 'Provides a full training kit for one young player.'
            : 'Buys footballs, bibs and cones for a week of academy sessions.';
          impact.textContent = msg;
        }
      });
    });
  }

  function initMembershipCard() {
    var f = $('#memberPreviewForm'); if (!f) return;
    function paint() {
      var n = $('#memberName') ? $('#memberName').value.trim() : '';
      var t = f.querySelector('input[name="tier"]:checked');
      var el = $('#cardName'), tier = $('#cardTier'), num = $('#cardNo');
      if (el) el.textContent = n ? n.toUpperCase() : 'YOUR NAME HERE';
      if (tier) tier.textContent = t ? t.value.toUpperCase() + ' MEMBER' : 'SUPPORTER MEMBER';
      if (num) num.textContent = 'CCFC ' + String(2600 + (n.length * 37) % 8999).padStart(4, '0');
    }
    $$('input', f).forEach(function (i) { on(i, 'input', paint); on(i, 'change', paint); });
    paint();
  }

  function initYear() {
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  function markActiveNav() {
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var map = {
      'news.html': 'news', 'article.html': 'news',
      'fixtures.html': 'matches', 'results.html': 'matches', 'table.html': 'matches', 'stats.html': 'matches', 'tickets.html': 'matches',
      'teams.html': 'teams', 'team-women.html': 'teams', 'team-boys.html': 'teams', 'squad.html': 'teams', 'player.html': 'teams',
      'staff.html': 'teams', 'academy.html': 'teams', 'pathway.html': 'teams', 'register.html': 'teams',
      'about.html': 'club', 'departments.html': 'club', 'governance.html': 'club', 'safeguarding.html': 'club',
      'community.html': 'club', 'careers.html': 'club', 'contact.html': 'club',
      'gallery.html': 'media', 'videos.html': 'media',
      'membership.html': 'fans', 'donate.html': 'fans', 'shop.html': 'fans',
      'partners.html': 'partners'
    };
    var key = map[page];
    if (!key) return;
    var item = $('.nav__item[data-nav="' + key + '"] .nav__link');
    if (item) item.setAttribute('aria-current', 'page');
  }

  /* ========================================================= BOOT ======= */
  /* =================================================== CARD STACK ======= */
  /* Photos cycle themselves: the front card peels away and returns to the back. */
  function initCardStacks() {
    $$('.cardstack').forEach(function (stack) {
      var cards = $$('.cardstack__card', stack);
      if (cards.length < 2) return;
      var dotsWrap = stack.querySelector('.cardstack__dots');
      var front = 0, timer = null;
      var DELAY = +(stack.getAttribute('data-delay') || 3600);

      if (dotsWrap) {
        dotsWrap.innerHTML = cards.map(function (c, i) {
          return '<button type="button" aria-label="Show photo ' + (i + 1) + '" aria-current="' + (i === 0) + '"></button>';
        }).join('');
        $$('button', dotsWrap).forEach(function (b, i) {
          on(b, 'click', function () { set(i); restart(); });
        });
      }

      function set(n) {
        front = (n + cards.length) % cards.length;
        cards.forEach(function (c, i) {
          var d = (i - front + cards.length) % cards.length;
          c.setAttribute('data-pos', d > 3 ? 'out' : String(d));
          c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        });
        if (dotsWrap) $$('button', dotsWrap).forEach(function (b, i) {
          b.setAttribute('aria-current', i === front ? 'true' : 'false');
        });
      }
      function next() {
        /* peel the current front card off before it returns to the back */
        var cur = cards[front];
        cur.setAttribute('data-pos', 'out');
        setTimeout(function () { set(front + 1); }, 330);
      }
      function restart() { stop(); if (!REDUCED) timer = setInterval(next, DELAY); }
      function stop() { if (timer) clearInterval(timer); timer = null; }

      set(0);
      on(stack, 'mouseenter', stop);
      on(stack, 'mouseleave', restart);
      on(document, 'visibilitychange', function () { document.hidden ? stop() : restart(); });
      restart();
    });
  }

  /* ===================================================== MARQUEE ======== */
  /* Duplicates the group once so the -50% translate loops seamlessly. */
  function initMarquee() {
    $$('.marquee__track').forEach(function (track) {
      var g = track.querySelector('.marquee__group');
      if (!g || track.children.length > 1) return;
      var clone = g.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  function boot() {
    D = window.CCFC || D;
    initCurtain();
    initScroll(); initDrawer(); initSearch(); initLang(); markActiveNav();
    initTicker(); initHero(); initAccordion(); initTabs(); initMarquee(); initCardStacks();
    initFixtures(); initTables(); initSquad(); initPlayer(); initStaff();
    initNews(); initArticle(); initVideos();
    initGallery(); initLightboxChrome(); initFeatureVideos();
    initShop(); initCartDrawer(); initStats();
    initForms(); initDonate(); initMembershipCard(); initYear();
    initLineHeadings(); initCounters(); initParallax(); initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
