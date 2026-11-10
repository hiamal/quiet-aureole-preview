/* Quantum Hypnosis & Strategic Psychotherapy — Pearl Reliquary site script.
   One file for every page. Each feature binds only if its elements exist. No libraries. */
(function () {
  'use strict';
  var D = document, H = D.documentElement;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOVER = window.matchMedia && matchMedia('(hover: hover)').matches;
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var clamp = function (v, a, b) { a = a == null ? 0 : a; b = b == null ? 1 : b; return Math.min(b, Math.max(a, v)); };
  var ROM = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'];
  var hasIO = 'IntersectionObserver' in window;
  var onScroll = [];   // per-frame scroll handlers registered by features

  /* ---------- entrance trigger ----------
     Content is visible by default (no .js class). The head snippet adds .js only
     when motion is allowed, plus an 1.8s .go failsafe even if this file never runs.
     We start the reveal on the next frames (do not block on fonts.ready, which can hang)
     and keep a 1.2s failsafe here as well. */
  var go = function () { H.classList.add('go'); };
  if (RM) {
    go();
  } else {
    H.classList.add('js');
    var startGo = function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(go);
      });
    };
    startGo();
    if (D.fonts && D.fonts.ready) D.fonts.ready.then(startGo);
    setTimeout(go, 1200);
  }

  /* ---------- roman numerals: <ul data-roman=".rn"> ---------- */
  $$('[data-roman]').forEach(function (list) {
    $$(list.getAttribute('data-roman'), list).forEach(function (e, i) { e.textContent = ROM[i] || String(i + 1); });
  });

  /* ---------- intersection reveals ---------- */
  (function () {
    var els = $$('.rv');
    if (!els.length) return;
    if (RM || !hasIO) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var reveal = function (el) { el.classList.add('in'); io.unobserve(el); };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) reveal(e.target); });
    }, { threshold: 0.01, rootMargin: '0px 0px 0px 0px' });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () {
      els.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.bottom > 40 && r.top < innerHeight - 40) e.classList.add('in');
      });
    }, 1200);
  })();

  /* ---------- scroll header ---------- */
  (function () {
    var hd = $('#hd') || $('.hd');
    if (!hd) return;
    onScroll.push(function () { hd.classList.toggle('sc', scrollY > 30); });
  })();

  /* ---------- mobile sheet nav ---------- */
  (function () {
    var sh = $('#sheet'), mb = $('.mb');
    if (!sh || !mb) return;
    var x = $('.x', sh);
    var isOpen = function () { return sh.classList.contains('open'); };
    var set = function (o) {
      sh.classList.toggle('open', o);
      mb.setAttribute('aria-expanded', String(o));
      sh.setAttribute('aria-hidden', String(!o));
      D.body.style.overflow = o ? 'hidden' : '';
      if (o) { if (x) x.focus({ preventScroll: true }); } else mb.focus({ preventScroll: true });
    };
    sh.setAttribute('aria-hidden', 'true');
    mb.addEventListener('click', function () { set(!isOpen()); });
    $$('.x, a', sh).forEach(function (e) { e.addEventListener('click', function () { set(false); }); });
    D.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { set(false); return; }
      if (e.key === 'Tab') { // keep focus inside the sheet
        var f = $$('button, a', sh); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && D.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && D.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    addEventListener('resize', function () { if (isOpen() && innerWidth > 959) set(false); });
  })();

  /* ---------- magnetic buttons ---------- */
  (function () {
    if (RM || !HOVER) return;
    $$('[data-mag]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * .28).toFixed(1) + 'px');
        b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * .35).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });
  })();

  /* ---------- spiral painter: <canvas data-spiral="hero|soft|cta|page"> ---------- */
  var PRESETS = {
    hero: { track: true, r: .47, lw: 2, turns: 3, strands: 4, c1: 'rgba(178,127,58,.15)', c2: 'rgba(178,127,58,1)', c3: 'rgba(121,54,166,.9)', pa: 'rgba(178,127,58,1)', pb: 'rgba(121,54,166,.9)' },
    soft: { r: .9, turns: 3, strands: 4, lw: 1, c1: 'rgba(233,196,106,0)', c2: 'rgba(233,196,106,.55)', c3: 'rgba(233,196,106,.1)' },
    cta:  { track: true, r: .75, turns: 3.2, strands: 5, lw: 1.2, c1: 'rgba(233,196,106,0)', c2: 'rgba(233,196,106,.7)', c3: 'rgba(167,100,214,.5)' },
    page: { track: true, r: .46, lw: 1.3, turns: 3, strands: 4, c1: 'rgba(178,127,58,.05)', c2: 'rgba(178,127,58,.8)', c3: 'rgba(121,54,166,.6)', pa: 'rgba(178,127,58,.9)', pb: 'rgba(121,54,166,.8)' }
  };
  function Spiral(cv, o) {
    var c = cv.getContext && cv.getContext('2d');
    if (!c) return;
    var W = 0, Hh = 0, vis = !hasIO, px = 0, py = 0, tx = 0, ty = 0, running = false;
    var DPR = Math.min(2, window.devicePixelRatio || 1);
    var N = o.strands || 3, TURNS = o.turns || 2.5, PTS = 160, TAU = 6.2832;
    function size() {
      var r = cv.getBoundingClientRect(); W = r.width; Hh = r.height;
      cv.width = Math.max(1, Math.round(W * DPR)); cv.height = Math.max(1, Math.round(Hh * DPR));
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (RM) paint(0);
    }
    function paint(t) {
      px += (tx - px) * .05; py += (ty - py) * .05;
      c.clearRect(0, 0, W, Hh);
      var cx = W * (o.cx || .5) + px * W * .06, cy = Hh * (o.cy || .5) + py * Hh * .06, R = Math.min(W, Hh) * (o.r || .48), e = RM ? 0 : t / 1000;
      for (var s = 0; s < N; s++) {
        var ph = s / N * TAU + e * .16; c.beginPath();
        for (var i = 0; i <= PTS; i++) {
          var u = i / PTS, a = u * TURNS * TAU + ph, rr = R * Math.pow(u, .85) * (1 + .025 * Math.sin(u * 14 - e * 1.2));
          var x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * .96;
          if (i) c.lineTo(x, y); else c.moveTo(x, y);
        }
        var g = c.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
        g.addColorStop(0, o.c1 || 'rgba(178,127,58,0)'); g.addColorStop(.5, o.c2 || 'rgba(233,196,106,.9)'); g.addColorStop(1, o.c3 || 'rgba(121,54,166,.8)');
        c.strokeStyle = g; c.lineWidth = o.lw || 1.4; c.stroke();
        for (var k = 0; k < 7; k++) {
          var u2 = ((k / 7) + e * .03 + s * .11) % 1, a2 = u2 * TURNS * TAU + ph, r2 = R * Math.pow(u2, .85);
          c.beginPath(); c.arc(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2 * .96, 1.2 + u2 * 2.6, 0, TAU);
          c.fillStyle = s % 2 ? (o.pa || 'rgba(233,196,106,.95)') : (o.pb || 'rgba(121,54,166,.85)'); c.fill();
        }
      }
    }
    function loop(t) { if (!vis) { running = false; return; } paint(t); requestAnimationFrame(loop); }
    function start() { if (RM) { paint(0); return; } if (!running) { running = true; requestAnimationFrame(loop); } }
    size(); addEventListener('resize', size);
    if (hasIO) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis) start(); }).observe(cv);
    else start();
    if (o.track && !RM && HOVER) {
      addEventListener('pointermove', function (e) {
        var r = cv.getBoundingClientRect(); if (!r.width) return;
        tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
      }, { passive: true });
    }
  }
  $$('canvas[data-spiral]').forEach(function (cv) { Spiral(cv, PRESETS[cv.getAttribute('data-spiral')] || PRESETS.soft); });

  /* ---------- portal tilt (home hero) ---------- */
  (function () {
    var pt = $('#portal'), vs = $('#vis');
    if (!pt || !vs || RM || !HOVER) return;
    addEventListener('pointermove', function (e) {
      var r = vs.getBoundingClientRect(); if (!r.width) return;
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      pt.style.setProperty('--ry', clamp(x, -.8, .8) * 14 + 'deg');
      pt.style.setProperty('--rx', clamp(y, -.8, .8) * -10 + 'deg');
    }, { passive: true });
  })();

  /* ---------- word-light statement: <p id="big" data-t="..."> ---------- */
  (function () {
    var big = $('#big') || $('[data-wordlight]');
    if (!big) return;
    var txt = big.getAttribute('data-t') || big.textContent;
    big.setAttribute('aria-label', txt);
    big.innerHTML = '';
    var vvAttr = big.getAttribute('data-vv'), vre = /^(25|healing|intuitive|years,)/;
    if (vvAttr) { try { vre = new RegExp(vvAttr); } catch (e) { /* keep default */ } }
    txt.split(' ').forEach(function (w, i, arr) {
      var s = D.createElement('span');
      s.className = 'w' + (vre.test(w) ? ' vv' : '');
      s.setAttribute('aria-hidden', 'true');
      s.textContent = w;
      big.appendChild(s);
      if (i < arr.length - 1) big.appendChild(D.createTextNode(' '));
    });
    var ws = $$('.w', big);
    onScroll.push(function () {
      var r = big.getBoundingClientRect(), vh = innerHeight;
      var p = clamp((vh * .85 - r.top) / (r.height + vh * .4));
      var n = Math.floor(p * ws.length * 1.05);
      ws.forEach(function (w, i) { w.classList.toggle('lit', RM || i < n); });
    });
  })();

  /* ---------- services accordion + preview images ---------- */
  (function () {
    var list = $('#svl');
    if (!list) return;
    var rows = $$('.pl', list), ims = $$('#prev img'), cap = $('#prev .pcap');
    if (!rows.length) return;
    var titles = rows.map(function (r) { var t = $('.t', r); return t ? t.textContent : ''; });
    var showIm = function (i) {
      ims.forEach(function (m, k) { m.classList.toggle('on', k === i); });
      if (cap && titles[i] != null) cap.textContent = titles[i];
    };
    var setS = function (i) {
      rows.forEach(function (r, k) {
        var on = k === i; r.classList.toggle('on', on);
        var b = $('button', r); if (b) b.setAttribute('aria-expanded', String(on));
        var bd = $('.bd', r); if (bd) bd.setAttribute('aria-hidden', String(!on));
        $$('a', r).forEach(function (a) { if (on) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1'); });
      });
      showIm(Math.max(0, i));
    };
    rows.forEach(function (r, i) {
      var b = $('button', r); if (!b) return;
      b.addEventListener('click', function () { setS(r.classList.contains('on') ? -1 : i); });
      b.addEventListener('pointerenter', function () {
        if (matchMedia('(hover: hover) and (min-width: 960px)').matches) showIm(i);
      });
    });
    list.addEventListener('pointerleave', function () {
      var i = rows.findIndex(function (r) { return r.classList.contains('on'); });
      showIm(Math.max(0, i));
    });
    setS(0);
  })();

  /* ---------- rose diagram + process list ---------- */
  (function () {
    var rc = $('#rose'), pl = $$('#plist li');
    if (!pl.length) return;
    var pa = 0, auto = 0, pm = false, rVis = !hasIO;
    var setP = function (i) {
      pa = i;
      pl.forEach(function (l, k) {
        var on = k === i; l.classList.toggle('on', on);
        var b = $('button', l); if (b) b.setAttribute('aria-expanded', String(on));
        $$('.d a', l).forEach(function (a) { if (on) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1'); });
      });
    };
    pl.forEach(function (l, i) {
      var b = $('button', l);
      if (b) b.addEventListener('click', function () { setP(i); auto = 0; });
      var hov = l.hasAttribute('data-hover'); // link lists: highlight follows pointer/focus
      l.addEventListener('pointerenter', function () { pm = true; if (hov) { setP(i); auto = 0; } });
      l.addEventListener('pointerleave', function () { pm = false; });
      l.addEventListener('focusin', function () { pm = true; if (hov) { setP(i); auto = 0; } });
      l.addEventListener('focusout', function () { pm = false; });
    });
    var plEl = $('#plist'), p0 = plEl ? parseInt(plEl.getAttribute('data-start') || '0', 10) : 0;
    setP(p0 >= 0 && p0 < pl.length ? p0 : 0);
    if (!rc || !rc.getContext) return;
    var rx = rc.getContext('2d'); if (!rx) return;
    var act = pl.map(function () { return 0; }), NP = pl.length, TAU = 6.2832, running = false;
    if (hasIO) new IntersectionObserver(function (e) { rVis = e[0].isIntersecting; if (rVis) start(); }).observe(rc);
    if (!RM) setInterval(function () { if (rVis && !pm) { auto++; if (auto >= 5) { auto = 0; setP((pa + 1) % NP); } } }, 1000);
    function paint(t) {
      var d = Math.min(2, window.devicePixelRatio || 1), w = rc.clientWidth; if (!w) return;
      if (rc.width !== Math.round(w * d)) { rc.width = rc.height = Math.round(w * d); }
      rx.setTransform(d, 0, 0, d, 0, 0); rx.clearRect(0, 0, w, w);
      var c = w / 2, e = RM ? 0 : t / 1000, R = w * .2, rr = w * .215;
      for (var i = 0; i < NP; i++) act[i] = RM ? (i === pa ? 1 : 0) : act[i] + ((i === pa ? 1 : 0) - act[i]) * .08;
      rx.save(); rx.translate(c, c); rx.rotate(e * .05);
      for (var j = 0; j < NP; j++) {
        var a = j / NP * TAU - 1.5708, x = Math.cos(a) * R, y = Math.sin(a) * R, k = act[j];
        var g = rx.createRadialGradient(x, y, 0, x, y, rr);
        g.addColorStop(0, 'rgba(233,196,106,' + (.06 + .5 * k) + ')'); g.addColorStop(1, 'rgba(121,54,166,' + (.05 + .25 * k) + ')');
        rx.beginPath(); rx.arc(x, y, rr * (1 + .04 * k), 0, TAU); rx.fillStyle = g; rx.fill();
        rx.lineWidth = 1 + 2 * k; rx.strokeStyle = 'rgba(233,196,106,' + (.4 + .6 * k) + ')'; rx.stroke();
        rx.save(); rx.rotate(-e * .05); rx.translate(x, y);
        rx.fillStyle = 'rgba(246,242,234,' + (.55 + .45 * k) + ')';
        rx.font = 'italic ' + (w * .075) + "px 'DM Serif Display',serif"; rx.textAlign = 'center'; rx.textBaseline = 'middle';
        rx.fillText(ROM[j], 0, 0); rx.restore();
      }
      rx.beginPath();
      for (var s = 0; s <= 120; s++) { var u = s / 120, a2 = u * 5 * TAU, r2 = u * w * .11; var x2 = Math.cos(a2) * r2, y2 = Math.sin(a2) * r2; if (s) rx.lineTo(x2, y2); else rx.moveTo(x2, y2); }
      rx.strokeStyle = 'rgba(233,196,106,.9)'; rx.lineWidth = 1.4; rx.stroke();
      rx.restore();
      rx.beginPath(); rx.arc(c, c, w * .46, 0, TAU); rx.strokeStyle = 'rgba(233,196,106,.18)'; rx.setLineDash([2, 8]); rx.lineWidth = 1; rx.stroke(); rx.setLineDash([]);
    }
    function loop(t) { if (!rVis) { running = false; return; } paint(t); requestAnimationFrame(loop); }
    function start() { if (!running) { running = true; requestAnimationFrame(loop); } }
    if (RM) { // static redraws only when state changes
      var _set = setP; setP = function (i) { _set(i); paint(0); };
      addEventListener('resize', function () { paint(0); });
      if (D.fonts && D.fonts.ready) D.fonts.ready.then(function () { paint(0); });
      paint(0);
    } else if (!hasIO) start();
  })();

  /* ---------- parallax portraits: #abimg or [data-parallax] ---------- */
  (function () {
    if (RM) return;
    var imgs = $$('#abimg, [data-parallax]');
    if (!imgs.length) return;
    onScroll.push(function () {
      imgs.forEach(function (ai) {
        var host = ai.parentElement; if (!host) return;
        var r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) return;
        var p = clamp((innerHeight - r.top) / (innerHeight + r.height));
        ai.style.setProperty('--py', (-p * r.height * .14).toFixed(1) + 'px');
      });
    });
  })();

  /* ---------- testimonial carousel ---------- */
  (function () {
    var data = $$('#tdata li'), tq = $('#tq'), tn = $('#tn'), tsec = $('#words');
    if (!data.length || !tq || !tn || !tsec) return;
    var TQ = data.map(function (l) { return [l.textContent, l.getAttribute('data-n')]; });
    var tks = $$('#ticks i'), ti = -1, tt;
    var paused = function () { return tsec.classList.contains('paused'); };
    function waitT() { tt = setTimeout(function () { if (paused()) waitT(); else showT(ti + 1); }, 1000); }
    function showT(i, fast) {
      i = (i + TQ.length) % TQ.length; clearTimeout(tt);
      var sw = function () {
        ti = i; tq.textContent = TQ[i][0]; tn.textContent = '— ' + TQ[i][1];
        tq.classList.remove('out'); tn.classList.remove('out');
        tks.forEach(function (k, j) {
          k.classList.toggle('dn', j < i); k.classList.remove('on'); void k.offsetWidth; k.classList.toggle('on', j === i && !RM);
          k.setAttribute('aria-current', j === i ? 'true' : 'false');
        });
        if (!RM) tt = setTimeout(function () { if (paused()) waitT(); else showT(i + 1); }, 7000);
      };
      if (fast || ti < 0 || RM) sw(); else { tq.classList.add('out'); tn.classList.add('out'); setTimeout(sw, 450); }
    }
    var tp = $('#tp'), tx = $('#tx');
    if (tp) tp.addEventListener('click', function () { showT(ti - 1); });
    if (tx) tx.addEventListener('click', function () { showT(ti + 1); });
    tks.forEach(function (k, i) {
      k.setAttribute('role', 'button'); k.setAttribute('tabindex', '0'); k.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      k.addEventListener('click', function () { showT(i); });
      k.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showT(i); } });
    });
    tsec.addEventListener('pointerenter', function () { tsec.classList.add('paused'); });
    tsec.addEventListener('pointerleave', function () { tsec.classList.remove('paused'); });
    tsec.addEventListener('focusin', function () { tsec.classList.add('paused'); });
    tsec.addEventListener('focusout', function () { tsec.classList.remove('paused'); });
    showT(0, true);
  })();

  /* ---------- scroll/resize loop ---------- */
  var ticking = false;
  var up = function () { ticking = false; onScroll.forEach(function (f) { f(); }); };
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(up); } }, { passive: true });
  addEventListener('resize', up);
  up();
})();
