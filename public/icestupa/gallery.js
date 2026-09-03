(function () {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  fetch('/api/content')
    .then((r) => r.json())
    .then(({ items }) => {
      const media = items.filter((i) => i.type === 'gallery-photo' || i.type === 'gallery-video');
      if (!media.length) {
        empty.style.display = 'block';
        return;
      }
      media.forEach((item) => grid.appendChild(renderTile(item)));
    })
    .catch(() => {
      empty.textContent = 'Could not load the gallery right now.';
      empty.style.display = 'block';
    });

  function renderTile(item) {
    const tile = document.createElement('div');
    tile.className = 'gallery-tile';
    if (item.type === 'gallery-video') {
      tile.innerHTML = `<video src="${item.mediaUrl}" muted></video><span class="gallery-tile-play">▶</span>`;
    } else {
      tile.innerHTML = `<img src="${item.mediaUrl}" alt="${escapeHtml(item.caption || '')}" loading="lazy" />`;
    }
    tile.addEventListener('click', () => openLightbox(item));
    return tile;
  }

  function openLightbox(item) {
    lightboxContent.innerHTML =
      item.type === 'gallery-video'
        ? `<video src="${item.mediaUrl}" controls autoplay></video>`
        : `<img src="${item.mediaUrl}" alt="" />`;
    lightboxCaption.textContent = item.caption || '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxContent.innerHTML = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
})();
