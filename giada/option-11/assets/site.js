/* =====================================================================
   Shine Your Light — Option 11 site behaviour
   Served at /giada/option-11/assets/site.js (loaded with defer)
   - Progressive: every piece of content is visible without JS.
   - No backend: forms show an inline thank-you plus a mailto fallback.
   ===================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var EMAIL = 'giada@shineyourlight.com.au';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('js');

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts || false); }

  /* ---------------------------------------------------------------
     1. Desktop nav dropdowns (click + keyboard + Escape)
     --------------------------------------------------------------- */
  function initDropdowns() {
    var items = $$('.has-dd');
    if (!items.length) return;
    var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function links(li) { return $$('.dd a', li); }
    function btnOf(li) { return $('.dd-btn', li); }

    function close(li, focusBtn) {
      var b = btnOf(li);
      if (!b) return;
      b.setAttribute('aria-expanded', 'false');
      if (focusBtn) b.focus();
    }
    function closeAll(except) {
      items.forEach(function (li) { if (li !== except) close(li, false); });
    }
    function open(li, focusFirst) {
      var b = btnOf(li);
      if (!b) return;
      closeAll(li);
      b.setAttribute('aria-expanded', 'true');
      if (focusFirst) {
        var l = links(li);
        if (l.length) l[0].focus();
      }
    }
    function isOpen(li) {
      var b = btnOf(li);
      return b && b.getAttribute('aria-expanded') === 'true';
    }

    items.forEach(function (li) {
      var b = btnOf(li);
      if (!b) return;
      var timer = null;

      on(b, 'click', function (e) {
        e.preventDefault();
        if (isOpen(li)) close(li, false); else open(li, false);
      });

      on(b, 'keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); open(li, true); }
        else if (e.key === 'ArrowUp') {
          e.preventDefault(); open(li, false);
          var l = links(li); if (l.length) l[l.length - 1].focus();
        }
      });

      on(li, 'keydown', function (e) {
        if (e.key === 'Escape' && isOpen(li)) { e.preventDefault(); close(li, true); return; }
        if (e.target === b) return;
        var l = links(li);
        var i = l.indexOf(doc.activeElement);
        if (i < 0) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); l[(i + 1) % l.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); l[(i - 1 + l.length) % l.length].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); l[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); l[l.length - 1].focus(); }
      });

      /* close when focus leaves the whole item (e.g. Tab past the last link) */
      on(li, 'focusout', function (e) {
        if (e.relatedTarget && !li.contains(e.relatedTarget)) close(li, false);
      });

      /* gentle hover intent on mouse devices */
      if (finePointer) {
        on(li, 'mouseenter', function () { clearTimeout(timer); timer = setTimeout(function () { open(li, false); }, 80); });
        on(li, 'mouseleave', function () { clearTimeout(timer); timer = setTimeout(function () { close(li, false); }, 220); });
      }
    });

    on(doc, 'click', function (e) {
      items.forEach(function (li) { if (!li.contains(e.target)) close(li, false); });
    });
    on(doc, 'keydown', function (e) {
      if (e.key !== 'Escape') return;
      items.forEach(function (li) { if (isOpen(li)) close(li, li.contains(doc.activeElement)); });
    });
  }

  /* ---------------------------------------------------------------
     2. Mobile drawer
     --------------------------------------------------------------- */
  function initDrawer() {
    var burger = $('#burger');
    var menu = $('#menu');
    if (!burger || !menu) return;
    var lastFocus = null;

    function focusables() {
      return $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', menu)
        .filter(function (el) { return el.offsetParent !== null || el === doc.activeElement; });
    }
    function setOpen(open) {
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      root.style.overflow = open ? 'hidden' : '';
      if (open) {
        lastFocus = doc.activeElement;
        var f = focusables();
        setTimeout(function () { if (f.length) f[0].focus(); }, 60);
      } else if (lastFocus && lastFocus.focus) {
        lastFocus.focus();
      }
    }
    function isOpen() { return menu.classList.contains('open'); }

    on(burger, 'click', function () { setOpen(!isOpen()); });

    on(menu, 'keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); burger.focus(); return; }
      if (e.key !== 'Tab') return;
      /* keep focus inside the drawer, with the burger as part of the loop */
      var f = [burger].concat(focusables());
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    on(burger, 'keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      if (e.key === 'Tab' && e.shiftKey) {
        var f = focusables();
        if (f.length) { e.preventDefault(); f[f.length - 1].focus(); }
      }
    });

    /* accordion groups inside the drawer */
    $$('.m-toggle', menu).forEach(function (t) {
      on(t, 'click', function () {
        var exp = t.getAttribute('aria-expanded') === 'true';
        $$('.m-toggle', menu).forEach(function (o) { if (o !== t) o.setAttribute('aria-expanded', 'false'); });
        t.setAttribute('aria-expanded', exp ? 'false' : 'true');
      });
    });
    /* a group that holds the current page starts open */
    $$('.m-group', menu).forEach(function (g) {
      if ($('a[aria-current="page"]', g)) {
        g.classList.add('is-current');
        var t = $('.m-toggle', g);
        if (t) t.setAttribute('aria-expanded', 'true');
      }
    });

    /* close after choosing a link (same-page anchors included) */
    $$('a[href]', menu).forEach(function (a) {
      on(a, 'click', function () { setOpen(false); });
    });

    /* if the viewport grows past the desktop breakpoint, drop the drawer */
    var mq = window.matchMedia && window.matchMedia('(min-width:1280px)');
    if (mq) {
      var handler = function () { if (mq.matches && isOpen()) setOpen(false); };
      if (mq.addEventListener) mq.addEventListener('change', handler); else if (mq.addListener) mq.addListener(handler);
    }
  }

  /* mark desktop dropdown parents that contain the current page */
  function markCurrentGroups() {
    $$('.has-dd').forEach(function (li) {
      if ($('a[aria-current="page"]', li)) li.classList.add('is-current');
    });
  }

  /* ---------------------------------------------------------------
     3. Header: solid on scroll, tuck away when scrolling down
     --------------------------------------------------------------- */
  function initHeader() {
    var hdr = $('#hdr');
    var rule = $('.rule i');
    var rlab = $('#rlab');
    var labelled = $$('[data-label]');
    var lastY = window.pageYOffset || 0;
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.pageYOffset || 0;
      var h = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
      if (hdr) {
        hdr.classList.toggle('solid', y > 40);
        var anyOpen = $('.dd-btn[aria-expanded="true"]') || ($('#menu') && $('#menu').classList.contains('open'));
        hdr.classList.toggle('hide', !anyOpen && y > 420 && y > lastY + 4);
        if (y < lastY - 4 || y < 420) hdr.classList.remove('hide');
      }
      if (rule) rule.style.setProperty('--p', Math.min(1, y / h).toFixed(4));
      if (rlab && labelled.length) {
        var mid = window.innerHeight * 0.45, label = null;
        for (var i = 0; i < labelled.length; i++) {
          var r = labelled[i].getBoundingClientRect();
          if (r.top <= mid && r.bottom > mid) { label = labelled[i].getAttribute('data-label'); }
        }
        if (label && rlab.textContent !== label) rlab.textContent = label;
      }
      lastY = y;
    }
    on(window, 'scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    on(window, 'resize', update);
    update();
  }

  /* ---------------------------------------------------------------
     4. Reviews: read more / read less
     --------------------------------------------------------------- */
  function initReviews() {
    $$('.review').forEach(function (card, n) {
      var body = $('.review-body', card);
      var btn = $('.review-toggle', card);
      if (!body || !btn) return;
      if (!body.id) body.id = 'review-body-' + (n + 1);
      btn.setAttribute('aria-controls', body.id);
      var label = $('span', btn) || btn;

      function measure() {
        if (card.classList.contains('is-open')) return;
        card.classList.remove('is-short');
        /* small tolerance so a single clipped descender doesn't need a button */
        var clipped = body.scrollHeight > body.clientHeight + 6;
        card.classList.toggle('is-short', !clipped);
        btn.hidden = !clipped;
      }
      on(btn, 'click', function () {
        var open = !card.classList.contains('is-open');
        card.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        label.textContent = open ? 'Read less' : 'Read more';
        if (!open) {
          var r = card.getBoundingClientRect();
          if (r.top < 0) card.scrollIntoView({ block: 'start', behavior: RM ? 'auto' : 'smooth' });
        }
      });
      btn.setAttribute('aria-expanded', 'false');
      measure();
      var t;
      on(window, 'resize', function () { clearTimeout(t); t = setTimeout(measure, 150); });
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
    });
  }

  /* ---------------------------------------------------------------
     5. Event times in the visitor's own time zone
        <time class="local-time" data-utc="2027-02-20T08:30:00Z">fallback</time>
        Optional data-show="date" | "time" | "datetime" (default).
        Melbourne is only where the schedule is set; visitors see local.
     --------------------------------------------------------------- */
  function formatLocalEventTimes(scope) {
    if (!window.Intl || !Intl.DateTimeFormat) return;
    $$('time.local-time[data-utc]', scope).forEach(function (el) {
      var iso = el.getAttribute('data-utc');
      var d = new Date(iso);
      if (isNaN(d.getTime())) return;
      var show = el.getAttribute('data-show') || 'datetime';
      var dateOpts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      var timeOpts = { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
      var opts = show === 'date' ? dateOpts : show === 'time' ? timeOpts : Object.assign({}, dateOpts, timeOpts);
      var text;
      try {
        text = new Intl.DateTimeFormat(undefined, opts).format(d);
      } catch (e) {
        /* very old engines: drop timeZoneName rather than fail */
        delete opts.timeZoneName;
        text = new Intl.DateTimeFormat(undefined, opts).format(d);
      }
      if (!el.hasAttribute('data-fallback')) el.setAttribute('data-fallback', el.textContent);
      el.textContent = text;
      el.setAttribute('datetime', d.toISOString());
      var zone = '';
      try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e2) {}
      el.title = 'Shown in your local time' + (zone ? ' (' + zone + ')' : '');
      el.classList.add('is-local');
    });
  }
  window.formatLocalEventTimes = formatLocalEventTimes;

  /* ---------------------------------------------------------------
     6. Waitlist / enquiry forms (no backend)
        <div class="form-card">
          <form class="form" data-form="waitlist" data-subject="…">…</form>
          <div class="form-success" hidden tabindex="-1">… <a data-mailto>…</a></div>
        </div>
     --------------------------------------------------------------- */
  function initForms() {
    $$('form[data-form]').forEach(function (form) {
      on(form, 'submit', function (e) {
        e.preventDefault();
        if (form.checkValidity && !form.checkValidity()) {
          if (form.reportValidity) form.reportValidity();
          return;
        }
        var card = form.closest('.form-card') || form.parentNode;
        var success = $('.form-success', card);
        var subject = form.getAttribute('data-subject') || ('Website ' + (form.getAttribute('data-form') || 'enquiry'));

        var lines = [];
        $$('input,select,textarea', form).forEach(function (f) {
          if (!f.name || f.type === 'submit' || f.type === 'button' || f.type === 'hidden' && f.name.charAt(0) === '_') return;
          if ((f.type === 'checkbox' || f.type === 'radio') && !f.checked) return;
          var val = (f.value || '').trim();
          if (!val) return;
          var lab = f.getAttribute('data-label');
          if (!lab && f.id) {
            var l = $('label[for="' + f.id + '"]', form);
            if (l) lab = l.textContent.replace(/\s*\(optional\)\s*/i, '').trim();
          }
          lines.push((lab || f.name) + ': ' + val);
        });
        var href = 'mailto:' + EMAIL +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n') + '\n\n(Sent from the Shine Your Light website)');

        if (success) {
          $$('[data-mailto]', success).forEach(function (a) { a.setAttribute('href', href); });
          var nameField = form.querySelector('[name="name"]');
          var nameSlot = $('[data-name]', success);
          if (nameField && nameSlot && nameField.value.trim()) nameSlot.textContent = ', ' + nameField.value.trim().split(/\s+/)[0];
          form.hidden = true;
          success.hidden = false;
          if (card && card.classList) card.classList.add('is-sent');
          success.focus({ preventScroll: true });
          var r = success.getBoundingClientRect();
          if (r.top < 80 || r.top > window.innerHeight - 120) {
            success.scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' });
          }
        } else {
          window.location.href = href;
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     7. Subtle reveal (content is visible by default; CSS only hides
        when html.js is present and motion is allowed)
     --------------------------------------------------------------- */
  function splitLit() {
    if (RM) return;
    $$('.lit').forEach(function (el) {
      if (el.getAttribute('data-split')) return;
      el.setAttribute('data-split', '1');
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var parts = c.textContent.split(/(\s+)/);
            var frag = doc.createDocumentFragment();
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(doc.createTextNode(p)); return; }
              var s = doc.createElement('span'); s.className = 'w'; s.textContent = p; frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1) { walk(c); }
        });
      })(el);
    });
  }

  function initReveal() {
    var targets = $$('.rv, .ln, .slab, .cut');
    var hero = $('.hero');
    if (!('IntersectionObserver' in window) || RM) {
      targets.forEach(function (el) { el.classList.add('in'); });
      if (hero) hero.classList.add('go');
      $$('.lit .w').forEach(function (w) { w.classList.add('on'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });

    if (hero) {
      requestAnimationFrame(function () {
        $$('.ln, .rv', hero).forEach(function (el) { el.classList.add('in'); });
        hero.classList.add('go');
      });
    }

    /* word-by-word light-up for .lit statements as they cross the viewport */
    var lits = $$('.lit');
    if (lits.length) {
      var litTick = false;
      var light = function () {
        litTick = false;
        var vh = window.innerHeight;
        lits.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
          var words = $$('.w', el);
          var n = Math.round(p * words.length);
          words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
        });
      };
      on(window, 'scroll', function () { if (!litTick) { litTick = true; requestAnimationFrame(light); } }, { passive: true });
      on(window, 'resize', light);
      light();
    }

    /* safety net: never leave anything hidden (e.g. print, odd layouts) */
    setTimeout(function () {
      targets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 2400);
    on(window, 'beforeprint', function () {
      targets.forEach(function (el) { el.classList.add('in'); });
      $$('.lit .w').forEach(function (w) { w.classList.add('on'); });
    });
  }

  /* ---------------------------------------------------------------
     8. Footer year
     --------------------------------------------------------------- */
  function initYear() {
    var y = String(new Date().getFullYear());
    $$('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  /* ---------------------------------------------------------------
     boot
     --------------------------------------------------------------- */
  function boot() {
    markCurrentGroups();
    initDropdowns();
    initDrawer();
    root.classList.add('nav-ready');
    initHeader();
    initReviews();
    formatLocalEventTimes();
    initForms();
    splitLit();
    initReveal();
    initYear();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
