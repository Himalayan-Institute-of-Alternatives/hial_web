(function () {
  const loginView = document.getElementById('loginView');
  const adminView = document.getElementById('adminView');
  const logoutBtn = document.getElementById('logoutBtn');

  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('passwordInput');
  const loginError = document.getElementById('loginError');

  const typeToggle = document.getElementById('typeToggle');
  const typeField = document.getElementById('typeField');
  const testimonialFields = document.getElementById('testimonialFields');
  const galleryFields = document.getElementById('galleryFields');
  const mediaFile = document.getElementById('mediaFile');
  const uploadForm = document.getElementById('uploadForm');
  const uploadStatus = document.getElementById('uploadStatus');
  const submitBtn = document.getElementById('submitBtn');
  const itemsList = document.getElementById('itemsList');

  function showAdmin() {
    loginView.style.display = 'none';
    adminView.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
    loadItems();
  }

  function showLogin() {
    loginView.style.display = 'block';
    adminView.style.display = 'none';
    logoutBtn.style.display = 'none';
  }

  // Check if already logged in (cookie persists across visits)
  fetch('/api/whoami').then((r) => (r.ok ? showAdmin() : showLogin()));

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        loginError.textContent = data.error || 'Login failed';
        return;
      }
      passwordInput.value = '';
      showAdmin();
    } catch {
      loginError.textContent = 'Network error - try again';
    }
  });

  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/logout', { method: 'POST' });
    showLogin();
  });

  // Type toggle (testimonial / gallery-photo / gallery-video)
  typeToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.type-btn');
    if (!btn) return;
    [...typeToggle.children].forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.type;
    typeField.value = type;

    if (type === 'testimonial') {
      testimonialFields.style.display = 'block';
      galleryFields.style.display = 'none';
    } else {
      testimonialFields.style.display = 'none';
      galleryFields.style.display = 'block';
      mediaFile.accept = type === 'gallery-video' ? 'video/*' : 'image/*';
    }
  });

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    uploadStatus.textContent = 'Uploading…';
    uploadStatus.className = 'admin-status';

    const type = typeField.value;
    const formData = new FormData();
    formData.append('type', type);

    if (type === 'testimonial') {
      formData.append('authorName', document.getElementById('authorName').value);
      formData.append('role', document.getElementById('role').value);
      formData.append('quote', document.getElementById('quote').value);
    } else {
      const file = mediaFile.files[0];
      if (!file) {
        uploadStatus.textContent = 'Choose a file first';
        uploadStatus.className = 'admin-status error';
        submitBtn.disabled = false;
        return;
      }
      formData.append('media', file);
      formData.append('caption', document.getElementById('caption').value);
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      uploadStatus.textContent = 'Uploaded ✓';
      uploadStatus.className = 'admin-status success';
      uploadForm.reset();
      loadItems();
    } catch (err) {
      uploadStatus.textContent = err.message;
      uploadStatus.className = 'admin-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });

  async function loadItems() {
    itemsList.innerHTML = '<p class="admin-empty">Loading…</p>';
    try {
      const res = await fetch('/api/content');
      const { items } = await res.json();
      if (!items.length) {
        itemsList.innerHTML = '<p class="admin-empty">Nothing uploaded yet.</p>';
        return;
      }
      itemsList.innerHTML = '';
      items.forEach((item) => itemsList.appendChild(renderItem(item)));
    } catch {
      itemsList.innerHTML = '<p class="admin-empty">Could not load content.</p>';
    }
  }

  function renderItem(item) {
    const row = document.createElement('div');
    row.className = 'admin-item';

    let preview = '';
    if (item.type === 'gallery-photo') {
      preview = `<img src="${item.mediaUrl}" class="admin-item-thumb" />`;
    } else if (item.type === 'gallery-video') {
      preview = `<video src="${item.mediaUrl}" class="admin-item-thumb" muted></video>`;
    } else {
      preview = `<div class="admin-item-thumb admin-item-thumb--text">"</div>`;
    }

    const label =
      item.type === 'testimonial'
        ? `<strong>${escapeHtml(item.authorName)}</strong> — ${escapeHtml(item.quote).slice(0, 80)}${item.quote.length > 80 ? '…' : ''}`
        : escapeHtml(item.caption || '(no caption)');

    row.innerHTML = `
      ${preview}
      <div class="admin-item-body">
        <span class="admin-item-type">${item.type}</span>
        <div>${label}</div>
      </div>
      <button class="admin-delete" data-id="${item.id}">Delete</button>
    `;

    row.querySelector('.admin-delete').addEventListener('click', () => deleteItem(item.id, row));
    return row;
  }

  async function deleteItem(id, row) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    row.style.opacity = '0.4';
    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      row.remove();
    } catch {
      row.style.opacity = '1';
      alert('Could not delete this item.');
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
})();
