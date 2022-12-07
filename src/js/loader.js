window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader--hidden');

  setTimeout(() => {
    document.body.removeChild(document.querySelector('.loader'));
  }, 500);
});
