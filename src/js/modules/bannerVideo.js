const videoBanner = document.querySelector('.banner__video-banner');
const plyr = document.querySelector('.video-block__wrapper .plyr');

if (videoBanner) {
  videoBanner.addEventListener('click', function() {
    this.classList.add('hidden');
    plyr.player.play();
  });
}
