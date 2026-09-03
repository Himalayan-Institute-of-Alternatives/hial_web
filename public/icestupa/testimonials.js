(function () {
  const grid = document.getElementById('testimonialsGrid');
  const empty = document.getElementById('testimonialsEmpty');

  fetch('/api/content')
    .then((r) => r.json())
    .then(({ items }) => {
      const testimonials = items.filter((i) => i.type === 'testimonial');
      if (!testimonials.length) {
        empty.style.display = 'block';
        return;
      }
      testimonials.forEach((t) => grid.appendChild(renderCard(t)));
    })
    .catch(() => {
      empty.textContent = 'Could not load testimonials right now.';
      empty.style.display = 'block';
    });

  function renderCard(t) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <p class="testimonial-quote">"${escapeHtml(t.quote)}"</p>
      <p class="testimonial-author">${escapeHtml(t.authorName)}${t.role ? ` <span>— ${escapeHtml(t.role)}</span>` : ''}</p>
    `;
    return card;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
})();
