(function () {
  'use strict';
  var d = document, H = d.documentElement;
  var R = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  H.classList.add('js');
  if (R) H.classList.add('rm');
  var $ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* scroll reveal */
  var rv = $('[data-rv]');
  if (R || !('IntersectionObserver' in window)) {
    rv.forEach(function (e) { e.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (e) { rio.observe(e); });
  }

  /* mobile menu */
  var mb = d.querySelector('[data-menu-btn]'), sheet = d.querySelector('[data-menu]');
  if (mb && sheet) {
    var setMenu = function (open) {
      d.body.classList.toggle('menu-open', open);
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      sheet.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) { var f = sheet.querySelector('a'); if (f) setTimeout(function () { f.focus(); }, 60); }
    };
    sheet.setAttribute('aria-hidden', 'true');
    mb.addEventListener('click', function () { setMenu(!d.body.classList.contains('menu-open')); });
    $('a', sheet).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.body.classList.contains('menu-open')) { setMenu(false); mb.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1120 && d.body.classList.contains('menu-open')) setMenu(false);
    });
  }

  /* header stuck state + scroll progress for the depth gauge */
  var hdr = d.querySelector('[data-hdr]'), dep = d.getElementById('dep'), ticking = false;
  function onScroll() {
    var y = window.scrollY, m = H.scrollHeight - window.innerHeight, sp = m > 0 ? y / m : 0;
    H.style.setProperty('--sp', sp.toFixed(4));
    if (hdr) hdr.classList.toggle('stuck', y > 40);
    if (dep) dep.textContent = Math.round(sp * 40) + ' m';
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* breath orb: tap to start / stop; 4s in, 6s out */
  var bo = d.getElementById('bo'), bt = d.getElementById('bt');
  if (bo && bt) {
    var inhale = false, timer = 0, running = false;
    var rings = $('.c', bo);
    var label = function (txt) {
      if (R) { bt.textContent = txt; return; }
      bt.style.opacity = 0;
      setTimeout(function () { bt.textContent = txt; bt.style.opacity = 1; }, 350);
    };
    var cycle = function () {
      inhale = !inhale;
      bo.style.setProperty('--bs', inhale ? 1 : 0.62);
      rings.forEach(function (c, i) { c.style.transitionDuration = ((inhale ? 4 : 6) + i * 0.4) + 's'; });
      label(inhale ? 'Breathe in' : 'Breathe out');
      timer = setTimeout(cycle, inhale ? 4000 : 6000);
    };
    var stop = function () {
      clearTimeout(timer); running = false; inhale = false;
      bo.style.setProperty('--bs', 0.62);
      label('Breathe out');
      bo.setAttribute('aria-pressed', 'false');
    };
    bo.addEventListener('click', function () {
      if (R) { inhale = !inhale; bt.textContent = inhale ? 'Breathe in' : 'Breathe out'; return; }
      if (running) { stop(); return; }
      running = true; bo.setAttribute('aria-pressed', 'true'); cycle();
    });
  }

  /* thought bubbles: pop to let go (they drift back) */
  if (!R) {
    $('.bl').forEach(function (b) {
      b.addEventListener('click', function () {
        b.classList.add('pop');
        setTimeout(function () { b.classList.remove('pop'); }, 3200);
      });
    });
  }

  /* pattern sticky image crossfade */
  var arts = $('[data-lv] article'), imgs = $('.lvi img');
  if (arts.length && imgs.length && 'IntersectionObserver' in window) {
    var lio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = +e.target.getAttribute('data-i');
        arts.forEach(function (a, k) { a.classList.toggle('on', k === i); });
        imgs.forEach(function (m, k) { m.classList.toggle('on', k === i); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    arts.forEach(function (a) { lio.observe(a); });
  }

  /* modality panels: hover, focus or tap expands */
  var mods = $('.mod');
  mods.forEach(function (m) {
    var on = function () { mods.forEach(function (x) { x.classList.toggle('on', x === m); }); };
    m.addEventListener('mouseenter', on);
    m.addEventListener('focusin', on);
    m.addEventListener('click', function (e) {
      if (!m.classList.contains('on') && window.matchMedia('(min-width:901px)').matches) { e.preventDefault(); on(); }
    });
  });

  /* testimonial tabs (WAI-ARIA tabs, arrow keys) */
  $('[data-tabs]').forEach(function (root) {
    var tabs = $('[role="tab"]', root);
    var select = function (i, focus) {
      tabs.forEach(function (t, k) {
        var sel = k === i, panel = d.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        if (panel) { panel.hidden = !sel; panel.classList.toggle('show', sel && !R); }
      });
      if (focus) tabs[i].focus();
      if (window.matchMedia('(max-width:900px)').matches) {
        var list = tabs[i].parentElement, t = tabs[i];
        list.scrollTo({ left: t.offsetLeft - (list.clientWidth - t.offsetWidth) / 2, behavior: R ? 'auto' : 'smooth' });
      }
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); select(j, true); }
      });
    });
  });

  /* FAQ accordion */
  $('[data-acc] .q').forEach(function (b) {
    b.addEventListener('click', function () {
      var it = b.closest('.fi'), open = !it.classList.contains('open');
      $('.fi.open', it.parentElement).forEach(function (x) {
        x.classList.remove('open');
        x.querySelector('.q').setAttribute('aria-expanded', 'false');
      });
      if (open) { it.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* insight topic filter: "all" always restores every card */
  $('[data-filters]').forEach(function (bar) {
    var grid = d.getElementById(bar.getAttribute('aria-controls'));
    if (!grid) return;
    var btns = $('button', bar), cards = $('[data-topic]', grid);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-f');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        cards.forEach(function (c) { c.hidden = !(f === 'all' || c.getAttribute('data-topic') === f); });
      });
    });
  });

  /* ring text: even letter-spacing so the tagline closes the circle with no seam */
  var fitRing = function () {
    $('svg.ring text').forEach(function (t) {
      var tp = t.querySelector('textPath'), path = tp && d.getElementById((tp.getAttribute('href') || '').slice(1));
      if (!path || !t.getComputedTextLength) return;
      t.style.letterSpacing = '0px';
      var n = t.getNumberOfChars(), natural = t.getComputedTextLength(), L = path.getTotalLength();
      if (n > 0 && L > natural) t.style.letterSpacing = ((L - natural) / n).toFixed(3) + 'px';
    });
  };
  fitRing();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(fitRing);

  /* WebGL caustics (homepage hero canvas only) */
  var cv = d.getElementById('sea');
  if (!cv || !cv.getContext) return;
  var gl = null;
  try { gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }); } catch (e) { gl = null; }
  if (!gl) return;
  var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs = 'precision mediump float;uniform vec2 r;uniform float t;uniform float s;uniform vec2 m;' +
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}' +
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}' +
    'float caus(vec2 p){float v=0.;for(int k=0;k<3;k++){p+=vec2(n(p*1.3+t*.12),n(p*1.1-t*.1))*.8;v+=abs(sin(p.x*3.+t*.2)*sin(p.y*3.-t*.15));p*=1.4;}return v/3.;}' +
    'void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(gl_FragCoord.xy-.5*r)/r.y;float c=pow(1.-caus(p*2.+m*.3),3.);' +
    'vec3 top=vec3(.05,.33,.35),bot=vec3(.012,.075,.094);vec3 base=mix(top,bot,clamp(s*1.5+(1.-uv.y)*.4,0.,1.));' +
    'float rays=smoothstep(.4,1.,n(vec2(p.x*3.+p.y*.8,t*.1)))*.2*(1.-s)*uv.y;' +
    'vec3 col=base+vec3(.32,.86,.8)*c*.18*(1.-s*.85)+vec3(.55,.85,.82)*rays;float v=smoothstep(1.3,.2,length(p));col*=.6+.4*v;gl_FragColor=vec4(col,1.);}';
  var sh = function (type, src) {
    var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o);
    return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null;
  };
  var a = sh(gl.VERTEX_SHADER, vs), b = sh(gl.FRAGMENT_SHADER, fs);
  if (!a || !b) return;
  var pr = gl.createProgram();
  gl.attachShader(pr, a); gl.attachShader(pr, b); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = { r: gl.getUniformLocation(pr, 'r'), t: gl.getUniformLocation(pr, 't'), s: gl.getUniformLocation(pr, 's'), m: gl.getUniformLocation(pr, 'm') };
  var mx = 0, my = 0, tx = 0, ty = 0, scale = 0.5;
  var resize = function () {
    var w = Math.max(2, Math.floor(window.innerWidth * scale)), h = Math.max(2, Math.floor(window.innerHeight * scale));
    cv.width = w; cv.height = h; gl.viewport(0, 0, w, h);
  };
  resize();
  var t0 = performance.now(), last = 0, visible = true;
  var draw = function (now) {
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    gl.uniform2f(U.r, cv.width, cv.height);
    gl.uniform1f(U.t, R ? 4 : (now - t0) / 1000);
    gl.uniform1f(U.s, parseFloat(H.style.getPropertyValue('--sp')) || 0);
    gl.uniform2f(U.m, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  if (R) {
    draw(0);
    window.addEventListener('resize', function () { resize(); draw(0); });
    window.addEventListener('scroll', function () { requestAnimationFrame(function () { draw(0); }); }, { passive: true });
  } else {
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', function (e) { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; }, { passive: true });
    d.addEventListener('visibilitychange', function () { visible = !d.hidden; });
    var frame = function (now) {
      if (visible && now - last > 30) { last = now; draw(now); }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
})();
