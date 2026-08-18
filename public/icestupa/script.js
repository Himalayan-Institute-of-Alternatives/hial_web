(function(){
  const D = ICE_STUPA_DATA;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HERO ---------- */
  document.getElementById('heroSubtitle').textContent = D.hero.subtitle;
  document.getElementById('heroCounterLabel').textContent = D.hero.totalLitresLabel;

  function formatNum(n){ return Math.round(n).toLocaleString('en-IN'); }

  const counterEl = document.getElementById('heroCounter');
  function animateCounter(target){
    if(reduceMotion){ counterEl.textContent = formatNum(target); return; }
    let start = null;
    const duration = 1600;
    function step(ts){
      if(!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      counterEl.textContent = formatNum(target * eased);
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  animateCounter(D.hero.totalLitresStored);

  /* ---------- HOW IT WORKS ---------- */
  const howGrid = document.getElementById('howGrid');
  D.howItWorks.forEach(s => {
    const div = document.createElement('div');
    div.className = 'how-step';
    div.innerHTML = `<span class="step-num">${s.step}</span><h4>${s.title}</h4><p>${s.body}</p>`;
    howGrid.appendChild(div);
  });

  /* ---------- MILESTONES ---------- */
  const timeline = document.getElementById('timeline');
  D.milestones.forEach(m => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-ring">${m.year}</div>
      <span class="tl-year">${m.year}</span>
      <h4>${m.title}</h4>
      <p>${m.body}</p>`;
    timeline.appendChild(item);
  });

  /* ---------- STATS ---------- */
  const statsGrid = document.getElementById('statsGrid');
  D.stats.forEach(s => {
    const div = document.createElement('div');
    div.className = 'stat';
    div.innerHTML = `<div class="value">${s.value}</div><div class="label">${s.label}</div>`;
    statsGrid.appendChild(div);
  });

  /* ---------- MAP ---------- */
  const mapPins = document.getElementById('mapPins');
  const mapNote = document.getElementById('mapNote');
  const mapSvg = document.getElementById('mapSvg');
  let activePin = null;

  D.places.forEach((p, i) => {
    const x = (p.x / 100) * 500;
    const y = (p.y / 100) * 260;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'map-pin');
    g.innerHTML = `<circle cx="${x}" cy="${y}" r="6"></circle>
      <text x="${x + 10}" y="${y + 4}">${p.name}</text>`;
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      if(activePin) activePin.classList.remove('active');
      g.classList.add('active');
      activePin = g;
      showNote(p, x, y);
    });
    mapPins.appendChild(g);
  });

  function showNote(p, x, y){
    mapNote.innerHTML = `<strong>${p.name}</strong>${p.note}`;
    const pct = (x / 500) * 100;
    const topPct = (y / 260) * 100;
    mapNote.style.left = pct > 60 ? 'auto' : `calc(${pct}% + 20px)`;
    mapNote.style.right = pct > 60 ? `calc(${100 - pct}% + 20px)` : 'auto';
    mapNote.style.top = `calc(${topPct}% - 10px)`;
    mapNote.classList.add('show');
  }
  document.addEventListener('click', () => {
    mapNote.classList.remove('show');
    if(activePin) activePin.classList.remove('active');
    activePin = null;
  });

  /* ---------- CONE SVG (hero signature element) ---------- */
  // Built as stacked trapezoid "rings" narrowing toward the top,
  // revealed bottom-to-top on load to feel like the stupa forming.
  const coneRings = document.getElementById('coneRings');
  const ringCount = 14;
  const baseY = 460, topY = 70, baseW = 170, topW = 14, cx = 200;
  const ringsData = [];
  for(let i = 0; i < ringCount; i++){
    const t0 = i / ringCount, t1 = (i + 1) / ringCount;
    const y0 = baseY - t0 * (baseY - topY);
    const y1 = baseY - t1 * (baseY - topY);
    const w0 = baseW - t0 * (baseW - topW);
    const w1 = baseW - t1 * (baseW - topW);
    ringsData.push({y0, y1, w0, w1, i});
  }
  ringsData.forEach(r => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${cx - r.w0/2},${r.y0} L ${cx + r.w0/2},${r.y0} L ${cx + r.w1/2},${r.y1} L ${cx - r.w1/2},${r.y1} Z`;
    path.setAttribute('d', d);
    const lightness = 92 - r.i * 2.2;
    path.setAttribute('fill', `hsl(195, 45%, ${Math.max(58,lightness)}%)`);
    path.setAttribute('fill-opacity', 0.9 - r.i * 0.02);
    path.setAttribute('class', 'cone-ring');
    path.style.transitionDelay = (r.i * 45) + 'ms';
    coneRings.appendChild(path);
  });

  function revealCone(){
    document.querySelectorAll('.cone-ring').forEach(r => r.classList.add('on'));
  }
  if(reduceMotion){ revealCone(); }
  else { requestAnimationFrame(() => setTimeout(revealCone, 200)); }

  /* ---------- SCROLL REVEAL for milestones ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('on'); });
  }, { threshold: 0.2 });
  document.querySelectorAll('.tl-item').forEach(el => io.observe(el));

})();
