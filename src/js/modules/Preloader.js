window.addEventListener('load', function() {
  const $preloader = document.querySelector('.preloader');

  window.setTimeout(function() {
    if ($preloader) {
      $preloader.classList.add('hidden');
    }
  }, 200);
});

const showPreloader = () => {
  const $preloader = document.querySelector('.preloader');
  if ($preloader) {
    $preloader.classList.remove('hidden');
  }
};

const hidePreloader = () => {
  const $preloader = document.querySelector('.preloader');
  if ($preloader) {
    $preloader.classList.add('hidden');
  }
};

window.hidePreloader = hidePreloader;
window.showPreloader = showPreloader;
