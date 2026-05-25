(function() {
  function getTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.add(theme);
})();
