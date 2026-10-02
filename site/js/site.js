(() => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  if (nav) {
    addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), {passive:true});
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.classList.toggle('open', !open);
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
    }));
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('[data-enter]').forEach((el,i) => {
      setTimeout(() => { el.style.opacity='1'; el.style.transform='none'; }, 80 + i*90);
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('[data-spot]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  const canvas = document.getElementById('helix');
  if (!canvas) return;
  const mode = canvas.dataset.mode || 'full'; // full | soft
  const ctx = canvas.getContext('2d');
  let w, h, t = 0, mx = 0.5, my = mode === 'soft' ? 0.28 : 0.42, tx = mx, ty = my;
  const particleCount = mode === 'soft' ? 48 : 110;
  const particles = Array.from({length: particleCount}, () => ({
    a: Math.random()*Math.PI*2,
    r: 40 + Math.random()*(mode === 'soft' ? 140 : 220),
    y: Math.random(),
    s: 0.3 + Math.random()*1.2,
    z: Math.random()
  }));
  function resize(){
    w = canvas.width = canvas.clientWidth * devicePixelRatio;
    h = canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  }
  resize(); addEventListener('resize', resize);
  const host = canvas.closest('.hero, .page-hero') || document.body;
  host.addEventListener('pointermove', e => {
    const r = host.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width;
    ty = (e.clientY - r.top) / r.height;
  });
  function drawHelix(cx, cy, amp, turns, phase, color, lw){
    ctx.beginPath();
    for(let i=0;i<=360;i++){
      const p = i/360;
      const ang = p * Math.PI * 2 * turns + phase;
      const x = cx + Math.cos(ang) * amp * (0.55 + 0.45*Math.sin(p*Math.PI));
      const y = cy - amp*1.65 + p * amp * 3.3 + Math.sin(ang*0.5)*8;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.shadowColor = color;
    ctx.shadowBlur = mode === 'soft' ? 8 : 16;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  function frame(){
    t += mode === 'soft' ? 0.005 : 0.008;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    ctx.clearRect(0,0,cw,ch);
    const g = ctx.createRadialGradient(cw*mx, ch*my, 0, cw*mx, ch*my, Math.max(cw,ch)*0.55);
    const purpleA = mode === 'soft' ? 0.08 : 0.16;
    const goldA = mode === 'soft' ? 0.05 : 0.10;
    g.addColorStop(0,`rgba(121,54,166,${purpleA})`);
    g.addColorStop(0.4,`rgba(232,200,120,${goldA})`);
    g.addColorStop(1,'rgba(251,248,243,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,cw,ch);
    const cx = cw * mx, cy = ch * my;
    const amp = Math.min(cw,ch) * (mode === 'soft' ? 0.11 : 0.16);
    drawHelix(cx, cy, amp, 3.2, t, `rgba(178,127,58,${mode==='soft'?0.45:0.78})`, mode==='soft'?1.2:1.7);
    drawHelix(cx, cy, amp*0.81, 3.2, t + Math.PI, `rgba(232,200,120,${mode==='soft'?0.4:0.72})`, mode==='soft'?0.9:1.25);
    drawHelix(cx, cy, amp*0.62, 2.6, -t*0.8, `rgba(121,54,166,${mode==='soft'?0.35:0.65})`, mode==='soft'?0.85:1.15);
    if (mode !== 'soft') {
      const core = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
      core.addColorStop(0,'rgba(251,243,220,0.95)');
      core.addColorStop(0.35,'rgba(232,200,120,0.45)');
      core.addColorStop(1,'rgba(121,54,166,0)');
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(cx,cy,28+Math.sin(t*3)*4,0,Math.PI*2); ctx.fill();
    }
    particles.forEach(p => {
      p.a += 0.004 * p.s;
      const x = cx + Math.cos(p.a + t) * p.r * (0.7 + 0.3*Math.sin(t + p.z*6));
      const y = cy + Math.sin(p.a*0.7) * p.r * 0.55 + (p.y-0.5)*ch*0.15;
      const alpha = (mode === 'soft' ? 0.12 : 0.22) + p.z*0.35;
      ctx.fillStyle = p.z > 0.5 ? `rgba(178,127,58,${alpha})` : `rgba(121,54,166,${alpha})`;
      ctx.beginPath(); ctx.arc(x,y,1.2+p.z*1.8,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
