// Apply the saved light/dark choice before first paint (external file: the CSP blocks inline scripts)
try {
  var t = localStorage.getItem('theme')
  if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t
} catch (e) {}
// The opening screen plays once per tab: on reloads and later pages it's hidden before
// it can flash (index.html: .seen-loader #preloader { display: none }).
try {
  if (sessionStorage.getItem('loader:seen')) document.documentElement.classList.add('seen-loader')
} catch (e) {}
