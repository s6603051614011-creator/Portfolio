// Apply the saved light/dark choice before first paint (external file: the CSP blocks inline scripts)
try {
  var t = localStorage.getItem('theme')
  if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t
} catch (e) {}
