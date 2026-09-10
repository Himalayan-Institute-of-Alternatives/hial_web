(function(){
  const D = ICE_STUPA_DATA;

  /* ---------- HOW IT WORKS ---------- */
  const howCard = document.getElementById('howCard');
  if (howCard) {
    D.howItWorks.forEach(s => {
      const p = document.createElement('p');
      p.innerHTML = `<strong style="color:#7fd4e8;">${s.step}. ${s.title}</strong> — ${s.body}`;
      howCard.appendChild(p);
    });
  }

  /* ---------- MILESTONES (compact list, one card) ---------- */
  const milestonesCard = document.getElementById('milestonesCard');
  if (milestonesCard) {
    D.milestones.forEach(m => {
      const div = document.createElement('div');
      div.className = 'mini-milestone';
      div.innerHTML = `
        <span class="mm-year">${m.year}</span>
        <h4>${m.title}</h4>
        <p>${m.body}</p>`;
      milestonesCard.appendChild(div);
    });
  }

  /* ---------- DATA / STATS ---------- */
  const dataStats = document.getElementById('dataStats');
  if (dataStats) {
    D.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'mini-stat';
      div.innerHTML = `<div class="v">${s.value}</div><div class="l">${s.label}</div>`;
      dataStats.appendChild(div);
    });
  }

  /* ---------- REACH MAP ---------- */
  const reachPins = document.getElementById('reachPins');
  const reachNote = document.getElementById('reachNote');
  let activeReachPin = null;

  if (reachPins) {
    D.places.forEach((p) => {
      const x = (p.x / 100) * 500;
      const y = (p.y / 100) * 260;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'reach-pin');
      g.innerHTML = `<circle cx="${x}" cy="${y}" r="6"></circle>
        <text x="${x + 10}" y="${y + 4}">${p.name}</text>`;
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeReachPin) activeReachPin.classList.remove('active');
        g.classList.add('active');
        activeReachPin = g;
        reachNote.innerHTML = `<strong>${p.name}</strong>${p.note}`;
        reachNote.classList.add('show');
      });
      reachPins.appendChild(g);
    });
  }

})();
