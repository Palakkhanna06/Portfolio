(function () {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    if (!btn) return;

    // Load initial theme
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === '') {
        root.setAttribute('data-theme', stored);
        btn.textContent = stored === 'dark' ? '☀ Light' : '🌙 Dark';
    } else {
        root.setAttribute('data-theme', 'dark');
        btn.textContent = '☀ Light';
    }

    btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        btn.textContent = next === 'dark' ? '☀ Light' : '🌙 Dark';
    });
})();
