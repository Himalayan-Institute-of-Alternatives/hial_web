(function () {
  const dropdown = document.getElementById('navDropdown');
  const btn = document.getElementById('navDropdownBtn');
  if (!dropdown || !btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown.classList.remove('open'));
})();
